<template>
  <div id="movie-grid" class="movies-grid">
    <div v-for="(movie, index) in movies" :key="index" class="movie">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25)
              }}<span v-if="movie.title.length > 30">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
          </div>
          <div class="flip-card-back">
            <p class="overview">{{ movie.overview }}</p>
          </div>
        </div>
      </div>
      <NuxtLink
        class="button button-ligth"
        :to="{ name: 'movies-movieid', params: { movieid: movie.id } }"
        >Get More Info</NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
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
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;

      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }

      .movie {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: transparent;

        &:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 1.2s;
          transform-style: preserve-3d;

          .flip-card-front,
          .flip-card-back {
            position: relative;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
          }

          .flip-card-back {
            transform: rotateY(180deg);

            .overview {
              line-height: 1.5;
              position: relative;
              bottom: 0;
              background-color: #fff;
              padding: 12px;
              color: #fff;
              // transform: translateY(100%);
              transition: 0.5s ease-in-out all;
            }
          }
        }

        .movie-img {
          position: relative;
          overflow: hidden;
          border-radius: 10px;

          box-shadow: 8px 12px 16px $box-shadow;
          &:hover {
            box-shadow: 10px 14px 20px $button-hover;
            transition: box-shadow 500ms;
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: $box-shadow;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
        }
        .info {
          margin-top: auto;
          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }
          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
