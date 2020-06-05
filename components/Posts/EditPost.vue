<template>
	<div class="mb-4">
		<textarea class="block w-full text-sm text-gray-900 bg-white py-2 px-4 appearance-none placeholder-gray-500 border border-solid rounded resize-none focus:outline-none bg-white" rows="5" @keyup="showSubmitButton" v-model="post.content"></textarea>
		<p class="text-xs font-bold text-gray-600 mt-2">Markdown and code highlighting are supported.</p>
		<transition name="showfield">
			<template v-if="submit_button">
				<div class="flex justify-end">
					<button class="mt-4 inline-block bg-gray-700 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out border-none outline-0 cursor-pointer hover:outline-none hover:bg-opacity-75" @click.prevent="edit" :class="{ 'bg-opacity-75 cursor-not-allowed': loading }">{{ (loading) ? 'Please wait ...' : 'Edit post' }}</button>
				</div>
			</template>
		</transition>
	</div>
</template>

<script>
	import { EventBus } from '~/plugins/event-bus'
	import marked from 'marked'
	export default {
		data () {
			return {
				submit_button: true,
				form: {
					content: '',
				},
				loading: false,
			}
		},
		props: {
			post: {
				type: Object,
				required: true
			}
		},
		methods: {
			showSubmitButton() {
				if (this.post.content.length <= 0) {
					this.submit_button = false
				} else {
					this.submit_button = true
				}
			},
			async edit() {
				if (this.loading) {
					return
				}

				this.loading = true
				try {
					let myForm = {
						content: this.post.content,
					}

					let response = await this.$axios.$put(`/discussions/${this.$route.params.discussion}/posts/${this.post.id}`, myForm)

					this.post.content_markdown = marked(this.post.content)
					EventBus.$emit('post:edited', this.post)
				} catch(e) {
					//
				}
				this.loading = false
			}
		}
	}
</script>