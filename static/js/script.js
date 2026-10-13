const menu = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menu && navLinks) {
    menu.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        menu.setAttribute("aria-expanded", open ? "true" : "false");
    });
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});


/* =========================================
   UNIFIED SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(".reveal");

    // Ensure content is visible if IntersectionObserver
    // is not supported by the browser.
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("show", "active");
        });
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show", "active");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px 0px 0px"
        }
    );

    revealElements.forEach((element) => {
        element.style.transitionDelay = "0s";
        revealObserver.observe(element);
    });

});

/* =========================================
   SCROLL EFFECTS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const heroCard = document.querySelector(
        ".hero-visual .visual-card"
    );

    const portfolioItems = document.querySelectorAll(
        ".portfolio-item"
    );

    let ticking = false;


    function updateScrollEffects() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        /* -----------------------------
           1. SCROLL PROGRESS
        ----------------------------- */

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;


        document.documentElement.style.setProperty(
            "--scroll-progress",
            `${progress}%`
        );


        /* -----------------------------
           2. HERO PARALLAX
        ----------------------------- */

        if (heroCard && scrollTop < window.innerHeight) {

            const parallax =
                Math.min(scrollTop * 0.18, 80);

            heroCard.style.setProperty(
                "--hero-parallax",
                `${parallax}px`
            );

        }


        /* -----------------------------
           3. PORTFOLIO SCROLL EFFECT
        ----------------------------- */

        portfolioItems.forEach((item) => {

            const rect = item.getBoundingClientRect();

            const windowHeight = window.innerHeight;

            const center =
                rect.top + rect.height / 2;

            const distance =
                center - windowHeight / 2;

            const normalized =
                Math.max(
                    -1,
                    Math.min(
                        1,
                        distance / windowHeight
                    )
                );


            const shift =
                normalized * -10;

            const scale =
                1 - Math.abs(normalized) * 0.015;


            item.style.setProperty(
                "--portfolio-shift",
                `${shift}px`
            );

            item.style.setProperty(
                "--portfolio-scale",
                scale
            );

        });

        ticking = false;
    }


    function requestScrollUpdate() {

        if (!ticking) {

            window.requestAnimationFrame(
                updateScrollEffects
            );

            ticking = true;

        }

    }


    window.addEventListener(
        "scroll",
        requestScrollUpdate,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        requestScrollUpdate
    );


    updateScrollEffects();

});


/* =========================================
   PREMIUM CUSTOM CURSOR
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");


    if (!cursorDot || !cursorRing) return;


    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    /* Mouse position */

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

    });


    /* Smooth trailing animation */

    function animateCursor() {

        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);

    }


    animateCursor();


    /* Hover effect */

    const interactiveElements = document.querySelectorAll(
        "a, button, .service-card, .portfolio-item"
    );


    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            cursorRing.classList.add("cursor-hover");

        });


        element.addEventListener("mouseleave", () => {

            cursorRing.classList.remove("cursor-hover");

        });

    });

});


