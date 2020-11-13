<template>
  <v-app>
    <div class="app-wrap">
      <div class="app">
        <Header/>
        <list/>
        <Footer/>
      </div>
    </div>
  </v-app>
</template>

<script>
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {Header, List, Footer},
  created() {
    this.FETCH_COPY_DATA(),
    this.GET_VALUES();
  },
  methods: {
    ...mapActions(['FETCH_COPY_DATA', 'GET_VALUES'])
  }
};
</script>

<style lang="sass"> 
  html
    overflow: hidden
  .v-application--wrap
    min-height: auto
    background-color: #222
    padding: 40px
    height: calc(100vh - 80px)
    overflow-y: auto
  .app-wrap
    padding: 30px
    background: #FFFFFF
    border-radius: 10px
    
  .app
    background: #F8F8F8
    padding: 38px 0 70px
    border-radius: 10px 
  .opacity5
    opacity: .5
  .btn
    text-transform: uppercase
    text-align: center
    width: 100%
    height: 40px
    padding: 7px 5px 5px
    background: #70D24E
    border-radius: 5px
    color: #fff
    font-size: 14px
    transition: 0.3s
    outline: none
    &:hover
      background: #66be48
      
  @media (max-width: 767px)
    .v-application--wrap
      padding: 5px
    .app-wrap
      padding: 5px
</style>
