<template>
    <div class="movie-row">
      <h2>{{ title }}</h2>
      <div class="movie-list-container">
        <button class="scroll-button left" @click="scroll('left')" :disabled="scrollPosition <= 0">&lt;</button>
        <div class="movie-list" ref="movieList">
          <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <img :src="getImageUrl(movie.poster_path)" :alt="movie.title || movie.name">
            <h3>{{ movie.title || movie.name }}</h3>
          </div>
        </div>
        <button class="scroll-button right" @click="scroll('right')" :disabled="scrollPosition >= maxScroll">&gt;</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  const props = defineProps({
    title: String,
    movies: Array
  });
  
  const movieList = ref(null);
  const scrollPosition = ref(0);
  const maxScroll = ref(0);
  
  const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
  
  const scroll = (direction) => {
    const scrollAmount = 200; // TO adjust this value for controlling scroll distance
    if (direction === 'left') {
      movieList.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      movieList.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  onMounted(() => {
    const updateScrollPosition = () => {
      scrollPosition.value = movieList.value.scrollLeft;
      maxScroll.value = movieList.value.scrollWidth - movieList.value.clientWidth;
    };
  
    movieList.value.addEventListener('scroll', updateScrollPosition);
    window.addEventListener('resize', updateScrollPosition);
  
    // Initial update
    updateScrollPosition();
  });
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
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    padding: 1rem 0;
  }
  
  .movie-list::-webkit-scrollbar {
    display: none; /* WebKit */
  }
  
  .movie-card {
    flex: 0 0 auto;
    width: 200px;
    margin-right: 1rem;
    transition: transform 0.3s ease;
  }
  
  .movie-card:hover {
    transform: scale(1.05);
  }
  
  .movie-card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .movie-card h3 {
    margin-top: 0.5rem;
    font-size: 1rem;
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
    z-index: 1;
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