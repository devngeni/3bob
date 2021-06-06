<template>
  <div style="margin: 1rem">
    <img
      src="/images/logo-7.png"
      width="50px; height=20px"
      style="background: none"
    />

    <Nuxt />
    <!-- <div id="preloader">
      <div id="loader"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  mounted() {
    $('body').removeClass('top')
  },
}
</script>

<style></style>
