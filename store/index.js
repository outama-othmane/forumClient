import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
	currentDiscussion: {},
	channels: []
})

export const getters = {
	currentDiscussion(state) {
		return state.currentDiscussion
	},
	channels(state) {
		return state.channels
	}
}

export const mutations = {
	SET_CURRENT_DISCUSSION(state, discussion) {
		state.currentDiscussion = discussion
	},
	SET_CHANNELS(state, channels) {
		state.channels = channels
	}
}

export const actions = {
	async nuxtServerInit({ commit }) {
		try {
			let response = await this.$axios.$get('/channels?perPage=5')
			commit('SET_CHANNELS', response.data)
		} catch(e) {
			console.log(e.response);
		}
	}
}