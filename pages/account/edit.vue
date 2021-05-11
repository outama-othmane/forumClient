<template>
	<div class="w-full pt-10 md:pt-20 pr-12 pb-5 pl-12 relative">
		<div class="w-full mb-4">
			<div class="flex pb-1 mb-4 border-b border-solid border-gray-200">
				<h3 class="m-0 tracking-tight font-medium mb-1 text-lg text-gray-900">Edit your account</h3>
			</div>
			<div class="w-full relative">
				<form action="#" @submit.prevent="saveChanges">
					<div class="mb-4">
						<label class="block font-medium text-gray-900 text-sm mb-2">Email</label>	
						<input type="text" name="email" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500" autofocus="autofocus" v-model="form.email" />
					</div>
					<div class="mb-4">
						<label class="block font-medium text-gray-900 text-sm mb-2">Username</label>	
						<input type="text" name="username" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500 bg-gray-200 cursor-not-allowed" disabled="disabled" v-model="form.username" />
					</div>
					<div class="mb-4">
						<label class="block font-medium text-gray-900 text-sm mb-2">Name</label>	
						<input type="text" name="name" class="block w-full text-sm border border-solid border-gray-200 rounded text-gray-900 bg-white py-2 px-4 appearance-none outline-none transition-color duration-100 ease-in-out placeholder-gray-500" v-model="form.name" />
					</div>
					<div class="flex items-center justify-end">
						<button class="mt-8 inline-block bg-blue-400 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out border-none outline-0 cursor-pointer hover:outline-none hover:bg-opacity-75">Save changes</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		middleware: 'signedin',
		data() {
			return {
				form: {
					name: '',
					username: '',
					email: '',
				},
			}
		},

		methods: {
			async saveChanges() {
				try {

				} catch(e) {
					//
				}
			}
		},
		mounted() {
			this.form.name = this.$auth.user.name
			this.form.username = this.$auth.user.username
			this.form.email = this.$auth.user.email
		}
	}
</script>