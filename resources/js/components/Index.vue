<template>
  <div>
    <router-view></router-view>
    <router-link v-if="!token" :to="{ name: 'login' }">Login</router-link>
    <router-link v-if="token" :to="{ name: 'get' }">Get</router-link>
    <router-link v-if="!token" :to="{ name: 'registration' }">Registration</router-link>
    <router-link v-if="token" :to="{ name: 'personal' }">Personal</router-link>
    <a href="#" v-if="token" @click.prevent="logout">Logout</a>
  </div>
</template>
<script>
export default {
  name: "Index",

  data() {
    return {
      token: null
    }
  },

  updated() {
    this.getToken()
  },

  methods: {
    getToken() {
      this.token = localStorage.getItem('x_xsrf_token')
    },

    logout() {
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/logout')
        .then( res => {
          localStorage.removeItem('x_xsrf_token')
          this.$router.push({name: 'login'})
        })
      })
    }
  }
}
</script>
