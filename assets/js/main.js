/***************************************************
==================== JS INDEX ======================
****************************************************

// sticky header 
// Smooth active
// Preloader
// Side Info Js
// meanmenu activation 
// Register GSAP Plugins
// Counter active
// testimonial slider



****************************************************/

(function ($) {
  "use strict";


  // sticky header 
  if (document.querySelectorAll(".header-sticky").length > 0) {
    let header = document.querySelector('.header-sticky');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        header.classList.add('sticky')
      } else {
        header.classList.remove('sticky')
      }
    })
  }



  // Smooth active
  var device_width = window.screen.width;

  if (device_width > 767) {
    if (document.querySelector("#has_smooth").classList.contains("has-smooth")) {
      const smoother = ScrollSmoother.create({
        smooth: 0.5,
        effects: device_width < 1025 ? false : true,
        smoothTouch: 0.1,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });
    }

  }


  // Preloader
  $(document).ready(function () {
    $('#container').addClass('loaded');
    if ($('#container').hasClass('loaded')) {
      $('#preloader').delay(1000).queue(function () {
        $(this).remove();
      });
    }
  });


  // Side Info Js
  $(".side-info-close,.offcanvas-overlay").on("click", function () {
    $(".side-info").removeClass("info-open");
    $(".offcanvas-overlay").removeClass("overlay-open");
  });
  $(".side-toggle").on("click", function () {
    $(".side-info").addClass("info-open");
    $(".offcanvas-overlay").addClass("overlay-open");
  });


  // meanmenu activation 
  $('.main-menu').meanmenu({
    meanScreenWidth: "1199",
    meanMenuContainer: '.mobile-menu',
    meanMenuCloseSize: '28px',
  });


  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);



  // Counter active
  if ('counterUp' in window) {
    const skill_counter = window.counterUp.default
    const skill_cb = entries => {

      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting && !el.classList.contains('is-visible')) {
          skill_counter(el, {
            duration: 1500,
            delay: 16,
          })
          el.classList.add('is-visible')
        }
      })
    }

    const IO = new IntersectionObserver(skill_cb, {
      threshold: 1
    })

    const els = document.querySelectorAll('.t-counter');
    els.forEach((el) => {
      IO.observe(el)
    });
  }


  // testimonial slider
  if (('.testimonial-slider').length) {
    var testimonial_slider = new Swiper(".testimonial-slider", {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 100,
      speed: 1800,
      watchSlidesProgress: true,
      navigation: {
        prevEl: ".testimonial-button-prev",
        nextEl: ".testimonial-button-next",
      },
      pagination: {
        el: '.testimonial-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        // when window width is >= px
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 1,
        },
        1201: {
          slidesPerView: 1,
        },
        1367: {
          slidesPerView: 1,
        },
      }
    });
  }

  // text slider 
  if ('.text-slider-active') {
    var text_slider_active = new Swiper(".text-slider-active", {
      slidesPerView: 'auto',
      loop: true,
      autoplay: true,
      spaceBetween: 35,
      speed: 10000,
      autoplay: {
        delay: 1,
      },
    });
  }


  // GSAP Fade Animation 
  let fadeArray_items = document.querySelectorAll(".fade-anim");
  if (fadeArray_items.length > 0) {
    const fadeArray = gsap.utils.toArray(".fade-anim")
    // gsap.set(fadeArray, {opacity:0})
    fadeArray.forEach((item, i) => {

      var fade_direction = "bottom"
      var onscroll_value = 1
      var duration_value = 1.15
      var fade_offset = 50
      var delay_value = 0.15
      var ease_value = "power2.out"

      if (item.getAttribute("data-offset")) {
        fade_offset = item.getAttribute("data-offset");
      }
      if (item.getAttribute("data-duration")) {
        duration_value = item.getAttribute("data-duration");
      }

      if (item.getAttribute("data-direction")) {
        fade_direction = item.getAttribute("data-direction");
      }
      if (item.getAttribute("data-on-scroll")) {
        onscroll_value = item.getAttribute("data-on-scroll");
      }
      if (item.getAttribute("data-delay")) {
        delay_value = item.getAttribute("data-delay");
      }
      if (item.getAttribute("data-ease")) {
        ease_value = item.getAttribute("data-ease");
      }

      let animation_settings = {
        opacity: 0,
        ease: ease_value,
        duration: duration_value,
        delay: delay_value,
      }

      if (fade_direction == "top") {
        animation_settings['y'] = -fade_offset
      }
      if (fade_direction == "left") {
        animation_settings['x'] = -fade_offset;
      }

      if (fade_direction == "bottom") {
        animation_settings['y'] = fade_offset;
      }

      if (fade_direction == "right") {
        animation_settings['x'] = fade_offset;
      }

      if (onscroll_value == 1) {
        animation_settings['scrollTrigger'] = {
          trigger: item,
          start: 'top 85%',
        }
      }
      gsap.from(item, animation_settings);
    })
  }



  // Text Invert With Scroll 
  const split = new SplitText(".text-invert", { type: "lines" });

  split.lines.forEach((target) => {
    gsap.to(target, {
      backgroundPositionX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        scrub: 1,
        start: 'top 85%',
        end: "bottom center",
      }
    });
  });



  let mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {

    // Pin Active
    var pin_fixed = document.querySelector('.pin-element');
    if (pin_fixed && device_width > 991) {

      gsap.to(".pin-element", {
        scrollTrigger: {
          trigger: ".pin-area",
          pin: ".pin-element",
          start: "top top",
          end: "bottom bottom",
          pinSpacing: false,
        }
      });
    }


    // grow animation 
    var grow = document.querySelectorAll(".grow");

    grow.forEach((item) => {
      gsap.to(item, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: item,
          scrub: 1,
          start: 'top 90%',
          end: "top center",
          // markers: true
        }
      });
    });

  });

  if (document.querySelectorAll(".cta-area").length > 0) {
    var tl = gsap.timeline({
      ease: "none",
      scrollTrigger: {
        trigger: ".cta-area",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        start: 'bottom 100%',
        end: "bottom 0%",
        // markers: true
      }
    });
    tl.to(".cta-area .area-bg", { scale: "10", delay: 0.1 });
    tl.to(".cta-area .section-title", { fontSize: "18vw" }, "<");
  }


  // hover reveal start
  const hoverText = document.querySelectorAll(".hover-reveal");
  function moveText(e, hoverText) {
    const item = hoverText.getBoundingClientRect();
    const x = e.clientX - item.x;
    const y = e.clientY - item.y;
    if (hoverText.children[0]) {
      hoverText.children[0].style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  hoverText.forEach((item, i) => {
    item.addEventListener("mousemove", (e) => {
      setInterval(moveText(e, item), 100);
    });
  });
  // hover reveal end



  if (document.querySelectorAll(".circular-shape-wrapper").length > 0) {
    var cs = gsap.timeline({
      ease: "none",
      scrollTrigger: {
        trigger: ".circular-shape-wrapper",
        start: "bottom bottom",
        end: "bottom top",
        pin: true,
        scrub: 1,
        // markers: true
      }
    })
    cs.to(".shape-thumb img", { scale: 100, rotation: 90, autoAlpha: 1, delay: 0.1 })
  }






  if (document.querySelectorAll(".funfact-area-2").length > 0) {
    gsap.to(".funfact-area-2 .thumb img", {
      scale: "1",
      scrollTrigger: {
        trigger: ".funfact-area-2 .thumb",
        start: "top top",
        end: "center top",
        pin: true,
        // markers: true,
        scrub: 1
      }
    })
  }




  // go-visible animation 
  if (document.querySelectorAll(".go-visible").length > 0) {

    var govisible = document.querySelectorAll(".go-visible");

    govisible.forEach((item) => {
      gsap.to(item, {
        opacity: "1",
        ease: "none",
        scrollTrigger: {
          trigger: item,
          scrub: 1,
          start: 'top 40%',
          end: "top 30%",
          // markers: true
        }
      });
    });
  }

  // video Active
  var video_fixed = document.querySelector('.video-element');
  // gsap.set(video_fixed, { width: "unset" });
  if (video_fixed && device_width > 991) {
    gsap.to(".video-element", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0",
      scrollTrigger: {
        trigger: ".video-area",
        start: "top top",
        end: "bottom bottom",
        pin: ".video-element",
        pinSpacing: false,
        markers: true,
        scrub: true
      }
    });
  }

  if (document.querySelectorAll(".about-area-2").length > 0) {
    var ab2 = gsap.timeline()
      .to(".year-since", {
        right: "0",
        scrollTrigger: {
          trigger: ".about-area-2 .section-content",
          pin: ".about-area-2",
          pinSpacing: true,
          start: "top top",
          endTrigger: ".about-area-2 .year-wrapper",
          end: "bottom top",
          scrub: 3,
          markers: { startColor: "red", endColor: "red", indent: 200 },
        },
      })
      .to(".year-since .last-text", {
        delay: "2",
        scrollTrigger: {
          trigger: ".about-area-2 .year-wrapper",
          pin: ".year-since .last-text",
          pinSpacing: true,
          start: "bottom top",
          endTrigger: ".work-area-2",
          end: "top top",
          markers: { startColor: "green", endColor: "green", indent: 100 },
        },
      })
      .to(".year-since .last-text", {
        fontSize: 30,
        letterSpacing: "-0.1em",
        scrollTrigger: {
          trigger: ".about-area-2",
          start: "bottom top",
          end: "bottom+=215 top",
          pin: ".year-since .last-text",
          pinSpacing: true,
          scrub: 1,
          markers: { startColor: "blue", endColor: "blue", indent: 0 },
        },
      })
  };



  // Horizontal Gallery
  const panelsSections = gsap.utils.toArray(".panels");
  for (var i = 0; i < panelsSections.length; i++) {

    var thePanelsSection = panelsSections[i];
    const panels = gsap.utils.toArray(".panels-container .panel", thePanelsSection);
    const panelsContainer = thePanelsSection.querySelector(".panels-container");

    gsap.set(panelsContainer, { height: window.innerHeight });
    gsap.set(panels, { height: window.innerHeight });

    var totalPanelsWidth = 0;
    panels.forEach(function (panel) {
      totalPanelsWidth += $(panel).width();
    });

    gsap.set(panelsContainer, { width: totalPanelsWidth });
    gsap.to(panels, {
      x: - totalPanelsWidth + innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: panelsContainer,
        pin: true,
        start: "top top",
        scrub: 1,
        end: (st) => "+=" + (st.vars.trigger.offsetWidth - innerWidth),
        // markers: true,
      }
    });


  }


  // Moving Gallery		
  gsap.utils.toArray('.moving-gallery').forEach((section, index) => {
    const w = section.querySelector('.wrapper-gallery');
    const [x, xEnd] = (index % 2) ? [(section.offsetWidth - w.scrollWidth), 0] : [0, section.offsetWidth - w.scrollWidth];
    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: 0.5,
      }
    });
  });





})(jQuery);