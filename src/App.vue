<template>
  <HeaderNavBar />

  <h1>Mathificent!</h1>

  <FooterBar />
</template>

<script>
import {defineComponent} from 'vue';
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import FooterBar from "@/components/FooterBar.vue";

export default defineComponent({
  name: 'App',
  components: {
    FooterBar,
    HeaderNavBar,
  }
});
</script>


<style>

</style>
