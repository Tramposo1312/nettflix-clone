<template>
    <div class="movie-card" @mouseenter="expanded = true" @mouseleave="expanded = false">
      <img 
        v-if="isIntersecting" 
        :src="getImageUrl(movie.poster_path)" 
        :alt="movie.title || movie.name"
        @load="imageLoaded = true"
        :class="{ 'loaded': imageLoaded }"
      >
      <div v-else class="placeholder"></div>
      <h3>{{ movie.title || movie.name }}</h3>
      <div v-if="expanded" class="expanded-info">
        <p>{{ movie.overview }}</p>
        <p>Rating: {{ movie.vote_average }}/10</p>
        <p>Release Date: {{ movie.release_date }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    movie: Object,
  });
  
  const expanded = ref(false);
  const isIntersecting = ref(false);
  const imageLoaded = ref(false);
  
  const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
  
  let observer;
  
  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isIntersecting.value = true;
        observer.disconnect();
      }
    });
    observer.observe(document.querySelector('.movie-card'));
  });
  
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
  </script>
  
  <style scoped>
  .movie-card {
    position: relative;
    width: 200px;
    margin-right: 1rem;
    transition: all 0.3s ease;
    z-index: 1;
  }
  
  .movie-card:hover {
    transform: scale(1.1);
    z-index: 2;
  }
  
  .movie-card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .movie-card img.loaded {
    opacity: 1;
  }
  
  .placeholder {
    width: 100%;
    height: 300px;
    background-color: #2c3e50;
    border-radius: 8px;
  }
  
  .movie-card h3 {
    margin-top: 0.5rem;
    font-size: 1rem;
  }
  
  .expanded-info {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 1rem;
    border-radius: 0 0 8px 8px;
    transition: opacity 0.3s ease;
  }
  
  .expanded-info p {
    font-size: 0.8rem;
    margin: 0.5rem 0;
  }
  </style>