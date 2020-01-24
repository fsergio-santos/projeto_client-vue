
<template>
  <div>
    <Cabecalho :tituloPagina="'Cadastro de Usuários'" 
               :link="'/usuario/lista'"
               :tituloLink="'Pesquisa Usuários'"/>
    <div class="container">
      <div class="tile">
        <h3 class="tile-title">Registro</h3>
        <div class="tile-body">
          <form v-on:submit="save" method="POST">
            <div class="row">
              <div class="col-lg-3">
                 <ImageUploader/>
              </div>
              <div class="col-lg-9">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="form-group">
                      <label for="nome" class="control-label">Nome</label>
                      <input type="text" 
                             id="nome" 
                             class="form-control" 
                             name="nome" 
                             v-model="nome" 
                             :class="{ 'is-invalid': nomeError }"/>
                      <div class="invalid-feedback" v-if="errors">
                        <p><span v-if="errorNameLen">O nome deve conter mais de 5 caracteres e no máximo 100 caracteres</span></p>
                        <p><span v-if="errorNameNull">O nome deve ser informado!</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label for="username" class="control-label">Nome de Usuário</label>
                      <input
                        type="text"
                        id="username"
                        class="form-control"
                        name="username"
                        v-model="username"
                        :class="{ 'is-invalid': userNameError }"/>
                      <div class="invalid-feedback" v-if="errors">
                          <p><span v-if="errorUserNameLen">O nome do usuário deve conter mais de 5 caracteres e no máximo 20 caracteres</span></p>
                          <p><span v-if="errorUserNameNull">O nome deve ser informado!</span></p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label for="email" class="control-label">E-mail</label>
                      <input
                        type="text"
                        id="email"
                        class="form-control"
                        name="email"
                        v-model="email"
                        :class="{ 'is-invalid': emailError }"
                        v-on:keyup.enter.tab="isUnique(email)"/>
                      <div class="invalid-feedback"  v-if="errors">
                        <p><span v-if="errorEmailInvalid">O E-mail informado é inválido</span></p>
                        <p><span v-if="errorEmailExist">O E-mail já já existe na base de dados</span></p>
                        <p><span v-if="errorEmailNull">O E-mail deve ser informado!</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="form-group">
                  <label for="password" class="control-label">Senha</label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    name="password"
                    v-model="password"
                    :class="{ 'is-invalid': passwordError }"
                  />
                  <div class="invalid-feedback" v-if="errors">
                     <p><span v-if="errorPasswordLen">A Senha deve conter 8 caracteres</span></p>
                     <p><span v-if="errorPasswordNull">A Senha deve ser informada!</span></p>
                     <p><span v-if="errorPasswordBlank">A Senha não pode conter caracteres em branco!</span></p>
                 </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="form-group">
                  <label for="contraSenha" class="control-label">Contra Senha</label>
                  <input
                    type="password"
                    id="contraSenha"
                    class="form-control"
                    name="contraSenha"
                    v-model="contraSenha"
                    :class="{ 'is-invalid': contraSenhaError }"
                  />
                  <div class="invalid-feedback" v-if="errors">
                     <p><span v-if="errorContraSenhaLen">A Senha deve conter 8 caracteres</span></p>
                     <p><span v-if="errorContraSenhaNull">A Senha deve ser informada!</span></p>
                     <p><span v-if="errorContraSenhaBlank">A Senha não pode conter caracteres em branco!</span></p>
                     <p><span v-if="errorContraSenhaPassword">A Contra Senha está diferente da Senha!</span></p>
                  </div>   
                </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="form-group">
                  <label for="ativo" class="control-label">Status</label>
                  <div class="switch switch-lg">
                    <input
                      type="checkbox"
                      class="switch"
                      id="ativo"
                      name="ativo"
                      v-model="ativo"
                    />
                  </div>
                </div>
              </div>
            </div>
            <input type="hidden" id="id" v-model="id" />
            <div class="tile-footer">
              <div class="col-lg-offset-2 col-md-offset-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  value="Salvar"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Salvar o registro do usuário"
                  v-if="mode === 'insert' || mode ==='update'"
                  @click="save"
                >
                  <b>Salvar</b>
                  <span class="fa fa-fw fa-lg fa-check-circle" aria-hidden="true"></span>
                </button>

                <button
                  type="submit"
                  class="btn btn-danger"
                  value="Excluir"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Excluir o registro do usuário"
                  v-if="mode === 'delete'"
                  @click="remove"
                >
                  <b>Excluir</b>
                  <span class="fa fa-fw fa-lg fa-trash" aria-hidden="true"></span>
                </button>

                <button
                  type="reset"
                  class="btn btn-secondary ml-2"
                  value="Cancelar"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Cancelar a operação"
                  @click="reset"
                >
                  <b>Cancelar</b>
                  <span class="fa fa-fw fa-lg fa-times-circle" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import Cabecalho from '@/components/Cabecalho';
import ImageUploader from '@/components/ImageUploader';

