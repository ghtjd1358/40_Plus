// nav bar
const nav = document.querySelector('.nav')
const navUls = document.querySelectorAll('.nav-ul')

window.addEventListener('scroll', fixNav)

function fixNav() {
    const scrolled = window.scrollY > nav.offsetHeight - 50
    nav.classList.toggle('active', scrolled);
}

//--------------------------------------------------


const sections = document.querySelectorAll('section')

window.addEventListener('scroll', () => {
    const windowInner = window.innerHeight;

    sections.forEach(section => {
        const sectionHeight = section.getBoundingClientRect().top
        if (windowInner > sectionHeight) {
            section.classList.remove('up')
        } else {
            section.classList.add('up')
        }
    })
})


// 키오스크 slide
const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const lis = document.querySelectorAll('.indi > li')

let activeSlide = 0;

function nextSlide() {
    activeSlide++;

    if (activeSlide > slides.length - 1) {
        activeSlide = 0;
    }

    setActiveSlide();
}

function prevSlide() {
    activeSlide--;

    if (activeSlide < 0) {
        activeSlide = slides.length - 1;
    }

    setActiveSlide();
}

// slide
function setActiveSlide() {
    slides.forEach((slide, i) => {
        activeSlide === i ? slide.classList.add('active') : slide.classList.remove('active');
        activeSlide === i ? lis[i].classList.add('on') : lis[i].classList.remove('on');
    });
}

lis.forEach((li, i) => {
    li.addEventListener('click', () => {
        lis.forEach((otherLi) => {
            otherLi.classList.remove('on');
        });
        li.classList.add('on');
        activeSlide = i;
        setActiveSlide();
    });
});

rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);


document.addEventListener('mouseover', hoverTag);
document.addEventListener('mouseout', hoverTag);

function hoverTag(e) {
    let currentElement = e.target;

    if (currentElement.tagName === 'BUTTON') {
        currentElement.classList.toggle('shadow-drop-2-center', e.type === 'mouseover');
    }
}
