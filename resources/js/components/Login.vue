<template>
  <div class="w-25 mt-3">
    Login
    <input v-model="email" type="email" class="form-control mb-3" placeholder="email">
    <input v-model="password" type="password" class="form-control mb-3" placeholder="password">
    <input @click.prevent="login" type="submit" class="btn btn-primary">
  </div>
</template>
<script>
export default {
  name: "Login",

  data() {
    return {
      email: null,
      password: null
    }
  },

  methods: {
    login() {
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/login', { email: this.email, password: this.password })
          .then(res => {
            localStorage.setItem('x_xsrf_token', res.config.headers['X-XSRF-TOKEN'])
            this.$router.push({ name: 'personal' })
            console.log(res)
          })
          .catch(err => {
            console.log(err.response)
          })
      })
    }
  }

}
</script>