export default {
  name: "Usuario",
  components:{
    Cabecalho,
    ImageUploader
  },
  data() {
    return {
      mode: "",
   
      id:"",
      username: "",
      nome: "",
      email: "",
      password: "",
      contraSenha: "",
      ativo: true,

      userNameError: false,
      nomeError: false,
      emailError: false,
      passwordError: false,
      contraSenhaError: false,
      errors: false,
      
      errorUserNameNull:false,
      errorUserNameLen:false,

      errorNameNull:false,
      errorNameLen:false,

      errorEmailNull:false,
      errorEmailExist:false,
      errorEmailInvalid:false, 

      errorPasswordNull: false,
      errorPasswordLen: false,
      errorPasswordBlank: false,
 
      errorContraSenhaNull: false,
      errorContraSenhaLen: false,
      errorContraSenhaBlank: false,
      errorContraSenhaPassword:false


    };
  },

  computed: {
    getMode() {
      return this.$store.getters.getMode;
    }
  },

  methods: {
    validateNameUser() {
      if (this.isString(this.username) ) {
        this.userNameError = true;
        this.errors=true
        this.errorUserNameNull = true
      } else if ( this.username.length < 5 || this.username.length > 20) {
        this.userNameError = true;
        this.errors=true 
        this.errorUserNameLen=true
      } else {
        this.errors=false
        this.userNameError = false
        this.errorUserNameLen = false
        this.errorUserNameNull = false
      } 
    },
    validateNome() {
      if (this.isString(this.nome)){
          this.nameError = true;
          this.errors=true
          this.errorNameNull = true 
      } else if (this.nome.length < 5 ||this.nome.length > 100) {
          this.nomeError = true
          this.errorNameLen=true
          this.errors=true 
      } else {
          this.errors=false
          this.nomeError = false
          this.errorNameNull = false
          this.errorNameLen=false
      } 
    },
    validateEmail(){
      if (this.isString(this.email)){
          this.emailError = true
          this.errors=true
          this.errorEmailNull=true
      } else if (!this.validEmail(this.email)){
          this.emailError = true
          this.errors=true
          this.errorEmailInvalid=true
      } else {
          this.emailError = false
          this.errors=false
          this.errorEmailNull = false
          this.errorEmailExist = false
          this.errorEmailInvalid = false
      }
    },
    validatePassword(){
       // eslint-disable-next-line no-console
       if (this.isString(this.password)){
          this.passwordError = true
          this.errors = true
          this.errorPasswordNull=true
          this.errorPasswordBlank = true 
       } else if (this.password.length < 8 ) {
          this.passwordError = true
          this.errors = true
          this.errorPasswordLen=true
       } else {
          this.passwordError = false
          this.errors = false
          this.errorPasswordNull = false
          this.errorPasswordLen = false
          this.errorPasswordBlank = false
       }
    },
    validateContraSenha(){
       if (!this.contraSenha){
          this.contraSenhaError = true
          this.errors = true
          this.errorContraSenhaNull=true
          this.errorContraSenhaBlank=true
       } else  if ( this.contraSenhaError.length < 8 ){
          this.contraSenhaError = true
          this.errors = true
          this.errorContraSenhaLen=true
        } else if ( this.contraSenha.valueOf() !== this.password.valueOf()){
          this.contraSenhaError = true
          this.errors = true 
          this.errorContraSenhaPassword=true
        } else {
          this.contraSenhaError = false
          this.errors = false
          this.errorContraSenhaPassword=false
          this.errorContraSenhaLen=false
          this.errorContraSenhaNull=false
          this.errorContraSenhaBlank=false
 
       }
    },
    validEmail(email) {
      // eslint-disable-next-line no-useless-escape
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    isString(value){
      return ( value === undefined || 
               value === null || 
               value.length === 0 ) ? true : false
    }, 
    isUnique(email) {
        if (this.isString(email)) {
            this.emailError = true
            this.errors=true
            this.errorEmailNull=true
            return
        }
        return new Promise((resolve, reject ) => {
           const url = `${baseApiUrl}/users/email/${email}`;
           axios.get(url)
                .then( res => { this.isExistEmail(res.data) })
                .catch( error => { 
                        this.isExistEmail(error.response.data), 
                        reject(error) 
                        }
                      )
        });
    },
    isExistEmail(data){
      if (data===true){
          this.emailError = true
          this.errors=true
          this.errorEmailExist=true
      } else  {
        this.emailError = false
        this.errors=false
        this.errorEmailExist=false
      }
    },
    reset() {
      this.mode = "";
      this.user = {};
      this.$router.push({
        name: "UsuarioList"
      });
    },
    save(e) {
      e.preventDefault()
      this.validarDados()
      this.user = {
          'username': this.username,
          'nome':this.nome,
          'password':this.password,
          'contraSenha':this.contraSenha,
          'ativo':this.ativo
      }

      const id = this.id ? `/${this.id}` : "";
      axios
        .post(`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    validarDados(){
      this.validateNameUser()
      this.validateNome()
      this.validateEmail()
      this.validatePassword() 
      this.validateContraSenha()
    },

    remove() {
      const id = this.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset(showError);
        })
        .catch();
    },
    loadUser(user) {
      this.user = { ...user };
    },
    loadUserById(id) {
      const url = `${baseApiUrl}/users/${id}`;
      axios.get(url).then(res => {
        this.dataFromTable(res.data)
      });
    },  
    dataFromTable(user){
      this.id = user.id
      this.username = user.username,
      this.nome = user.nome, 
      this.email = user.email,
      this.password = user.password,
      this.contraSenha = user.password,
      this.ativo = user.ativo
    },
  },

  beforeMount: function() {
    this.mode = this.getMode;
  },
  mounted: function() {
    if (this.mode == "update" || this.mode == "delete") {
      this.loadUserById(this.$route.params.id);
    }
  },
  watch: {
    username() {
      this.validateNameUser()
    },
    nome(){
      this.validateNome()
    },
    email(){
      this.validateEmail()
    },
    password(){
      this.validatePassword()
    },
    contraSenha(){
      this.validateContraSenha()
    }
  }
};
</script>

<style scoped>

p {
  margin: 0;
}

</style>>
