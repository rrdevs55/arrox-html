function ScrollEffects() {
    if (setTimeout(function () {
        var e = document.getElementById("app");
        e.className += "active", $("body").append(e)
    }, 1500), $("#canvas-slider").length > 0 && setTimeout(function () {
        var e = document.getElementById("canvas-slider");
        e.className += " active", $("body").append(e)
    }, 1500), $("#project-nav").length > 0 && ($("#main-content").addClass("color-page"), $("#main-page-content").addClass("project-page")), $(window).width() < 1025) {
        var e, a = $(window).height(),
            t = $("footer").height();

        function o() {
            var e = $(window).height(),
                a = $("footer").height();
            $("nav, #canvas-slider, #showcase-slider-webgl-holder, .swiper-slide .outer, #quickmenu, #hero.has-image, #hero.has-image #hero-styles, #hero-image-wrapper, #project-nav").css({
                height: e
            }), $("#main-page-content.project-page").css({
                "margin-bottom": e - a
            }), $(".icon-wrap").removeClass("parallax-wrap")
        }
        $("nav, #canvas-slider, #showcase-slider-webgl-holder, .swiper-slide .outer, #quickmenu, #hero.has-image, #hero.has-image #hero-styles, #hero-image-wrapper, #project-nav").css({
            height: a
        }), $("#main-page-content.project-page").css({
            "margin-bottom": a - t
        }), $("#project-nav").css({
            bottom: -a
        }), $(".icon-wrap").removeClass("parallax-wrap"), $(window).resize(function () {
            clearTimeout(e), e = setTimeout(o, 100)
        })
    }
    if ($("figure").hasClass("has-parallax") && $("figure.has-parallax>img").each(function () {
        $(this).parent().css({
            height: $(this).height() - 50
        })
    }), $("body").hasClass("smooth-scroll")) {
        const e = document.querySelector("#content-scroll");
        var n = window.Scrollbar,
            r = this && this.__extends || (i = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, a) {
                    e.__proto__ = a
                } || function (e, a) {
                    for (var t in a) a.hasOwnProperty(t) && (e[t] = a[t])
                },
                function (e, a) {
                    function t() {
                        this.constructor = e
                    }
                    i(e, a), e.prototype = null === a ? Object.create(a) : (t.prototype = a.prototype, new t)
                }),
            s = function (e) {
                function a() {
                    var a = null !== e && e.apply(this, arguments) || this;
                    return a._remainMomentum = {
                        x: 0,
                        y: 0
                    }, a
                }
                return r(a, e), a.prototype.transformDelta = function (e) {
                    var a = this.scrollbar,
                        t = a.limit,
                        o = a.offset,
                        n = this._remainMomentum.x + e.x,
                        r = this._remainMomentum.y + e.y;
                    return this.scrollbar.setMomentum(Math.max(-o.x, Math.min(n, t.x - o.x)), Math.max(-o.y, Math.min(r, t.y - o.y))), {
                        x: 0,
                        y: 0
                    }
                }, a.prototype.onRender = function (e) {
                    Object.assign(this._remainMomentum, e)
                }, a.pluginName = "edgeEasing", a
            }(Scrollbar.ScrollbarPlugin);
        Scrollbar.use(s);
        n = Scrollbar.init(e, {
            damping: .03,
            renderByPixel: !0,
            continuousScrolling: !0,
            syncCallbacks: !0
        });
        $(window).width() > 1024 && $("body").hasClass("drag-scroll") && setTimeout(function () {
            var e = n.getSize().content,
                a = n.getSize().container;
            console.log("container height is: " + a.height), console.log("scrollbar limit is: " + n.limit.y);
            var t = Draggable.create(".scroll-content", {
                type: "y",
                bounds: {
                    minX: 0,
                    maxX: 0,
                    minY: 0,
                    maxY: a.height - e.height
                },
                autoScroll: 2,
                dragResistance: -2,
                edgeResistance: 1,
                onPress: function (e) {
                    return console.log("Draggable - on press"), window.innerWidth <= 1024 ? (e.dragCancelled = !0, void this.endDrag(e)) : 2 == e.button ? (e.dragCancelled = !0, void this.endDrag(e)) : null != e.target && $(e.target).parents(".disable-drag").length ? (e.dragCancelled = !0, void this.endDrag(e)) : ($("body").addClass("scale-up"), void TweenMax.to("#ball", .2, {
                        borderWidth: "2px",
                        borderColor: "#999",
                        scale: 1
                    }))
                },
                onClick: function () {
                    console.log("Draggable - on click")
                },
                onDragStart: function () {
                    if (console.log("Draggable - drag start"), this.minY != -n.limit.y) {
                        n.getSize().content, n.getSize().container;
                        this.applyBounds({
                            minX: 0,
                            maxX: 0,
                            minY: 0,
                            maxY: -n.limit.y
                        })
                    }
                },
                onDrag: function () {
                    console.log("Draggable - drag, y value: " + this.y + ", scrollbar offset: " + n.scrollTop + ", minY: " + this.minY + ", maxY: " + this.maxY), TweenLite.to(n, 1, {
                        scrollTo: -this.y,
                        ease: Power4.easeOut
                    })
                },
                onDragEnd: function (e) {
                    console.log("Draggable - drag end"), e.dragCancelled ? console.log("Draggable - drag cancelled") : document.getElementById("content-scroll").addEventListener("wheel", function () {
                        TweenLite.set(n, {
                            scrollTo: -this.y
                        })
                    })
                },
                onRelease: function (e) {
                    console.log("Draggable - release"), e.dragCancelled || ($("body").removeClass("scale-up"), TweenMax.to("#ball", 1, {
                        borderWidth: "4px",
                        scale: .5,
                        borderColor: "#999999",
                        ease: Elastic.easeOut
                    }))
                }
            });
            n.addListener(function (e) {
                TweenLite.set(t[0].target, {
                    x: 0,
                    y: -n.scrollTop
                })
            })
        }, 1e3)
    }
    var i;
    $("#hero.has-image").hasClass("autoscroll") && $("#hero").hasClass("has-image") && ($("body").hasClass("smooth-scroll") ? TweenMax.to(n, 1.5, {
        scrollTo: 120,
        delay: .7,
        ease: Power4.easeInOut
    }) : TweenMax.to(window, 1.5, {
        scrollTo: 120,
        delay: .7,
        ease: Power4.easeInOut
    })), $(".autocenter").on("click", function () {
        var e = $(window),
            a = $(this),
            t = a.offset().top,
            o = a.height(),
            r = t - (e.height() - o) / 2;
        if ($("body").hasClass("smooth-scroll")) {
            var s = n.offset.y + (t - n.getSize().container.height / 2);
            TweenLite.to(n, .8, {
                scrollTo: s + o / 2,
                ease: Power4.easeInOut
            })
        } else $("html, body").animate({
            scrollTop: r
        }, 350)
    }), $("#backtotop").on("click", function () {
        $("body").hasClass("smooth-scroll") ? (TweenLite.to(n, 1.5, {
            scrollTop: 0,
            delay: .1,
            ease: Power4.easeInOut
        }), TweenMax.to("#ball", .3, {
            borderWidth: "4px",
            scale: .5,
            borderColor: "#999999",
            delay: .15
        })) : ($("html,body").animate({
            scrollTop: 0
        }, 800), TweenMax.to("#ball", .3, {
            borderWidth: "4px",
            scale: .5,
            borderColor: "#999999",
            delay: .15
        }))
    }), $(".scroll-down").on("click", function () {
        var e = $("#hero").height();
        $("body").hasClass("smooth-scroll") ? (TweenLite.to(n, 1.5, {
            scrollTop: e,
            ease: Power4.easeInOut
        }), TweenMax.to("#ball", .3, {
            borderWidth: "4px",
            scale: .5,
            borderColor: "#999999",
            delay: .15
        })) : ($("html,body").animate({
            scrollTop: e
        }, 800), TweenMax.to("#ball", .3, {
            borderWidth: "4px",
            scale: .5,
            borderColor: "#999999",
            delay: .15
        }))
    });
    var l = TweenMax.to(".parallax-scroll-effect", 1, {
        top: "5%",
        scale: 1.1,
        opacity: 1,
        ease: Linear.easeNone
    }),
        c = TweenMax.to("#hero-caption.parallax-onscroll", .5, {
            yPercent: 10,
            opacity: 0,
            ease: Linear.easeNone
        }),
        h = TweenMax.to("#hero-caption.reverse-parallax-onscroll", .5, {
            yPercent: 10,
            opacity: .5,
            ease: Linear.easeNone
        }),
        d = TweenMax.to("#hero-footer", .5, {
            yPercent: 15,
            opacity: 0,
            ease: Linear.easeNone
        }),
        g = TweenMax.to(".next-project-image", 1, {
            top: "0",
            scale: 1,
            opacity: .8,
            ease: Linear.easeNone
        }),
        p = TweenMax.to(".next-project-wrap", .5, {
            top: "0",
            scale: 1,
            opacity: 1,
            ease: Linear.easeNone
        }),
        u = TweenMax.to(".next-page-title", .5, {
            top: "0",
            scale: 1,
            opacity: 1,
            ease: Linear.easeNone
        }),
        w = new ScrollMagic.Controller,
        f = new ScrollMagic.Scene({
            triggerElement: "#hero",
            triggerHook: 0,
            duration: "120%"
        }).setTween(l).addTo(w),
        m = new ScrollMagic.Scene({
            triggerElement: "#hero",
            triggerHook: 0,
            duration: "50%"
        }).setTween(c).addTo(w),
        y = new ScrollMagic.Scene({
            triggerElement: "#hero",
            triggerHook: 0,
            duration: "100%"
        }).setTween(h).addTo(w),
        v = new ScrollMagic.Scene({
            triggerElement: "#hero",
            triggerHook: 0,
            duration: "30%"
        }).setTween(d).addTo(w),
        b = new ScrollMagic.Scene({
            triggerElement: "#project-nav",
            triggerHook: 1,
            duration: "100%"
        }).setTween(g).addTo(w),
        T = new ScrollMagic.Scene({
            triggerElement: "#project-nav",
            triggerHook: 1,
            duration: "100%"
        }).setTween(p).addTo(w),
        x = $("#page-nav").outerHeight() + $("footer").outerHeight(),
        C = new ScrollMagic.Scene({
            triggerElement: "#page-nav",
            triggerHook: 1,
            duration: x
        }).setTween(u).addTo(w);
    $("body").hasClass("smooth-scroll") && n.addListener(() => {
        f.refresh(), m.refresh(), y.refresh(), v.refresh(), b.refresh(), T.refresh(), C.refresh()
    }), $(".has-parallax").each(function () {
        var e = $(this),
            a = 2 * window.innerHeight,
            t = e.find("img"),
            o = TweenMax.fromTo(t, 1, {
                y: "-20%"
            }, {
                y: "20%",
                ease: Linear.easeNone
            }),
            r = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 1,
                duration: a
            }).setTween(o).addTo(w);
        $("body").hasClass("smooth-scroll") && n.addListener(() => {
            r.refresh()
        })
    }), $(".has-animation").each(function () {
        var e = $(this),
            a = $(this).height(),
            t = new ScrollMagic.Scene({
                triggerElement: e[0],
                duration: a
            }).addTo(w);
        t.triggerHook(1), t.on("enter", function () {
            e.delay(e.attr("data-delay")).queue(function (a) {
                TweenMax.to(e, .6, {
                    force3D: !0,
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    delay: 0,
                    ease: Power2.easeOut
                }), a(), e.addClass("animated")
            })
        }), $("body").hasClass("smooth-scroll") && n.addListener(() => {
            t.refresh()
        })
    }), $("body").find(".has-scale").each(function (e) {
        $(this).wrap("<div class='figure-wrapper'></div>")
    }), $(".has-mask").each(function () {
        var e = $(this).text().split(" "),
            a = e.length;
        for ($(this).empty(), index = 0; index < a; index++) $(this).append($("<span /> ").text(e[index]))
    }), $(".has-mask span").each(function () {
        var e = $(this).text().split(" "),
            a = e.length;
        for ($(this).empty(), index = 0; index < a; index++) $(this).append($("<span /> ").text(e[index]))
    }), $(".has-mask").each(function () {
        var e = $(this),
            a = $(this).height(),
            t = new ScrollMagic.Scene({
                triggerElement: e[0],
                duration: a
            }).addTo(w);
        t.triggerHook(1), t.on("enter", function () {
            e.delay(e.attr("data-delay")).queue(function (a) {
                var t = new TimelineLite;
                e.find("span > span").each(function (e, a) {
                    t.to(a, .6, {
                        y: 0,
                        opacity: 1,
                        delay: .3,
                        ease: Power2.easeOut
                    }, 0 * e)
                }), a()
            })
        }), $("body").hasClass("smooth-scroll") && n.addListener(() => {
            t.refresh()
        })
    }), $(".portfolio .item").each(function () {
        var e = $(this),
            a = $(this).height(),
            t = new ScrollMagic.Scene({
                triggerElement: e[0],
                duration: a
            }).addTo(w);
        t.triggerHook(.9), t.on("enter", function () {
            e.addClass("active")
        }), $("body").hasClass("smooth-scroll") && n.addListener(() => {
            t.refresh()
        })
    }), $(".white-section").each(function (e) {
        $(this).hasClass("large") ? $(this).wrap("<div class='white-section-wrapper large'><div class='white-section-container'></div></div>") : $(this).wrap("<div class='white-section-wrapper'><div class='white-section-container'></div></div>"), $("body").find(".white-section-wrapper").each(function (e) {
            $(this).css("background-color", function () {
                return $(this).children().children().data("bgcolor")
            })
        })
    }), $(".half-white-section").each(function (e) {
        $(this).wrap("<div class='half-white-section-wrapper'></div>"), $(this).hasClass("first") ? $(this).parent(".half-white-section-wrapper").addClass("first") : $(this).hasClass("second") && $(this).parent(".half-white-section-wrapper").addClass("second"), $("body").find(".half-white-section-wrapper").each(function (e) {
            $(this).css("background-color", function () {
                return $(this).children().data("bgcolor")
            })
        })
    }), $(".dark-section").each(function (e) {
        $(this).hasClass("large") ? $(this).wrap("<div class='dark-section-wrapper large'><div class='dark-section-container'></div></div>") : $(this).wrap("<div class='dark-section-wrapper'><div class='dark-section-container'></div></div>"), $("body").find(".dark-section-wrapper").each(function (e) {
            $(this).css("background-color", function () {
                return $(this).children().children().data("bgcolor")
            })
        })
    }), $(".half-dark-section").each(function (e) {
        $(this).wrap("<div class='half-dark-section-wrapper'></div>"), $(this).hasClass("first") ? $(this).parent(".half-dark-section-wrapper").addClass("first") : $(this).hasClass("second") && $(this).parent(".half-dark-section-wrapper").addClass("second"), $("body").find(".half-dark-section-wrapper").each(function (e) {
            $(this).css("background-color", function () {
                return $(this).children().data("bgcolor")
            })
        })
    }), $("#project-nav.change-header").each(function () {
        const e = $("#page-content");
        $(this);
        var a = $(this).outerHeight(!0),
            t = new ScrollMagic.Scene({
                triggerElement: this,
                duration: a
            }).addTo(w);
        t.triggerHook(.08), t.on("enter", function () {
            e.removeClass("light-content")
        }), t.on("leave", function () {
            e.addClass("light-content")
        }), $("body").hasClass("smooth-scroll") && n.addListener(() => {
            t.refresh()
        })
    }), $("#page-content").hasClass("light-content") || $("#project-nav").hasClass("change-header") || $("#project-nav").each(function () {
        const e = $("#page-content");
        $(this);
        var a = $(this).outerHeight(!0),
            t = new ScrollMagic.Scene({
                triggerElement: this,
                duration: a
            }).addTo(w);
        t.triggerHook(.08), t.on("enter", function () {
            e.addClass("light-content")
        }), t.on("leave", function () {
            e.removeClass("light-content")
        }), $("body").hasClass("smooth-scroll") && n.addListener(() => {
            t.refresh()
        })
    }), $(".change-header-color").length > 0 && $("body").waitForImages({
        finished: function () {
            $(".change-header-color").each(function () {
                const e = $("header");
                $(this);
                var a = $(this).outerHeight(!0),
                    t = new ScrollMagic.Scene({
                        triggerElement: this,
                        duration: a
                    }).addTo(w);
                t.triggerHook(.08), t.on("enter", function () {
                    setTimeout(function () {
                        e.addClass("white-header")
                    }, 10)
                }), t.on("leave", function () {
                    e.removeClass("white-header")
                }), $("body").hasClass("smooth-scroll") && n.addListener(() => {
                    t.refresh()
                })
            })
        },
        waitForAll: !0
    }), $("header").removeClass("white-header");
    var S = window.innerHeight;
    $(".scattered-grid .item").each(function () {
        var e = $(this),
            a = $(this).height() + S,
            t = e.find(".item-parallax.enabled"),
            o = TweenMax.fromTo(t, 1, {
                y: "20%"
            }, {
                y: "-20%",
                ease: Linear.easeNone
            }),
            r = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 1,
                duration: a
            }).setTween(o).addTo(w);
        $("body").hasClass("smooth-scroll") && n.addListener(() => {
            r.refresh()
        })
    }), $(".content-carousel").each(function () {
        $(this);
        var e = $(this).outerHeight(!0),
            a = new TimelineLite;
        a.set($(".content-carousel .swiper-slide"), {
            x: 800,
            opacity: 0
        });
        var t = new ScrollMagic.Scene({
            triggerElement: this,
            duration: e
        }).addTo(w);
        t.triggerHook(1), t.on("enter", function () {
            $(".content-carousel .swiper-slide").each(function (e, t) {
                a.to(t, 1.4, {
                    x: 0,
                    opacity: 1,
                    delay: .1,
                    ease: Power3.easeOut
                }, .1 * e)
            })
        }), $("body").hasClass("smooth-scroll") && n.addListener(() => {
            t.refresh()
        })
    })
}

