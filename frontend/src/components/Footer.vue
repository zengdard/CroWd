<template>
  <footer>
    <div class="container">
      <div class="footer-grid">
        <!-- Colonne 1 : À propos -->
        <div class="footer-column">
          <h3>About LaTeX Editor Pro</h3>
          <p>
            Professional LaTeX editor for mathematicians, scientists, and educators.
          </p>
        </div>

        <!-- Colonne 2 : Liens rapides -->
        <div class="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/editor">Features</router-link></li>
            <li><router-link to="/learning">Learning</router-link></li>
            <li><a href="#">Templates</a></li>
          </ul>
        </div>

        <!-- Colonne 3 : Support -->
        <div class="footer-column">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>

        <!-- Colonne 4 : Newsletter -->
        <div class="footer-column">
          <h3>Stay Updated</h3>
          <div class="newsletter">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <!-- Bas de footer -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            © {{ new Date().getFullYear() }} LaTeX Editor Pro. All rights reserved.
          </div>
          <div class="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #1f2937;
  color: white;
  margin-top: auto;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-column h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-column p {
  color: #9ca3af;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: 0.5rem;
}

.footer-column a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-column a:hover {
  color: white;
}

.newsletter {
  display: flex;
}

.newsletter input {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border: none;
  width: 100%;
  color: #1f2937;
}

.newsletter button {
  background-color: #9333ea;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.newsletter button:hover {
  background-color: #7e22ce;
}

.footer-bottom {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #374151;
}

.footer-bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .footer-bottom-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.copyright {
  color: #9ca3af;
  font-size: 0.875rem;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
}

.legal-links a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.legal-links a:hover {
  color: white;
}
</style>