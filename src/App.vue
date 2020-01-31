<template>
  <div id="menu">
      <Aside/>
        <div class="app-content">
            <Content/> 
        </div>
      <Footer/>

  </div>

</template>

<script>

import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'
import Aside from  '@/components/template/Aside'

export default {

  components: { Footer, Aside, Content }
  
}
</script>

<style>
  @import "./assets/css/main.css";
</style>
