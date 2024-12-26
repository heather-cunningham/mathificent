<!--suppress CssUnusedSymbol -->
<template>
  <main id="main-container">
    <router-view></router-view>
  </main>
</template>


<script>
import {defineComponent} from 'vue';

// All properties, including the `props` property, here in the OptionsAPI
// are assigned to objs w/ further properties inside most.
// noinspection UnnecessaryLocalVariableJS
export default defineComponent({
  name: "MainContainer",

  /*data: () => {
      // The data property always returns an obj filled with reactive variables.
      // Basically, all your let's go here.
      return {
        // screen: "config", with using routing, don't need this data var anymore
      };
    },*/

  /*computed: {
  },// end computed*/

  /*// Methods also is always assigned to an obj, and then fcns are placed inside that obj
  methods: {
  },//end methods*/

});// end export
</script>


<style scoped>
#main-container {
  margin: auto;
  width: 21rem;
}
</style>