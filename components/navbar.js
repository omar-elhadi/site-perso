class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    /* max-width: 100vw; */
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 2000; /* keep navbar above page content */
                    /* Important: avoid properties that create a containing block for position: fixed children */
                    overflow: visible;
                }
                
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 9.5rem;
                    /* max-width: 1200px; */
                    margin: 0 auto;
                    width: 100%;
                    box-sizing: border-box;
                    position: relative;
                    overflow: visible;
                    /* Move visual styles here to avoid clipping the overlay/side panel */
                    backdrop-filter: blur(10px);
                    background: rgba(15, 23, 42, 0.8);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    background: linear-gradient(to right, #6d28d9, #10b981);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    position: relative;
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                    overflow: visible;
                }
                
                .nav-links a {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    font-weight: 700;
		    font-size: 1.2rem;
                    transition: all 0.3s ease;
                    position: relative;
                    padding: 0.5rem 0;
                }
                
                .nav-links a:hover {
                    color: white;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(to right, #6d28d9, #10b981);
                    transition: width 0.3s ease;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }
                
                .menu-toggle {
                    display: none;
                    width: 30px;
                    height: 24px;
                    position: relative;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    /* z-index: 2001; */
                    flex-shrink: 0;
                }
                
                .menu-toggle span {
                    display: block;
                    position: absolute;
                    height: 3px;
                    width: 30px;
                    background: white;
                    border-radius: 3px;
                    left: 0;
                    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    transform-origin: center;
                }
                
                .menu-toggle span:nth-child(1) { 
                    top: 0; 
                }
                .menu-toggle span:nth-child(2) { 
                    top: 10px; 
                }
                .menu-toggle span:nth-child(3) { 
                    top: 20px; 
                }
                
                .menu-toggle.active span:nth-child(1) {
                    top: 10px;
                    transform: rotate(45deg);
                }
                
                .menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                
                .menu-toggle.active span:nth-child(3) {
                    top: 10px;
                    transform: rotate(-45deg);
                }
                
                .menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1998;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .menu-overlay.active {
                    opacity: 1;
                    pointer-events: auto;
                }
                
                @media (max-width: 768px) {
                    nav {
                        padding: 1rem;
                    }
                    
                    .menu-toggle {
                        display: block;
                    }
                    /* Hide inline links on mobile; drawer will be used */
                    .nav-links { display: none; }
                }
                
                @media (max-width: 480px) {
                    .logo {
                        font-size: 1.2rem;
                    }
                    
                    .nav-links {
                        width: 80%;
                        max-width: none;
                    }
                }
            </style>
            <nav>
                <a href="/" class="logo" aria-label="Accueil Portfolio Omar El-Hadi">
                    <!-- Inline SVG to ensure icon renders within Shadow DOM -->
                    
                    Omar El-Hadi
                </a>
                <div class="nav-links" id="mobile-nav">
                    <a href="#greeting-section">Accueil</a>
                    <a href="#projects">Projets</a>
                    <a href="#contact">Contact</a>
                </div>
                <button class="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        `;

    // Add burger menu functionality
    this.setupBurgerMenu();
  }

  setupBurgerMenu() {
    const menuToggle = this.shadowRoot.querySelector(".menu-toggle");
    const shadowNavLinks = this.shadowRoot.querySelectorAll(".nav-links a");

    // Inject global styles for overlay/drawer once
    if (!document.getElementById("sp-drawer-styles")) {
      const style = document.createElement("style");
      style.id = "sp-drawer-styles";
      style.textContent = `
                .sp-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.55);
                    backdrop-filter: blur(6px);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 200ms ease;
                    z-index: 5000;
                }
                .sp-overlay.open { opacity: 1; pointer-events: auto; }

                .sp-drawer {
                    position: fixed;
                    top: 0; right: 0;
                    width: min(320px, 80vw);
                    height: 100vh;
                    background: rgba(15,23,42,0.98);
                    border-left: 1px solid rgba(255,255,255,0.08);
                    transform: translateX(100%);
                    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 5001;
                    display: flex; flex-direction: column; padding-top: 80px;
                    -webkit-overflow-scrolling: touch;
                }
                .sp-drawer.open { transform: translateX(0); }
                .sp-drawer a { color: rgba(255,255,255,0.9); text-decoration: none; padding: 1rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight: 500; }
                .sp-drawer a:hover { background: rgba(109,40,217,0.12); }

                @media (min-width: 769px) {
                    .sp-overlay, .sp-drawer { display: none !important; }
                }
            `;
      document.head.appendChild(style);
    }

    // Create overlay and drawer once
    let overlay = document.querySelector(".sp-overlay");
    let drawer = document.querySelector(".sp-drawer");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "sp-overlay";
      document.body.appendChild(overlay);
    }
    if (!drawer) {
      drawer = document.createElement("nav");
      drawer.className = "sp-drawer";
      drawer.setAttribute("aria-label", "Menu mobile");
      drawer.innerHTML = `
                <a href="#greetign-section">Accueil</a>
                <a href="#projects">Projets</a>
                <a href="#contact">Contact</a>
            `;
      document.body.appendChild(drawer);
    }

    const drawerLinks = () => Array.from(drawer.querySelectorAll("a"));

    const closeMenu = () => {
      menuToggle.classList.remove("active");
      overlay.classList.remove("open");
      drawer.classList.remove("open");
      document.body.style.overflow = "";
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    };

    const openMenu = () => {
      menuToggle.classList.add("active");
      overlay.classList.add("open");
      drawer.classList.add("open");
      document.body.style.overflow = "hidden";
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Fermer le menu");
    };

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (drawer.classList.contains("open")) closeMenu();
      else openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    // Smooth scrolling for both shadow links (desktop) and drawer links (mobile)
    const attachSmoothScroll = (link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href") || "";
        if (href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const navHeight = 80;
            const y =
              target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
        closeMenu();
      });
    };

    shadowNavLinks.forEach(attachSmoothScroll);
    drawerLinks().forEach(attachSmoothScroll);

    // Close on Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("open")) closeMenu();
    });

    // Close on resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && drawer.classList.contains("open"))
        closeMenu();
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);
