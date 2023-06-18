<template>
  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <div class="container">
        <div class="inner cover">
          <div class="title d-flex align-items-center">
            <img src="../assets/img/logo_navbar.svg" height="300" alt="Glitter Logo" loading="lazy"
              style="margin-top: 2px;" />
            <h1 class="cover-heading" style="margin-left: 30px;">This is Glitter!</h1>
          </div>
          <br class="lead">
          <h3>Welcome to Glitter 🐣 - the cutest and most egg-celent social media platform on the Internet!</h3>
          <p>Whether
            you're a chicken lover 🐔 or simply enjoy the occasional nugget 🍗, Glitter is the perfect place to connect
            with
            like-minded folks.</p>

          <p>With Glitter, you can follow your favorite feathered friends, share your thoughts in 256 clucks or less,
            and
            discover new and exciting content. Here, you'll always see
            the most relevant and engaging content - no boring egg-related posts here !</p>

          <p>So what are you waiting for? Join the flock and start chirping today! Whether you're a peeping chick or a
            seasoned rooster, there's something for everyone on Glitter ✨.</p>
          <p class="lead">
            <router-link to="/public-plus" class="btn btn-lg btn-default">Ready to start exploring? ></router-link>
          </p>
        </div>

      </div>

    </div>

  </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

h1 {
  font-size: 80px;
  font-family: 'Poppins', sans-serif;
  text-transform: lowercase;
  font-weight: 700;
}

p {
  font-size: 23px;
  text-align: justify;
}

.site-wrapper {
  display: table;
  width: 100%;
  height: 600px;
  background-color: antiquewhite;
  /*height: 100%; */
  /*min-height: 100%;*/
}

.site-wrapper-inner {
  display: table-cell;
  vertical-align: top;
}

.cover-container {
  margin-right: auto;
  margin-left: auto;
}

/* Padding for spacing */
.inner {
  padding: 30px;
  margin-top: 100px;
  margin-bottom: 40px;
}

.cover {
  padding: 0 20px;
}

.cover .btn-lg {
  padding: 10px 20px;
  font-weight: bold;
  font-size: 30px;
}


@media (min-width: 768px) {

  /* Start the vertical centering */
  .site-wrapper-inner {
    vertical-align: middle;
  }

}
</style>
