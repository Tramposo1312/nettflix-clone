<template>
    <div class="movie-row">
      <h2>{{ title }}</h2>
      <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title || movie.name">
          <h3>{{ movie.title || movie.name }}</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    title: String,
    movies: Array
  });
  
  const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
  </script>
  
  <style scoped>
  .movie-row {
    margin-bottom: 2rem;
  }
  
  .movie-list {
    display: flex;
    overflow-x: auto;
    padding: 1rem 0;
  }
  
  .movie-card {
    flex: 0 0 auto;
    width: 200px;
    margin-right: 1rem;
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
  </style>