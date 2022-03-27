/* eslint-disable no-useless-return */
<template>
  <div class="home">
    <!-- Hero -->
    <Hero />

    <!-- Search -->
    <div class="container search">
      <input v-model="searchInput" type="text" placeholder="Search" />
      <button
        v-show="searchInput !== ''"
        class="button clear-button"
        @click="clearSearch"
      >
        Clear search
      </button>
    </div>

    <!-- Loading -->
    <!-- <Loading v-if="$fetchState.pending" />  -->

    <!-- Movies -->
    <div class="container movies">
      <MovieCard
        v-if="searchInput !== ''"
        id="movie-grid"
        class="movies-grid"
      />
      <MovieCard v-else id="movie-grid" class="movies-grid" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      searchInput: '',
    }
  },
  computed: {
    movies() {
      return this.$store.getters.movies
    },
  },
  watch: {
    searchInput() {
      this.$store.dispatch('searchMovies', this.searchInput)
    },
  },
  mounted() {
    this.$store.dispatch('getMovies')
  },
  methods: {
    clearSearch() {
      this.searchInput = ''
    },
  },
}
</script>

<style lang="scss" scoped>
$background-color: #0a1b22;
$box-shadow: #193a46;
$button: #4f98a5;
$button-hover: #306771;
$light-blue: #70d7d6;

.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .search {
    display: flex;
    padding: 32px 16px;
    justify-content: center;
    align-items: center;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;

      &:focus {
        outline: none;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 42.25px;
    }
  }
  .movies {
    width: 85%;
    padding: 32px 16px;
  }
}
</style>
