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
        getSecondCategory('/category/querySecondCategoryPaging', currPage, 3, function (data) {
            $('tbody').html(template('secondCatListTlp', data));
            setPaginator(currPage, Math.ceil(data.total / data.size), render);
        });
    };
    render();
    //初始化下拉框
    var initDropDown = function () {
        getSecondCategory('/category/queryTopCategoryPaging', 1, 1000, function (data) {
            $('.dropdown-menu').html(template('selecSecondTpl', data));
        });
        $('.dropdown-menu').on('click', 'a', function () {
            $('#dropdownMenu1').html($(this).html() + '<span class="caret"></span>');
            $('[name="categoryId"]').val($(this).attr('data-id'));
        })
    };

    // 初始化图片上传
    var initUpload = function () {
        $('[name="pic"]').fileupload({
            type:'post',
            dataType:'json',
            done:function (e,data) {
                // 预览
                console.log(data);
                
                $('#uploadimg').attr('src',data.result.PicAddr)
            }
        })
    }


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
        $('#addSecondModal').modal('show');
        initDropDown(); //下拉框
        initUpload();
        var categoryId = $('#dropdownMenu1').attr('data-id');
        //表单验证
        $('#form').bootstrapValidator({
            /*校验插件默认会忽略  隐藏的表单元素
            不忽略任何情况的表单元素*/
            excluded: [],
            feedbackIcons: { //提示图标
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            // fields: {
            //     categoryId: {
            //         validators: {
            //             notEmpty: {
            //                 message: '请选择一级分类'
            //             }
            //         }
            //     },
            //     secondName: {
            //         validators: {
            //             notEmpty: {
            //                 message: '二级分类不能为空'
            //             }
            //         }
            //     }
            // }
        }).on('success.form.bv', function (e) {
            e.preventDefault();
            var formData = $('#form').serializeArray();


            //发送ajax请求
            // $.ajax({
            //     type: 'post',
            //     url: '/category/addTopCategory',
            //     data: {
            //         categoryName: firstCatName
            //     },
            //     dataType: 'json',
            //     success: function (data) {
            //         $('#addFirstModal').modal('hide');
            //         render();
            //         if (data.error) {
            //             location.href = '/admin';
            //         }
            //     }
            // });

        })

    })

})

//请求二级分类数据
var getSecondCategory = function (url, page, pageSize, callback) {
    $.ajax({
        type: 'get',
        url: url,
        data: {
            page: page,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (data) {
            callback(data)
            if (data.error) {
                location.href = '/admin';
            }
        }
    });
};