$(function () {
    banner();
    touchMoveImg();
    $('[data-toggle="tooltip"]').tooltip();
})

// 轮播图
var banner = function () {

    // 缓存轮播图数据，有则渲染无则请求
    var getData = function (callback) {
        if (window.result) {
            callback && callback(window.result);
        } else {
            $.ajax({
                type: 'get',
                url: 'js/data.json',
                dataType: 'json',
                success: function (result) {
                    window.result = result;
                    callback && callback(window.result);
                }
            })
        }
    };

    // 动态渲染
    var render = function () {
        getData(function (result) {
            var isMobile = $(window).width() < 768;
            var pointHtml = template('pointTemplate', {
                list: result
            });
            var imageHtml = template('imageTemplate', {
                list: result,
                isM: isMobile
            });
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        })
    };

    // 监测页面缩放
    $(window).on('resize', function () {
        render();
    }).trigger('resize');
};


//触摸滑动事件
var touchMoveImg = function () {
    var startX = 0;
    var distanceX = 0;
    var isMove = true;
    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
    }).on('touchend', function (e) {
        if (distanceX>150) {
            $('#carousel-example-generic').carousel('prev');
        }else if(distanceX<-150) {
            $('#carousel-example-generic').carousel('next');
        }
    })
};

//标签页滑动效果

//动态设置标签栏宽度
var tabs=$('.wjs_product .nav-tabs');
var width=0;

tabs.find('li').each(function(index,item){
    var currentLi = $(this);    
    var liWidth = currentLi.outerWidth(true);   
    width +=liWidth;   
});
tabs.width(width);

new IScroll($('.nav-tabs-parent')[0],{
    scrollX:true,
    scrollY:false
});