/* =========================================
   PIXEL DIGITAL - PORTFOLIO WORK SHOWCASE
   ALL 6 CATEGORIES + BACK BUTTON
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const selectedWork = document.querySelector("#selected-work");

    // IMPORTANT: Actual Portfolio section ID is "work"
    const portfolioSection = document.querySelector("#work");

    const workCards = document.querySelectorAll(".work-card[data-work]");

    const selectedWorkTitle = document.querySelector("#selected-work-title");
    const selectedWorkDescription = document.querySelector("#selected-work-description");

    const backButton = document.getElementById("portfolioBackBtn");

    if (!selectedWork) {
        console.error("Selected Work section not found.");
        return;
    }

    /* GALLERY CONFIGURATION */

    const galleryMap = {
        branding: "#gallery-branding",
        social: "#gallery-social",
        ai: "#gallery-ai",
        ads: "#gallery-ads",
        seo: "#gallery-seo",
        graphic: "#gallery-graphic"
    };

    /* CATEGORY TITLES */

    const titleMap = {
        branding: "Branding",
        social: "Social Media",
        ai: "AI Content",
        ads: "Google Ads",
        seo: "SEO",
        graphic: "Graphic Design"
    };

    /* CATEGORY DESCRIPTIONS */

    const descriptionMap = {
        branding:
            "Brand identity, visual systems and creative design built to make brands memorable.",

        social:
            "Social media creatives designed to increase engagement, reach and brand awareness.",

        ai:
            "AI-powered visual content, creative campaigns and engaging digital experiences.",

        ads:
            "High-converting ad creatives designed to capture attention and generate better results.",

        seo:
            "Visual content and creative assets designed to support stronger search visibility and local growth.",

        graphic:
            "Professional graphic design created to communicate ideas clearly and make brands stand out."
    };

    /* HIDE BACK BUTTON INITIALLY */

    if (backButton) {
        backButton.classList.remove("portfolio-back-visible");
    }

    /* CATEGORY CLICK */

    workCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const workType = card.getAttribute("data-work");

            const gallerySelector = galleryMap[workType];

            if (!gallerySelector) {
                console.error("Gallery mapping not found:", workType);
                return;
            }

            const selectedGallery = document.querySelector(gallerySelector);

            if (!selectedGallery) {
                console.error("Gallery not found:", gallerySelector);
                return;
            }

            // Show Selected Work section
            selectedWork.classList.add("show");

            // Hide all galleries
            document.querySelectorAll(".work-gallery").forEach(function (gallery) {
                gallery.classList.remove("active-gallery");
            });

            // Show selected category gallery
            selectedGallery.classList.add("active-gallery");

            // Update title
            if (selectedWorkTitle && titleMap[workType]) {
                selectedWorkTitle.textContent = titleMap[workType];
            }

            // Update description
            if (selectedWorkDescription && descriptionMap[workType]) {
                selectedWorkDescription.textContent = descriptionMap[workType];
            }

            // Show Back Button
            if (backButton) {
                backButton.classList.add("portfolio-back-visible");
            }

            // Scroll to gallery
            setTimeout(function () {
                selectedWork.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);

        });

    });

    /* BACK TO MAIN PORTFOLIO */

    if (backButton) {

        backButton.addEventListener("click", function () {

            // Hide Selected Work
            selectedWork.classList.remove("show");

            // Hide all galleries
            document.querySelectorAll(".work-gallery").forEach(function (gallery) {
                gallery.classList.remove("active-gallery");
            });

            // Hide Back Button
            backButton.classList.remove("portfolio-back-visible");

            // Return to the actual Portfolio section
            if (portfolioSection) {
                portfolioSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    }

});

/* =========================================
   PIXEL DIGITAL — PREMIUM TEXT INTERACTION
========================================= */

(function () {
    const section = document.querySelector(
        ".animated-brand-section"
    );

    if (!section) return;

    const content = section.querySelector(
        ".brand-statement-inner"
    );

    const heading = section.querySelector(
        ".animated-brand-heading"
    );

    const words = section.querySelectorAll(
        ".spin-word"
    );

    if (!content || !heading) return;

    /* Reveal animation on scroll */

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        section.classList.add("is-visible");
                        observer.unobserve(section);
                    }
                });
            },
            {
                threshold: 0.2
            }
        );

        observer.observe(section);
    } else {
        section.classList.add("is-visible");
    }

    /* Mouse interaction: subtle 3D tilt */

    const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!canHover) return;

    let animationFrame = null;

    section.addEventListener("pointermove", function (event) {
        const rect = content.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const normalizedX = (x - centerX) / centerX;
        const normalizedY = (y - centerY) / centerY;

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        animationFrame = requestAnimationFrame(() => {
            content.classList.add("pointer-active");

            content.style.setProperty(
                "--pointer-x",
                `${x}px`
            );

            content.style.setProperty(
                "--pointer-y",
                `${y}px`
            );

            heading.style.transform = `
                perspective(1000px)
                rotateX(${normalizedY * -2.5}deg)
                rotateY(${normalizedX * 3.5}deg)
            `;

            words.forEach((word) => {
                const wordRect = word.getBoundingClientRect();

                const wordX =
                    wordRect.left + wordRect.width / 2;

                const wordY =
                    wordRect.top + wordRect.height / 2;

                const dx = event.clientX - wordX;
                const dy = event.clientY - wordY;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                const influence = Math.max(
                    0,
                    1 - distance / 280
                );

                const lift = influence * -5;
                const scale = 1 + influence * 0.025;

                word.style.translate =
                    `0 ${lift}px`;

                word.style.scale =
                    `${scale}`;
            });

        });
    });

    /* Reset smoothly when the pointer leaves */

    section.addEventListener("pointerleave", function () {
        content.classList.remove("pointer-active");

        heading.style.transform = "";

        words.forEach((word) => {
            word.style.translate = "";
            word.style.scale = "";
        });

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    });

})();

