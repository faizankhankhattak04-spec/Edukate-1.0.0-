(function ($) {
    "use strict";

    // SpeakO site-wide navigation and contact bar.
    // Keeping this in one place prevents individual template pages from drifting.
    function applySpeakONavigation() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';

        var topbar = '\
        <div class="container-fluid bg-dark">\
            <div class="row py-2 px-lg-5">\
                <div class="col-12 text-center">\
                    <div class="d-inline-flex align-items-center text-white">\
                        <small><i class="fa fa-weixin mr-2" aria-hidden="true"></i>WeChat: SHAH1122-COM</small>\
                        <small class="px-3">|</small>\
                        <small><i class="fa fa-envelope mr-2" aria-hidden="true"></i>speakup521@gmail.com</small>\
                    </div>\
                </div>\
            </div>\
        </div>';

        var links = [
            ['index.html', 'Home'],
            ['about.html', 'About SpeakO'],
            ['course.html', 'Courses'],
            ['team.html', 'Teachers'],
            ['contact.html#pricing', 'Pricing'],
            ['contact.html', 'Contact']
        ];

        var navLinks = links.map(function (link) {
            var href = link[0];
            var active = (currentPage === href.split('#')[0]) ? ' active' : '';
            return '<a href="' + href + '" class="nav-item nav-link' + active + '">' + link[1] + '</a>';
        }).join('');

        var navbar = '\
        <div class="container-fluid p-0">\
            <nav class="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5" aria-label="Main navigation">\
                <a href="index.html" class="navbar-brand ml-lg-3" aria-label="SpeakO home">\
                    <h1 class="m-0 text-uppercase text-primary"><i class="fa fa-book-reader mr-3" aria-hidden="true"></i>SpeakO</h1>\
                </a>\
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">\
                    <span class="navbar-toggler-icon"></span>\
                </button>\
                <div class="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">\
                    <div class="navbar-nav mx-auto py-0">' + navLinks + '</div>\
                    <a href="contact.html#trial" class="btn btn-primary py-2 px-4 d-none d-lg-block">Book ¥20 Trial</a>\
                </div>\
            </nav>\
        </div>';

        var existingTopbar = document.querySelector('.container-fluid.bg-dark');
        if (existingTopbar && existingTopbar.querySelector('.fa-phone-alt, .fa-envelope, .fa-facebook-f')) {
            existingTopbar.outerHTML = topbar;
        }

        var existingNavbar = document.querySelector('.container-fluid.p-0 .navbar');
        if (existingNavbar) {
            var navbarContainer = existingNavbar.closest('.container-fluid.p-0');
            navbarContainer.outerHTML = navbar;
        }
    }

    $(document).ready(function () {
        applySpeakONavigation();

        // Dropdown on mouse hover (kept for compatibility with any legacy dropdowns).
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Courses carousel
    $(".courses-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav: false,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 4 }
        }
    });

    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ]
    });

    // Related carousel
    $(".related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 }
        }
    });

})(jQuery);
