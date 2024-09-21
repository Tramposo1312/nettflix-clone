<template>
    <div class="movie-list">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </template>
  
  <script>
  import MovieCard from './MovieCard.vue';
  
  export default {
    name: 'MovieList',
    components: {
      MovieCard
    },
    props: ['movies']
  }
  </script>
  
  <style scoped>
  .movie-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>