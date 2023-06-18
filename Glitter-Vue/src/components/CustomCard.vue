<template>
	<div class="card">
		<div class="card-body">
			<h5 v-if="title" class="card-title">{{ title }}</h5>
			<p v-if="text" class="card-text">
				{{ text }}
			</p>
			<slot></slot>
			<div class="d-grid gap-2">
				<button v-for="btn in btns" :key="btn.txt" class="btn" :class="btn.class" @click.prevent="btn.action">
					{{ btn.txt }}
				</button>


				<router-link :to="link.route" v-for="link in link" :key="link.txt" class="link" :class="link.class">
					{{ link.txt }}
				</router-link>
				<p class="text-danger" v-if="error">{{ error }}</p>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	name: 'CustomCard',
	props: ['title', 'text', 'btns', 'link', 'error'],
	methods: {
		resetPassword() {
			this.$emit('reset-password');
		}
	}
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fjalla+One&display=swap');


body {
	background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg) center center no-repeat;
	background-size: cover;
	width: 100vw;
	height: 100vh;
	display: grid;
	align-items: center;
	justify-items: center;
	margin: 0;
	padding: 0;
}

.card {
	background: #f8f4e5;
	padding: 80px 100px;
	border: 2px solid rgba(0, 0, 0, 1);
	box-shadow: 15px 15px 1px #ffa580, 15px 15px 1px 2px rgba(0, 0, 0, 1);
}

.btn {
	line-height: 28pt;
	padding: 0 20px;
	background: #ffa580;
	letter-spacing: 2px;
	transition: .2s all ease-in-out;
	outline: none;
	border: 1px solid rgba(0, 0, 0, 1);
	box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}

.link {
	letter-spacing: 2px;
	color: #95a4ff;
}
</style>


