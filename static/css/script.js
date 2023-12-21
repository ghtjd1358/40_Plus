// nav bar
const nav = document.querySelector(".nav");
const navUls = document.querySelectorAll(".nav-ul");

window.addEventListener("scroll", fixNav);

function fixNav() {
  const scrolled = window.scrollY > nav.offsetHeight + 150;
  // nav.classList.add('active') : nav.classList.remove('active')
  nav.classList.toggle("active", scrolled);
}

//--------------------------------------------------

// animation scroll(section)

const sections = document.querySelectorAll("section");
// console.log(sections)

window.addEventListener("scroll", () => {
  const windowInner = window.innerHeight;
  // console.log(windowInner)

  sections.forEach((section) => {
    const sectionHeight = section.getBoundingClientRect().top;
    if (windowInner > sectionHeight) {
      section.classList.remove("up");
    } else {
      section.classList.add("up");
    }
  });
});
