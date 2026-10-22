(function ($) {
    "use strict";

    // ========== PRELOADER ==========
    $(window).on('load', function () {
        setTimeout(function () {
            $('#preloader').addClass('hidden');
        }, 600);
    });

    // Fallback: hide preloader after 3 seconds max
    setTimeout(function () {
        $('#preloader').addClass('hidden');
    }, 3000);

    // ========== NAVBAR SCROLL EFFECT ==========
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();

        if (scrollTop > 50) {
            $('#mainNavbar').addClass('scrolled sticky-top');
        } else {
            $('#mainNavbar').removeClass('scrolled sticky-top');
        }

        // Back to top button
        $('.back-to-top').toggleClass('show', scrollTop > 300);
    });

    // ========== SMOOTH SCROLL ==========
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1200, 'easeInOutExpo');
        return false;
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutExpo');
        }
    });

    // ========== DROPDOWN ON MOUSE HOVER ==========
    $(document).ready(function () {
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

    // ========== SCROLL REVEAL ANIMATIONS ==========
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        if (!reveals.length) return;

        if (!('IntersectionObserver' in window)) {
            reveals.forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px 50px 0px'
        });

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ========== ANIMATED COUNTERS ==========
    function animateCounters() {
        var counters = document.querySelectorAll('.counter');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var counter = entry.target;
                    var target = parseInt(counter.getAttribute('data-target'));
                    var duration = 2000;
                    var start = 0;
                    var startTime = null;

                    function updateCounter(timestamp) {
                        if (!startTime) startTime = timestamp;
                        var progress = Math.min((timestamp - startTime) / duration, 1);

                        // Ease out cubic
                        var easeProgress = 1 - Math.pow(1 - progress, 3);
                        var current = Math.floor(easeProgress * target);

                        counter.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(function (counter) {
            observer.observe(counter);
        });
    }

    // ========== PARALLAX SCROLL EFFECT ==========
    // Slight parallax on carousel images
    function initParallax() {
        $(window).on('scroll', function() {
            if ($(window).width() < 768) return;
            var scrolled = $(this).scrollTop();
            var carouselImg = $('.carousel-item.active img');
            if (carouselImg.length && scrolled < 800) {
                carouselImg.css('transform', 'translateY(' + (scrolled * 0.3) + 'px) scale(1.1)');
            }
        });
    }

    // ========== TESTIMONIALS CAROUSEL ==========
    if ($.fn.owlCarousel && $('.testimonial-carousel').length) {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
            ],
        });
    }

    // ========== NAVBAR ACTIVE STATE ==========
    function updateActiveNav() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        $('.navbar-nav .nav-link').each(function () {
            var href = $(this).attr('href');
            if (href === currentPage) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }

    // ========== MOBILE MENU CLOSE ON CLICK ==========
    $('.navbar-nav .nav-link:not(.dropdown-toggle), .navbar-nav .dropdown-item').on('click', function () {
        if ($(window).width() < 992) {
            var collapseEl = document.getElementById('navbarCollapse');
            if (collapseEl && collapseEl.classList.contains('show')) {
                var instance = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
                instance.hide();
            }
        }
    });

    // ========== INITIALIZE ==========
    $(document).ready(function () {
        revealOnScroll();
        animateCounters();
        initParallax();
        updateActiveNav();
    });

})(jQuery);
