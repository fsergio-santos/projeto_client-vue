import Vue from "vue";
import Vuex from "vuex";
import operacao from "./modules/operacao"

Vue.use(Vuex);

export default new Vuex.Store({
  
  modules: {
    operacao
  }
});
