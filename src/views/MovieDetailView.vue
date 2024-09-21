<template>
    <div v-if="movie" class="movie-detail">
      <img :src="backdropUrl" :alt="movie.title" class="backdrop">
      <div class="content">
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.overview }}</p>
        <p>Release Date: {{ movie.release_date }}</p>
        <p>Rating: {{ movie.vote_average }}/10</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getMovieDetails } from '@/services/tmdb';
  
  export default {
    name: 'MovieDetailView',
    setup() {
      const route = useRoute();
      const movie = ref(null);
  
      onMounted(async () => {
        try {
          const response = await getMovieDetails(route.params.id);
          movie.value = response.data;
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      });
  
      const backdropUrl = computed(() => {
        return movie.value
          ? `https://image.tmdb.org/t/p/original${movie.value.backdrop_path}`
          : '';
      });
  
      return {
        movie,
        backdropUrl
      };
    }
  }
  </script>
  
  <style scoped>
  .movie-detail {
    position: relative;
    color: #fff;
  }
  
  .backdrop {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  
  .content {
    background-color: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    max-width: 800px;
    margin: 2rem auto;
  }
  </style>
  