(function ($) {
    "use strict";

    var SPEAKO_WECHAT = '18969190005';
    var SPEAKO_PHONE = '+86 18969190005';

    function logoPath() {
        return window.location.pathname.indexOf('/teachers/') !== -1 ? '../img/speako-logo.webp' : 'img/speako-logo.webp';
    }

    function applySpeakONavigation() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        var topbar = '\
        <div class="container-fluid bg-dark">\
            <div class="row py-2 px-lg-5">\
                <div class="col-12 text-center">\
                    <div class="d-inline-flex align-items-center text-white flex-wrap justify-content-center">\
                        <small><i class="fa fa-phone-alt mr-2" aria-hidden="true"></i>' + SPEAKO_PHONE + '</small>\
                        <small class="px-3">|</small>\
                        <small><i class="fab fa-weixin mr-2" aria-hidden="true"></i>WeChat: ' + SPEAKO_WECHAT + '</small>\
                        <small class="px-3 d-none d-md-inline">|</small>\
                        <small class="d-none d-md-inline"><i class="fa fa-envelope mr-2" aria-hidden="true"></i>speakup521@gmail.com</small>\
                    </div>\
                </div>\
            </div>\
        </div>';

        var links = [
            ['index.html', 'Home'], ['about.html', 'About'], ['course.html', 'Courses'],
            ['team.html', 'Teachers'], ['pricing.html', 'Pricing'], ['faq.html', 'FAQ'], ['contact.html', 'Contact']
        ];
        var navLinks = links.map(function (link) {
            var active = (currentPage === link[0].split('#')[0]) ? ' active' : '';
            return '<a href="' + link[0] + '" class="nav-item nav-link' + active + '">' + link[1] + '</a>';
        }).join('');

        var navbar = '\
        <div class="container-fluid p-0">\
            <nav class="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5 speako-nav" aria-label="Main navigation">\
                <a href="index.html" class="navbar-brand ml-lg-3" aria-label="SpeakO home">\
                    <img src="' + logoPath() + '" alt="SpeakO" class="speako-site-logo" style="height:56px;width:auto;max-width:180px;object-fit:contain;display:block;">\
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
        if (existingTopbar && existingTopbar.querySelector('.fa-phone-alt, .fa-envelope, .fa-facebook-f, .fa-weixin')) existingTopbar.outerHTML = topbar;
        var existingNavbar = document.querySelector('.container-fluid.p-0 .navbar');
        if (existingNavbar) existingNavbar.closest('.container-fluid.p-0').outerHTML = navbar;
    }

    function replaceLegacyContactText() {
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        var node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.indexOf('SHAH1122-COM') !== -1) node.nodeValue = node.nodeValue.replace(/SHAH1122-COM/g, SPEAKO_WECHAT);
            if (node.nodeValue.indexOf('19819208727') !== -1) node.nodeValue = node.nodeValue.replace(/19819208727/g, '18969190005');
        }
        var wechatField = document.getElementById('wechatId');
        if (wechatField) wechatField.textContent = SPEAKO_WECHAT;
    }

    function applyBrandAndContactUpdates() {
        document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
            el.href = 'tel:+8618969190005';
            if (el.textContent.indexOf('Call') !== -1) el.textContent = 'Call ' + SPEAKO_PHONE;
        });
        document.querySelectorAll('a[href*="19819208727"]').forEach(function (el) {
            el.href = el.href.replace(/19819208727/g, '18969190005');
        });
        document.querySelectorAll('script[type="application/ld+json"]').forEach(function (script) {
            try {
                var data = JSON.parse(script.textContent);
                if (data && (data.telephone || data['@type'] === 'EducationalOrganization')) {
                    data.telephone = SPEAKO_PHONE;
                    data.email = 'speakup521@gmail.com';
                    script.textContent = JSON.stringify(data);
                }
            } catch (e) {}
        });
        document.querySelectorAll('footer .navbar-brand').forEach(function (brand) {
            brand.innerHTML = '<img src="' + logoPath() + '" alt="SpeakO" style="height:50px;width:auto;max-width:170px;object-fit:contain;display:block;">';
        });
        document.querySelectorAll('img[alt="SpeakO"], img.speako-site-logo').forEach(function (img) {
            img.src = logoPath();
            img.alt = 'SpeakO';
        });
    }

    $(document).ready(function () {
        applySpeakONavigation();
        applyBrandAndContactUpdates();
        replaceLegacyContactText();
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () { $('.dropdown-toggle', this).trigger('click'); })
                    .on('mouseout', function () { $('.dropdown-toggle', this).trigger('click').blur(); });
            } else $('.navbar .dropdown').off('mouseover').off('mouseout');
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    $(window).scroll(function () { if ($(this).scrollTop() > 100) $('.back-to-top').fadeIn('slow'); else $('.back-to-top').fadeOut('slow'); });
    $('.back-to-top').click(function () { $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo'); return false; });
    $('[data-toggle="counter-up"]').counterUp({delay: 10, time: 2000});
    $(".courses-carousel").owlCarousel({autoplay:true,smartSpeed:1500,loop:true,dots:false,nav:false,responsive:{0:{items:1},576:{items:2},768:{items:3},992:{items:4}}});
    $(".team-carousel").owlCarousel({autoplay:true,smartSpeed:1000,margin:30,dots:false,loop:true,nav:true,navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],responsive:{0:{items:1},576:{items:1},768:{items:2},992:{items:3}}});
    $(".testimonial-carousel").owlCarousel({autoplay:true,smartSpeed:1500,items:1,dots:false,loop:true,nav:true,navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']});
    $(".related-carousel").owlCarousel({autoplay:true,smartSpeed:1000,margin:30,dots:false,loop:true,nav:true,navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],responsive:{0:{items:1},576:{items:1},768:{items:2}}});
})(jQuery);
