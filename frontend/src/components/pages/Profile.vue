<template>
  <div class="profile-page">
    <h1>Mon Profil</h1>
    
    <div class="profile-section">
      <div class="profile-image">
        <img :src="profileImage || '/default-avatar.png'" alt="Photo de profil">
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleImageUpload" 
          accept="image/*"
          class="hidden"
        >
        <button @click="$refs.fileInput.click()">Changer la photo</button>
      </div>

      <form @submit.prevent="updateProfile" class="profile-form">
        <div class="form-group">
          <label>Nom d'utilisateur</label>
          <input 
            v-model="profile.username" 
            type="text" 
            required
          >
        </div>

        <div class="form-group">
          <label>Bio</label>
          <textarea 
            v-model="profile.bio" 
            rows="4"
          ></textarea>
        </div>

        <button type="submit" class="btn-primary">Mettre à jour</button>
      </form>
    </div>

    <div class="security-section">
      <h2>Sécurité</h2>
      
      <div class="two-factor" v-if="!twoFactorEnabled">
        <button @click="enable2FA" class="btn-secondary">
          Activer l'authentification à deux facteurs
        </button>
      </div>

      <div v-else class="two-factor-enabled">
        <p>L'authentification à deux facteurs est activée</p>
        <button @click="disable2FA" class="btn-danger">Désactiver</button>
      </div>
    </div>

    <div v-if="showQRCode" class="qr-modal">
      <div class="modal-content">
        <h3>Scannez ce QR Code</h3>
        <img :src="qrCodeUrl" alt="QR Code 2FA">
        <p>Utilisez une application d'authentification comme Google Authenticator</p>
        <button @click="showQRCode = false">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

export default defineComponent({
  name: 'ProfilePage',
  
  setup() {
    const authStore = useAuthStore();
    const profile = ref({
      username: '',
      bio: ''
    });
    const profileImage = ref('');
    const twoFactorEnabled = ref(false);
    const showQRCode = ref(false);
    const qrCodeUrl = ref('');

    onMounted(async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        profile.value = response.data;
        profileImage.value = response.data.profile_image;
        twoFactorEnabled.value = response.data.two_factor_enabled;
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      }
    });

    const updateProfile = async () => {
      try {
        await axios.put('/api/auth/profile', profile.value);
        // Mettre à jour le store si nécessaire
        authStore.updateUser({ username: profile.value.username });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
      }
    };

    const handleImageUpload = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        const response = await axios.post('/api/auth/profile/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        profileImage.value = response.data.profileImage;
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
      }
    };

    const enable2FA = async () => {
      try {
        const response = await axios.post('/api/auth/enable-2fa');
        qrCodeUrl.value = response.data.qrCode;
        showQRCode.value = true;
        twoFactorEnabled.value = true;
      } catch (error) {
        console.error('Erreur lors de l\'activation de la 2FA:', error);
      }
    };

    const disable2FA = async () => {
      try {
        await axios.post('/api/auth/disable-2fa');
        twoFactorEnabled.value = false;
      } catch (error) {
        console.error('Erreur lors de la désactivation de la 2FA:', error);
      }
    };

    return {
      profile,
      profileImage,
      twoFactorEnabled,
      showQRCode,
      qrCodeUrl,
      updateProfile,
      handleImageUpload,
      enable2FA,
      disable2FA
    };
  }
});
</script>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-section {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.profile-image {
  text-align: center;
}

.profile-image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.security-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.hidden {
  display: none;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background: #4CAF50;
  color: white;
  border: none;
}

.btn-secondary {
  background: #2196F3;
  color: white;
  border: none;
}

.btn-danger {
  background: #f44336;
  color: white;
  border: none;
}
</style> 