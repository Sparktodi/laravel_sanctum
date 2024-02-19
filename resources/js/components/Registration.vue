<template>
  <div class="w-25 mt-3">
    Registration
    <input v-model="name" type="text" class="form-control mb-3" placeholder="name">
    <input v-model="email" type="email" class="form-control mb-3" placeholder="email">
    <input v-model="password" type="password" class="form-control mb-3" placeholder="password">
    <input v-model="password_confirmation" type="password" class="form-control mb-3" placeholder="confirm password">
    <input @click.prevent="store" type="submit" class="btn btn-primary">
  </div>
</template>
<script>
export default {
  name: "Registration",

  data() {
    return {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
    }
  },

  methods: {
    store() {
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
          .then(res => {
            localStorage.setItem('x_xsrf_token', res.config.headers['X-XSRF-TOKEN'])
            this.$router.push({ name: 'personal' })
            console.log(res)
          })
      })
    }
  }
}
</script>
