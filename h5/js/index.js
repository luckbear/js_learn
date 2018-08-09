$(function () {
    $('#container').fullpage({
        verticalContered: false,
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        navigation: true,
        afterLoad: function (link, index) {
            $('.section').eq(index - 1).addClass("now");
            $('.screen07 .star img').each(function (i, item) {
                $(this).css('transition-delay',i*0.5+'s')
            });
        },
        onLeave: function (index, nextIndex) {
            if (index == 2 && nextIndex == 3) {
                $('.section').eq(index - 1).addClass('leave');
            } else if (index == 3) {
                $('.section').eq(index - 1).addClass('leave')
            } else if (index == 5) {
                $('.section').eq(index - 1).addClass('leave');
                $('.screen06 .box').addClass('show');
            }
            //  else if (index == 6) {
            //     $('.screen07 .star').addClass('show');
            //     $('.screen07 .text').addClass('show');
            //     $('.screen07 .star img').each(function (i, item) {
            //         $(this).css('transition-delay',i*0.5+'s')
            //     });
            // }

        },
        afterRender: function () {
            $('#more').on('click', function () {
                $.fn.fullpage.moveSectionDown();
            });
            $('.screen04 .car').on('transitionend', function () {
                $('.screen04 .address').show().find('img:last').fadeIn(1000);
                $('.screen04 .text').addClass('show');
            });
            $('.screen08').on('mousemove',function(e){
                $(this).find('.hand').css({
                    left:e.clientX-190,
                    top:e.clientY-20
                });
            }).find('.again').on('click',function () {
                $('.now,.leave,.show').removeClass('now').removeClass('leave').removeClass('show');
                $('.content[style]').removeAttr('style');

                $.fn.fullpage.moveTo(1);
            })
        }
    });
});