function AjaxLoad() {
    var e = {
        x: 0,
        y: 0
    },
        t = {
            x: 0,
            y: 0
        },
        o = .65,
        n = !1,
        r = document.getElementById("ball"),
        i = (document.getElementById("ball-loader"), 40);

    function a() {
        n || (t.x += (e.x - t.x) * o, t.y += (e.y - t.y) * o, TweenLite.to(r, .4, {
            x: t.x,
            y: t.y
        }))
    }
    TweenLite.set(r, {
        xPercent: -50,
        yPercent: -50,
        scale: .5,
        borderWidth: "4px"
    }), document.addEventListener("mousemove", function (t) {
        var o = window.pageYOffset || document.documentElement.scrollTop;
        e.x = t.pageX, e.y = t.pageY - o
    }), TweenLite.ticker.addEventListener("tick", a), $(".sticky.left").mouseenter(function (e) {
        var t = $(this)[0].getBoundingClientRect(),
            o = t.left - i,
            n = t.top + t.height / 2;
        TweenLite.to(r, .5, {
            x: o,
            y: n,
            scale: .9,
            borderWidth: "2px"
        }), TweenMax.ticker.removeEventListener("tick", a)
    }), $(".sticky.right").mouseenter(function (e) {
        var t = $(this)[0].getBoundingClientRect(),
            o = t.right + i,
            n = t.top + t.height / 2;
        TweenLite.to(r, .5, {
            x: o,
            y: n,
            scale: .9,
            borderWidth: "2px"
        }), TweenMax.ticker.removeEventListener("tick", a)
    }), $("#main .sticky.left").mouseenter(function (e) {
        var t = $(this)[0].getBoundingClientRect(),
            o = t.left - i + 10,
            n = t.top + t.height / 2;
        TweenLite.to(r, .5, {
            x: o,
            y: n,
            scale: .7,
            opacity: .6,
            borderWidth: "6px",
            borderColor: "#999999"
        }), TweenMax.ticker.removeEventListener("tick", a)
    }), $("#main .sticky.right").mouseenter(function (e) {
        var t = $(this)[0].getBoundingClientRect(),
            o = t.right + i - 10,
            n = t.top + t.height / 2;
        TweenLite.to(r, .5, {
            x: o,
            y: n,
            scale: .7,
            opacity: .6,
            borderWidth: "6px",
            borderColor: "#999999"
        }), TweenMax.ticker.removeEventListener("tick", a)
    }), $(".sticky").mouseleave(function (e) {
        TweenLite.to(r, .2, {
            scale: .5,
            borderWidth: "4px",
            borderColor: "#999999",
            opacity: 1
        }), TweenMax.ticker.addEventListener("tick", a)
    }), $(".sticky-titles .slide-title").mouseenter(function (e) {
        var t = $(this)[0].getBoundingClientRect(),
            o = t.right + i + 10,
            n = t.top + t.height - 30;
        TweenLite.to(r, .5, {
            x: o,
            y: n,
            scale: .7,
            opacity: 1,
            borderWidth: "6px",
            borderColor: $("body").data("cursor-color")
        }), TweenMax.ticker.removeEventListener("tick", a)
    }), $(".sticky-titles .slide-title").mouseleave(function (e) {
        TweenLite.to(r, .2, {
            scale: .5,
            borderWidth: "4px",
            borderColor: "#999999",
            opacity: 1
        }), TweenMax.ticker.addEventListener("tick", a)
    }), $(".parallax-wrap").mouseenter(function (e) {
        TweenMax.to(this, .3, {
            scale: 2
        }), TweenMax.to(r, .3, {
            scale: .9,
            borderWidth: "2px",
            opacity: 1
        }), TweenMax.to($(this).children(), .3, {
            scale: .5
        }), n = !0
    }), $("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
        TweenMax.to(r, .3, {
            scale: .7,
            borderWidth: "6px",
            opacity: .6,
            borderColor: "#999"
        })
    }), $(".parallax-wrap.bigger").mouseenter(function (e) {
        TweenMax.to(r, .3, {
            scale: 1.35,
            borderWidth: "2px",
            opacity: 1
        })
    }), $(".parallax-wrap").mouseleave(function (e) {
        TweenMax.to(this, .3, {
            scale: 1
        }), TweenMax.to(r, .3, {
            scale: .5,
            borderWidth: "4px",
            opacity: 1,
            borderColor: "#999999"
        }), TweenMax.to($(this).children(), .3, {
            scale: 1,
            x: 0,
            y: 0
        }), n = !1
    }), $("#magic-cursor").hasClass("light-content") ? ($(".sticky").mouseenter(function (e) {
        TweenLite.to(r, .5, {
            borderColor: $("body").data("cursor-hover-color")
        })
    }), $("#main .sticky").mouseenter(function (e) {
        TweenLite.to(r, .5, {
            borderColor: "#999"
        })
    }), $("#main .sticky-titles .slide-title").mouseenter(function (e) {
        TweenLite.to(r, .5, {
            borderColor: $("body").data("cursor-hover-color")
        })
    }), $(".parallax-wrap").mouseenter(function (e) {
        TweenMax.to(r, .3, {
            borderColor: $("body").data("cursor-hover-color")
        })
    }), $(".parallax-wrap.bigger").mouseenter(function (e) {
        TweenMax.to(r, .3, {
            borderColor: "#fff"
        })
    }), $(".white-section .parallax-wrap.bigger").mouseenter(function (e) {
        TweenMax.to(r, .3, {
            borderColor: "#000"
        })
    }), $("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
        TweenMax.to(r, .3, {
            borderColor: "#999"
        })
    })) : ($(".sticky").mouseenter(function (e) {
        TweenLite.to(r, .5, {
            borderColor: $("body").data("cursor-hover-color")
        })
    }), $("#main .sticky").mouseenter(function (e) {
        TweenLite.to(r, .5, {
            borderColor: "#999"
        })
    }), $("#main .sticky-titles .slide-title").mouseenter(function (e) {
        TweenLite.to(r, .5, {
            borderColor: $("body").data("cursor-hover-color")
        })
    }), $(".parallax-wrap").mouseenter(function (e) {
        TweenMax.to(r, .3, {
            borderColor: $("body").data("cursor-hover-color")
        })
    }), $(".parallax-wrap.bigger").mouseenter(function (e) {
        TweenMax.to(r, .3, {
            borderColor: "#000"
        })
    }), $("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
        TweenMax.to(r, .3, {
            borderColor: "#999"
        })
    })), $(".parallax-wrap").mousemove(function (e) {
        ! function (e, o, n) {
            var i = o.getBoundingClientRect(),
                a = e.pageX - i.left,
                l = e.pageY - i.top,
                c = window.pageYOffset || document.documentElement.scrollTop;
            t.x = i.left + i.width / 2 + (a - i.width / 2) / n, t.y = i.top + i.height / 2 + (l - i.height / 2 - c) / n, TweenMax.to(r, .3, {
                x: t.x,
                y: t.y
            })
        }(e, this, 2),
            function (e, t) {
                ! function (e, t, o, n) {
                    var r = t.getBoundingClientRect(),
                        i = e.pageX - r.left,
                        a = e.pageY - r.top,
                        l = window.pageYOffset || document.documentElement.scrollTop;
                    TweenMax.to(o, .3, {
                        x: (i - r.width / 2) / r.width * n,
                        y: (a - r.height / 2 - l) / r.height * n,
                        ease: Power2.easeOut
                    })
                }(e, t, t.querySelector(".parallax-element"), 20)
            }(e, this)
    }), $(".hide-ball").mouseenter(function (e) {
        TweenMax.to("#ball", .2, {
            borderWidth: "1px",
            scale: 1,
            opacity: 0
        })
    }), $(".hide-ball").mouseleave(function (e) {
        TweenMax.to("#ball", .3, {
            borderWidth: "4px",
            scale: .5,
            opacity: 1
        })
    }), $(".link").mouseenter(function (e) {
        TweenMax.to("#ball", .2, {
            borderWidth: "0px",
            scale: 1.5,
            backgroundColor: "rgba(153, 153, 153, 1)",
            opacity: .15
        }), TweenMax.to("#ball-loader", .2, {
            borderWidth: "2px",
            top: 4,
            left: 4
        })
    }), $(".link").mouseleave(function (e) {
        TweenMax.to("#ball", .3, {
            borderWidth: "4px",
            scale: .5,
            backgroundColor: "rgba(153, 153, 153, 0)",
            opacity: 1
        }), TweenMax.to("#ball-loader", .2, {
            borderWidth: "4px",
            top: 0,
            left: 0
        })
    }), jQuery(document).ready(function () {
        var e = !1,
            o = "";

        function l(t, n) {
            e = !0, $("body").addClass("page-is-changing"), $(".cd-cover-layer").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                c(t, n), o = t, $(".cd-cover-layer").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend")
            }), s() || (c(t, n), o = t)
        }

        function c(o, l) {
            o = "" == o ? "index.html" : o;
            var c = $('<div class="cd-main-content "></div>');
            c.load(o + " .cd-main-content > *", function (d) {
                $("main").html(c);
                var u = d.match(/<title[^>]*>([^<]+)<\/title>/)[1];
                $("head title").html(u), $("html, body").scrollTop(0);
                var p = s() ? 30 : 0;
                setTimeout(function () {
                    $("body").removeClass("page-is-changing"), $(".cd-cover-layer").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                        e = !1, $(".cd-cover-layer").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend")
                    }), LoadViaAjax(), $(".sticky.left").mouseenter(function (e) {
                        var t = $(this)[0].getBoundingClientRect(),
                            o = t.left - i,
                            n = t.top + t.height / 2;
                        TweenLite.to(r, .5, {
                            x: o,
                            y: n,
                            scale: .9,
                            borderWidth: "2px"
                        }), TweenMax.ticker.removeEventListener("tick", a)
                    }), $(".sticky.right").mouseenter(function (e) {
                        var t = $(this)[0].getBoundingClientRect(),
                            o = t.right + i,
                            n = t.top + t.height / 2;
                        TweenLite.to(r, .5, {
                            x: o,
                            y: n,
                            scale: .9,
                            borderWidth: "2px"
                        }), TweenMax.ticker.removeEventListener("tick", a)
                    }), $("#main .sticky.left").mouseenter(function (e) {
                        var t = $(this)[0].getBoundingClientRect(),
                            o = t.left - i + 10,
                            n = t.top + t.height / 2;
                        TweenLite.to(r, .5, {
                            x: o,
                            y: n,
                            scale: .7,
                            opacity: .6,
                            borderWidth: "6px",
                            borderColor: "#999999"
                        }), TweenMax.ticker.removeEventListener("tick", a)
                    }), $("#main .sticky.right").mouseenter(function (e) {
                        var t = $(this)[0].getBoundingClientRect(),
                            o = t.right + i - 10,
                            n = t.top + t.height / 2;
                        TweenLite.to(r, .5, {
                            x: o,
                            y: n,
                            scale: .7,
                            opacity: .6,
                            borderWidth: "6px",
                            borderColor: "#999999"
                        }), TweenMax.ticker.removeEventListener("tick", a)
                    }), $(".sticky").mouseleave(function (e) {
                        TweenLite.to(r, .2, {
                            scale: .5,
                            borderWidth: "4px",
                            borderColor: "#999999",
                            opacity: 1
                        }), TweenMax.ticker.addEventListener("tick", a)
                    }), $(".sticky-titles .slide-title").mouseenter(function (e) {
                        var t = $(this)[0].getBoundingClientRect(),
                            o = t.right + i + 10,
                            n = t.top + t.height - 30;
                        TweenLite.to(r, .5, {
                            x: o,
                            y: n,
                            scale: .7,
                            opacity: 1,
                            borderWidth: "6px",
                            borderColor: $("body").data("cursor-color")
                        }), TweenMax.ticker.removeEventListener("tick", a)
                    }), $(".sticky-titles .slide-title").mouseleave(function (e) {
                        TweenLite.to(r, .2, {
                            scale: .5,
                            borderWidth: "4px",
                            borderColor: "#999999",
                            opacity: 1
                        }), TweenMax.ticker.addEventListener("tick", a)
                    }), $(".parallax-wrap").mouseenter(function (e) {
                        TweenMax.to(this, .3, {
                            scale: 2
                        }), TweenMax.to(r, .3, {
                            scale: .9,
                            borderWidth: "2px",
                            opacity: 1
                        }), TweenMax.to($(this).children(), .3, {
                            scale: .5
                        }), n = !0
                    }), $("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
                        TweenMax.to(r, .3, {
                            scale: .7,
                            borderWidth: "6px",
                            opacity: .6,
                            borderColor: "#999"
                        })
                    }), $(".parallax-wrap.bigger").mouseenter(function (e) {
                        TweenMax.to(r, .3, {
                            scale: 1.35,
                            borderWidth: "2px",
                            opacity: 1
                        })
                    }), $(".parallax-wrap").mouseleave(function (e) {
                        TweenMax.to(this, .3, {
                            scale: 1
                        }), TweenMax.to(r, .3, {
                            scale: .5,
                            borderWidth: "4px",
                            opacity: 1,
                            borderColor: "#999999"
                        }), TweenMax.to($(this).children(), .3, {
                            scale: 1,
                            x: 0,
                            y: 0
                        }), n = !1
                    }), $("#magic-cursor").hasClass("light-content") ? ($(".sticky").mouseenter(function (e) {
                        TweenLite.to(r, .5, {
                            borderColor: $("body").data("cursor-hover-color")
                        })
                    }), $("#main .sticky").mouseenter(function (e) {
                        TweenLite.to(r, .5, {
                            borderColor: "#999"
                        })
                    }), $("#main .sticky-titles .slide-title").mouseenter(function (e) {
                        TweenLite.to(r, .5, {
                            borderColor: $("body").data("cursor-hover-color")
                        })
                    }), $(".parallax-wrap").mouseenter(function (e) {
                        TweenMax.to(r, .3, {
                            borderColor: $("body").data("cursor-hover-color")
                        })
                    }), $(".parallax-wrap.bigger").mouseenter(function (e) {
                        TweenMax.to(r, .3, {
                            borderColor: "#fff"
                        })
                    }), $(".white-section .parallax-wrap.bigger").mouseenter(function (e) {
                        TweenMax.to(r, .3, {
                            borderColor: "#000"
                        })
                    }), $("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
                        TweenMax.to(r, .3, {
                            borderColor: "#999"
                        })
                    })) : ($(".sticky").mouseenter(function (e) {
                        TweenLite.to(r, .5, {
                            borderColor: $("body").data("cursor-hover-color")
                        })
                    }), $("#main .sticky").mouseenter(function (e) {
                        TweenLite.to(r, .5, {
                            borderColor: "#999"
                        })
                    }), $("#main .sticky-titles .slide-title").mouseenter(function (e) {
                        TweenLite.to(r, .5, {
                            borderColor: $("body").data("cursor-hover-color")
                        })
                    }), $(".parallax-wrap").mouseenter(function (e) {
                        TweenMax.to(r, .3, {
                            borderColor: $("body").data("cursor-hover-color")
                        })
                    }), $(".parallax-wrap.bigger").mouseenter(function (e) {
                        TweenMax.to(r, .3, {
                            borderColor: "#000"
                        })
                    }), $("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
                        TweenMax.to(r, .3, {
                            borderColor: "#999"
                        })
                    })), $(".parallax-wrap").mousemove(function (e) {
                        ! function (e, o, n) {
                            var i = o.getBoundingClientRect(),
                                a = e.pageX - i.left,
                                l = e.pageY - i.top,
                                c = window.pageYOffset || document.documentElement.scrollTop;
                            t.x = i.left + i.width / 2 + (a - i.width / 2) / n, t.y = i.top + i.height / 2 + (l - i.height / 2 - c) / n, TweenMax.to(r, .3, {
                                x: t.x,
                                y: t.y
                            })
                        }(e, this, 2),
                            function (e, t) {
                                ! function (e, t, o, n) {
                                    var r = t.getBoundingClientRect(),
                                        i = e.pageX - r.left,
                                        a = e.pageY - r.top,
                                        l = window.pageYOffset || document.documentElement.scrollTop;
                                    TweenMax.to(o, .3, {
                                        x: (i - r.width / 2) / r.width * n,
                                        y: (a - r.height / 2 - l) / r.height * n,
                                        ease: Power2.easeOut
                                    })
                                }(e, t, t.querySelector(".parallax-element"), 20)
                            }(e, this)
                    }), $(".hide-ball").mouseenter(function (e) {
                        TweenMax.to("#ball", .2, {
                            borderWidth: "1px",
                            scale: 1,
                            opacity: 0
                        })
                    }), $(".hide-ball").mouseleave(function (e) {
                        TweenMax.to("#ball", .3, {
                            borderWidth: "4px",
                            scale: .5,
                            opacity: 1
                        })
                    }), $(".link").mouseenter(function (e) {
                        TweenMax.to("#ball", .2, {
                            borderWidth: "0px",
                            scale: 1.5,
                            backgroundColor: "rgba(153, 153, 153, 1)",
                            opacity: .15
                        }), TweenMax.to("#ball-loader", .2, {
                            borderWidth: "2px",
                            top: 4,
                            left: 4
                        })
                    }), $(".link").mouseleave(function (e) {
                        TweenMax.to("#ball", .3, {
                            borderWidth: "4px",
                            scale: .5,
                            backgroundColor: "rgba(153, 153, 153, 0)",
                            opacity: 1
                        }), TweenMax.to("#ball-loader", .2, {
                            borderWidth: "4px",
                            top: 0,
                            left: 0
                        })
                    }), s() || (e = !1)
                }, p), o != window.location && l && window.history.pushState({
                    path: o
                }, "", o)
            })
        }

        function s() {
            return $("html").hasClass("csstransitions")
        }
        firstLoad = !1, $("main").on("click", '[data-type="page-transition"]', function (t) {
            t.preventDefault();
            var o = $(this).attr("href");
            e || l(o, !0), firstLoad = !0
        }), $(window).on("popstate", function () {
            if (firstLoad) {
                var t = location.href;
                e || o == t || l(t, !1)
            }
            firstLoad = !0
        })
    })
}

