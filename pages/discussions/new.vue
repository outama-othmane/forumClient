<template>
	<div class="w-full min-h-screen-16 block relative px-4 py-8">
		<transition name="showfield">
			<template v-if="Object.keys(errors).length>0">
				<div class="w-full bg-blue-400 py-4 px-5 rounded mb-4">
					<template v-for="error in errors">
						<li class="text-white list-disc text-sm p-0 m-0">{{ error[0] }}</li>
					</template>
				</div>
			</template>
		</transition>
		<form @submit.prevent="submitDiscussion">
			<div class="mb-4 flex relative">
				<select class="flex items-center justify-center text-xs rounded bg-gray-500 text-white cursor-pointer outline-none focus:outline-none pl-2" style="width: 100px;" v-model="form.channel_id">
					<option value="0">Choose tag</option>
					<option v-for="option in channels" :value="option.id">{{ option.name }}</option>
				</select>
				<input type="text" class="block w-full text-sm text-gray-900 bg-white py-2 px-4 appearance-none border-none placeholder-gray-500 pl-2 focus:outline-none" placeholder="Discussion title" v-model="form.title" />
			</div>
			<div class="mb-4">
				<textarea class="block w-full text-sm text-gray-900 bg-white py-2 px-4 appearance-none placeholder-gray-500 border border-solid border-gray-200 rounded resize-none focus:outline-none" placeholder="Write a post..." rows="10" cols="3" id="content" v-model="form.content"></textarea>
				<p class="text-xs font-bold text-gray-600 mt-2">Markdown and code highlighting are supported.</p>
			</div>
			<button class="mt-8 inline-block text-white py-2 px-4 rounded transition-all duration-200 ease-in-out border-none outline-0 cursor-pointer focus:outline-none hover:bg-opacity-75 bg-gray-700" @click.prevent="submitDiscussion" :class="{ 'bg-opacity-75 cursor-not-allowed': loading }">{{ (loading)  ? 'Please wait...' : 'Post discussion'}}</button>
		</form>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		middleware: 'signedin',
		layout: 'noaside',
		transition: 'fademe',
		data() {
			return {
				form: {
					title: '',
					content: '',
					channel_id: 0,
					parent_id: null,
				},
				errors: {},
				loading: false,
				select: false,
			}
		},
		computed: {
			...mapGetters({
				channels: 'channels',
			}),
		},
		methods: {
			scrollToTop() {
				window.scrollBy({
				    top: 0,
				    left: 0,
				    behavior: 'smooth'
				})
			},
			async submitDiscussion() {
				if (this.loading) {
					return
				}
				this.errors = {} 
				this.loading = true
				try {
					let response = await this.$axios.$post('/discussions', this.form)
					this.$router.push(`/discussions/${response.data.slug}`)
				} catch(e) {
					if (e.response) {
						if (e.response.data.errors) {
							this.errors = e.response.data.errors
							this.scrollToTop()
						}
					}
				}

				this.loading = false
			}
		},
		mounted() {
			var a = document.querySelectorAll('form > *');
			var m = a.length
			var t = 0
			for (var i = 0; i <m; i++) {
				if (i == 1)
					continue;
				t += a[i].clientHeight
			}
			t += 64*3
			t += 28
			document.getElementById('content').style.height = (window.innerHeight - t) + "px"
		},
		head() {
			return {
				title: 'New discussion - Forum'
			}
		}
	}
</script>