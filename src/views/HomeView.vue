
<template>
  <div class="home">
    <h1>Trending Movies</h1>
    <div v-if="trendingMovies.length" class="movie-list">
      <div v-for="movie in trendingMovies" :key="movie.id" class="movie-card">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title">
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
    <p v-else-if="error">Error: {{ error }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTrending } from '../services/tmdb';

const trendingMovies = ref([]);

onMounted(async () => {
  try {
    const response = await getTrending();
    trendingMovies.value = response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
});

const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
</script>

<style scoped>
.home {
  padding: 2rem;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie-card {
  width: 200px;
  margin: 1rem;
  text-align: center;
}

.movie-card img {
  width: 100%;
  height: auto;
}
</style>