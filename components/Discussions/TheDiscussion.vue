<template>
	<div class="flex items-center justify-between pb-1 mb-4 border-b border-solid border-gray-200 flex-col sm:flex-row">
		<div class="w-full">
			<template v-if="!editing">
				<h3 class="m-0 tracking-tight font-medium mb-1 text-lg text-gray-900" v-on:dblclick.prevent="edit">{{ discussion.title }}</h3>
			</template>
			<template v-else>
				<div class="flex items-center justify-between">
					<input type="text" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500" v-model="form.title" />
					<transition name="showfield">
						<template v-if="form.title.length > 0">
							<a href="#" class="block bg-blue-400 text-white py-1 px-2 transition-all duration-200 ease-in-out text-xs ml-4 text-center w-24 rounded" @click.prevent="submitEdit">Save</a>
						</template>
					</transition>
					<a href="#" class="block border border-solid border-text-gray-500 text-gray-600 py-1 px-2 transition-all duration-200 ease-in-out text-xs ml-4 text-center w-24 rounded" @click.prevent="cancelEdit">Cancel</a>
				</div>
			</template>
		</div>
		<div class="flex items-center justify-between flex-row-reverse my-2 sm:my-0" v-if="!editing">
			<nuxt-link :to="channelLink" class="block bg-gray-500 text-white py-1 px-2 transition-all duration-200 ease-in-out text-xs ml-4 text-center w-24 rounded">{{ channel.name }}</nuxt-link>
			<div class="flex items-center justify-center text-gray-600 ml-4">
	          <div class="mr-1">
	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="w-4 fill-current"><path class="heroicon-ui" d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2zM20 5H4v10h13a1 1 0 0 1 .7.3l2.3 2.29V5z"/></svg>
	          </div>
	          <span class="text-xs font-bold">{{ discussion.posts_count }}</span>
	        </div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '~/plugins/event-bus'
	export default {
		data() {
			return {
				editing: false,
				form: {
					title: ''
				}
			}
		},
		props: {
			discussion: {
				required: true,
				type: Object,
			}
		},
		computed: {
			channel() {
				return this.discussion.channels.data || {}
			},
			user() {
				return this.discussion.user || {}
			},
		    channelLink() {
				return '/channels/' + this.channel.slug || '/'
		    },
		},
		methods: {
			edit() {
				if (!this.user.canEdit) return

				this.form.title = this.discussion.title
				this.editing = true
			},
			async submitEdit() {
				if (this.form.title < 1 || this.form.title == this.discussion.title) return

				// let discussion = Object.assign({}, this.discussion)
				// discussion.title = this.form.title

				try {
					let response = await this.$axios.$patch(`/discussions/${this.discussion.slug}`, this.form)

					this.$store.commit('SET_CURRENT_DISCUSSION', response.data)
					
					this.cancelEdit()

					EventBus.$emit('discussions:edited', response.data)
				} catch(e) {
					// Error handling here
				}
			},
			cancelEdit() {
				this.editing = false
			}
		},
	}
</script>