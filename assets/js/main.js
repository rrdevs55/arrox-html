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

  var windowOn = $(window);

  /*======================================
Data Css js
========================================*/
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url( " + $(this).attr("data-background") + "  )"
    );
  });

  //  sticky header
  function pinned_header() {
    var lastScrollTop = 0;

    windowOn.on('scroll', function () {
      var currentScrollTop = $(this).scrollTop();
      if (currentScrollTop > lastScrollTop) {
        $('.header-sticky').removeClass('sticky');
        $('.header-sticky').addClass('transformed');
      } else if ($(this).scrollTop() <= 500) {
        $('.header-sticky').removeClass('sticky');
        $('.header-sticky').removeClass('transformed');
      } else {
        // Scrolling up, remove the class
        $('.header-sticky').addClass('sticky');
        $('.header-sticky').removeClass('transformed');
      }
      lastScrollTop = currentScrollTop;
    });
  }
  pinned_header();

  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase);

  // Smooth active
  var device_width = window.screen.width;

  if (device_width > 767) {
    if (document.querySelector("#has_smooth").classList.contains("has-smooth")) {
      const smoother = ScrollSmoother.create({
        smooth: 0.9,
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

  // Magnific Video popup
  if ($('.video-popup').length && 'magnificPopup' in jQuery) {
    $('.video-popup').magnificPopup({
      type: 'iframe',
    });
  }


  // Image Reveal Animation
  let img_anim_reveal = document.querySelectorAll(".img_anim_reveal");

  img_anim_reveal.forEach((img_reveal) => {
    let image = img_reveal.querySelector("img");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: img_reveal,
        start: "top 50%",
      }
    });

    tl.set(img_reveal, { autoAlpha: 1 });
    tl.from(img_reveal, 1.5, {
      yPercent: -100,
      ease: Power2.out
    });
    tl.from(image, 1.5, {
      yPercent: 100,
      scale: 1.3,
      delay: -1.5,
      ease: Power2.out
    });
  });

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
      allowTouchMove: false,
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
      allowTouchMove: false,
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
          scrub: 2,
          start: 'top 90%',
          end: "top center",
        }
      });
    });



  });

  // go full width 
  var go_full = document.querySelectorAll(".go_full");
  go_full.forEach((item) => {
    gsap.set(item, {
      position: "relative",
      left: "50%",
      transform: "translate(-50%, 0)",
      width: "auto",
    });
    gsap.to(item, {
      width: "100vw",
      ease: "none",
      scrollTrigger: {
        trigger: item,
        scrub: 0,
        start: "top bottom",
        end: "bottom bottom",
        // markers: true
      }
    });
  });

  // scale animation 
  var scale = document.querySelectorAll(".scale");
  var image = document.querySelectorAll(".scale img");
  scale.forEach((item) => {
    gsap.to(item, {
      scale: 1,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: "bottom top",
        toggleActions: 'play reverse play reverse'
      }
    });
  });
  image.forEach((image) => {
    gsap.set(image, {
      scale: 1.3,
    });
    gsap.to(image, {
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: image,
        start: 'top bottom',
        end: "bottom top",
        toggleActions: 'play reverse play reverse'
      }
    });
  })

  // cta text animation 
  if (document.querySelectorAll(".cta-area").length > 0) {
    var tl = gsap.timeline({
      ease: "none",
      scrollTrigger: {
        trigger: ".cta-area",
        pin: true,
        pinSpacing: true,
        scrub: 2,
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
      backgroundColor: "#FCF7F3",
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
        end: "70% top",
        pin: true,
        scrub: 2,
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


  // Moving text		
  gsap.utils.toArray('.moving-text').forEach((section, index) => {
    const w = section.querySelector('.wrapper-text');
    const [x, xEnd] = (index % 2) ? [(section.offsetWidth - w.scrollWidth), 0] : [0, section.offsetWidth - w.scrollWidth];
    gsap.fromTo(w, { x }, {
      x: xEnd,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        scrub: 0.5,
        start: "20% bottom",
        end: "80% top",
      }
    });
  });


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
    mm.add("(min-width: 1200px)", () => {
      const e = document.querySelector(".moving-testimonial"),
        t = e.querySelector(".pin"),
        o = e.querySelectorAll(".card");
      ScrollTrigger.create({ trigger: t, start: "top top", end: "bottom center", pin: !0, pinSpacing: !1, scrub: !0 }), gsap.set(o, { yPercent: 50, y: 0.5 * window.innerHeight + 1 });
      const n = gsap.timeline({ paused: !0, scrollTrigger: { trigger: e, start: "top top", end: "bottom center", scrub: !0 } });
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
      var ab2 = gsap.timeline({
        duration: 5,
        scrollTrigger: {
          trigger: ".hero-area",
          scrub: 2,
          start: "top 100%",
          end: "bottom 0%",
          // markers: true,
        },
      });
      ab2.to(".big-text-wrapper .big-text", {
        scale: 0.1,
        color: "black",
        duration: 2,
        y: "76%",
        transformOrigin: "bottom center",
      });
      ab2.to(".about-area", {
        scrollTrigger: {
          trigger: ".about-area",
          start: "top 0",
          end: "bottom bottom",
          pin: ".about-area",
          pinSpacing: false,
          scrub: 1,
          // markers: true,
        },
      });
      ab2.to(".big-text-wrapper", {
        scrollTrigger: {
          trigger: ".about-area",
          start: "top top",
          end: "bottom bottom",
          pin: ".big-text-wrapper",
          pinSpacing: false,
          scrub: 1,
          // markers: true,
        },
      });
      gsap.to([".about-area .text-wrapper", ".about-area .btn-wrapper"], {
        y: "40",
        delay: 2,
        opacity: 1,
        scrollTrigger: {
          trigger: ".about-area",
          start: "top center",
          end: "center center",
          scrub: 1,

        },
      });
    }
  });
  // video end



  // text-animation start
  mm.add("(min-width: 1400px)", () => {

    if (document.querySelectorAll(".about-area-2").length > 0) {
      var ab2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-area-2 .section-content",
          pin: ".about-area-2",
          pinSpacing: false,
          start: "top top",
          end: "bottom",
          scrub: 0.2,
          // markers: true
        },
      });
      ab2.to(".year-since", {
        right: "0",
        ease: "power1.inOut",
        delay: 0.15,
        duration: 0.75,
      });
      ab2.to([".about-area-2 .text-wrapper", ".about-area-2 .btn-wrapper"], {
        x: "100",
        opacity: 0,
        duration: 0.25,
      }, "-=0.40");
      ab2.to(".is-fading", {
        opacity: 0,
        duration: 0.15,
      });
      ab2.to(".year-since .last-text", {
        fontSize: 30,
        lineHeight: "27px",
        letterSpacing: "-0.1em",
        position: "absolute",
        top: 0,
        right: 0,
        ease: "none",
        duration: 0.40,
      });
    }
  });
  // text-animation end

  // service-area-2 text and bg animation start
  if (document.querySelectorAll(".actually-area").length > 0) {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".actually-area",
        pin: true,
        scrub: 1,
        start: "top top",
        end: "bottom+=1500 top",
        // markers: true
      }
    });
    const t_line = new SplitText(".t_line", { type: "lines" });
    t_line.lines.forEach((target) => {
      tl.to(target, {
        backgroundPositionX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          scrub: 1,
          start: 'top 25%',
          end: "center 25%",
          // markers: true
        }
      });
    });
    tl.to(".actually-area .section-title", {
      scale: 40,
      opacity: 0,
      ease: "power4.inOut",
      delay: 0.35,
      duration: 0.75,
    });
    tl.to(".actually-area", {
      backgroundColor: "#111111",
      duration: 0.45,
    }, "-=0.50");
  }
  // service-area-2 text and bg animation end







  // work-area-2 box animation start
  if (document.querySelectorAll(".work-area-2").length > 0) {

    // document.addEventListener("DOMContentLoaded", function () {
    const workBoxes = document.querySelectorAll(".work-area-2 .work-box");
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
    // });
  }
  // work-area-2 box animation end

  if (document.querySelectorAll(".section-title").length > 0) {
    // Select the container and image elements
    const categoriesWrapper = document.querySelector('.section-title');
    const imageHover = document.querySelector('.image-hover');

    // Smooth mousemove for positioning
    categoriesWrapper.addEventListener('mousemove', (e) => {
      const { clientX: mouseX, clientY: mouseY } = e;

      // Use GSAP to position the image relative to the cursor
      gsap.to(imageHover, {
        x: mouseX,
        y: mouseY,
        xPercent: -50, // Center the image horizontally
        yPercent: -50, // Center the image vertically
        ease: 'power3.out',
        duration: 0.2,
      });
    });

    // GSAP hover animations for .text-underline elements
    gsap.utils.toArray('.text-underline').forEach((category) => {
      const label = category.dataset.label;

      category.addEventListener('mouseenter', () => {
        const targetImage = document.querySelector(`.image-hover[data-image="${label}"]`);

        gsap.to(targetImage, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.set(targetImage, { zIndex: 1 });
      });

      category.addEventListener('mouseleave', () => {
        const targetImage = document.querySelector(`.image-hover[data-image="${label}"]`);

        gsap.to(targetImage, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.set(targetImage, { zIndex: -1 });
      });
    });
  }


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


  //GSAP title animation
  if ($('.rr_title_anim').length > 0) {
    let splitTitleLines = gsap.utils.toArray(".rr_title_anim");
    splitTitleLines.forEach(splitTextLine => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: 'top 90%',
          end: 'bottom 60%',
          scrub: false,
          markers: false,
          toggleActions: 'play none none reverse'
        }
      });

      const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
      gsap.set(splitTextLine, { perspective: 400 });
      itemSplitted.split({ type: "lines" })
      tl.from(itemSplitted.lines, {
        duration: 1,
        delay: 0.3,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1
      });
    });
  }


  // Animation Word
  let animation_word_anim_items = document.querySelectorAll(".word-anim");

  animation_word_anim_items.forEach((word_anim_item) => {

    var stagger_value = 0.04
    var translateX_value = false
    var translateY_value = false
    var onscroll_value = 1
    var data_delay = 0.1
    var data_duration = 0.75

    if (word_anim_item.getAttribute("data-stagger")) {
      stagger_value = word_anim_item.getAttribute("data-stagger");
    }
    if (word_anim_item.getAttribute("data-translateX")) {
      translateX_value = word_anim_item.getAttribute("data-translateX");
    }

    if (word_anim_item.getAttribute("data-translateY")) {
      translateY_value = word_anim_item.getAttribute("data-translateY");
    }

    if (word_anim_item.getAttribute("data-on-scroll")) {
      onscroll_value = word_anim_item.getAttribute("data-on-scroll");
    }
    if (word_anim_item.getAttribute("data-delay")) {
      data_delay = word_anim_item.getAttribute("data-delay");
    }
    if (word_anim_item.getAttribute("data-duration")) {
      data_duration = word_anim_item.getAttribute("data-duration");
    }

    if (onscroll_value == 1) {
      if (translateX_value && !translateY_value) {
        let split_word = new SplitText(word_anim_item, {
          type: "chars, words"
        })
        gsap.from(split_word.words, {
          duration: data_duration,
          x: translateX_value,
          autoAlpha: 0,
          stagger: stagger_value,
          delay: data_delay,
          scrollTrigger: {
            trigger: word_anim_item,
            start: 'top 90%'
          }
        });
      }

      if (translateY_value && !translateX_value) {
        let split_word = new SplitText(word_anim_item, {
          type: "chars, words"
        })
        gsap.from(split_word.words, {
          duration: 1,
          delay: data_delay,
          y: translateY_value,
          autoAlpha: 0,
          stagger: stagger_value,
          scrollTrigger: {
            trigger: word_anim_item,
            start: 'top 90%'
          }
        });
      }

      if (translateY_value && translateX_value) {
        let split_word = new SplitText(word_anim_item, {
          type: "chars, words"
        })
        gsap.from(split_word.words, {
          duration: 1,
          delay: data_delay,
          x: translateX_value,
          y: translateY_value,
          autoAlpha: 0,
          stagger: stagger_value,
          scrollTrigger: {
            trigger: word_anim_item,
            start: 'top 90%'
          }
        });
      }

      if (!translateX_value && !translateY_value) {
        let split_word = new SplitText(word_anim_item, {
          type: "chars, words"
        })
        gsap.from(split_word.words, {
          duration: 1,
          delay: data_delay,
          x: 20,
          autoAlpha: 0,
          stagger: stagger_value,
          scrollTrigger: {
            trigger: word_anim_item,
            start: 'top 85%',
          }
        });
      }
    } else {
      if (translateX_value > 0 && !translateY_value) {
        let split_word = new SplitText(word_anim_item, {
          type: "chars, words"
        })
        gsap.from(split_word.words, {
          duration: 1,
          delay: data_delay,
          x: translateX_value,
          autoAlpha: 0,
          stagger: stagger_value
        });
      }

      if (translateY_value > 0 && !translateX_value) {
        let split_word = new SplitText(word_anim_item, {
          type: "chars, words"
        })
        gsap.from(split_word.words, {
          duration: 1,
          delay: data_delay,
          y: translateY_value,
          autoAlpha: 0,
          stagger: stagger_value
        });
      }

      if (translateY_value > 0 && translateX_value > 0) {
        let split_word = new SplitText(word_anim_item, {
          type: "chars, words"
        })
        gsap.from(split_word.words, {
          duration: 1,
          delay: data_delay,
          x: translateX_value,
          y: translateY_value,
          autoAlpha: 0,
          stagger: stagger_value
        });
      }

      if (!translateX_value && !translateY_value) {
        let split_word = new SplitText(word_anim_item, {
          type: "chars, words"
        })
        gsap.from(split_word.words, {
          duration: 1,
          delay: data_delay,
          x: 20,
          autoAlpha: 0,
          stagger: stagger_value
        });
      }

    }

  });

  // Full Character Setup 
  var animation_char_come_items = document.querySelectorAll(".char-anim")
  animation_char_come_items.forEach((item) => {

    var stagger_value = 0.05
    var translateX_value = 20
    var translateY_value = false
    var onscroll_value = 1
    var data_delay = 0.1
    var data_duration = 1
    var ease_value = "power2.out"

    if (item.getAttribute("data-stagger")) {
      stagger_value = item.getAttribute("data-stagger");
    }
    if (item.getAttribute("data-translateX")) {
      translateX_value = item.getAttribute("data-translateX");
    }
    if (item.getAttribute("data-translateY")) {
      translateY_value = item.getAttribute("data-translateY");
    }
    if (item.getAttribute("data-on-scroll")) {
      onscroll_value = item.getAttribute("data-on-scroll");
    }
    if (item.getAttribute("data-delay")) {
      data_delay = item.getAttribute("data-delay");
    }
    if (item.getAttribute("data-ease")) {
      ease_value = item.getAttribute("data-ease");
    }
    if (item.getAttribute("data-duration")) {
      data_duration = item.getAttribute("data-duration");
    }

    if (onscroll_value == 1) {
      if (translateX_value > 0 && !translateY_value) {
        let split_char = new SplitText(item, {
          type: "chars, words"
        });
        gsap.from(split_char.chars, {
          duration: data_duration,
          delay: data_delay,
          x: translateX_value,
          autoAlpha: 0,
          stagger: stagger_value,
          ease: ease_value,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        });
      }
      if (translateY_value > 0 && !translateX_value) {
        let split_char = new SplitText(item, {
          type: "chars, words"
        });
        gsap.from(split_char.chars, {
          duration: data_duration,
          delay: data_delay,
          y: translateY_value,
          autoAlpha: 0,
          ease: ease_value,
          stagger: stagger_value,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        });
      }
      if (translateX_value && translateY_value) {
        let split_char = new SplitText(item, {
          type: "chars, words"
        });
        gsap.from(split_char.chars, {
          duration: 2,
          delay: data_delay,
          y: translateY_value,
          x: translateX_value,
          autoAlpha: 0,
          ease: ease_value,
          stagger: stagger_value,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        });
      }
      if (!translateX_value && !translateY_value) {
        let split_char = new SplitText(item, {
          type: "chars, words"
        });
        gsap.from(split_char.chars, {
          duration: 1,
          delay: data_delay,
          x: 50,
          autoAlpha: 0,
          stagger: stagger_value,
          ease: ease_value,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        });
      }
    } else {
      if (translateX_value > 0 && !translateY_value) {
        let split_char = new SplitText(item, {
          type: "chars, words"
        });
        gsap.from(split_char.chars, {
          duration: 1,
          delay: data_delay,
          x: translateX_value,
          ease: ease_value,
          autoAlpha: 0,
          stagger: stagger_value
        });
      }
      if (translateY_value > 0 && !translateX_value) {
        let split_char = new SplitText(item, {
          type: "chars, words"
        });
        gsap.from(split_char.chars, {
          duration: 1,
          delay: data_delay,
          y: translateY_value,
          autoAlpha: 0,
          ease: ease_value,
          stagger: stagger_value
        });
      }
      if (translateX_value && translateY_value) {
        let split_char = new SplitText(item, {
          type: "chars, words"
        });
        gsap.from(split_char.chars, {
          duration: 1,
          delay: data_delay,
          y: translateY_value,
          x: translateX_value,
          ease: ease_value,
          autoAlpha: 0,
          stagger: stagger_value
        });
      }
      if (!translateX_value && !translateY_value) {
        let split_char = new SplitText(item, {
          type: "chars, words"
        });
        gsap.from(split_char.chars, {
          duration: 1,
          delay: data_delay,
          ease: ease_value,
          x: 50,
          autoAlpha: 0,
          stagger: stagger_value
        });
      }
    }

  });


  let revealContainers = document.querySelectorAll(".return");

  revealContainers.forEach((container) => {
    let image = container.querySelector("img");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        toggleActions: "restart none none reset"
      }
    });

    tl.set(container, { autoAlpha: 1 });
    tl.from(container, 1.5, {
      xPercent: -100,
      ease: Power2.out
    });
    tl.from(image, 1.5, {
      xPercent: 100,
      scale: 1.3,
      delay: -1.5,
      ease: Power2.out
    });
  });


  // approach-area
  // ====================================================
  if (document.querySelectorAll(".approach-area").length > 0) {

    const boxes = document.querySelectorAll(".approach-area .approach-box");

    gsap.from(boxes, {
      x: "100%",
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        scrub: 2,
        trigger: ".approach-wrapper-box",
        start: "top 100%",
        end: "bottom 40%",
        toggleActions: "play none none reverse",
      }
    });
  }


  // button animation
  // ====================================================
  $('.rr-btn-circle').on('mouseenter', function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;

    $(this).find('.rr-btn-circle-dot').css({
      top: y,
      left: x
    });
  });

  $('.rr-btn-circle').on('mouseout', function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;

    $(this).find('.rr-btn-circle-dot').css({
      top: y,
      left: x
    });
  });
  1

  var hoverBtns = gsap.utils.toArray(".rr-hover-btn-wrapper");

  const hoverBtnItem = gsap.utils.toArray(".rr-btn-circle");
  hoverBtns.forEach((btn, span) => {
    $(btn).mousemove(function (e) {
      callParallax(e);
    });

    function callParallax(e) {
      parallaxIt(e, hoverBtnItem[span], 100);
    }

    function parallaxIt(e, target, movement) {
      var $this = $(btn);
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      gsap.to(target, 0.5, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
        ease: Power2.easeOut,
      });
    }
    $(btn).mouseleave(function (e) {
      gsap.to(hoverBtnItem[span], 0.5, {
        x: 0,
        y: 0,
        ease: Power2.easeOut,
      });
    });
  });

  // service-area-4
  // ====================================================
  mm.add("(min-width: 1024px)", () => {
    if (document.querySelectorAll(".service-area-4").length > 0) {
      const races = document.querySelector(".service-area-4");
      const racesScrollWidth = races.scrollWidth;

      const getScrollAmount = () =>
        -(racesScrollWidth - document.querySelector(".service-area-4").offsetWidth);

      const wrapperTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".service-area-4",
          start: "top top",
          end: `+=${Math.abs(getScrollAmount())}`,
          scrub: 3,
          pin: true,
        },
      });

      wrapperTimeline.to(".services-wrapper", {
        x: getScrollAmount(),
        delay: 0.05,
        ease: "power1.inOut",
      });

      wrapperTimeline.to(
        ".service-thumb-line-wrapper span",
        {
          scaleX: 0,
          // x: "-100%",
          stagger: 0.04,
          ease: "power1.out",
        },
        "<"
      );
    }
  });

  // service-area-4
  // ====================================================
  if (document.querySelectorAll(".service-area-4").length > 0) {
    gsap.fromTo(
      ".section-content__thumb img",
      {
        x: 350,

      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-content__thumb img",
          start: "top 80%",
          toggleActions: "play none none none",
          scrub: 2,
        },
      }
    );
  }

  // portfolio-slide
  // ====================================================
  if (document.querySelectorAll(".portfolio").length > 0) {
    let portfolio_activ = new Swiper(".portfolio-activ", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 1500,
      centeredSlides: true,
      clickable: true,
      mousewheel: {
        releaseOnEdges: true,
      },
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: [0, 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      navigation: {
        prevEl: ".portfolio__slider__arrow-prev",
        nextEl: ".portfolio__slider__arrow-next",
      },
      pagination: {
        el: ".portfolio-pagination",
        clickable: true,
      },
    });
  }

  // portfolio-slide-2
  // ====================================================
  let portfolio2_activ = new Swiper(".portfolio-2-activ", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1000,
    centeredSlides: true,
    clickable: true,
    mousewheel: {
      releaseOnEdges: true,
    },
    on: {
      slideChangeTransitionStart: function () {
        document.querySelectorAll(".line").forEach(line => {
          line.style.transform = "scaleY(1)";
        });

        setTimeout(() => {
          document.querySelectorAll(".swiper-slide-active .line").forEach(line => {
            line.style.transform = "scaleY(0)";
          });
        }, 10);
      }
    },

    navigation: {
      prevEl: ".portfolio-2__slider__arrow-prev",
      nextEl: ".portfolio-2__slider__arrow-next",
    },
    pagination: {
      el: ".portfolio-2-pagination",
      clickable: true,
    },
  });

  // portfolio-slide-3
  // ====================================================
  if (document.querySelectorAll(".portfolio-3").length > 0) {
    document.querySelectorAll('.grid-mask').forEach(gridMask => {
      let blocks = [];
      for (let i = 0; i < 32; i++) {
        let block = document.createElement("div");
        block.style.transitionDelay = `${Math.random() * 1.5}s`;
        blocks.push(block);
      }
      blocks.sort(() => Math.random() - 0.5);
      blocks.forEach(block => gridMask.appendChild(block));
    });
    var swiper = new Swiper(".portfolio-3-activ", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      centeredSlides: true,
      clickable: true,
      effect: 'fade',
      mousewheel: {
        releaseOnEdges: true,
      },

      navigation: {
        prevEl: ".portfolio-3__slider__arrow-prev",
        nextEl: ".portfolio-3__slider__arrow-next",
      },
      pagination: {
        el: ".portfolio-3-pagination",
        clickable: true,
      },
    });
  }

  // portfolio-slide-4
  // ====================================================
  if (document.querySelectorAll(".portfolio-4").length > 0) {
    let portfolio4_activ = new Swiper(".portfolio-4-activ", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 1500,
      centeredSlides: true,
      clickable: true,
      parallax: true,
      effect: "parallax",
      mousewheel: {
        releaseOnEdges: true,
      },
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: [0, "-100%", 0],
        },
        next: {
          translate: [0, "100%", 0],
        },
      },
      navigation: {
        prevEl: ".portfolio-4__slider__arrow-prev",
        nextEl: ".portfolio-4__slider__arrow-next",
      },
      pagination: {
        el: ".portfolio-4-pagination",
        clickable: true,
      },
    });
  }

  // portfolio-slide-5
  // ====================================================
  if (document.querySelectorAll(".portfolio-5").length > 0) {
    let portfolio5_activ = new Swiper(".portfolio-5-activ", {
      modules: [EffectSlicer],
      effect: 'slicer',
      loop: true,
      clickable: true,
      slicerEffect: {
        split: 5,
      },
      direction: 'vertical',
      speed: 600,
      mousewheel: {
        releaseOnEdges: true,
      },

      navigation: {
        prevEl: ".portfolio-5__slider__arrow-prev",
        nextEl: ".portfolio-5__slider__arrow-next",
      },
      pagination: {
        el: ".portfolio-5-pagination",
        clickable: true,
      },
    });
  }

  // parallax
  // ====================================================
  if (document.querySelectorAll(".parallax-slider-wrapper").length > 0) {
    const selectAll = (e) => document.querySelectorAll(e);
    gsap.registerPlugin(ScrollTrigger);
    const tracks = selectAll(".parallax-slider-wrapper");

    tracks.forEach((track) => {
      let trackWrapper = track.querySelectorAll(".parallax-slider");
      let allImgs = track.querySelectorAll(".image");

      let trackWrapperWidth = () => {
        let width = 0;
        trackWrapper.forEach((el) => (width += el.offsetWidth));
        return width;
      };

      gsap.defaults({ ease: "none" });
      const gap = window.innerWidth * 0.05;
      let scrollTween = gsap.to(trackWrapper, {
        x: () => -trackWrapperWidth() + window.innerWidth + gap,
        scrollTrigger: {
          trigger: track,
          pin: true,
          scrub: 3,
          start: "center center",
          end: () => "+=" + (track.scrollWidth - window.innerWidth),
          onRefresh: (self) => self.getTween().resetTo("totalProgress", 0),
          invalidateOnRefresh: true
        }
      });

      allImgs.forEach((img) => {
        gsap.fromTo(img, { transform: "translateX(-10vw)" }, {
          transform: "translateX(5vw)",
          scrollTrigger: {
            trigger: img.parentNode,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });

      });
    });
  }


  if (document.querySelectorAll(".work-area-5").length > 0) {
    const cards = document.querySelectorAll(".card-wrap");

    cards.forEach(card => {
      const cardElement = card.querySelector(".card");
      const cardBg = card.querySelector(".card-bg");

      // Set background image dynamically
      const imageUrl = card.getAttribute("data-image");
      cardBg.style.backgroundImage = `url(${imageUrl})`;

      let requestId = null;

      card.addEventListener("mousemove", (e) => {
        if (requestId) cancelAnimationFrame(requestId);
        requestId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const rotateX = (y / rect.height) * -30;
          const rotateY = (x / rect.width) * 30;

          cardElement.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
          cardBg.style.transform = `translateX(${x * -0.1}px) translateY(${y * -0.1}px)`;
        });
      });

      card.addEventListener("mouseleave", () => {
        if (requestId) cancelAnimationFrame(requestId);
        cardElement.style.transform = "rotateY(0deg) rotateX(0deg)";
        cardBg.style.transform = "translateX(0px) translateY(0px)";
      });
    });
  }



})(jQuery);

