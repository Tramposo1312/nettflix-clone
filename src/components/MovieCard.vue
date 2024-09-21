<template>
    <div class="movie-card" @click="navigateToMovie">
      <img :src="imageUrl" :alt="movie.title || movie.name">
      <div class="movie-info">
        <h3>{{ movie.title || movie.name }}</h3>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieCard',
    props: ['movie'],
    computed: {
      imageUrl() {
        return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
      }
    },
    methods: {
      navigateToMovie() {
        this.$router.push(`/movie/${this.movie.id}`);
      }
    }
  }
  </script>
  
  <style scoped>
  .movie-card {
    width: 200px;
    margin: 1rem;
    cursor: pointer;
    transition: transform 0.3s;
  }
  
  .movie-card:hover {
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: auto;
  }
  
  .movie-info {
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
  </style>