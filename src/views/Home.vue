<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
     <div v-for="image in getImages" :key="image.id">
       {{image.title}}
     </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import gql from 'graphql-tag'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      me : []
    }
  },
  apollo : {
    getImages : gql `query {
      getImages {
                    title
                  }
    }`
  }
}
</script>
