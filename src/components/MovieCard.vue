<!-- src/components/MovieCard.vue -->
<template>
    <div 
      class="movie-card" 
      @mouseenter="startHoverTimer" 
      @mouseleave="resetHover"
      :class="{ 'hovered': isHovered, 'zoomed': isZoomed }"
    >
      <img 
        v-if="isIntersecting" 
        :src="getImageUrl(movie.poster_path)" 
        :alt="movie.title || movie.name"
        @load="imageLoaded = true"
        :class="{ 'loaded': imageLoaded }"
      >
      <div v-else class="placeholder"></div>
      <div v-if="isHovered" class="expanded-info">
        <h3>{{ movie.title || movie.name }}</h3>
        <p>Rating: {{ movie.vote_average.toFixed(1) }}/10</p>
        <p>{{ movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A' }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    movie: Object,
  });
  
  const isIntersecting = ref(false);
  const imageLoaded = ref(false);
  const isHovered = ref(false);
  const isZoomed = ref(false);
  let hoverTimer = null;
  
  const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
  
  const startHoverTimer = () => {
    isHovered.value = true;
    hoverTimer = setTimeout(() => {
      isZoomed.value = true;
    }, 1000); // 1 second delay before zooming
  };
  
  const resetHover = () => {
    isHovered.value = false;
    isZoomed.value = false;
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
  };
  
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
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
  });
  </script>
  
  <style scoped>
  .movie-card {
    position: relative;
    width: calc(100% / 6 - 1rem);
    margin-right: 1rem;
    transition: all 0.3s ease;
    z-index: 1;
  }
  
  .movie-card.hovered {
    transform: scale(1.1);
    z-index: 2;
  }
  
  .movie-card.zoomed {
    transform: scale(1.2);
    z-index: 3;
  }
  
  .movie-card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .movie-card img.loaded {
    opacity: 1;
  }
  
  .placeholder {
    width: 100%;
    padding-top: 150%; /* 2:3 aspect ratio */
    background-color: #2c3e50;
    border-radius: 8px;
  }
  
  .expanded-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0.5rem;
    border-radius: 0 0 8px 8px;
    transition: opacity 0.3s ease;
  }
  
  .expanded-info h3 {
    font-size: 0.9rem;
    margin: 0 0 0.3rem 0;
  }
  
  .expanded-info p {
    font-size: 0.8rem;
    margin: 0.2rem 0;
  }
  </style>