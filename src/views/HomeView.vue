<template>
  <div class="home">
    <h1>Netflix Clone</h1>
    
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else>
      <MovieRow title="Trending Now" :movies="trendingMovies" />
      <MovieRow v-for="genre in genres" :key="genre.id" :title="genre.name" :movies="moviesByGenre[genre.id]" />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTrending, getGenres, getMoviesByGenre } from '../services/tmdb';
import MovieRow from '../components/MovieRow.vue';

const trendingMovies = ref([]);
const genres = ref([]);
const moviesByGenre = ref({});
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const [trendingResponse, genresResponse] = await Promise.all([
      getTrending(),
      getGenres()
    ]);
    
    trendingMovies.value = trendingResponse.data.results;
    genres.value = genresResponse.data.genres.slice(0, 5); // Limit to 5 genres for now
    
    // Fetch movies for each genre
    await Promise.all(genres.value.map(async (genre) => {
      const response = await getMoviesByGenre(genre.id);
      moviesByGenre.value[genre.id] = response.data.results;
    }));

  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = 'Failed to load movies. Please try again later.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.home {
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  margin-top: 2rem;
}
</style>