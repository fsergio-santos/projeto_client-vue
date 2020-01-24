import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import ListaUsuario from "../views/usuario/ListaUsuario"
import Usuario from "../views/usuario/Usuario"

Vue.use(VueRouter);
  
const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },{
    path:"/usuario/lista",
    name:"UsuarioList",
    component: ListaUsuario
  }, {
    path:"/usuario/insert",
    name:"UsuarioInsert",
    component: Usuario
  },{
    path:"/usuario/update/:id",
    name:"UsuarioUpdate",
    component: Usuario
  },{
    path:"/usuario/delete/:id",
    name:"UsuarioDelete",
    component: Usuario
  }
];

const router = new VueRouter({
  mode:"history",
  routes
});

export default router;
