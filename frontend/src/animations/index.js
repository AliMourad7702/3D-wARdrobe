import gsap from "gsap";

// Declare a general timeline to use in all the animation functions.

const tl = gsap.timeline();

// Preloader Animation
export const preLoaderAnim = () => {
    const tl = gsap.timeline({ immediateRender: true });

    tl.to("body", {
        duration: 0.1,
        css: { overflowY: "hidden" },
        ease: "power3.inOut",
    })
        .to(".preloader", {
            duration: 1.5,
            height: "0vh",
            ease: "Power3.easeOut",
        })
        .to(".preloader", {
            duration: 0,
            css: { display: "none" },
        });
};

