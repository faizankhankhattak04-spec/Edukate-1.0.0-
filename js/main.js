(function ($) {
    "use strict";

    var SPEAKO_WECHAT = "18969190005";
    var SPEAKO_PHONE = "+86 18969190005";
    var SPEAKO_EMAIL = "speakup521@gmail.com";

    function isTeacherPage() {
        return window.location.pathname.indexOf("/teachers/") !== -1;
    }

    function rootPath() {
        return isTeacherPage() ? "../" : "";
    }

    function logoPath() {
        return rootPath() + "img/speako-logo.webp";
    }

    function pagePath(file) {
        return rootPath() + file;
    }

    function applySpeakONavigation() {
        var currentPage = window.location.pathname.split("/").pop() || "index.html";
        var topbar =
            '<div class="container-fluid bg-dark speako-topbar">' +
                '<div class="row py-2 px-lg-5"><div class="col-12 text-center text-lg-left">' +
                    '<div class="d-inline-flex align-items-center text-white flex-wrap justify-content-center justify-content-lg-start">' +
                        '<small><i class="fa fa-phone-alt mr-2" aria-hidden="true"></i>' + SPEAKO_PHONE + '</small>' +
                        '<small class="px-3">|</small>' +
                        '<small><i class="fab fa-weixin mr-2" aria-hidden="true"></i>WeChat: ' + SPEAKO_WECHAT + '</small>' +
                        '<small class="px-3 d-none d-md-inline">|</small>' +
                        '<small class="d-none d-md-inline"><i class="fa fa-envelope mr-2" aria-hidden="true"></i>' + SPEAKO_EMAIL + '</small>' +
                    '</div>' +
                '</div></div>' +
            '</div>';

        var links = [
            ["index.html", "Home"], ["about.html", "About"], ["course.html", "Courses"],
            ["team.html", "Teachers"], ["pricing.html", "Pricing"], ["faq.html", "FAQ"], ["contact.html", "Contact"]
        ];

        var navLinks = links.map(function (link) {
            var active = currentPage === link[0] ? " active" : "";
            return '<a href="' + pagePath(link[0]) + '" class="nav-item nav-link' + active + '">' + link[1] + '</a>';
        }).join("");

        var navbar =
            '<nav class="navbar navbar-expand-lg bg-white navbar-light py-3 px-lg-5 speako-nav" aria-label="Main navigation">' +
                '<a href="' + pagePath("index.html") + '" class="navbar-brand speako-logo" aria-label="SpeakO home">' +
                    '<img src="' + logoPath() + '" alt="SpeakO" class="speako-site-logo" style="height:56px;width:auto;max-width:190px;object-fit:contain;display:block;">' +
                '</a>' +
                '<button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Open navigation"><span class="navbar-toggler-icon"></span></button>' +
                '<div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">' +
                    '<div class="navbar-nav mx-auto py-2 py-lg-0">' + navLinks + '</div>' +
                    '<a href="' + pagePath("contact.html#trial") + '" class="btn btn-primary py-2 px-4 d-none d-lg-block">Book ¥20 Trial</a>' +
                '</div>' +
            '</nav>';

        var existingTopbar = document.querySelector(".container-fluid.bg-dark");
        if (existingTopbar) existingTopbar.outerHTML = topbar;

        var existingNavbar = document.querySelector("nav.navbar");
        if (existingNavbar) existingNavbar.outerHTML = navbar;
    }

    function replaceLegacyContactText() {
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        var node;
        while ((node = walker.nextNode())) {
            node.nodeValue = node.nodeValue
                .replace(/SHAH1122-COM/g, SPEAKO_WECHAT)
                .replace(/19819208727/g, "18969190005");
        }

        document.querySelectorAll("a[href^=\"tel:\"]").forEach(function (el) {
            el.href = "tel:+8618969190005";
        });

        document.querySelectorAll("a[href*='19819208727']").forEach(function (el) {
            el.href = el.href.replace(/19819208727/g, "18969190005");
        });

        var wechatField = document.getElementById("wechatId");
        if (wechatField) wechatField.textContent = SPEAKO_WECHAT;
    }

    function updateStructuredData() {
        document.querySelectorAll('script[type="application/ld+json"]').forEach(function (script) {
            try {
                var data = JSON.parse(script.textContent);
                if (data && (data.telephone || data["@type"] === "EducationalOrganization")) {
                    data.telephone = SPEAKO_PHONE;
                    data.email = SPEAKO_EMAIL;
                    script.textContent = JSON.stringify(data);
                }
            } catch (e) {}
        });
    }

    function ensureLogoImages() {
        document.querySelectorAll(".navbar-brand").forEach(function (brand) {
            brand.innerHTML = '<img src="' + logoPath() + '" alt="SpeakO" class="speako-site-logo" style="height:56px;width:auto;max-width:190px;object-fit:contain;display:block;">';
            brand.href = pagePath("index.html");
            brand.setAttribute("aria-label", "SpeakO home");
        });
    }

    $(document).ready(function () {
        applySpeakONavigation();
        replaceLegacyContactText();
        updateStructuredData();
        ensureLogoImages();

        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $(".navbar .dropdown").on("mouseover", function () { $(".dropdown-toggle", this).trigger("click"); })
                    .on("mouseout", function () { $(".dropdown-toggle", this).trigger("click").blur(); });
            } else {
                $(".navbar .dropdown").off("mouseover").off("mouseout");
            }
        }

        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) $(".back-to-top").fadeIn("slow");
            else $(".back-to-top").fadeOut("slow");
        });

        $(".back-to-top").click(function () {
            $("html, body").animate({scrollTop: 0}, 1500, "easeInOutExpo");
            return false;
        });

        if ($.fn.counterUp) $("[data-toggle='counter-up']").counterUp({delay: 10, time: 2000});
        if ($.fn.owlCarousel) {
            $(".courses-carousel").owlCarousel({autoplay:true,smartSpeed:1500,loop:true,dots:false,nav:false,responsive:{0:{items:1},576:{items:2},768:{items:3},992:{items:4}}});
            $(".team-carousel").owlCarousel({autoplay:true,smartSpeed:1000,margin:30,dots:false,loop:true,nav:true,navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],responsive:{0:{items:1},576:{items:1},768:{items:2},992:{items:3}}});
            $(".testimonial-carousel").owlCarousel({autoplay:true,smartSpeed:1500,items:1,dots:false,loop:true,nav:true,navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']});
            $(".related-carousel").owlCarousel({autoplay:true,smartSpeed:1000,margin:30,dots:false,loop:true,nav:true,navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],responsive:{0:{items:1},576:{items:1},768:{items:2}}});
        }
    });
})(jQuery);
