<template>
  <div class="glit list-group">
    <div class="glit-box card list-group-item d-flex justify-content-between align-items-center">
      <div class="ms-3 me-3 w-100">
        <div class="d-flex align-items-center">
          <img src="../assets/img/logo_navbar.svg
            " alt="profile image" style="width: 45px; height: 45px" class="rounded-circle" />
          &nbsp;&nbsp;
          <p class="fw-bold mb-0">@{{ author }}</p>
          <p class="text-secondary mb-0 ms-auto">{{ formattedDate(publishDate) }}</p>
        </div>
        <div class="ms-2">
          <p class="mb-2 mt-2">{{ text }}</p>
        </div>
        <div class="d-flex" v-if="imagePath">
          <img class="glit-img" :src="'http://localhost:3000' + imagePath" />
        </div>
        <div>
          <p class="fw-bold mb-0">{{ kudos }} {{ likeName }}</p>
        </div>
      </div>
    </div>
    <div>
      <div class="card-footer p-4 d-flex justify-content-end">
        <button v-for="btn in btns" :key="btn.txt" class="btn" :class="btn.behaviour" @click.prevent="btn.action(glit)">
          <span v-html="btn.icon"></span>
          <span class="btn-text">{{ btn.txt }}</span>
        </button>
      </div>
      <hr class="my-4">
    </div>
  </div>
</template>

<script>

export default {
  name: 'GlitItem',
  props: ['author', 'publishDate', 'text', 'imagePath', 'btns', 'glit', 'kudos', 'likeName'],

  setup() {
    const formattedDate = date => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return (new Date(date)).toLocaleDateString('es-ES', options);
    };

    return {

      formattedDate,
    };
  }
}
</script>

<style scoped>
.glit-box {
  background: #f8f4e5;
  border: 2px solid rgba(0, 0, 0, 1);
  box-shadow: 15px 15px 1px #ffa580, 15px 15px 1px 2px rgba(0, 0, 0, 1);
}

.text-secondary {
  font-size: 13px;
}

.glit-img {
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  display: block;
  border-radius: 10px;
}

@media (min-width: 992px) {
  .glit {
    width: 51em;
  }

  .glit-img {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    display: block;
    border-radius: 10px;
  }
}

.btn {
  line-height: 5pt;
  padding: 5px 10px;
  margin: 5px;
  background: #95a4ff;
  letter-spacing: 1px;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  outline: none;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #ffa580, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}

.btn:hover {
  transform: translateY(-5px);
}

.btn-text {
  display: none;
  margin-left: 5px;
}

.btn:hover .btn-text {
  display: inline;
  transition: transform 0.3s ease-in-out;
}
</style>
