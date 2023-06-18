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
				<custom-card :error="error" :btns="btnArray" class="mx-auto custom-card" @reset-password="resetPassword">
					<h4 class="text-center">
						Forgot password
					</h4>
					<div class="change-pass">
						<ol class="list-unstyled">
							<li><span class="text">1. </span>Enter your email address below.</li>
							<li><span class="text-medium">2. </span>Our system will send you a temporary link.</li>
						</ol>
					</div>
					<form>
						<div class="mb-3 mt-2">
							<input type="email" class="form-control" placeholder="✉️ E-mail" v-model="email" required />
							<div v-if="error" class="alert alert-danger">{{ error }}</div>
						</div>
					</form>
				</custom-card>
			</div>
		</div>
	</div>
	<FooterSection />
</template>
    
<script>
import glitterApi from "../api/glitterApi"
import { ref } from 'vue'
import CustomCard from '../components/CustomCard.vue'
import FooterSection from "@/components/FooterSection.vue"
import emailRegex from "@/utils/emailRegex.js"

export default {
	name: "PasswordView",
	components: {
		CustomCard,
		FooterSection,
	},
	setup() {
		const email = ref("");
		const btnArray = [
			{ txt: "Reset Password", class: "btn-primary", action: "resetPassword" },
		];
		const error = ref(null);


		function isEmailValid(emailValue) {
			return emailRegex.test(emailValue);
		}

		const resetPassword = async function sendEmail() {
			if (!isEmailValid(email.value)) {
				error.value = "Please enter a valid email address";
				return;
			}

			try {
				const response = await glitterApi.sendEmail(email.value);
				if (response.error) {
					error.value = "This email isn't attached to any existent account";
					return;
				}
				error.value = null;
			} catch (err) {
				error.value = "An error occurred while sending the email. Please try again later";
			}
		}

		return {
			email,
			btnArray,
			error,
			resetPassword,
		};
	},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

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

.change-pass {
	font-size: 13px;
}

.custom-card {
	max-width: 398px;
	margin-top: 1.6em;
	padding: 48px 80px;
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
