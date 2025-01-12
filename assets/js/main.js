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
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase);



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

  // client slider 
  if ('.client-slider-active') {
    var client_slider_active = new Swiper(".client-slider-active", {
      slidesPerView: 'auto',
      loop: true,
      autoplay: true,
      spaceBetween: 0,
      speed: 5000,
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
        scrub: true
      }
    });
  }

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

  // moving testimonial 
  if (document.querySelectorAll(".moving-testimonial").length > 0) {
    mm.add("(min-width: 768px)", () => {
      const e = document.querySelector(".moving-testimonial"),
        t = e.querySelector(".pin"),
        o = e.querySelectorAll(".card");
      ScrollTrigger.create({ trigger: t, start: "top top", end: "bottom bottom", pin: !0, pinSpacing: !1, scrub: !0 }), gsap.set(o, { yPercent: 50, y: 0.5 * window.innerHeight + 1 });
      const n = gsap.timeline({ paused: !0, scrollTrigger: { trigger: e, start: "top top", end: "bottom bottom", scrub: !0 } });
      n.to(o, { yPercent: -50, y: -0.5 * window.innerHeight, duration: 1, stagger: -0.12, ease: CustomEase.create("custom", "M0,0 C0,0 0.098,0.613 0.5,0.5 0.899,0.386 1,1 1,1") }, "sameStep"),
        n.to(o, { rotation: () => 20 * (Math.random() - 0.5), stagger: -0.12, duration: 0.5, ease: "power3.out" }, "sameStep"),
        n.to(o, { rotation: 0, stagger: -0.12, duration: 0.5, ease: "power3.in" }, "sameStep+=0.5");
    });
  }

  // capability hover active 
  if (document.querySelectorAll(".capability-hover-active").length > 0) {
    $('.capability-hover-active .capability-box').on("mouseover", function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
  }



  // video start
  mm.add("(min-width: 1200px)", () => {

    if (document.querySelectorAll(".hero-area").length > 0) {
      const removeWordElement = document.querySelector(".remove-word");
      var ab2 = gsap.timeline({
        duration: 5,
        scrollTrigger: {
          trigger: ".hero-area",
          pin: false,
          pinSpacing: true,
          scrub: 2,
          start: "top center",
          end: "bottom 0%",
          markers: true,

        },
      });

      ab2.to(".big-text-wrapper .big-text", {
        scale: 0.1,
        // fontSize: "120px",
        // y: "40%",
        color: "black",
        duration: 2,
        start: "top top",
        transformOrigin: "bottom center",
        ease: "power1.inOut",
        pin: true,
        pinSpacing: false,
        scrub: 2,
        scrollTrigger: ".hero-area",

      });

      ab2.to(
        ".gap",
        {
          minWidth: "1300px",
          duration: 1.5,
          ease: "power1.inOut",
        },
        ">"
      );
      ab2.to(
        ".remove-word",
        {
          x: "-100%",
          opacity: 0,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "start"
      );

      ab2.to(
        ".big-video",
        {
          visibility: "visible",
          x: "0%",
          minHeight: "20px",
          opacity: 1,
          duration: 1.5,
          ease: "power1.inOut",
          width: "85vw",
          height: "680px",
          minHeight: "680px"
        },
        "start"
      );

      ab2.to(".about-area", {
        scrollTrigger: {
          trigger: ".about-area",
          start: "bottom bottom",
          end: "bottom top",
          pin: ".about-area",
          pinSpacing: true,
          scrub: 1,
          markers: true,
        },
      });

      ab2.to(".big-text-wrapper", {
        scrollTrigger: {
          trigger: ".about-area",
          start: "bottom bottom",
          end: "bottom top",
          pin: ".big-text-wrapper",
          pinSpacing: false,
          scrub: 1,
          markers: true,
        },
      });

      gsap.to([".about-area .text-wrapper", ".about-area .btn-wrapper"], {
        y: "0",
        delay: 2,
        opacity: 1,
        scrollTrigger: {
          trigger: ".about-area",
          start: "top center",
          end: "center+=50 center",
          scrub: 1,

        },
      });

      gsap.to(".big-video", {
        scale: 13.2,
        delay: 3,
        // height: "100vh",
        transformOrigin: "top center",
        borderRadius: "0",
        scrollTrigger: {
          trigger: ".about-area .btn-wrapper",
          start: "top center",
          end: "bottom +=100",
          scrub: 3,
        },
      });
    }
  });
  // video end

  // video start
  // mm.add("(min-width: 1200px)", () => {

  //   if (document.querySelectorAll(".hero-area").length > 0) {
  //     const removeWordElement = document.querySelector(".remove-word");
  //     var ab2 = gsap.timeline({
  //       duration: 5,
  //       scrollTrigger: {
  //         trigger: ".hero-area",
  //         pin: false,
  //         pinSpacing: false,
  //         scrub: 2,
  //         start: "top 20%",
  //         end: "bottom 0%",

  //       },
  //     });

  //     ab2.to(".big-text-wrapper .big-text", {
  //       scale: 0.09,
  //       y: "74%",
  //       color: "black",
  //       duration: 2,
  //       ease: "power1.inOut",
  //     });

  //     ab2.to(
  //       ".gap",
  //       {
  //         minWidth: "2000px",
  //         duration: 1.5,
  //         ease: "power1.inOut",
  //       },
  //       ">"
  //     );
  //     ab2.to(
  //       ".remove-word",
  //       {
  //         x: "-100%",
  //         opacity: 0,
  //         duration: 1.5,
  //         ease: "power1.inOut",
  //       },
  //       "start"
  //     );

  //     ab2.to(
  //       ".big-video",
  //       {
  //         visibility: "visible",
  //         x: "0%",
  //         minHeight: "20px",
  //         opacity: 1,
  //         duration: 1.5,
  //         ease: "power1.inOut",
  //         width: "100vw",
  //         height: "680px",
  //         minHeight: "680px"
  //       },
  //       "start"
  //     );

  //     ab2.to(".about-area", {
  //       scrollTrigger: {
  //         trigger: ".about-area",
  //         start: "bottom bottom",
  //         end: "bottom top",
  //         pin: ".about-area",
  //         pinSpacing: true,
  //         scrub: 1,
  //       },
  //     });

  //     ab2.to(".big-text-wrapper", {
  //       scrollTrigger: {
  //         trigger: ".about-area",
  //         start: "bottom bottom",
  //         end: "bottom top",
  //         pin: ".big-text-wrapper",
  //         pinSpacing: false,
  //         scrub: 1,
  //       },
  //     });

  //     gsap.to([".about-area .text-wrapper", ".about-area .btn-wrapper"], {
  //       y: "0",
  //       delay: 2,
  //       opacity: 1,
  //       scrollTrigger: {
  //         trigger: ".about-area",
  //         start: "center center",
  //         end: "center+=50 center",
  //         scrub: 1,
  //       },
  //     });

  //     gsap.to(".big-video", {
  //       scale: 12,
  //       delay: 3,
  //       height: "100vh",
  //       transformOrigin: "top center",
  //       borderRadius: "0",
  //       scrollTrigger: {
  //         trigger: ".about-area .btn-wrapper",
  //         start: "bottom center",
  //         end: "bottom 0",
  //         scrub: 3,
  //       },
  //     });
  //   }
  // });
  // video end

  // text-animation start
  mm.add("(min-width: 1200px)", () => {

    if (document.querySelectorAll(".about-area-2").length > 0) {
      var ab2 = gsap.timeline();

      ab2.to(".year-since", {
        right: "0",
        scrollTrigger: {
          trigger: ".about-area-2 .section-content",
          pin: ".about-area-2",
          pinSpacing: true,
          start: "top top",
          endTrigger: ".about-area-2 .year-wrapper",
          end: "bottom top",
          scrub: 3,
        },
      });

      ab2.to(".year-since .last-text", {
        scale: 0.05,
        right: "0",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: ".about-area-2 .year-wrapper",
          start: "bottom top",
          end: "bottom+=770 top",
          pin: ".year-since .last-text",
          pinSpacing: true,
          scrub: 3,
        },
      });

      ab2.to([".about-area-2 .text-wrapper", ".about-area-2 .btn-wrapper"], {
        x: "100", // Move 100px to the right
        opacity: 0,
        scrollTrigger: {
          trigger: ".about-area-2 .last-text",
          start: "top top",
          end: "bottom center",
          scrub: 3,
        },
      });
    }
  });
  // text-animation end


  // service-area-2 text and bg animation start

  if (document.querySelectorAll(".actually-area").length > 0) {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".actually-area",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        start: "top 10%",
        end: "bottom 0",
        markers: true,
      }
    })
      .fromTo(".actually-area .bg-area",
        { scale: 0 },
        {
          scale: 10,
          duration: 2,
          ease: "power4.inOut"
        }
      );
  }
  // service-area-2 text and bg animation end


  // work-area-2 box animation start
  document.addEventListener("DOMContentLoaded", function () {
    const workBoxes = document.querySelectorAll(".work-box");
    gsap.fromTo(
      workBoxes,
      {
        opacity: 0,
        scale: 0.8,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          each: 0.2,
          from: "random",
        },
        scrollTrigger: {
          trigger: ".works-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: false,
        },
      }
    );
  });
  // work-area-2 box animation end

  //image animation in hero start
  const hoverItems = document.querySelectorAll(".text-underline");
  function moveImage(e, hoverItem, index) {
    const item = hoverItem.getBoundingClientRect();
    const x = e.clientX - item.left;
    const y = e.clientY - item.top;
    if (hoverItem.children[index]) {
      hoverItem.children[index].style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  hoverItems.forEach((item, i) => {
    const image = item.querySelector(".hover-image");

    item.addEventListener("mousemove", (e) => {
      moveImage(e, item, 0);
    });

    item.addEventListener("mouseenter", () => {
      if (image) {
        image.style.opacity = 1;
      }
    });

    item.addEventListener("mouseleave", () => {
      if (image) {
        image.style.opacity = 0;
        image.style.transform = "translate(0, 0)";
      }
    });
  });
  //image animation in hero end


  //Client Pin Active
  var pin_fixed = document.querySelector('.client-pin-element');
  if (pin_fixed && device_width > 0) {

    gsap.to(".client-pin-element", {
      scrollTrigger: {
        trigger: ".client-pin-element",
        pin: ".client-pin-element",
        start: "bottom bottom",
        endTrigger: ".client-pin-area",
        end: "bottom bottom",
        pinSpacing: false,
      }
    });
  }

  // about 3 thumb animation 
  let about_3_thumb_anim = document.querySelector(".about_3__thumb-anim")
  if (about_3_thumb_anim) {
    let about_3_thumb_1 = document.querySelector(".thumb-1")
    let about_3_thumb_2 = document.querySelector(".thumb-2")
    let about_3_thumb_3 = document.querySelector(".thumb-3")
    let about_3_thumb_4 = document.querySelector(".thumb-4")

    gsap.to(about_3_thumb_1, {
      xPercent: -26,
      yPercent: 0,
      scrollTrigger: {
        trigger: about_3_thumb_anim,
        start: "top bottom",
        end: "bottom center",
        pinSpacing: false,
        scrub: true
      }
    })

    gsap.to(about_3_thumb_2, {
      xPercent: 0,
      yPercent: 10,
      scrollTrigger: {
        trigger: about_3_thumb_anim,
        start: "top bottom",
        end: "bottom center",
        pinSpacing: false,
        scrub: true
      }
    })

    gsap.to(about_3_thumb_3, {
      xPercent: 30,
      yPercent: 0,
      scrollTrigger: {
        trigger: about_3_thumb_anim,
        start: "top bottom",
        end: "bottom center",
        pinSpacing: false,
        scrub: true
      }
    })
    gsap.to(about_3_thumb_4, {
      xPercent: -172,
      yPercent: 34,
      scrollTrigger: {
        trigger: about_3_thumb_anim,
        start: "top bottom",
        end: "bottom center",
        pinSpacing: false,
        scrub: true
      }
    })

  }



})(jQuery);