class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: rgba(15, 23, 42, 0.8);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 2rem 0;
        }
        
        .footer-container {
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(to right, #6d28d9, #10b981);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .footer-links {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.95rem;
        }
        
        .footer-links a:hover {
          color: white;
        }
        
        .footer-social {
          display: flex;
          gap: 1.5rem;
        }
        
        .footer-social a {
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .footer-social a:hover {
          color: #6d28d9;
          transform: translateY(-3px);
        }
        
        .copyright {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          :host {
            padding: 1.5rem 0;
          }
          
          .footer-container {
            padding: 0 1rem;
            gap: 1.25rem;
          }
          
          .footer-logo {
            font-size: 1.25rem;
          }
          
          .footer-links {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }
          
          .footer-social {
            gap: 1.25rem;
          }
          
          .copyright {
            font-size: 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .footer-links a {
            font-size: 0.9rem;
          }
        }
      </style>
      <div class="footer-container">
        <p class="footer-cta">
          Créons quelque chose d'incroyable ensemble !
        </p>
        
        <a href="./" class="footer-logo">
          <i data-feather="moon"></i>
          Omar El Hadi
        </a>
        
        <div class="footer-links">
          <a href="#greeting-section">Accueil</a>
          <a href="#projects">Projets</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div class="footer-social">
          <a href="https://github.com/omar-elhadi" target="_blank" aria-label="GitHub">
            <i data-feather="github"></i>
          </a>
          <a href="https://linkedin.com/omar-elhadi" target="_blank" aria-label="LinkedIn">
            <i data-feather="linkedin"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" aria-label="Twitter">
            <i data-feather="twitter"></i>
          </a>
        </div>
        
        <p class="copyright">
          &copy; ${new Date().getFullYear()} Omar El-Hadi. Tous droits réservés.
        </p>
      </div>
    `;
  }
}

customElements.define("custom-footer", CustomFooter);
