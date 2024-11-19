<script setup lang="ts">
const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Founder',
    image: 'sarah.jpg',
    bio: 'Former tech executive with a passion for community-driven projects'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO',
    image: 'marcus.jpg',
    bio: 'Blockchain expert and full-stack developer'
  },
  {
    name: 'Emma Thompson',
    role: 'Community Director',
    image: 'emma.jpg',
    bio: 'Community building expert with 10+ years experience'
  }
]

const stats = [
  {
    number: '500K+',
    label: 'Backers',
    description: 'Supporting creative projects'
  },
  {
    number: '$50M+',
    label: 'Funded',
    description: 'Successfully raised'
  },
  {
    number: '15K+',
    label: 'Projects',
    description: 'Successfully funded'
  },
  {
    number: '150+',
    label: 'Countries',
    description: 'Global community'
  }
]

const values = [
  {
    title: 'Innovation',
    description: 'We believe in pushing boundaries and embracing new ideas',
    icon: '💡'
  },
  {
    title: 'Community',
    description: 'Building strong connections between creators and backers',
    icon: '🤝'
  },
  {
    title: 'Transparency',
    description: 'Open and honest communication in everything we do',
    icon: '🔍'
  },
  {
    title: 'Impact',
    description: 'Making a real difference in creators\' lives',
    icon: '✨'
  }
]
</script>

<template>
  <div class="about-container">
    <section class="hero">
      <h1>About CrabFunding</h1>
      <p class="hero-text">
        Empowering creators to bring their innovative ideas to life through the support of a global community.
      </p>
    </section>

    <section class="mission">
      <div class="mission-content">
        <h2>Our Mission</h2>
        <p>
          At CrabFunding, we believe that great ideas deserve the chance to thrive. Our platform connects passionate creators 
          with supporters who want to be part of bringing innovative projects to life. We're building a community where 
          creativity meets opportunity, and where every successful project creates ripples of positive change in the world.
        </p>
      </div>
    </section>

    <section class="stats-section">
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <h3 class="stat-number">{{ stat.number }}</h3>
          <p class="stat-label">{{ stat.label }}</p>
          <p class="stat-description">{{ stat.description }}</p>
        </div>
      </div>
    </section>

    <section class="values-section">
      <h2>Our Values</h2>
      <div class="values-grid">
        <div v-for="value in values" :key="value.title" class="value-card">
          <span class="value-icon">{{ value.icon }}</span>
          <h3>{{ value.title }}</h3>
          <p>{{ value.description }}</p>
        </div>
      </div>
    </section>

    <section class="team-section">
      <h2>Meet Our Team</h2>
      <div class="team-grid">
        <div v-for="member in team" :key="member.name" class="team-card">
          <div class="team-image">
            <img :src="member.image" :alt="member.name">
          </div>
          <h3>{{ member.name }}</h3>
          <p class="team-role">{{ member.role }}</p>
          <p class="team-bio">{{ member.bio }}</p>
        </div>
      </div>
    </section>

    <section class="contact-section">
      <h2>Get in Touch</h2>
      <p>Have questions? We'd love to hear from you.</p>
      <div class="contact-buttons">
        <a href="mailto:contact@crabfunding.com" class="contact-btn email-btn">
          Email Us
        </a>
        <a href="#" class="contact-btn support-btn">
          Support Center
        </a>
      </div>
    </section>
  </div>
</template>

<style>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%);
  border-radius: 15px;
  margin-bottom: 4rem;
}

.hero h1 {
  font-size: 3.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  background: linear-gradient(120deg, #dc2626, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-text {
  font-size: 1.25rem;
  color: #4b5563;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.mission {
  padding: 4rem 0;
}

.mission-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.mission h2 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.mission p {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.8;
}

.stats-section {
  padding: 4rem 0;
  background: #f9fafb;
  border-radius: 15px;
  margin: 4rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.stat-description {
  color: #6b7280;
}

.values-section {
  padding: 4rem 0;
}

.values-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 3rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.value-card h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.value-card p {
  color: #6b7280;
  line-height: 1.6;
}

.team-section {
  padding: 4rem 0;
}

.team-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.team-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-image {
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-card h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.team-role {
  color: #dc2626;
  font-weight: 600;
  margin-bottom: 1rem;
}

.team-bio {
  color: #6b7280;
  line-height: 1.6;
}

.contact-section {
  text-align: center;
  padding: 4rem 0;
  background: #f9fafb;
  border-radius: 15px;
  margin-top: 4rem;
}

.contact-section h2 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.contact-section p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.contact-btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.email-btn {
  background: #dc2626;
  color: white;
}

.email-btn:hover {
  background: #ef4444;
  transform: translateY(-2px);
}

.support-btn {
  background: white;
  color: #dc2626;
  border: 2px solid #dc2626;
}

.support-btn:hover {
  background: rgba(220, 38, 38, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .stats-grid,
  .values-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .contact-buttons {
    flex-direction: column;
  }

  .contact-btn {
    width: 100%;
  }
}
</style>