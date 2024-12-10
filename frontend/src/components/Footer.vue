<template>
  <footer>
    <div class="container">
      <div class="footer-grid">
        <!-- Logo/About -->
        <div class="footer-column">
          <div class="logo">
            <span class="crab">🦀</span>
            <span class="brand">CrabFunding</span>
          </div>
          <p>Empowering creators and innovators through community-driven crowdfunding.</p>
        </div>
 
        <!-- For Creators -->
        <div class="footer-column">
          <h3>Pour les créateurs</h3>
          <ul>
            <li><router-link to="/start">Lancer un projet</router-link></li>
            <li><router-link to="/how-it-works">Comment ça marche</router-link></li>
            <li><router-link to="/help">Ressources</router-link></li>
          </ul>
        </div>
 
        <!-- Support -->
        <div class="footer-column">
          <h3>Support</h3>
          <ul>
            <li><router-link to="/help">Centre d'aide</router-link></li>
            <li><router-link to="/trust-safety">Confiance & Sécurité</router-link></li>
            <li><router-link to="/contact">Nous contacter</router-link></li>
          </ul>
        </div>
 
        <!-- Discover -->
        <div class="footer-column">
          <h3>Découvrir</h3>
          <ul>
            <li><router-link to="/discover">Projets</router-link></li>
            <li><router-link to="/categories">Catégories</router-link></li>
            <li><router-link to="/success-stories">Success Stories</router-link></li>
          </ul>
        </div>
 
        <!-- Newsletter -->
        <div class="footer-column">
          <h3>Restez connecté</h3>
          <div class="newsletter">
            <input type="email" placeholder="Votre email">
            <button>S'abonner</button>
          </div>
        </div>
      </div>
 
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} CrabFunding. Tous droits réservés.</p>
        <div class="legal-links">
          <router-link to="/privacy">Confidentialité</router-link>
          <router-link to="/terms">Conditions</router-link>
          <router-link to="/legal">Mentions légales</router-link>
        </div>
      </div>
    </div>
  </footer>
 </template>
 
 <style scoped>
 footer {
  background-color: #111827;
  color: white;
  padding: 4rem 0 2rem;
 }
 
 .container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
 }
 
 .footer-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
 }
 
 @media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(5, 1fr);
  }
 }
 
 .footer-column h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
 }
 
 .footer-column p {
  color: #9ca3af;
  line-height: 1.5;
 }
 
 .logo {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
 }
 
 .crab {
  font-size: 1.75rem;
  margin-right: 0.5rem;
 }
 
 .brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ef4444;
 }
 
 .footer-column ul {
  list-style: none;
  padding: 0;
 }
 
 .footer-column ul li {
  margin-bottom: 0.75rem;
 }
 
 .footer-column a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
 }
 
 .footer-column a:hover {
  color: #ef4444;
 }
 
 .newsletter {
  display: flex;
 }
 
 .newsletter input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.375rem 0 0 0.375rem;
  background: white;
 }
 
 .newsletter button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0 0.375rem 0.375rem 0;
  background: #ef4444;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
 }
 
 .newsletter button:hover {
  background: #dc2626;
 }
 
 .footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid #374151;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
 }
 
 @media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
 }
 
 .footer-bottom p {
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
  font-size: 0.875rem;
  transition: color 0.2s;
 }
 
 .legal-links a:hover {
  color: #ef4444;
 }
 </style>