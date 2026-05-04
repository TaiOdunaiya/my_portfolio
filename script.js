gsap.registerPlugin(ScrollTrigger);

// Set hero elements to hidden before preloader finishes
gsap.set('.logo', { opacity: 0, y: -30 });
gsap.set('.circle', { opacity: 0, scale: 0 });
gsap.set('.hud-frame', { opacity: 0, scale: 0.6 });
gsap.set('.bat-symbol', { opacity: 0 });
gsap.set('.featured-text-1', { opacity: 0, x: -60 });
gsap.set('.featured-text-2', { opacity: 0, x: 60 });
gsap.set('.section-1 .main-btn', { opacity: 0, scale: 0 });

const preloaderEl = document.querySelector('.preloader');

const preloaderTl = gsap.timeline({
    onComplete: () => {
        preloaderEl.style.display = 'none';
        triggerHeroSequence();
    }
});
preloaderTl
    .to('.preloader-bar-fill', { width: '100%', duration: 1.2, ease: 'power2.inOut' })
    .to('.preloader-logo', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, '-=0.15')
    .to('.preloader', { opacity: 0, duration: 0.35, ease: 'power2.in' });

function triggerHeroSequence() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
        .to('.logo',               { opacity: 1, y: 0, duration: 0.6 })
        .to('.circle-1',            { opacity: 1, scale: 1, duration: 0.5 }, '-=0.3')
        .to('.circle-2',            { opacity: 1, scale: 1, duration: 0.5 }, '-=0.4')
        .to('.circle-3',            { opacity: 1, scale: 1, duration: 0.5 }, '-=0.4')
        .to('.circle-4',            { opacity: 1, scale: 1, duration: 0.5 }, '-=0.4')
        .to('.hud-frame',           { opacity: 1, scale: 1, duration: 0.7 }, '-=0.35')
        .to('.bat-symbol',          { opacity: 0.7, duration: 0.5 }, '-=0.2')
        .to('.featured-text-1',     { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
        .to('.featured-text-2',     { opacity: 1, x: 0, duration: 0.5 }, '-=0.45')
        .to('.section-1 .main-btn', { opacity: 1, scale: 1, duration: 0.5 }, '-=0.3');
}

//mouse circle
const mouseCircle = document.querySelector(".mouse-circle")
const mouseDot = document.querySelector(".mouse-dot")

let mouseCircleBool = true;

const mouseCircleFn = (x, y) => {
    mouseCircleBool && (mouseCircle.style.cssText = `top:${y}px; left:${x}px; opacity:1`);
    mouseDot.style.cssText = `top:${y}px; left:${x}px; opacity:1`;
};
// end of mouse circle

// Animated Circles — removed (replaced by CSS HUD animations)

// Sticky Element
let hoveredElPosition = [];

const stickyElement = (x, y, hoveredEl) => {
    if (hoveredEl.classList.contains("sticky")) {
        hoveredElPosition.length < 1 &&
            (hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft]);

        hoveredEl.style.cssText = `top:${y}px; left:${x}px`;

        if (hoveredEl.offsetTop <= hoveredElPosition[0] - 100 ||
            hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
            hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
            hoveredEl.offsetLeft >= hoveredElPosition[1] + 100

        ) {
            hoveredEl.style.cssText = "";
            hoveredElPosition = [];

        }

        hoveredEl.onmouseleave = () => {
            hoveredEl.style.cssText = "";
            hoveredElPosition = [];
        }
    }
    // End Sticky Element
}

// Mouse Circle Transform
const mouseCircleTransform = (hoveredEl) => {
    if (hoveredEl.classList.contains("pointer-enter")) {
        hoveredEl.onmousemove = () => {
            mouseCircleBool = false;
            mouseCircle.style.cssText = `
            width: ${hoveredEl.getBoundingClientRect().width}px;
            height:${hoveredEl.getBoundingClientRect().height}px;
            top:${hoveredEl.getBoundingClientRect().top}px;
            left:${hoveredEl.getBoundingClientRect().left}px;
            opacity: 1;
            transform: translate(0,0);
            animation: none;
            border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
            transition: width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s, border-radius 0.5s; 
            `;
        };
        hoveredEl.onmouseleave = () => {
            mouseCircleBool = true;
        }
        document.onscroll = () => {
            if (!mouseCircleBool) {
                mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
            }
        }
    }
};
// End of Mouse Circle Transform

