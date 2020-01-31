
<template>
  <div>
    
    <Cabecalho :tituloPagina="'Cadastro de Usuários'" 
               :link="'/'"
               :tituloLink="'Página Principal'"/>
    <div class="container-fluid">
      <div class="bs-component">
          <div class="tile">
            <form class="form-inline" role="form">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="usuarioNome" class="control-label col-sm-1">Nome:</label>
                  <input
                    type="text"
                    class="form-control col-sm-8"
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome para pesquisar."
                    v-model="usuarioNome"/>
                  <div class="col-md-1">
                    <button type="submit" class="btn btn-primary" v-on:click.prevent="pesquisaUsuario()">
                      Pesquisar
                      <i class="fa fa-search-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

        <div class="tile">
          <div class="row">
            <div class="col-xs-12 col-md-9">
              <h4 class="tile-title">Usuários Cadastrados</h4>
           </div>
           <div class="col-xs-12 col-md-3 pull-right" >
            <div class="form-group row">
                <label for="select_page" class="col-form-label"><b>Registro por Página:</b></label>
                <div class="col-md-6"> 
                  <select id="select_page" v-model="limit" class="form-control">
                      <option v-for="size in changePageSize" 
                        :key="size" 
                        :value="size">
                        {{size}}
                      </option>
                  </select>
              </div>
            </div>
          </div>    
        </div>
          <div class="tile-body">
             <div id="no-more-tables">
                <Tabela :fields="fields" 
                        :items="users"
                        :totalCount="count"
                        :pageSize="Number(limit)"  
                        @page="updatePage"
                        @updateRegisterFromTable="updateUsuario"
                        @deleteRegisterFromTable="deleteUsuario"
                        @insertRegisterFromTable="insertUsuario"
                        />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { baseApiUrl } from "@/global";
import axios from "axios";
import Cabecalho from '@/components/Cabecalho';
import Tabela from '@/components/Tabela';

export default {
  name: "ListaUsuario",

  components:{
    Cabecalho,
    Tabela,
  },

  data: function() {
    return {
      fields: [
        { id: "url", label:"Foto" },
        { id: "id", label: "Código" },
        { id: "username", label: "Nome de Usuário" },
        { id: "nome", label: "Nome" },
        { id: "email", label: "E-mail" },
        { id: "ativo", label: "Ativo" }
      ],
      users: [],
      changePageSize:[5,10,15,20],
      usuarioNome:undefined,
      page:1,
      limit:10,
      count:0,
    };
  },
  methods: {
   /* eslint-disable no-console */
    updatePage: function(page){                        
      this.page = page
      this.loadUsers()
    },
    setModeOption(mode) {
      this.$store.dispatch("initMode", mode);
    },
    loadUsers() {
      const url = `${baseApiUrl}/users?page=${this.page}&limit=${this.limit}`;
      axios.get(url).then(res => {
        this.users = res.data.data
        this.limit = res.data.limit
        this.count = res.data.count
      });
    },
    insertUsuario(){
      this.setModeOption("insert");
      this.$router.push({
        name: "UsuarioInsert"
      });
    },
    updateUsuario(id) {
      this.setModeOption("update");
      this.$router.push({
        name: "UsuarioUpdate",
        params: { id }
      });
    },
    deleteUsuario(id) {
      this.setModeOption("delete");
      this.$router.push({
        name: "UsuarioDelete",
        params: { id }
      });
    },
    pesquisaUsuario(){
      const url = `${baseApiUrl}/users/name/${this.usuarioNome.toLowerCase()}?page=${this.page}&limit=${this.limit}`;
      axios.get(url).then(res => {
        this.users = res.data.data
        this.limit = res.data.limit
        this.count = res.data.count
      });
    },
    sortBy(sort){
      this.users.sort(sort)
    },
    
  },
  watch:{
    limit(){
      this.loadUsers()
    }
  },
  mounted: function() {
    this.loadUsers();
  },

  created() {
    this.setModeOption("insert");
  },

};
</script>

<style>
</style>