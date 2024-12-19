<template>
  <HeaderNavBar />

  <h1>Mathificent!</h1>

  <FooterBar />
</template>

<script>
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import FooterBar from "@/components/FooterBar.vue";

export default {
  name: 'App',
  components: {
    FooterBar,
    HeaderNavBar,
  }
}
</script>


<style>
header, footer {
  background: steelblue;
}
</style>