document.body.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    mouseCircleFn(x, y);

    const hoveredEl = document.elementFromPoint(x, y);

    stickyElement(x, y, hoveredEl);
    mouseCircleTransform(hoveredEl);

});

document.body.addEventListener('mouseleave', () => {
    mouseCircle.style.opacity = "0"
    mouseDot.style.opacity = "0"
})

// End of Main Button

// Progress Bar
const sections = document.querySelectorAll("section")
const progressBar = document.querySelector(".progress-bar");
const halfCircles = document.querySelectorAll(".half-circle");
const halfCircleTop = document.querySelectorAll(".half-circle-top");
const progressBarCircle = document.querySelector(".progress-bar-circle");
const pbPercent = document.querySelector('.pb-percent');

let scrolledPortion = 0;
let scrollBool = false;
let imageWrapper = false;

const progressBarFn = (bigImgWrapper) => {
    imageWrapper = bigImgWrapper;
    let pageHeight = 0;
    const pageViewportHeight = window.innerHeight;

    if (!imageWrapper) {
        pageHeight = document.documentElement.scrollHeight;
        scrolledPortion = window.scrollY;
    } else {
        pageHeight = imageWrapper.firstElementChild.scrollHeight;
        scrolledPortion = imageWrapper.scrollTop;
    }




    const scrolledPortionDegree = PortfolioUtils.scrollProgressDegrees(
        scrolledPortion,
        pageHeight,
        pageViewportHeight
    );

    halfCircles.forEach((el) => {
        el.style.transform = `rotate(${scrolledPortionDegree}deg)`;
    });

    if (scrolledPortionDegree >= 180) {
        halfCircles[0].style.transform = "rotate(180deg)";
        halfCircleTop.forEach((el) => {
            el.style.opacity = "0";
        });
    } else {
        halfCircleTop.forEach((el) => {
            el.style.opacity = "1";
        });
    }

    if (pbPercent) {
        const pct = Math.min(100, Math.round((scrolledPortionDegree / 360) * 100));
        pbPercent.textContent = pct + '%';
    }

    scrollBool = PortfolioUtils.isScrolledToBottom(
        scrolledPortion,
        pageViewportHeight,
        pageHeight
    );
};
// Progress Bar Click
progressBar.addEventListener("click", (e) => {
    e.preventDefault();

    if (!imageWrapper) {
        const sectionPositions = Array.from(sections).map((section) =>
            scrolledPortion + section.getBoundingClientRect().top
        );

        const position = sectionPositions.find((sectionPosition) => {
            return sectionPosition > scrolledPortion
        });

        scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
    } else {
        scrollBool ? imageWrapper.scrollTo(0, 0) : imageWrapper.scrollTo(0, imageWrapper.scrollHeight);
    }


});
// End of Progress Bar Click
progressBarFn();
// End of Progress Bar

// Navigation
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

const scrollFn = () => {
    menuIcon.classList.add('show-menu-icon');
    navbar.classList.add("hide-navbar");

    if (window.scrollY === 0) {
        menuIcon.classList.remove('show-menu-icon');
        navbar.classList.remove('hide-navbar');
    }
    progressBarFn();
}

document.addEventListener('scroll', scrollFn);

menuIcon.addEventListener('click', () => {
    menuIcon.classList.remove('show-menu-icon');
    navbar.classList.remove('hide-navbar');
})
// End of Navigation

// Scramble Text on Nav Hover
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
document.querySelectorAll('.navbar-link').forEach(link => {
    const original = link.textContent.trim();
    let scrambleInterval;
    link.addEventListener('mouseenter', () => {
        let iterations = 0;
        clearInterval(scrambleInterval);
        scrambleInterval = setInterval(() => {
            link.textContent = original.split('').map((char, i) => {
                if (i < iterations) return original[i];
                return char === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }).join('');
            if (iterations >= original.length) {
                clearInterval(scrambleInterval);
                link.textContent = original;
            }
            iterations += 0.5;
        }, 40);
    });
    link.addEventListener('mouseleave', () => {
        clearInterval(scrambleInterval);
        link.textContent = original;
    });
});

// Scramble text on main-btn hover
document.querySelectorAll('.main-btn').forEach(btn => {
    const textEl = btn.querySelector('.btn-text');
    if (!textEl) return;
    const original = textEl.textContent.trim();
    let scrambleInterval;
    btn.addEventListener('mouseenter', () => {
        let iterations = 0;
        clearInterval(scrambleInterval);
        scrambleInterval = setInterval(() => {
            textEl.textContent = original.split('').map((char, i) => {
                if (i < iterations) return original[i];
                return char === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }).join('');
            if (iterations >= original.length) {
                clearInterval(scrambleInterval);
                textEl.textContent = original;
            }
            iterations += 0.5;
        }, 40);
    });
    btn.addEventListener('mouseleave', () => {
        clearInterval(scrambleInterval);
        textEl.textContent = original;
    });
});

