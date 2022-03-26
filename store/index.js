import axios from 'axios'

export const state = () => ({
    movies: [],
})

export const mutations = {
    setMovies(state, movie) {
        state.movies = movie;
    },
}

export const actions = {
    async getMovies(vuexContext) {
        const data = axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`
        )
        const result = await data
        const tempData = []
        result.data.results.forEach((movie) => {
            tempData.push(movie)
        })
        vuexContext.commit('setMovies', tempData)
    },
    async searchMovies(vuexContext, searchInput) {
        const data = axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&page=1&query=${searchInput}`
        )
        const result = await data
        const searchData = []
        result.data.results.forEach((movie) => {
            searchData.push(movie)
        })
        vuexContext.commit('setMovies', searchData)
    }
}

export const getters = {
    movies(state) {
        return state.movies
    }
}
