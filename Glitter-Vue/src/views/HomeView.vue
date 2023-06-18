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
				<custom-card class="mx-auto custom-card">
					<h4 class="text-center">
						Join us!
					</h4>
					<router-link to="/login" class="nav-link active" aria-current="page">
						<div class="login d-grid">
							<button class="btn btn-primary custom-btn" type="button">Login</button>
						</div>
					</router-link>
					<router-link to="/signup" class="nav-link active" aria-current="page">
						<div class="signup d-grid">
							<button class="btn btn-secondary second-btn" type="button">Sign Up</button>
						</div>
					</router-link>
				</custom-card>
			</div>
		</div>
		<div class="jumbotron">
			<hr class="my-4">
			<p class="copy">Connect with friends, make new ones, and soar to new heights. 🛫 Don't be left behind, join the
				#GlitterFlock today and start glittering! #SpreadYourWings 🌪️</p>
			<p class="lead">
				<router-link to="/public">
					<button class="btn btn-primary custom-btn-explore" type="button">Explore</button>
				</router-link>
			</p>
		</div>
	</div>
	<FooterSection />
</template>




<script>
// @ is an alias to /src
import CustomCard from '../components/CustomCard.vue'
import FooterSection from "@/components/FooterSection.vue"
export default {
	name: 'HomeView',
	components: {
		CustomCard,
		FooterSection,
	}
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

.home {
	max-width: 895px;
	margin: auto;
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
	margin-top: 1.2em;
}


.custom-btn {
	display: block;
	margin: 0 auto;
	line-height: 28pt;
	padding: 0 20px;
	background: #ffa580;
	letter-spacing: 2px;
	transition: .2s all ease-in-out;
	outline: none;
	border: 1px solid rgba(0, 0, 0, 1);
	box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}

.custom-btn-explore {
	line-height: 28pt;
	padding: 0 20px;
	background: #ffa580;
	letter-spacing: 2px;
	transition: .2s all ease-in-out;
	outline: none;
	border: 1px solid rgba(0, 0, 0, 1);
	box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}


.second-btn {
	display: block;
	margin: 0 auto;
	line-height: 28pt;
	padding: 0 20px;
	background: #99e98e;
	letter-spacing: 2px;
	transition: .2s all ease-in-out;
	outline: none;
	border: 1px solid rgba(0, 0, 0, 1);
	box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}




.signup {
	margin-top: 1em;
}


.jumbotron {
	margin-top: 5em;
	max-width: 855px;
	margin: 5.7em;
}


.copy {
	text-align: justify;
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


	h4 {
		margin-bottom: 1.5em;
	}


	.signup {
		margin-top: 1em;
	}


	.jumbotron {
		margin: 5em auto;
	}

	.copy {
		letter-spacing: 2px;
	}
}
</style>
