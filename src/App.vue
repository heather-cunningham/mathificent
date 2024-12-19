<template>
  <HeaderNavBar />
  <MainContainer />
  <FooterBar />
</template>

<script>
import {defineComponent} from 'vue';
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import MainContainer from "@/components/MainContainer.vue";

export default defineComponent({
  name: 'App',
  components: {
    MainContainer,
    FooterBar,
    HeaderNavBar,
  }
});
</script>


<style>

</style>
