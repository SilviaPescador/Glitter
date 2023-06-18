<template>
  <section class="vh-50">
    <div class="container py-3 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-12 col-xl-4">

          <div class="card" style="border-radius: 15px;">
            <div class="card-body text-center">
              <div class="mt-3 mb-4">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  class="rounded-circle img-fluid" style="width: 100px;" />
              </div>
              <h4 class="mb-2">{{ username }}</h4>
              <p class="text-muted mb-4">{{ email }}
              </p>
              <router-link to="/unsubscribe" class="nav-link active" aria-current="page">
                <button type="button" class="custom-btn btn-primary btn-rounded btn-lg">
                  {{ btn.text }}
                </button>
              </router-link>
              <div class="d-flex justify-content-center text-center mt-5 mb-2">
                <div class="followers">
                  <p class="mb-2 h5">{{ following }}</p>
                  <p class="text-muted mb-0">Following</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserCard',
  props: ['username', 'email', 'activity', 'btn', 'following'],
}
</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f4e5;
  padding: 20px 20px;
  border: 2px solid rgba(0, 0, 0, 1);
  box-shadow: 15px 15px 1px #ffa580, 15px 15px 1px 2px rgba(0, 0, 0, 1);
}

.custom-btn {
  color: aliceblue;
  display: block;
  margin: 0 auto;
  line-height: 28pt;
  padding: 0 20px;
  background: #ffa580;
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
  outline: none;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}
</style>