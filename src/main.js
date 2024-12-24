import {createApp} from 'vue';
import App from './App.vue';
import {createRouter, createWebHashHistory} from "vue-router";
import GameConfig from "@/components/GameConfig.vue";
import GamePlay from "@/components/GamePlay.vue";

const routes = [
  {
    path: "/",
    component: GameConfig
  },
  {
    path: "/play/:operation/:maxNumber",
    component: GamePlay,
    props: true
  },
];
// createRouter() takes in an Obj with properties:
// `history:` assigned to the history type, in our case `createWebHashHistory`.
// And, the routes array.
const router = createRouter(
  {
    history: createWebHashHistory(),
    routes,
  }
);
const app = createApp(App);

app.use(router);
app.mount('#app');
