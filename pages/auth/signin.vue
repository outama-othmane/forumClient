<template>
	<div class="w-full min-h-screen-16 flex items-center relative">
		<div class="w-full sm:w-1/2 md:w-1/3 my-0 mx-auto mx-4 sm:px-0 px-4">
			<div class="text-center mb-8">
				<h3 class="text-center font-bold m-0 mb-1 text-gray-900 text-xl">Hello</h3>
				<span class="text-gray-600 text-sm">Great to see you again. Now, sign in and get learning!</span>
			</div>
			<div class="rounded py-6 px-8 border border-solid border-gray-200">
				<form @submit.prevent="signin">
					<div class="mb-4">
						<label class="block font-medium text-gray-900 text-sm mb-1">Email address</label>
						<input type="email" name="email" placeholder="email@somewhere.com" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500" :class="{'border-gray-600' : errors.email }" v-model="form.email" :autofocus="true" />
						<template v-if="errors.email">
							<small class="font-bold text-gray-600 text-xs">{{ errors.email[0] }}</small>
						</template>
					</div>
					<div class="mb-4">
						<div class="flex items-center justify-between">
							<label class="block font-medium text-gray-900 text-sm mb-1">Password</label>
							<a href="#" class="inline-block text-sm mb-1 text-blue-400 transition-all duration-200 ease-in-out hover:text-opacity-75">Forgot password ?</a>
						</div>
						<input type="password" name="password" placeholder="password" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500" :class="{'border-gray-600' : errors.password }" v-model="form.password" />
						<template v-if="errors.password">
							<small class="font-bold text-gray-600 text-xs">{{ errors.password[0] }}</small>
						</template>
					</div>
					<button class="mt-8 block bg-blue-400 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out border-none w-full outline-0 cursor-pointer hover:outline-none hover:bg-opacity-75" :class="{ 'bg-opacity-75 cursor-not-allowed': loading }" @click.prevent="signin">{{ (loading) ? 'Please wait ...' : 'Sign in' }}</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		middleware: ['guest'],
		layout: 'noaside',
		data() {
			return {
				form: {
					email: '',
					password: '',
				},
				loading: false,
				errors: {}
			}
		},
		methods: {
			async signin() {
				if (this.loading) {
					return
				}
				this.removeErrors()

				try {
					let response = await this.$auth.loginWith('local', { data: this.form })
					if (this.$route.query.redirect && this.$route.query.redirect != '') {
						this.$router.push(this.$route.query.redirect)
					} else {
						this.$router.push('/')
					}
				} catch(e) {
					// We have to add some other error handling here.
					if (e.response) {
						if (e.response.data.errors) {
							this.errors = e.response.data.errors
						}
					}
				}
				this.loading = false
			},
			removeErrors() {
				this.loading = true
				this.errors = {}
			}
		},
		head() {
			return {
				title: `Sign in - Forum`
			}
		}
	}
</script>