$(function () {
    var currPage = 1;
    //默认不折叠分类管理
    $('.child').show();

    //使art-template能访问$
    template.helper('getJquery', function () {
        return $;
    })

    //渲染数据
    var render = function () {
        getFirstCategory(currPage, function (data) {
            $('tbody').html(template('firstCatListTlp', data));
            setPaginator(currPage, Math.ceil(data.total / data.size), render);
        })
    };
    render();

    //定义分页功能
    var setPaginator = function (pageNow, pageSum, callback) {
        $('.pageList').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            alignment: 'right',
            size: 'small',
            currentPage: pageNow, //当前页
            numberOfPages: 4,
            totalPages: pageSum, //总页数
            onPageClicked: function (event, originalEvent, type, page) {
                currPage = page;
                callback();
            }
        });
    };


    //点击添加分类
    $('.addCat').on('click', function () {
        $('#addFirstModal').modal('show');
        //如果点击确定
        $('#addFirstModal .btn-primary').off('click').on('click', function () {
            var firstCatName = $('#addFirstModal input').val();
            $('#addFirstModal input').val('')
            //如果输入为空
            if (!firstCatName) {
                alert('请输入一级分类名称');
            } else {
                //发送ajax请求
                $.ajax({
                    type: 'post',
                    url: '/category/addTopCategory',
                    data: {
                        categoryName: firstCatName
                    },
                    dataType: 'json',
                    success: function (data) {
                        $('#addFirstModal').modal('hide');
                        render();
                        if (data.error) {
                            location.href = '/admin';
                        }
                    }
                });
            }

        })
    })

})

//请求一级分类数据
var getFirstCategory = function (page, callback) {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page: page,
            pageSize: 3
        },
        dataType: 'json',
        success: function (data) {
            callback(data);
            if (data.error) {
                location.href = '/admin';
            }
        }
    });
};