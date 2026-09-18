const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function activateLink(id) {
  navItems.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    if (link.classList.contains("active") !== isActive) {
      link.classList.toggle("active", isActive);
    }
  });
}

function setActiveLink() {
  if (!sections.length) return;

  let current = sections[0].getAttribute("id");
  const scrollPos = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 90;
    if (scrollPos >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  const nearBottom =
    window.innerHeight + scrollPos >= document.documentElement.scrollHeight - 2;
  if (nearBottom) {
    current = sections[sections.length - 1].getAttribute("id");
  }

  activateLink(current);
}

const backToTop = document.querySelector(".back-to-top");

function toggleBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

let scrollTicking = false;

window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      setActiveLink();
      toggleBackToTop();
      scrollTicking = false;
    });
  },
  { passive: true }
);

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const skillFills = document.querySelectorAll(".skill-bar .fill");

if (skillFills.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target.dataset.level || "0";
          entry.target.style.width = `${target}%`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillFills.forEach((fill) => observer.observe(fill));
}

setActiveLink();
toggleBackToTop();