// Scramble text on service title hover
document.querySelectorAll('.svc-title').forEach(title => {
    const original = title.textContent.trim();
    let scrambleInterval;
    const btn = title.closest('.service-btn');
    btn.addEventListener('mouseenter', () => {
        let iterations = 0;
        clearInterval(scrambleInterval);
        scrambleInterval = setInterval(() => {
            title.textContent = original.split('').map((char, i) => {
                if (i < iterations) return original[i];
                return char === '_' ? '_' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }).join('');
            if (iterations >= original.length) {
                clearInterval(scrambleInterval);
                title.textContent = original;
            }
            iterations += 0.5;
        }, 40);
    });
    btn.addEventListener('mouseleave', () => {
        clearInterval(scrambleInterval);
        title.textContent = original;
    });
});
// End of Scramble Text

//Projects
const container = document.querySelector('.container');
const projects = document.querySelectorAll(".project");
const projectHiddenBtn = document.querySelector(".project-hide-btn")

projects.forEach((project, i) => {
    project.addEventListener('mouseenter', () => {
        project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight - project.offsetHeight + 20}px`;
    });

    project.addEventListener('mouseleave', () => {
        project.firstElementChild.style.top = "2rem";
    });

    // Big Project Image
    project.addEventListener("click", () => {
        const bigImgWrapper = document.createElement('div');
        bigImgWrapper.className = "project-img-wrapper";
        container.appendChild(bigImgWrapper);

        const bigImg = document.createElement('img');
        bigImg.className = "project-img";
        const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
        bigImg.setAttribute("src", `${imgPath}-big.jpg`);
        bigImgWrapper.appendChild(bigImg);
        document.body.style.overflow = "hidden";

        document.removeEventListener("scroll", scrollFn);

        mouseCircle.style.opacity = 0;

        progressBarFn(bigImgWrapper);

        bigImgWrapper.onscroll = () => {
            progressBarFn(bigImgWrapper);
        }

        projectHiddenBtn.classList.add("change");

        projectHiddenBtn.onclick = () => {
            projectHiddenBtn.classList.remove("change");
            bigImgWrapper.remove()
            document.body.style.overflowY = "scroll";

            document.addEventListener("scroll", scrollFn);

            progressBarFn();
        };
    });
    // End of Big Project Image

    i >= 6 && (project.style.cssText = "display:none; opacity:0"); // same as a if statement

});

// Projects Button
const section3 = document.querySelector('.section-3');
const projectsBtn = document.querySelector('.projects-btn');
const projectsBtnText = document.querySelector('.projects-btn-text');
const gotoBtn=document.querySelectorAll('.goto');
const hiddenBtns = [];
for (let index = 6; index < gotoBtn.length; index++) {
    hiddenBtns.push(gotoBtn[index])

    for (let i = 0; i < hiddenBtns.length; i++) {
        hiddenBtns[i].style.display = "none";

    }
}
let showHideBool = true;

const showProjects = (project, i) => {
    setTimeout(() => {
        project.style.display = "flex";
        section3.scrollIntoView({ block: "end" });

        for (let index = 0; index < hiddenBtns.length; index++) {
            hiddenBtns[index].style.display = "flex";

        }
    }, 600);

    setTimeout(() => {
        project.style.opacity = "1";
    }, i * 200);
}

const hideProjects = (project, i) => {
    setTimeout(() => {
        project.style.display = "none";

        for (let index = 0; index < hiddenBtns.length; index++) {
            hiddenBtns[index].style.display = "none";
        }

        section3.scrollIntoView({ block: "end" });
    }, 1200);

    setTimeout(() => {
        project.style.opacity = "0";
    }, i * 100);
};

projectsBtn.addEventListener("click", (e) => {
    e.preventDefault();

    showHideBool
        ? (projectsBtnText.textContent = 'Show Less')
        : (projectsBtnText.textContent = 'Show More');

    projects.forEach((project, i) => {
        i >= 6 && (showHideBool ? showProjects(project, i) :
            hideProjects(project, i));

    });
    showHideBool = !showHideBool;
});
// End of project Button
// End of Projects

// Section 4
document.querySelectorAll(".service-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const service = btn.parentElement;
        const serviceText = btn.nextElementSibling;
        const isOpening = !serviceText.classList.contains('change');

        if (isOpening) {
            serviceText.style.height = serviceText.scrollHeight + 'px';
            serviceText.classList.add('change');
            service.classList.add('active');
            serviceText.classList.remove('scan-active');
            void serviceText.offsetWidth;
            serviceText.classList.add('scan-active');
        } else {
            serviceText.style.height = '0';
            serviceText.classList.remove('change');
            service.classList.remove('active');
        }
    });
});
// End Of Section 4

// Section 5
// Form
const formHeading = document.querySelector(".form-heading");
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
        formHeading.style.opacity = "0";
        setTimeout(() => {
            formHeading.textContent = `Your ${input.placeholder}`;
            formHeading.style.opacity = "1";
        }, 300);
    });

    input.addEventListener("blur", () => {
        formHeading.style.opacity = "0";
        setTimeout(() => {
            formHeading.textContent = "Let's Talk";
            formHeading.style.opacity = "1";
        }, 300);
    });
});
// End of Form

// Slideshow
const slideshow = document.querySelector(".slideshow");

setInterval(() => {
    const firstIcon = slideshow.firstElementChild;

    firstIcon.classList.add("faded-out");

    const thirdIcon = slideshow.children[3];

    thirdIcon.classList.add("light");

    thirdIcon.previousElementSibling.classList.remove("light");

    setTimeout(() => {
        slideshow.removeChild(firstIcon);

        slideshow.appendChild(firstIcon);

        setTimeout(() => {
            firstIcon.classList.remove("faded-out");
        }, 500);
    }, 500);
}, 3000);
// End of Slideshow

// Form Validation
const form = document.querySelector(".contact-form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const messages = document.querySelectorAll(".message");

const error = (input, message) => {
    input.nextElementSibling.classList.add("error");
    input.nextElementSibling.textContent = message;
};

const success = (input) => {
    input.nextElementSibling.classList.remove("error");
};

const checkRequiredFields = (inputArr) => {
    inputArr.forEach((input) => {
        if (!PortfolioUtils.isNonEmpty(input.value)) {
            error(input, `${input.id} is required`);
        }
    });
};

const checkLength = (input, min) => {
    if (!PortfolioUtils.hasMinLength(input.value, min)) {
        error(input, `${input.id} must be at least ${min} characters`);
    } else {
        success(input);
    }
};

const checkEmail = (input) => {
    if (PortfolioUtils.isValidEmail(input.value)) {
        success(input);
    } else {
        error(input, "Email is not valid");
    }
};

form.addEventListener("submit", (e) => {
    checkLength(username, 2);
    checkLength(subject, 2);
    checkLength(message, 10);
    checkEmail(email);
    checkRequiredFields([username, email, subject, message]);

    const notValid = Array.from(messages).find((message) => {
        return message.classList.contains("error");
    });

    notValid && e.preventDefault();
});
// End of Form Validation

// ScrollTrigger Reveals
gsap.utils.toArray('.section-heading').forEach(el => {
    gsap.from(el, {
        opacity: 0, x: -40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
    });
});

gsap.from('.hud-card', {
    opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '.hud-card', start: 'top 82%' }
});

gsap.from('.section-2 .main-btn', {
    opacity: 0, scale: 0, duration: 0.5, ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.section-2 .main-btn', start: 'top 90%' }
});

gsap.from('.bloc-project', {
    opacity: 0, y: 60, duration: 0.6, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: '.projects', start: 'top 82%' }
});

gsap.utils.toArray('.svc-bar-fill').forEach(fill => {
    gsap.to(fill, {
        width: fill.dataset.fill,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: fill, start: 'top 85%' }
    });
});

gsap.utils.toArray('.service').forEach((service, i) => {
    gsap.from(service, {
        opacity: 0, x: 40, duration: 0.55,
        delay: i * 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.services-wrapper', start: 'top 80%' }
    });
});

gsap.from('.form-wrapper', {
    opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.form-wrapper', start: 'top 85%' }
});
// End of ScrollTrigger Reveals

// Glitch Effect
function triggerGlitch() {
    const circle = document.querySelector('.main-circle');
    circle.classList.add('glitching');
    setTimeout(() => circle.classList.remove('glitching'), 300);
    setTimeout(triggerGlitch, 6000 + Math.random() * 10000);
}
setTimeout(triggerGlitch, 8000);
// End of Glitch Effect
// End of Section 5