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
      title: "Cinema",
      description:
        "Petit site de base de données de films créé avec l'API TMDB",
      tags: ["React", "Typescript", "TailwindCSS", "API"],
      image: "./assets/cinema.png",
      url: "https://cinema-beige-tau.vercel.app/",
      details:
        "Petit site de base de données de films créé avec l'API TMDB. Il permet de rechercher des films, de voir les détails des films, les bandes-annonces, les acteurs et les critiques.",
    },
    {
      title: "Chatty",
      description: "Une application web de chat en temps réel",
      tags: ["React", "Node.js", "CSS"],
      image: "./assets/chatty.png",
      url: "https://chatty-upde.vercel.app/",
      details:
        "Une application web de chat en temps réel permettant aux utilisateurs d'envoyer des messages instantanés, de créer des groupes de discussion et de partager des fichiers.",
    },
    {
      title: "Code4Sud",
      description:
        "Participation au hackathon de Code4Sud 2024 sur le développement d'une intelligence artificielle.",
      tags: ["Python", "Node.js", "Ollama (Lamma3.3)", "OpenDataAPI"],
      image: "./assets/code4sud.png",
      url: "https://dev.ia4sud.fr/",
      details:
        "Participation au hackathon de Code4Sud 2024 sur le développement d'une intelligence artificielle. (Nous étions l'une des meilleures équipes). Nous avons développé une application web qui utilise l'API OpenData pour fournir des informations en temps réel sur divers sujets.",
    },
    {
      title: "Médiathèque Antique",
      description: "Un système de gestion de médiathèque",
      tags: ["PHP", "Javascript", "CSS", "MVC"],
      image: "./assets/mediahub.png",
      url: "https://github.com/omar-elhadi/mediahub.git",
      details:
        "Un système de gestion de médiathèque permettant aux utilisateurs de rechercher, emprunter et retourner des livres, des films et les jeux vidéo. Le système comprend également une interface d'administration pour gérer les utilisateurs et les ressources.",
    },
  ];

  const container = document.getElementById("projects-container");
  if (container) {
    container.innerHTML = "";

    projectsData.forEach((project, index) => {
      const gradientClass =
        index % 2 === 0
          ? "from-primary/20 to-secondary/20"
          : "from-secondary/20 to-primary/20";

      const projectCard = document.createElement("div");
      projectCard.className = "project-card group";
      projectCard.innerHTML = `
        <div class="project-image bg-[url('${project.image}')]">
          <div class="absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-xl"></div>
        </div>
        <div class="project-content">
          <h3 class="text-2xl font-bold mb-2">${project.title}</h3>
          <p class="opacity-80 mb-4">${project.description}</p>
          <div class="flex gap-2 flex-wrap">
            ${project.tags
              .map(
                (tag, i) => `
              <span class="px-3 py-1 ${
                i === 0
                  ? "bg-primary/10 text-primary"
                  : i === 1
                    ? "bg-secondary/10 text-secondary"
                    : "bg-gray-800"
              } rounded-full text-sm">${tag}</span>
            `,
              )
              .join("")}
          </div>
        </div>
      `;

      projectCard.addEventListener("click", () => {
        openProjectModal(project, projectCard);
      });

      container.appendChild(projectCard);
      setTimeout(() => {
        projectCard.classList.add("visible");
      }, index * 100);
    });
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
      ".project-card, .tech-bar-fill, #terminal, .education-item, .basic-skill-item",
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

  // Project modal function
  const openProjectModal = (project, cardElement) => {
    document.body.classList.add("overflow-hidden");

    const modal = document.createElement("div");
    modal.classList.add("modal-overlay", "opacity-0");

    const modalContent = document.createElement("div");
    modalContent.className =
      "project-card project-modal bg-dark/95 border border-primary/20 scale-95 opacity-0 max-w-[90%] xl:max-w-5xl w-full";
    modalContent.innerHTML = `
      <div class="project-image " style="background-image: url('${
        project.image
      }')">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm"></div>
      </div>
      <div class="absolute top-4 right-4 z-20">
        <button class="close-modal w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="relative z-10 p-8 bg-black opacity-65 h-full rounded-xl">
        <h3 class="text-3xl font-bold mb-4">${project.title}</h3>
        <p class="text-lg opacity-90 mb-6">${project.description}</p>
        ${
          project.details
            ? `<p class="opacity-80 mb-6">${project.details}</p>`
            : ""
        }
        <div class="flex gap-2 flex-wrap mb-6">
          ${project.tags
            .map(
              (tag, i) => `
            <span class="px-4 py-2 ${
              i === 0
                ? "bg-blue-400/40 text-blue-400 border border-primary/30"
                : i === 1
                  ? "bg-secondary/20 text-secondary border border-secondary/30"
                  : "bg-gray-800 border border-gray-700"
            } rounded-full text-sm font-medium">${tag}</span>
          `,
            )
            .join("")}
        </div>
        ${
          project.url
            ? `
          <a href="${project.url}" target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium hover:shadow-lg hover:shadow-primary/30 transition-all">
            Voir le projet
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        `
            : ""
        }
      </div>
    `;

    modal.appendChild(modalContent);

    // Close modal on overlay click or close button
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest(".close-modal")) {
        // Fade out animation
        modal.classList.remove("opacity-100");
        modal.classList.add("opacity-0");
        modalContent.classList.remove("scale-100", "opacity-100");
        modalContent.classList.add("scale-95", "opacity-0");

        setTimeout(() => {
          document.body.classList.remove("overflow-hidden");
          modal.remove();
        }, 300);
      }
    });

    // Add escape key to close
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        modal.click();
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);

    document.body.appendChild(modal);

    // Trigger animations on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.remove("opacity-0");
        modal.classList.add("opacity-100");
        modalContent.classList.remove("scale-95", "opacity-0");
        modalContent.classList.add("scale-100", "opacity-100");
      });
    });
  };

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
