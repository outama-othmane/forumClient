<template>
	<div class="w-full min-h-screen-16 flex items-center relative pt-8">
		<div class="w-full sm:w-1/2 md:w-1/3 my-0 mx-auto mx-4 sm:px-0 px-4">
			<div class="text-center mb-8">
				<h3 class="text-center font-bold m-0 mb-1 text-gray-900 text-xl">Hello</h3>
				<span class="text-gray-600 text-sm">Let's get you signed up.</span>
			</div>
			<div class="rounded py-6 px-8 border border-solid border-gray-200">
				<form @submit.prevent="signup">
					<div class="mb-4">
						<label class="block font-medium text-gray-900 text-sm mb-1">Name</label>	
						<input type="text" name="name" placeholder="name" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500" :class="{'border-gray-600' : errors.name }" v-model="form.name" autofocus="autofocus" />
						<template v-if="errors.name">
							<small class="font-bold text-gray-600 text-xs">{{ errors.name[0] }}</small>
						</template>
					</div>
					<div class="mb-4">
						<label class="block font-medium text-gray-900 text-sm mb-1">Email address</label>	
						<input type="email" name="email" placeholder="email@somewhere.com" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500" :class="{'border-gray-600' : errors.email }" v-model="form.email" />
						<template v-if="errors.email">
							<small class="font-bold text-gray-600 text-xs">{{ errors.email[0] }}</small>
						</template>
					</div>
					<div class="mb-4">
						<label class="block font-medium text-gray-900 text-sm mb-1">Password</label>
						<div class="relative w-full block">
							<input :type="passwordFieldInput" name="password" placeholder="password" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500 pr-8"  :class="{'border-gray-600' : errors.password }" v-model="form.password" />
							<a class="absolute top-0 right-3 h-full cursor-pointer flex items-center text-gray-500" :class="{ 'text-blue-400' : show_password }" @click.prevent="togglePassword">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="fill-current"><path class="heroicon-ui" d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zm-9.9-1.42a6 6 0 0 0 8.48 0L20.38 12l-4.24-4.24a6 6 0 0 0-8.48 0L3.4 12l4.25 4.24zM11.9 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
							</a>
						</div>
						<div>
							<template v-if="errors.password">
								<small class="font-bold text-gray-600 text-xs">{{ errors.password[0] }}</small>
							</template>
						</div>
					</div>
					<transition name="showfield">
						<template v-if="!show_password">
							<div class="mb-4 cpassword">
								<label class="block font-medium text-gray-900 text-sm mb-1">Confirm password</label>
								<input type="password" name="cpassword" placeholder="repeat password" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500" v-model="form.cpassword" />
							</div>
						</template>
					</transition>
					<p class="mb-0 text-xs text-gray-600">
						By clicking on the button below, you admit that you accept our license and agreements.
					</p>
					<button class="mt-8 block bg-blue-400 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out border-none w-full outline-0 cursor-pointer hover:outline-none hover:bg-opacity-75" :class="{ 'bg-opacity-75 cursor-not-allowed': loading }" @click.prevent="signup">{{ (loading) ? 'Please wait ...' : 'Sign up' }}</button>
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
				show_password: false,
				form: {
					name: '',
					email: '',
					password: '',
					cpassword: '',
				},
				loading: false,
				errors: {}
			}
		},
		computed: {
			passwordFieldInput() {
				return this.show_password ? 'text' : 'password'
			}
		},
		methods: {
			togglePassword() {
				this.show_password = !this.show_password
			},
			validatePassword() {
				if (this.form.password != this.form.cpassword) {
					this.errors.password = ['The password confirmation does not match.']
					return true
				}
				return false
			},
			removeErrors() {
				this.loading = true
				this.errors = {}
			},
			async signup() {
				if (this.loading) {
					return
				}
				this.removeErrors()

				if ( ! this.show_password ) {
					let vp = this.validatePassword()
					if (vp) {
						this.loading = false
						return
					}
				}	

				try {
					let response = await this.$axios.$post('/auth/register', this.form)

					let loginResponse = await this.$auth.loginWith('local', { data: this.form })

					this.$router.push('/')

				} catch(e) {
					if (e.response) {
						if (e.response.status == 422) {
							this.errors = e.response.data.errors
						}
					} else {
						// set status code on server
					    if (process.server) {
					      this.$nuxt.context.res.statusCode = 500
					    }
					    // throwing an error will set $fetchState.error
					    throw new Error('Server Error!')
					}
				}
				this.loading = false
			},
		},
		head() {
			return {
				title: `Sign up | ${process.env.APP_NAME}`
			}
		}
	}
</script>