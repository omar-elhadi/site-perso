document.addEventListener("DOMContentLoaded", () => {
  // Initialize feather icons
  if (typeof feather !== "undefined") {
    feather.replace();
  }

  // Loading spinner for 2 seconds
  const loadingSpinner = () => {
    const spinner = document.createElement("div");
    spinner.className =
      "fixed inset-0 bg-gray-900 z-50 flex items-center justify-center transition-opacity duration-500";
    spinner.innerHTML = `
<div class="relative w-32 h-32">
<div class="absolute inset-0 border-8 border-transparent border-t-purple-700 border-r-pink-700 rounded-full animate-spin"></div>
<div class="absolute inset-4 border-8 border-transparent border-b-yellow-400 border-l-cyan-400 rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1s;"></div>
<div class="absolute inset-0 flex items-center justify-center">
<span class="text-4xl">🌙</span>
</div>
</div>
`;
    document.body.appendChild(spinner);
    setTimeout(() => {
      if (spinner.parentNode) {
        document.body.removeChild(spinner);
      }
    }, 2000);
  };
  loadingSpinner();

  // Load projects from inline data (no fetch needed, works with file://)
  const projectsData = [
    {
      title: "FB Replica",
      description:
        "A React application reviving Facebook's 2020 design, with cool features and interactions",
      tags: ["React", "TypeScript", "Firebase", "CSS"],
      images: {
        desktop: "./assets/demo/fb.png",
        tablet: "./assets/demo/fb-t.png",
        mobile: "./assets/demo/fb-m.png",
      },
      responsive: true,
      demo: "https://fb-replica-c7e1e.firebaseapp.com/",
      code: "https://github.com/omar-elhadi/fb-replica",
    },
    {
      title: "Applications Préférées",
      description: "Un site présentant mes applications préférées",
      tags: ["HTML", "CSS", "JavaScript"],
      images: {
        desktop: "./assets/demo/af.png",
        tablet: "./assets/demo/aft.png",
        mobile: "./assets/demo/af-m.png",
      },
      responsive: true,
      demo: "https://omar-elhadi.github.io/app_favorites/",
      code: "https://github.com/omar-elhadi/app_favorites",
    },
    {
      title: "Cinema",
      description:
        "Petit site de base de données de films créé avec l'API TMDB",
      tags: ["React", "Typescript", "TailwindCSS", "API"],
      images: {
        desktop: "./assets/demo/cinema.png",
        tablet: "./assets/demo/cinema-t.png",
        mobile: "./assets/demo/cinema-m.png",
      },
      responsive: true,
      demo: "https://cinema-beige-tau.vercel.app/",
      code: null,
    },
    {
      title: "Chatty",
      description: "Une application web de chat en temps réel",
      tags: ["React", "Node.js", "CSS"],
      images: {
        desktop: "./assets/demo/chatty.png",
        tablet: "./assets/demo/chatty-t.png",
        mobile: "./assets/demo/chatty-m.png",
      },
      responsive: true,
      demo: "https://chatty-upde.vercel.app/",
      code: null,
    },
    {
      title: "MarsAI",
      description: "Un festival pour ceux qui ont quelque chose à poster",
      tags: ["React", "TypeScript", "TailwindCSS", "Vercel"],
      images: {
        desktop: "./assets/demo/marsai.png",
        tablet: "./assets/demo/marsai-t.png",
        mobile: "./assets/demo/marsai-m.png",
      },
      responsive: true,
      demo: "https://marsai-festival.vercel.app",
      code: "https://github.com/omar-elhadi/marsai",
    },
    {
      title: "Code4Sud",
      description:
        "Participation au hackathon de Code4Sud 2024 sur le développement d'une intelligence artificielle.",
      tags: ["Python", "Node.js", "Ollama (Lamma3.3)", "OpenDataAPI"],
      images: {
        desktop: "./assets/demo/code4sud.png",
      },
      responsive: false,
      demo: "https://dev.ia4sud.fr/",
      code: null,
    },
    {
      title: "Médiathèque Antique",
      description:
        "Un système de gestion de médiathèque permettant de gérer un catalogue de livres, films et jeux vidéo avec un système d'emprunts.",
      tags: ["PHP", "JavaScript", "CSS", "MVC"],
      images: {
        desktop: "./assets/demo/mediahub.png",
      },
      responsive: false,
      demo: null,
      code: "https://github.com/omar-elhadi/mediahub",
    },
  ];

  const container = document.getElementById("projects-container");
  if (container) {
    container.innerHTML = "";

    const maxVisible = 5;

    const renderProject = (project, delay) => {
      const images = project.images;
      const hasResponsive = images.tablet && images.mobile;

      const projectEl = document.createElement("div");
      projectEl.className = "project-full";

      let imageHtml = "";
      if (hasResponsive) {
        imageHtml = `
          <div class="project-images-stack">
            <img class="img-desktop" src="${images.desktop}" alt="${project.title} desktop" loading="lazy" />
            <img class="img-tablet" src="${images.tablet}" alt="${project.title} tablet" loading="lazy" />
            <img class="img-mobile" src="${images.mobile}" alt="${project.title} mobile" loading="lazy" />
          </div>`;
      } else {
        imageHtml = `
          <div class="project-images-stack">
            <img class="img-desktop" src="${images.desktop}" alt="${project.title}" loading="lazy" />
          </div>`;
      }

      const linksHtml = [];
      if (project.demo) {
        linksHtml.push(
          `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">Démo</a>`,
        );
      }
      if (project.code) {
        linksHtml.push(
          `<a href="${project.code}" target="_blank" rel="noopener noreferrer" class="project-link project-link-code">Code</a>`,
        );
      }

      projectEl.innerHTML = `
        ${imageHtml}
        <div class="project-meta">
          <h3 class="project-title">${project.title}</h3>
          <div class="project-links">${linksHtml.join("")}</div>
        </div>
        <p class="project-desc">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
        </div>
        <div class="project-separator"></div>
      `;

      if (delay !== undefined) {
        container.appendChild(projectEl);
        setTimeout(() => projectEl.classList.add("visible"), delay);
      }
      return projectEl;
    };

    // Render first 5 projects
    projectsData.slice(0, maxVisible).forEach((project, i) => {
      renderProject(project, i * 100);
    });

    // Wrap remaining projects in hidden container with toggle
    const extraProjects = projectsData.slice(maxVisible);
    if (extraProjects.length > 0) {
      const extraWrap = document.createElement("div");
      extraWrap.className = "projects-extra";

      extraProjects.forEach((project, i) => {
        const el = renderProject(project);
        extraWrap.appendChild(el);
        setTimeout(() => el.classList.add("visible"), (maxVisible + i) * 100);
      });

      const seeMoreBtn = document.createElement("button");
      seeMoreBtn.className = "see-more-btn";
      seeMoreBtn.textContent = "Voir plus de projets";

      let revealed = false;
      seeMoreBtn.addEventListener("click", () => {
        revealed = !revealed;
        extraWrap.classList.toggle("revealed", revealed);
        seeMoreBtn.textContent = revealed
          ? "Voir moins de projets"
          : "Voir plus de projets";
      });

      container.appendChild(extraWrap);
      container.appendChild(seeMoreBtn);
    }
  }

  // Typewriter effect
  const typewriter = (
    element,
    phrases,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenPhrases = 2000,
  ) => {
    let i = 0,
      isDeleting = false,
      currentText = "",
      charIndex = 0;

    const type = () => {
      const fullText = phrases[i];

      if (isDeleting) {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
      }

      element.textContent = currentText;

      if (!isDeleting && charIndex === fullText.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenPhrases);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    setTimeout(type, typingSpeed);
  };

  // Initialize typewriter on hero section
  const heroText = document.querySelector(".hero-subtitle");
  if (heroText) {
    const phrases = [
      "Artisan numérique créant des expériences immersives.",
      "Développeur Full-Stack.",
      "Spécialisé dans les technologies web modernes.",
      "Création de solutions élégantes pour des problèmes complexes.",
    ];

    typewriter(heroText, phrases, 50, 30, 2000);
  }

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".project-full, .tech-bar-fill, #terminal, .education-item, .basic-skill-item",
    );

    elements.forEach((element, index) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        // Animate tech bars with custom gradients
        if (element.classList.contains("tech-bar-fill")) {
          const width = element.getAttribute("data-level");
          // const gradient = element.getAttribute("data-gradient");
          element.style.width = width;
          // if (gradient) {
          //   element.style.background = gradient;
          // }
        }

        // Animate terminal
        if (
          element.id === "terminal" &&
          !element.classList.contains("visible")
        ) {
          element.classList.add("visible");
          typeDomains();
        }

        // Animate basic skill items with stagger
        if (
          element.classList.contains("basic-skill-item") &&
          !element.classList.contains("animate-in")
        ) {
          setTimeout(() => {
            element.classList.add("animate-in");
          }, index * 100);
        }
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load

  // Terminal typewriter for domains
  let terminalStarted = false;
  const typeDomains = () => {
    if (terminalStarted) return;
    terminalStarted = true;

    const body = document.getElementById("terminal-body");
    if (!body) return;

    const domains = [
      { name: "Développement Web", color: "#6d28d9" },
      { name: "Cybersécurité", color: "#3b82f6" },
      { name: "DevOps", color: "#10b981" },
      { name: "Architecture Système", color: "#f59e0b" },
    ];

    const typedCommand = document.getElementById("typed-command");
    const typingCursor = document.getElementById("typing-cursor");
    const cursorLine = document.querySelector(".terminal-cursor-line");

    const command = "./expertise.sh --scan";
    let charIndex = 0;

    // Type the command character by character
    const typeCommand = () => {
      if (charIndex < command.length) {
        typedCommand.textContent += command[charIndex];
        charIndex++;
        setTimeout(typeCommand, 40);
      } else {
        // Command typed — hide cursor, show output
        if (typingCursor) typingCursor.style.display = "none";

        setTimeout(() => {
          let lineIndex = 0;

          const showNext = () => {
            if (lineIndex >= domains.length) {
              // Final prompt line
              const finalLine = document.createElement("div");
              finalLine.className = "terminal-line";
              finalLine.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-cursor">▊</span>`;
              body.appendChild(finalLine);
              requestAnimationFrame(() => finalLine.classList.add("visible"));
              return;
            }

            const outLine = document.createElement("div");
            outLine.className = "terminal-output";
            const domain = domains[lineIndex];
            outLine.innerHTML = `<span class="terminal-output-bullet" style="color:${domain.color}">◆</span><span class="terminal-output-text" style="color:${domain.color}">${domain.name}</span>`;
            body.insertBefore(outLine, cursorLine);

            requestAnimationFrame(() => outLine.classList.add("visible"));

            lineIndex++;
            setTimeout(showNext, 200);
          };

          showNext();
        }, 300);
      }
    };

    setTimeout(typeCommand, 400);
  };

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = 80;
        const targetPosition = targetElement.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Form submission handler (simplified without EmailJS)
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Validate form
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      if (!name || !email || !message) {
        submitBtn.textContent = "Veuillez remplir tous les champs requis";
        submitBtn.style.background =
          "linear-gradient(to right, #ef4444, #ef4444)";
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
        }, 3000);
        return;
      }

      submitBtn.textContent = "Envoi en cours...";
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        submitBtn.textContent = "Message envoyé !";
        submitBtn.style.background =
          "linear-gradient(to right, #10b981, #10b981)";
        contactForm.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
        }, 3000);
      }, 1500);
    });
  }

  // Copy email to clipboard with icon animation
  const emailElement = document.querySelector(".contact-email");
  if (emailElement) {
    emailElement.addEventListener("click", () => {
      const emailText = emailElement
        .querySelector(".email-text")
        .textContent.trim();
      const copyIcon = emailElement.querySelector(".copy-icon");

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(emailText)
          .then(() => {
            animateCopyIcon(copyIcon);
          })
          .catch(() => {
            copyToClipboardFallback(emailText, copyIcon);
          });
      } else {
        copyToClipboardFallback(emailText, copyIcon);
      }
    });
  }

  function animateCopyIcon(iconElement) {
    // Change to check icon
    iconElement.setAttribute("data-feather", "check");
    iconElement.classList.add("copied");
    feather.replace();

    // Revert back after 2 seconds
    setTimeout(() => {
      iconElement.setAttribute("data-feather", "copy");
      iconElement.classList.remove("copied");
      feather.replace();
    }, 2000);
  }

  function showCopyTooltip(element) {
    const tooltip = document.createElement("div");
    tooltip.textContent = "Copied!";
    tooltip.classList.add("copy-tooltip");
    element.style.position = "relative";
    element.appendChild(tooltip);

    setTimeout(() => {
      tooltip.remove();
    }, 2000);
  }

  function copyToClipboardFallback(text, iconElement) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      animateCopyIcon(iconElement);
    } catch (err) {
      console.error("Failed to copy:", err);
    }

    document.body.removeChild(textArea);
  }

  document.getElementById("download-cv-btn")?.addEventListener("click", () => {
    window.open("assets/CV.pdf", "_blank");
  });
});
