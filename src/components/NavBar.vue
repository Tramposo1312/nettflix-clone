<template>
    <nav class="navbar">
      <router-link to="/" class="navbar-brand">NetflixClone</router-link>
      <div class="navbar-links">
        <router-link to="/">Home</router-link>
        <router-link to="/search">Search</router-link>
      </div>
    </nav>
  </template>
  
  <script setup>
  // No need for any script content here atleast for now
  </script>
  
  <style scoped>
  .navbar {
    background-color: #111;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar-brand {
    color: #e50914;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }
  
  .navbar-links a {
    color: #fff;
    text-decoration: none;
    margin-left: 1rem;
  }
  </style>