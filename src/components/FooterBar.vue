<template>
  <footer class="navbar fixed-bottom">
    <div class="container-fluid">
      <div class="d-flex align-items-start text-light">
        Copyright &copy; {{ new Date().getFullYear()}}&nbsp;
        <a class="nav-link fst-italic text-decoration-underline"
           href="https://www.webucator.com"
           target="_blank"
           title="Go to the Webucator training platform">
          Webucator
        </a>
        &nbsp;&nbsp;&verbar;&nbsp;&nbsp;
        Website by&nbsp;
        <a class="nav-link fst-italic text-decoration-underline"
           href="https://github.com/heather-cunningham"
           aria-label="See my GitHub portfolio"
           title="See my GitHub portfolio"
           target="_blank">
          Heather I. Cunningham
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "FooterBar",
});
</script>


<style scoped>
footer {
  background: steelblue;
}
</style>