<template>
  <div>
    <header class="app-header">
      <router-link to="/" class="app-header__logo">Home</router-link>
      <a class="app-sidebar__toggle" @click="toggleMenuSide" data-toggle="sidebar" aria-label="Hide Sidebar"></a>
      <div class="app-nav">
        <router-link to="/" class="dropdown app-nav__item">
          <i class="fa fa-sign-out fa-lg"></i>Logout
        </router-link>
      </div>
    </header>
    <nav id="sidebar">
      <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside class="app-sidebar">
        <div class="app-sidebar__user">
          <img
            class="app-sidebar__user-avatar"
            src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg"
            alt="User Image"
          />
          <div>
            <p class="app-sidebar__user-name">Francisco Sérgio</p>
            <p class="app-sidebar__user-designation">Vue Developers</p>
          </div>
        </div>
        <ul class="app-menu">
          <li class="treeview">
            <router-link to="/" class="app-menu__item active">
              <i class="app-menu__icon fa fa-dashboard"></i>
              <span class="app-menu__label">Página Principal</span>
            </router-link>
          </li>
          <li class="treeview">
            <router-link to="/usuario" class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-cog"></i>
              <span class="app-menu__label">Configurações</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </router-link>
          </li>
          <li class="treeview">
            <router-link to class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-pencil-square-o"></i>
              <span class="app-menu__label">Auditoria</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </router-link>
          </li>
          <li class="treeview">
            <router-link to class="app-menu__item" href="#">
              <i class="app-menu__icon fa fa-users"></i>
              <span class="app-menu__label">Cadastro de Clientes</span>
            </router-link>
            <ul class="treeview-menu">
              <li>
                <a class="treeview-item" href="#">
                  <i class="icon fa fa-user"></i>Pessoa Física
                </a>
              </li>
              <li>
                <a class="treeview-item" href="#">
                  <i class="icon fa fa-industry"></i>Pessoa Jurídica
                </a>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-male"></i>
              <span class="app-menu__label">Recursos Humanos</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </a>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-line-chart"></i>
              <span class="app-menu__label">Financeiro</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </a>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-money"></i>
              <span class="app-menu__label">Contabilidade</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </a>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-cubes"></i>
              <span class="app-menu__label">Estoque/Custo</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </a>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-building"></i>
              <span class="app-menu__label">Patrimônio</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </a>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-area-chart"></i>
              <span class="app-menu__label">Fiscal</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </a>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-university"></i>
              <span class="app-menu__label">Caixa</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </a>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-balance-scale"></i>
              <span class="app-menu__label">Jurídico</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </a>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#" data-toggle="treeview">
              <i class="app-menu__icon fa fa-bar-chart"></i>
              <span class="app-menu__label">Faturamento</span>
              <i class="treeview-indicator fa fa-angle-right"></i>
            </a>
          </li>
          <li class="treeview">
            <a class="app-menu__item" href="#">
              <i class="app-menu__icon fa fa-lock"></i>
              <span class="app-menu__label">Segurança</span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/usuario/lista" class="treeview-item">
                  <i class="icon fa fa-user"></i>Usuários
                </router-link>
              </li>
              <li>
                <a class="treeview-item" href="#">
                  <i class="icon fa fa-unlock"></i>Permissões
                </a>
              </li>
              <li>
                <a class="treeview-item" href="#">
                  <i class="icon fa fa-bars"></i>Roles
                </a>
              </li>
              <li>
                <a class="treeview-item" href="#">
                  <i class="icon fa fa-list-alt"></i>Escopo
                </a>
              </li>
              <li>
                <a class="treeview-item" href="#">
                  <i class="icon fa fa-hand-paper-o"></i>Direitos
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </nav>
  </div>
</template>

<script>

import jQuery from "jquery";
const $ = jQuery;

export default {
  data() {
    return {
      clickMenu: true
    };
  },

  methods: {
    toggleMenuSide() {

      "use strict";
      const treeviewMenu = $(".app-menu");
      const corpo = document.body;
      /* eslint-disable no-console */
      /* eslint-enable no-console */

      if (this.clickMenu) {
        this.clickMenu = false;
        corpo.classList.remove("sidenav-toggled");
      } else {
        corpo.classList.add("sidenav-toggled");
        this.clickMenu = true;
      }


      $("[data-toggle='treeview']").click(function() {
        event.preventDefault();
        if (
          !$(this)
            .parent()
            .hasClass("is-expanded")
        ) {
          treeviewMenu
            .find("[data-toggle='treeview']")
            .parent()
            .removeClass("is-expanded");
        }
        $(this)
          .parent()
          .toggleClass("is-expanded");
      });

      $("[data-toggle='treeview.'].is-expanded")
        .parent()
        .toggleClass("is-expanded");

      //$("[data-toggle='tooltip']").tooltip();
    }
   
  }
};
</script>



<style>
</style>