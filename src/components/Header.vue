<template>
  <header class="header">
    <v-container>
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 class="display-2 mb-3 text-uppercase header-title">
            Lorem ipsum dolor sit
          </h1>
        </v-col>
      </v-row>
      <Form/>
    </v-container>
  </header>
</template>

<script>
  import Form from './Form'
  export default {
    name: 'Header',
    components: {Form},
  }
</script>

<style lang="sass">
   @media (max-width: 767px)
    .header
      .header-title
          font-size: 2rem!important
</style>
