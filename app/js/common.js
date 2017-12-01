(function() {

    function equalHeight(target) {
        var maxHeight = 0;
        var trgt = $(target);

        trgt.removeAttr("style");

        trgt.each(function() {
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
        });

        trgt.each(function() {
           $(this).height(maxHeight);
        });
    }

    function scrollToAnchor(id){
        var headerHeight = 102;
        var aTag = $(id);

        $('html,body').animate({scrollTop: aTag.offset().top - headerHeight},'slow');
    }

    function fullHeight() {
        $('.header').height(function (index, height) {
            return window.innerHeight ;
        });
    }

    function sliderNav(num) {
        $('.header__container').removeClass('bg1 bg2 bg3');
        $('.header__container').addClass('bg' + num);
        $('.circle').removeClass('active');
        $('.circle' + num).addClass('active');
        $('.slider__item').removeClass('active');
        $('.slider__item' + num).addClass('active');
    }


    $(document).ready(function() {

        $('.looper').addClass('active');

        $('.circle1').click(function() {
            sliderNav(1);
        });
        $('.circle2').click(function() {
            sliderNav(2);
        });
        $('.circle3').click(function() {
            sliderNav(3);
        });

        $(".logo-slider").slick({
            dots: false,

            prevArrow: $('.logo-slider__prev'),
            nextArrow: $('.logo-slider__next'),
            arrows: true,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 4
                  }
                },
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 1
                  }
                }
            ]
        });

        $('.hamburger').click(function () {
            $('#menu-desktop').toggleClass('open');
        });

        $(".scroll_link").click(function() {
           scrollToAnchor($(this).attr('href'));
           $('#menu-desktop').removeClass('open');
        });

        // modal

        $('.modal_link').click(function() {
            $('#form-modal').fadeIn();
            $('#menu-desktop').removeClass('open');
            return false;
        });

        $('.details_link').click(function() {
            var parent = $(this).parents('.js-product');
            parent
                .addClass('opening')
                .find('.product__hidden')
                .fadeIn();
            setTimeout(function() {
                 parent
                    .addClass('open')
                    .removeClass('opening');
            },800);
            $('#menu-desktop').removeClass('open');
            return false;
        });

        $('.modal__close').click(function() {
            $('.modal').fadeOut();
        });

        $('.form__input').on('focus', function() {
            $(this).siblings('.form__lbl').addClass('active');
        });

        $('.form__input').on('blur', function() {
            if (!$(this).val()) {
                $(this).siblings('.form__lbl').removeClass('active');
            }
        });

         //E-mail Ajax Send

       $("form").submit(function(e) {

            e.preventDefault();

            var th = $(this);

            $.ajax({
                type: th.attr('method'),
                url: th.attr('action'),
                data: th.serialize()

            }).done(function() {

                $('#form-succes').fadeIn();

                setTimeout(function() {
                    th.trigger("reset");
                    $('.modal').fadeOut();
                    $('.form__lbl').removeClass('active');
                }, 5000);
            });

        });

       fullHeight();
       equalHeight('.product');
       equalHeight('.advantage');

    });

    $(window).on("scroll",function(){
        var client = $(window).scrollTop();
        if (client > 20 && client < $('.header__container').height()) {
            $('.looper1').css({"bottom" : ( .13 * $(window).scrollTop() ) - 200, "transition-delay": "0s", "transition": "none" });
            $('.looper2').css({"bottom" : ( .27 * $(window).scrollTop() ) - 300, "transition-delay": "0s", "transition": "none" });
            $('.looper3').css({"bottom" : ( .39 * $(window).scrollTop() ) - 420, "transition-delay": "0s", "transition": "none" });
            $('.looper4').css({"bottom" : ( .20 * $(window).scrollTop() ) - 420, "transition-delay": "0s", "transition": "none" });
            $('.looper5').css({"bottom" : ( .12 * $(window).scrollTop() ) + 30, "transition-delay": "0s", "transition": "none" });
            $('.looper6').css({"bottom" : ( .2 * $(window).scrollTop() ) - 200, "transition-delay": "0s", "transition": "none" });
            $('.looper7').css({"bottom" : ( .2 * $(window).scrollTop() ) - 100, "transition-delay": "0s", "transition": "none" });
        } else {
            $('.looper').css({"transition": "none"});
        }
        // the .5 refers to parallax speed (higher is faster)
        // the 100 refers to the initial start position offset (higher is further down)
    });

    $(window).resize(function(){

        equalHeight('.product');
        equalHeight('.advantage');
        equalHeight('.new__main');
        fullHeight();

    });

})();