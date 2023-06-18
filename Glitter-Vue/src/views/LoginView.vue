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
				<custom-card :btns="btnArray" :link="linkArray" class="card mx-auto custom-card">
					<h4 class="text-center">Sign in</h4>

					<form @submit.prevent="login">
						<div class="mb-3 mt-2">
							<input type="username" class="form-control" v-model="username" placeholder="👤 Username" />
						</div>
						<div class="mb-3 mt-2">
							<input type="password" class="form-control" v-model="password" placeholder="🔒 Password" />
						</div>
						<!-- <div class="text-danger">{{ errorMessage }}</div>
						<div class="text-center mt-2">
						</div> -->
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
	name: "LoginView",
	components: {
		CustomCard,
		FooterSection,
	},
	setup() {
		const linkArray = [
			{
				txt: "Forgot password?",
				class: "d-flex justify-content-end text-decoration-none",
				route: "/new-password"
			},
		];
		const btnArray = ref([
			{
				txt: "Login",
				class: "btn-secondary",
				action: () => login()
			},
		]);

		const username = ref("");
		const password = ref("");
		const errorMessage = ref("");
		const router = useRouter()

		async function login() {
			try {
				const response = await glitterApi.post("/auth/login", {
					username: username.value,
					password: password.value,
				});

				localStorage.setItem("access_token", response.data.token);
				router.push("/private");
			} catch (error) {
				errorMessage.value = error.response.data.message;
			}
		}

		return {
			linkArray,
			btnArray,
			username,
			password,
			errorMessage,
			login,
		};
	},
};
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
		margin-top: 5.9em;
	}

}
</style>
