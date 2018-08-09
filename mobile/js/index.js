window.onload = function () {
    searchColor();
    banner();
    downTime();
}

// 搜索栏变色
var searchColor = function () {
    var searchBox = document.querySelector('.jd_search_box');
    var height = document.querySelector('.banner').offsetHeight;

    //监听页面滚动事件
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop;
        // console.log(scrollTop);

        var opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    }
}


//轮播图
var banner = function () {
    var imgBox = document.querySelector('.banner ul:first-child');
    var imgWidth = document.querySelector('.banner').offsetWidth;

    var pointsBox = document.querySelector('.banner ul:last-child');
    var points = pointsBox.querySelectorAll('li');
    var index = 1;

    var timer = setInterval(function () {
        index++;
        imgBox.style.transition = 'all 0.2s';
        imgBox.style.transform = 'translateX(' + -index * imgWidth + 'px)';
    }, 1000);

    //控制首尾滑动
    imgBox.addEventListener('transitionend', function () {
        if (index >= 9) {
            index = 1;
            imgBox.style.transition = '';
            imgBox.style.transform = 'translateX(' + -index * imgWidth + 'px)';
        } else if (index <= 0) {
            index = 8;
            imgBox.style.transition = '';
            imgBox.style.transform = 'translateX(' + -index * imgWidth + 'px)';
        }
        setPoint();
    });

    //根据图片滑动设置点
    var setPoint = function () {
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('current');
            points[index - 1].classList.add('current')
        }
    }

    //触摸滑动图片
    var startX = 0;
    var distanceX = 0;
    var isMove = false;

    //监听触摸开始
    imgBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    })

    //监听触摸移动
    imgBox.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        imgBox.style.transition = '';
        imgBox.style.transform = 'translateX(' + (-index * imgWidth + distanceX) + 'px)';
        isMove = true;
    })

    //监听触摸结束
    imgBox.addEventListener('touchend', function () {
        if (isMove) {
            if (Math.abs(distanceX) > imgWidth / 3) {
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
                imgBox.style.transition = 'all 0.2s';
                imgBox.style.transform = 'translateX(' + -index * imgWidth + 'px)';
            } else {
                imgBox.style.transition = 'all 0.2s';
                imgBox.style.transform = 'translateX(' + -index * imgWidth + 'px)';
            }

            //参数重置
            startX = 0;
            distanceX = 0;
            isMove = false;

            //触摸结束后启动定时器
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                imgBox.style.transition = 'all 0.2s';
                imgBox.style.transform = 'translateX(' + -index * imgWidth + 'px)';
            }, 1000);
        }
    });
}

//倒计时
var downTime = function () {
    var time = 2 * 60 * 60;
    var spans = document.querySelector('.time').querySelectorAll('span');

    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;

        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;

        if (time<0) {
            clearInterval(timer);
        }
    }, 1000)


}