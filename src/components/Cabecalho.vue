<template>
    <div class="app-title">
    <div>
        <h1>
          <i class="fa fa-edit"></i>{{ tituloPagina }}
        </h1>
      </div>
      <ul class="app-breadcrumb breadcrumb">
        <li class="breadcrumb-item">
          <i class="fa fa-search fa-lg"></i>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="link">{{ tituloLink }}</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
    name:'Cabecalho',
    props:{
        tituloPagina:String,
        link:String,
        tituloLink:String,
    }
}
</script>