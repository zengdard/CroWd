<template>
  <footer class="bg-gray-900 text-white mt-auto">
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <div class="flex items-center mb-4">
            <span class="text-2xl mr-2">🦀</span>
            <span class="font-bold text-xl text-red-500">CrabFunding</span>
          </div>
          <p class="text-gray-400">
            Empowering creators and innovators through community-driven crowdfunding.
          </p>
        </div>
 
        <!-- For Creators -->
        <div>
          <h3 class="text-lg font-semibold mb-4">For Creators</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-red-500">Start a Project</a></li>
            <li><a href="#" class="text-gray-400 hover:text-red-500">Creator Guidelines</a></li>
            <li><a href="#" class="text-gray-400 hover:text-red-500">Resources</a></li>
          </ul>
        </div>
 
        <!-- Support -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Support</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-red-500">Help Center</a></li>
            <li><a href="#" class="text-gray-400 hover:text-red-500">Trust & Safety</a></li>
            <li><a href="#" class="text-gray-400 hover:text-red-500">Contact Us</a></li>
          </ul>
        </div>
 
        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Stay Connected</h3>
          <div class="flex">
            <input 
              type="email" 
              placeholder="Your email"
              class="flex-1 px-4 py-2 rounded-l-md text-gray-900"
            >
            <button class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
 
      <!-- Footer Bottom -->
      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} CrabFunding. All rights reserved.
          </p>
          <div class="flex gap-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-red-500">Privacy</a>
            <a href="#" class="text-gray-400 hover:text-red-500">Terms</a>
            <a href="#" class="text-gray-400 hover:text-red-500">Legal</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
 </template>