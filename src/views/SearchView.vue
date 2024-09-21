<template>
    <div class="search">
      <input v-model="searchQuery" @input="handleSearch" placeholder="Search for movies..." />
      <MovieList :movies="searchResults" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import MovieList from '@/components/MovieList.vue';
  import { searchMovies } from '@/services/tmdb';
  
  export default {
    name: 'SearchView',
    components: {
      MovieList
    },
    setup() {
      const searchQuery = ref('');
      const searchResults = ref([]);
  
      const handleSearch = async () => {
        if (searchQuery.value.length > 2) {
          try {
            const response = await searchMovies(searchQuery.value);
            searchResults.value = response.data.results;
          } catch (error) {
            console.error('Error searching movies:', error);
          }
        }
      };
  
      return {
        searchQuery,
        searchResults,
        handleSearch
      };
    }
  }
  </script>
  
  <style scoped>
  .search input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  </style>