class ClapatWebGL {
    constructor(e) {
        this.scene = new THREE.Scene, this.vertex = "varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}", this.material = e.material, this.fragment = e.fragment, this.uniforms = e.uniforms, this.renderer = new THREE.WebGLRenderer, this.width = window.innerWidth, this.height = window.innerHeight, this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(this.width, this.height), this.renderer.setClearColor(2303786, 1), this.container = document.getElementById("canvas-slider"), this.images = Array.from(document.querySelectorAll(".slide-img")), this.width = this.container.offsetWidth, this.height = this.container.offsetHeight, this.container.appendChild(this.renderer.domElement), this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, .001, 1e3), this.camera.position.set(0, 0, 2), this.current = 0, this.textures = [], this.isRunning = !1, this.paused = !0, this.initiate(() => {
            this.setupResize(), this.addObjects(), this.resize(), this.play()
        })
    }
    initiate(e) {
        const t = [];
        let i = this;
        this.images.forEach((e, s) => {
            let h = new Promise(t => {
                i.textures[s] = (new THREE.TextureLoader).load(e.src, t)
            });
            t.push(h)
        }), Promise.all(t).then(() => {
            e()
        })
    }
    setupResize() {
        window.addEventListener("resize", this.resize.bind(this))
    }
    resize() {
        let e, t;
        this.width = this.container.offsetWidth, this.height = this.container.offsetHeight, this.renderer.setSize(this.width, this.height), this.camera.aspect = this.width / this.height, this.imageAspect = this.textures[0].image.height / this.textures[0].image.width, this.height / this.width > this.imageAspect ? (e = this.width / this.height * this.imageAspect, t = 1) : (e = 1, t = this.height / this.width / this.imageAspect), this.material.uniforms.resolution.value.x = this.width, this.material.uniforms.resolution.value.y = this.height, this.material.uniforms.resolution.value.z = e, this.material.uniforms.resolution.value.w = t;
        const i = this.camera.position.z;
        this.camera.fov = 180 / Math.PI * 2 * Math.atan(1 / (2 * i)), this.plane.scale.x = this.camera.aspect, this.plane.scale.y = 1, this.camera.updateProjectionMatrix()
    }
    addObjects() {
        let e = (new THREE.TextureLoader).load("./images/pattern1.jpg");
        e.wrapS = e.wrapT = THREE.RepeatWrapping, this.material = new THREE.ShaderMaterial({
            uniforms: {
                effectFactor: {
                    type: "f",
                    value: .15
                },
                dispFactor: {
                    type: "f",
                    value: 0
                },
                currentImage: {
                    type: "t",
                    value: this.textures[0]
                },
                nextImage: {
                    type: "t",
                    value: this.textures[1]
                },
                disp: {
                    type: "t",
                    value: e
                },
                resolution: {
                    type: "v4",
                    value: new THREE.Vector4
                }
            },
            vertexShader: this.vertex,
            fragmentShader: this.fragment,
            transparent: !0,
            opacity: 1
        }), this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2), this.plane = new THREE.Mesh(this.geometry, this.material), this.scene.add(this.plane)
    }
    stop() {
        this.paused = !0
    }
    play() {
        this.paused = !1, this.render()
    }
    render() {
        this.paused || (requestAnimationFrame(this.render.bind(this)), this.renderer.render(this.scene, this.camera))
    }
}

