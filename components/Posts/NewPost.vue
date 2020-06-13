<template>
	<div>
		<transition name="showfield">
			<template v-if="loading">
				<alert :loading="true" class="mb-8">Publishing your reply ...</alert>
			</template>
		</transition>
		<div class="relative flex justify-between rounded py-2 px-3 transition-all duration-200 ease-in-out cursor-pointer bg-gray-200">
			<div class="w-full mr-0 sm:w-auto sm:mr-6 sm:block hidden">
		        <a href="#" @click.prevent="false == true" class="relative w-12-5 h-12-5 inline-block">
		          <img :src="$auth.user.avatar" class="w-full h-full rounded-full object-cover border border-solid border-text-gray-500" alt="avatar" :title="$auth.user.name" />
		        </a>
	      	</div>
			<div class="w-full sm:w-5/6">
				<div class="">
					<textarea class="block w-full text-sm text-gray-900 bg-white py-2 px-4 appearance-none placeholder-gray-500 border border-solid rounded resize-none focus:outline-none bg-white" rows="5" placeholder="Write a reply..." @keyup="showSubmitButton" v-model="form.content" onkeydown="if(this.enterSend && event.keyCode == 13) return false;"></textarea>
					<p class="text-xs font-bold text-gray-600 mt-2" v-if="enterSend">
						To add new line: 
						<span class="text-blue-400">Control + Enter</span>
					</p>
					<p class="text-xs font-bold text-gray-600 mt-2">Markdown and code highlighting are supported.</p>
				</div>
				<transition name="showfield">
					<template v-if="submit_button">
						<div class="flex justify-end">
							<button class="mt-4 inline-block bg-gray-700 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out border-none outline-0 cursor-pointer hover:outline-none hover:bg-opacity-75" id="submitReply" @click.prevent="storePost" :class="{ 'bg-opacity-75 cursor-not-allowed': loading }">{{ (loading) ? 'Please wait ...' : 'Submit the reply' }}</button>
						</div>
					</template>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	// import { mapGetters } from 'vuex'
	import { EventBus } from '~/plugins/event-bus'
	import Alert from '~/components/Cards/Alert'
	export default {
		data () {
			return {
				submit_button: false,
				scrolled: 0,
				form: {
					content: '',
					parent_id: null,
				},
				loading: false,
				previousKeydown: null,
				enterSend: false,
			}
		},
		components: {
			Alert,
		},
		methods: {
			showSubmitButton() {
				if(this.form.content.length <= 0) {
					this.submit_button = false
				} else {
					this.submit_button = true

					this.scrollToSubmit()
			    }
			},
			scrollToSubmit() {
				if (this.scrolled >= 2) return

				this.scrolled++ 
				const el = document.querySelector('#submitReply')
				    if (el) {
				    	const scrollTo = el.getBoundingClientRect().top
				      	window.scrollBy({ 
				      		top: scrollTo - 20, 
				      		left: 0, 
				      		behavior: 'smooth' 
				      	})
				    }
				},
			async storePost() {
				if (this.loading) {
					return
				}

				this.loading = true
				try {
					let myForm = {
						content: this.form.content,
						parent_id: this.form.parent_id,
					}

					this.clearForm()

					let response = await this.$axios.$post(`/discussions/${this.$route.params.discussion}/posts`, myForm)

					EventBus.$emit('post:stored', response.data)
				} catch(e) {
					//
				}
				this.loading = false
			},
			addNewLine() {
				this.form.content += "\n"
				this.previousKeydown = null
			},
			clearForm() {
				this.form.content = ''
				this.form.parent_id = null
			}
		},
		mounted() {
			if (this.enterSend) {
				document.addEventListener('keydown', (e) => {
					if (e.keyCode == 13) {
						if (this.previousKeydown == 17) {
							this.addNewLine()
						} else if(this.previousKeydown != 16) {
							this.storePost()
							this.previousKeydown = null
						}
					}
					this.previousKeydown = e.keyCode
				})
			}
		}
	}
</script>