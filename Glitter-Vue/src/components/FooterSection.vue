<template>
  <footer class="footer bg-light">
    <section class="d-flex
        justify-content-center justify-content-lg-between
        p-2">
    </section>
    <div class="text text-center p-2 bg-light">
      <p>© 2023 Copyright:</p>
      <p>No-Woman-No-API</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
}
</script>


<style>
.footer {
  position: -webkit-sticky;
  bottom: 0;
  width: 100%;
  height: 0rem;
}

.text {
  border: 1px solid rgba(0, 0, 0, 1);
}
</style>