function ShowcaseWebgl() {
    if ($("#showcase-slider-webgl-holder").length > 0) {
        var t = new ClapatWebGL({
            vertex: "varying vec2 vUv; void main() {  vUv = uv;  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\t}",
            fragment: "\n\t\t\t\tvarying vec2 vUv;\n\n\t\t\t\tuniform sampler2D currentImage;\n\t\t\t\tuniform sampler2D nextImage;\n\t\t\t\tuniform sampler2D disp;\n\t\t\t\tuniform float dispFactor;\n\t\t\t\tuniform float effectFactor;\n\t\t\t\tuniform vec4 resolution;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec2 uv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\n\t\t\t\t\tvec4 disp = texture2D(disp, uv);\n\t\t\t\t\tvec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);\n\t\t\t\t\tvec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);\n\t\t\t\t\tvec4 _currentImage = texture2D(currentImage, distortedPosition);\n\t\t\t\t\tvec4 _nextImage = texture2D(nextImage, distortedPosition2);\n\t\t\t\t\tvec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);\n\n\t\t\t\t\tgl_FragColor = finalTexture; }\n\n\t\t\t\t"
        });
        e = Array.from(document.getElementById("trigger-slides").querySelectorAll(".slide-wrap")), t.isRunning = !1, e.forEach(e => {
            e.addEventListener("click", function () {
                if (!t.isRunning) {
                    t.isRunning = !0, document.getElementById("trigger-slides").querySelectorAll(".active")[0].className = "", this.className = "active";
                    var e = parseInt(this.dataset.slide, 10);
                    t.material.uniforms.nextImage.value = t.textures[e], t.material.uniforms.nextImage.needsUpdate = !0, TweenLite.to(t.material.uniforms.dispFactor, 1, {
                        value: 1,
                        ease: "Sine.easeInOut",
                        onComplete: function () {
                            t.material.uniforms.currentImage.value = t.textures[e], t.material.uniforms.currentImage.needsUpdate = !0, t.material.uniforms.dispFactor.value = 0, t.isRunning = !1
                        }
                    })
                }
            })
        });
        ! function () {
            var e = Array.from(document.getElementById("quick-projects").querySelectorAll(".slide-wrap"));
            t.isRunning = !1, e.forEach(e => {
                e.addEventListener("mousemove", function () {
                    if (!$(this).hasClass("active") && !t.isRunning) {
                        t.isRunning = !0, document.getElementById("quick-projects").querySelectorAll(".active")[0].className = "", this.className = "active";
                        var e = parseInt(this.dataset.slide, 10);
                        t.material.uniforms.nextImage.value = t.textures[e], t.material.uniforms.nextImage.needsUpdate = !0, TweenLite.to(t.material.uniforms.dispFactor, .5, {
                            value: 1,
                            ease: "Sine.easeInOut",
                            onComplete: function () {
                                t.material.uniforms.currentImage.value = t.textures[e], t.material.uniforms.currentImage.needsUpdate = !0, t.material.uniforms.dispFactor.value = 0, t.isRunning = !1
                            }
                        })
                    }
                })
            })
        }()
    }
    var e
}