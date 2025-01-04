gsap.registerPlugin(ScrollTrigger, CustomEase);
let tlPU,
    tlTY,
    lenis,
    initHasStarted = !1,
    mm = gsap.matchMedia(),
    tabs = [],
    tabsHeader = [],
    tabsMain = [],
    tabsThank = [],
    tabsMobModal = [];
function initHome() {
    (initHasStarted = !0),
        window.addEventListener("resize", onresize),
        onresize(),
        mm.add("(min-width: 901px)", () => {
            gsap.to(".l-icons img", { rotation: 90, duration: (e) => 1 - e / 14, ease: "power4.inOut", scrollTrigger: { trigger: document.body, start: "top top", end: "+=240", scrub: !0 } });
        }),
        mm.add("(min-width: 769px)", () => {
            gsap.to(".l-frame", {
                scale: () => document.querySelector(".rule3").clientWidth / document.querySelector(".rule12").clientWidth,
                y: () => 0.5 * window.innerHeight + 28 + 0.543 * document.querySelector(".rule3").clientWidth,
                immediateRender: !1,
                ease: "none",
                scrollTrigger: { trigger: ".l-frame", start: "bottom bottom-=25", end: "bottom top", scrub: !0, invalidateOnRefresh: !0 },
            });
        }),
        document.querySelectorAll(".p-med .word").forEach((e) => {
            gsap.to(e.querySelector("span"), { y: 0, ease: "power4.out", duration: 0.5, scrollTrigger: { trigger: e, toggleActions: "play play reverse reverse", start: "top 75%", end: "+=1" } });
        });
    const e = document.querySelectorAll(".mwg_landing1 .letter span"),
        t = shuffleArray(Array.from(e)),
        o = document.querySelector(".mwg_landing1").clientHeight + 100;
    for (let n = 0; n < e.length; n++) gsap.to(t[n], { y: 0, ease: "expo.inOut", duration: 0.8, scrollTrigger: { trigger: ".mwg_landing1", start: "top 95%-=" + (o / e.length) * n, end: "+=1", toggleActions: "play none reverse none" } });
    mm.add("(min-width: 769px)", () => {
        const e = document.querySelector(".mwg_landing2"),
            t = e.querySelector(".pin"),
            o = e.querySelectorAll(".card");
        ScrollTrigger.create({ trigger: t, start: "top top", end: "bottom bottom", pin: !0, pinSpacing: !1, scrub: !0 }), gsap.set(o, { yPercent: 50, y: 0.5 * window.innerHeight + 1 });
        const n = gsap.timeline({ paused: !0, scrollTrigger: { trigger: e, start: "top top", end: "bottom bottom", scrub: !0 } });
        n.to(o, { yPercent: -50, y: -0.5 * window.innerHeight, duration: 1, stagger: -0.12, ease: CustomEase.create("custom", "M0,0 C0,0 0.098,0.613 0.5,0.5 0.899,0.386 1,1 1,1") }, "sameStep"),
            n.to(o, { rotation: () => 20 * (Math.random() - 0.5), stagger: -0.12, duration: 0.5, ease: "power3.out" }, "sameStep"),
            n.to(o, { rotation: 0, stagger: -0.12, duration: 0.5, ease: "power3.in" }, "sameStep+=0.5");
    }),
        gsap.to(".mwg_landing3 .letter", { yPercent: 100, stagger: { each: 0.05, from: "random" }, ease: "power1.inOut", scrollTrigger: { trigger: ".mwg_landing3 ul", start: "33.33% bottom", end: "120% bottom", scrub: 1 } }),
        gsap.to(".interactive img", { scale: 1.2, stagger: 0.25, ease: "none", scrollTrigger: { trigger: ".interactive", start: "top bottom", end: "bottom top", scrub: !0 } }),
        mm.add("(min-width: 769px)", () => {
            const e = document.querySelector(".mwg_landing4 .text");
            lettersInSpanHome(e);
            const t = document.querySelectorAll(".mwg_landing4 .letter"),
                o = e.clientWidth - window.innerWidth,
                n = gsap.to(e, { x: -o + "px", ease: "none", scrollTrigger: { trigger: ".mwg_landing4 .container", pin: !0, scrub: !0, end: "+=" + o } });
            t.forEach((e) => {
                const t = { y: (Math.floor(7 * Math.random()) + 10) * (20 * Math.round(Math.random()) - 10), rotation: (Math.floor(11 * Math.random()) + 10) * (2 * Math.round(Math.random()) - 1) };
                gsap.fromTo(e, { rotation: t.rotation, yPercent: t.y }, { rotation: 0, yPercent: 0, ease: "elastic.out(1.2, 1)", scrollTrigger: { trigger: e, containerAnimation: n, start: "left 100%", end: "left 0%", scrub: 0.5 } });
            });
        }),
        mm.add("(max-width: 768px)", () => {
            ScrollTrigger.create({ trigger: ".l-details", endTrigger: "footer", pin: ".l-sentence", pinSpacing: !1, start: "bottom bottom", end: "top bottom" });
        });
    const n = document.querySelector(".sentence1 p"),
        r = document.querySelector(".sentence2 p"),
        a = gsap.timeline({ paused: !0 });
    a.to(n, { x: -n.clientWidth / 2, ease: "none", duration: 10, repeat: -1 }, "st0"),
        a.fromTo(r, { x: -r.clientWidth / 2 }, { x: 0, ease: "none", duration: 10, repeat: -1 }, "st0"),
        gsap.to(n, { y: "-100%", ease: "power1.inOut", scrollTrigger: { trigger: "footer .container", start: "top 60%", end: "bottom 60%", scrub: 1.5 } }),
        gsap.to(r, { y: "0%", ease: "power1.inOut", scrollTrigger: { trigger: "footer .container", start: "top 60%", end: "bottom 60%", scrub: 1.5 } }),
        ScrollTrigger.create({
            trigger: "footer .container",
            start: "top bottom",
            onEnter: () => {
                a.play();
            },
            onLeaveBack: () => {
                a.pause();
            },
        }),
        document.querySelectorAll(".l-circles").forEach((e) => {
            gsap.to(e.querySelectorAll("div"), { scaleY: 1, stagger: { each: -0.2, from: "center" }, duration: 0.5, ease: "back.out(3)", scrollTrigger: { trigger: e, start: "top bottom", end: "bottom 50%", scrub: !0 } });
        }),
        ScrollTrigger.create({
            trigger: ".l-frame",
            start: "top 1%",
            onEnter: () => {
                document.body.classList.add("header-on");
            },
            onLeaveBack: () => {
                document.body.classList.remove("header-on");
            },
        }),
        ScrollTrigger.create({
            trigger: ".form-waiting-foo",
            start: "top bottom",
            onEnter: () => {
                document.body.classList.remove("header-on"), document.body.classList.add("logo-foo-on");
            },
            onLeaveBack: () => {
                document.body.classList.add("header-on"), document.body.classList.remove("logo-foo-on");
            },
        }),
        (tlTY = gsap.timeline({
            paused: !0,
            onComplete: () => {
                document.body.classList.remove("thankyou"), killTabIndex(), activeTabIndex(tabsMain);
            },
        })),
        tlTY.from(".l-thankyou .fond", { autoAlpha: 0, duration: 0.3 }, "st0"),
        tlTY.from(".l-thankyou .plus", { scale: 0, rotation: 90, duration: (e) => 1.5 - 0.4 * e, stagger: 0.2, ease: "expo.inOut", delay: 0.1 }, "st0"),
        tlTY.from(".l-thankyou .container", { autoAlpha: 0, duration: 0.5, delay: 1, ease: "expo.inOut" }, "st0"),
        tlTY.to(".l-thankyou .container", { autoAlpha: 0, duration: 0.5, ease: "expo.inOut" }, "st1"),
        tlTY.to(".l-thankyou .plus", { scale: 2.1, rotation: -90, duration: (e) => 1.5 - 0.4 * e, stagger: 0.2, ease: "expo.inOut" }, "st1"),
        tlTY.to(".l-thankyou .fond", { autoAlpha: 0, duration: 0.3, delay: 0.7 }, "st1"),
        document.querySelectorAll(".sec-black").forEach((e) => {
            ScrollTrigger.create({
                trigger: e,
                start: "top 30px",
                onEnter: () => {
                    document.body.classList.add("menu-white");
                },
                onLeaveBack: () => {
                    document.body.classList.remove("menu-white");
                },
            });
        }),
        document.querySelectorAll(".sec-white").forEach((e) => {
            ScrollTrigger.create({
                trigger: e,
                start: "top 30px",
                onEnter: () => {
                    document.body.classList.remove("menu-white");
                },
                onLeaveBack: () => {
                    document.body.classList.add("menu-white");
                },
            });
        }),
        mm.add("(min-width: 769px)", () => {
            ScrollTrigger.create({
                trigger: ".mwg_landing1",
                start: "top 95%",
                onEnter: () => {
                    showOnScreen("005");
                },
                onLeaveBack: () => {
                    hideOnScreen();
                },
            }),
                ScrollTrigger.create({
                    trigger: ".mwg_landing2",
                    start: "top top",
                    end: "bottom 150%",
                    onEnter: () => {
                        showOnScreen("032");
                    },
                    onEnterBack: () => {
                        showOnScreen("032");
                    },
                    onLeave: () => {
                        hideOnScreen();
                    },
                    onLeaveBack: () => {
                        showOnScreen("005");
                    },
                }),
                ScrollTrigger.create({
                    trigger: ".l-details",
                    start: "bottom 60%",
                    onEnter: () => {
                        showOnScreen("024");
                    },
                    onLeaveBack: () => {
                        hideOnScreen();
                    },
                }),
                ScrollTrigger.create({
                    trigger: "footer .sentence1",
                    start: "top bottom",
                    onEnter: () => {
                        showOnScreen("043");
                    },
                    onLeaveBack: () => {
                        showOnScreen("024");
                    },
                });
        }),
        mm.add("(max-width: 768px)", () => {
            ScrollTrigger.create({
                trigger: ".l-hero-bottom form",
                endTrigger: "footer",
                start: "bottom top",
                end: "top bottom",
                onEnter: () => {
                    document.body.classList.add("btn-fixed-on");
                },
                onEnterBack: () => {
                    document.body.classList.add("btn-fixed-on");
                },
                onLeave: () => {
                    document.body.classList.remove("btn-fixed-on");
                },
                onLeaveBack: () => {
                    document.body.classList.remove("btn-fixed-on");
                },
            });
        }),
        gsap.to(".intro", {
            duration: 0.5,
            delay: 0.4,
            autoAlpha: 0,
            ease: "power2.inOut",
            onComplete: () => {
                document.querySelector(".intro").remove();
            },
        });
}
function onresize() {
    const e = window.innerWidth,
        t = Math.max(e - document.documentElement.clientWidth, 0);
    document.documentElement.style.setProperty("--scrollbar-width", `${t}px`);
    const o = document.querySelector(".l-motion .word").clientHeight;
    document.documentElement.style.setProperty("--video-margin", 0.543 * document.querySelector(".rule3").clientWidth - 23 - 0.65 * o + "px");
}
function shuffleArray(e) {
    for (let t = e.length - 1; t > 0; t--) {
        const o = Math.floor(Math.random() * (t + 1));
        [e[t], e[o]] = [e[o], e[t]];
    }
    return e;
}
function lettersInSpanHome(e) {
    const t = e.textContent;
    e.innerHTML = t
        .split("")
        .map((e) => (" " === e ? "<span>&nbsp;</span>" : `<span class="letter">${e}</span>`))
        .join(" ");
}
function showOnScreen(e) {
    document.body.classList.add("on-screen-on"), (document.querySelector(".on-screen .index").textContent = e), gsap.fromTo(".on-screen", { scale: 0.97, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: "back.out(20)", duration: 0.16 });
}
function hideOnScreen() {
    document.body.classList.remove("on-screen-on"), gsap.to(".on-screen", { scale: 0.97, autoAlpha: 0, ease: "expo.in", duration: 0.16 });
}
function killTabIndex() {
    tabs.forEach((e) => {
        e.setAttribute("tabindex", "-1");
    });
}
function activeTabIndex(e) {
    e.forEach((e, t) => {
        e.setAttribute("tabindex", t + 1);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    if (
        (document.querySelectorAll("button, input, a").forEach((e) => {
            tabs.push(e);
        }),
            document
                .querySelector("header .left")
                ?.querySelectorAll("button:not(.to-pop-up), input, a")
                .forEach((e) => {
                    tabsHeader.push(e);
                }),
            document
                .querySelector("main")
                .querySelectorAll("button, input, a")
                .forEach((e) => {
                    tabsMain.push(e);
                }),
            document
                .querySelector("footer")
                ?.querySelectorAll("button, input, a")
                .forEach((e) => {
                    tabsMain.push(e);
                }),
            document
                .querySelector(".l-thankyou")
                ?.querySelectorAll("button, input, a")
                .forEach((e) => {
                    tabsThank.push(e);
                }),
            document
                .querySelector(".mmj")
                ?.querySelectorAll("button, input, a")
                .forEach((e) => {
                    tabsMobModal.push(e);
                }),
            navigator.userAgent.includes("Chrome") ? document.body.classList.add("chrome") : navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome") && document.body.classList.add("safari"),
            document.body.classList.contains("no-smooth") || (lenis = new Lenis({ autoRaf: !0 })),
            document.querySelector(".homepage"))
    ) {
        new FontFace("LayGrotesk", "url(assets/t/LayGrotesk-Medium.woff)").load().then(() => {
            initHasStarted || initHome();
        }),
            gsap.delayedCall(1, () => {
                initHasStarted || initHome();
            });
    }
    (tlPU = gsap.timeline({
        paused: !0,
        onReverseComplete: () => {
            killTabIndex(), activeTabIndex(tabsMain);
        },
    })),
        tlPU.to(".to-pop-up", { maskImage: "linear-gradient(90deg, transparent 100%, #000 115%)", duration: 0.3, ease: "power4.inOut" }, "st0"),
        tlPU.to("header .btn-close", { x: 0, duration: 0.3, ease: "power4.inOut" }, "st0"),
        document.addEventListener("click", (e) => {
            e.target.closest(".to-pop-up")
                ? (document.body.classList.add("pop-up-open"),
                    tlPU.play(),
                    gsap.delayedCall(0.3, () => {
                        document.querySelector(".form-pp input").focus();
                    }),
                    killTabIndex(),
                    activeTabIndex(tabsHeader))
                : e.target.closest(".btn-close") && document.querySelector(".pop-up-open")
                    ? (document.body.classList.remove("pop-up-open"), tlPU.reverse())
                    : e.target.closest(".btn-back-home")
                        ? (document.body.classList.remove("mmj-on"),
                            document.body.classList.remove("pop-up-open"),
                            tlPU.reverse(),
                            tlTY.play(),
                            document.querySelectorAll("form").forEach((e) => {
                                e.reset();
                            }),
                            lenis.start())
                        : e.target.closest(".to-mob-modal")
                            ? (document.body.classList.add("mmj-on"),
                                killTabIndex(),
                                activeTabIndex(tabsMobModal),
                                gsap.delayedCall(0.3, () => {
                                    document.querySelector(".mmj form input").focus();
                                }))
                            : (e.target.closest(".close-modal") || (e.target.closest(".btn-close") && document.querySelector(".mmj-on"))) && (document.body.classList.remove("mmj-on"), killTabIndex(), activeTabIndex(tabsMain));
        }),
        document.querySelectorAll(".form-waiting").forEach((e) => {
            e.addEventListener("submit", (t) => {
                e.querySelector("input").blur(), document.body.classList.add("thankyou"), t.preventDefault(), tlTY.play(0), tlTY.tweenTo("st1"), lenis.stop();
                const o = e.querySelector("input").value,
                    n = new FormData();
                n.append("email", o),
                    fetch("ajax_mailerlite.php", { method: "POST", body: n })
                        .then((e) => e.text())
                        .then(() => { })
                        .catch(() => {
                            alert("Bug pour enregistrer le mail");
                        }),
                    killTabIndex(),
                    activeTabIndex(tabsThank);
            });
        });
}),
    window.matchMedia("(pointer: fine)").matches &&
    (document.querySelectorAll(".social a").forEach((e) => {
        e.addEventListener("mouseenter", () => {
            e.classList.add("play"),
                e.querySelector("span")?.addEventListener(
                    "animationend",
                    () => {
                        e.classList.remove("play");
                    },
                    { once: !0 }
                );
        });
    }),
        document.querySelectorAll(".btn-join").forEach((e) => {
            e.addEventListener("mouseenter", () => {
                e.classList.add("play");
                (e.querySelector(".st4") || e.querySelector(".st2")).addEventListener(
                    "animationend",
                    () => {
                        e.classList.remove("play");
                    },
                    { once: !0 }
                );
            });
        })),
    document.addEventListener("keydown", (e) => {
        "Escape" === e.code &&
            (document.querySelector(".pop-up-open") && (document.body.classList.remove("pop-up-open"), tlPU.reverse()),
                document.querySelector(".thankyou") &&
                (tlTY.play(),
                    document.querySelectorAll("form").forEach((e) => {
                        e.reset();
                    }),
                    lenis.start()),
                document.querySelector(".mmj-on") && document.body.classList.remove("mmj-on"));
    });
