<!-- src/components/MovieRow.vue -->
<template>
    <div class="movie-row">
      <h2>{{ title }}</h2>
      <div class="movie-list-container">
        <button class="scroll-button left" @click="scroll('left')" :disabled="scrollPosition <= 0">&lt;</button>
        <div class="movie-list" ref="movieList">
          <MovieCard 
            v-for="movie in visibleMovies" 
            :key="movie.id" 
            :movie="movie"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          />
        </div>
        <button class="scroll-button right" @click="scroll('right')" :disabled="scrollPosition >= maxScroll">&gt;</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useMotion } from '@vueuse/motion';
  import MovieCard from './MovieCard.vue';
  
  const props = defineProps({
    title: String,
    movies: Array
  });
  
  const movieList = ref(null);
  const scrollPosition = ref(0);
  const maxScroll = ref(0);
  const currentPage = ref(0);
  
  const visibleMovies = computed(() => {
    const start = currentPage.value * 6;
    return props.movies.slice(start, start + 6);
  });
  
  const scroll = (direction) => {
    if (direction === 'left' && currentPage.value > 0) {
      currentPage.value--;
    } else if (direction === 'right' && (currentPage.value + 1) * 6 < props.movies.length) {
      currentPage.value++;
    }
    updateScrollPosition();
  };
  
  const updateScrollPosition = () => {
    scrollPosition.value = currentPage.value * movieList.value.clientWidth;
    maxScroll.value = Math.max(0, props.movies.length - 6) * movieList.value.clientWidth;
    movieList.value.scrollTo({ left: scrollPosition.value, behavior: 'smooth' });
  };
  
  onMounted(() => {
    updateScrollPosition();
    window.addEventListener('resize', updateScrollPosition);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateScrollPosition);
  });
  
  useMotion();
  </script>
  
  <style scoped>
  .movie-row {
    margin-bottom: 2rem;
    position: relative;
  }
  
  .movie-list-container {
    position: relative;
  }
  
  .movie-list {
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
    padding: 1rem 0;
  }
  
  .scroll-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 1rem 0.5rem;
    cursor: pointer;
    z-index: 3;
    transition: opacity 0.3s ease;
  }
  
  .scroll-button:disabled {
    opacity: 0;
    cursor: default;
  }
  
  .scroll-button.left {
    left: 0;
  }
  
  .scroll-button.right {
    right: 0;
  }
  
  @media (hover: hover) {
    .scroll-button {
      opacity: 0;
    }
  
    .movie-list-container:hover .scroll-button:not(:disabled) {
      opacity: 1;
    }
  }
  </style>