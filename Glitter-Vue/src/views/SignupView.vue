<template>
	<div class="home">
		<div class="row">
			<div class="col-lg-6">
				<div class="img-cont">
					<img src="../assets/img/logo_navbar.svg" height="200" alt="Glitter Logo">
					<h2 class="text-center text-lg-start" style="margin-right: 30px;">
						Welcome to Glitter!
					</h2>
				</div>
			</div>
			<div class="col-lg-6">

				<custom-card :btns="btnArray" :link="linkArray" class="mx-auto custom-card">
					<h4 class="text-center">
						Sign up
					</h4>
					<form @submit.prevent="signup">
						<div class="mb-3 mt-2">
							<input type="email" class="form-control" placeholder="✉️ E-mail" v-model="email" />
						</div>
						<div class="mb-3 mt-2">
							<input type="username" class="form-control" placeholder="👤 Username" v-model="username" />
						</div>
						<div class="mb-3 mt-2">
							<input type="password" class="form-control" placeholder="🔒 Password" v-model="password" />
						</div>
						<div class="text-danger">{{ errorMessage }}</div>
						<div class="text-center mt-2"></div>
					</form>
				</custom-card>
			</div>
		</div>
	</div>
	<FooterSection />
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import glitterApi from "../api/glitterApi"
import CustomCard from "../components/CustomCard.vue";
import FooterSection from "@/components/FooterSection.vue";

export default {
	name: 'SignupView',
	components: {
		CustomCard,
		FooterSection,
	},
	setup() {
		const linkArray = [
			{
				txt: "Already a member?",
				class: "d-flex justify-content-end text-decoration-none",
				route: "/login" // si eres miembro te enviamos al login
			}
		];

		const btnArray = ref([
			{
				txt: 'Sign Up',
				class: 'btn-secondary',
				action: () => signup()
			}
		]);

		const email = ref("");
		const username = ref("");
		const password = ref("");
		const errorMessage = ref("");
		const router = useRouter()

		async function signup() {
			const usernameRegex = /^[a-zA-Z0-9_]+$/;
			if (!usernameRegex.test(username.value)) {
				console.log('username can only contain letters, numbers or the character _')
				errorMessage.value = "Username can only contain letters, numbers or the character _";
				return; // ESTO LO HACE BIEN 
			}
			try {
				const result = await checkEmailAndUsername(email.value, username.value);
				if (result === "This email already exists" || result === "This username already exists") {
					errorMessage.value = result;
					return;
				}
				await glitterApi.post("/auth/register", {
					email: email.value,
					username: username.value,
					password: password.value,
				});

				// if everything´s fine, redirect to loginView

				router.push("/login");



			} catch (error) {
				errorMessage.value = error.response.data.message;
			}
		}

		async function checkEmailAndUsername(email, username) {
			try {
				const emailResponse = await glitterApi.post('/auth/register', {
					email: email
				});
				if (emailResponse.status === 400) {
					console.log('this email already exists')
					return "This email already exists";
				}

				const usernameResponse = await glitterApi.post('/auth/register', {
					username: username
				});
				if (usernameResponse.status === 400) {
					console.log("This username already exists")
					return "This username already exists";
				}

				console.log('ok')
				return "ok";

			} catch (error) {
				// console.log('Something went wrong')
				errorMessage.value = error.response.data.message;
				// return "Something went wrong";
			}
		}

		return {
			linkArray,
			btnArray,
			email,
			username,
			password,
			errorMessage,
			signup
		}
	},
}
</script>

<style scoped>
.home {
	max-width: 895px;
	margin: auto;
}

.img-cont {
	display: flex;
	flex-direction: column;
}

img {
	width: 300px;
	margin: 1em auto 0 auto;
}

.custom-card {
	max-width: 398px;
	margin-top: 1.6em;
	padding: 38px 80px;
}

h2 {
	font-size: 40px;
	font-family: 'Poppins', sans-serif;
	text-transform: lowercase;
	font-weight: 600;
	text-align: center;
	color: black;
	margin-top: 0.8em;
	margin-left: 3em;
	letter-spacing: 2px;
}

input.form-control {
	background: #f8f4e5;
	border: 2px solid rgba(0, 0, 0, 1);
}

input {
	letter-spacing: 2px;
}

@media (min-width: 992px) {
	.home {
		margin: 4em auto;
	}

	img {
		width: 400px;
		margin: 1em;
		margin-top: 6.9em;
	}

	.custom-card {
		margin: 0;
		margin-top: 6.2em;
	}

}
</style>
