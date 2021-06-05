<template>
  <div class="auth-form card">
    <div class="card-header justify-content-center">
      <h4 class="card-title">Sign In</h4>
    </div>
    <div class="card-body">
      <form class="signin_validate" @submit.prevent="loginUser">
        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            class="form-control"
            placeholder="Email or Phone Number"
            v-model="form.username"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            v-model="form.password"
            placeholder="Password"
          />
        </div>
        <div class="form-row d-flex justify-content-between mt-4 mb-2">
          <div class="form-group mb-0">
            <!-- <label class="toggle">
              <input class="toggle-checkbox" type="checkbox" />
              <div class="toggle-switch"></div>
              <span class="toggle-label">Remember me</span>
            </label> -->
          </div>
          <div class="form-group mb-0">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-success btn-block">
            Sign in
          </button>
        </div>
      </form>
      <div class="new-account mt-3">
        <p>
          Don't have an account?
          <nuxt-link class="text-primary" :to="{ name: 'auth-signup' }">
            Sign Up
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'nosidebar',

  data() {
    return {
      form: {
        username: 'test@test.com',
        password: 'admin@123',
      },
    }
  },

  methods: {
    async loginUser() {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        this.$auth
          .loginWith('local', {
            data: {
              username: this.form.username,
              password: this.form.password,
            },
          })
          .then((res) => {
            this.$nuxt.$loading.finish()
            // window.location.reload()
            this.$router.push({ name: 'index' })
          })
          .catch(({ response }) => {
            this.$nuxt.$loading.finish()
            const { errors } = response.data
            errors.forEach((err) => {
              const field_name = err.feild ? err.feild + ' ' : ''
              this.$toast.error(field_name + err.message)
            })
          })
      })
    },
  },
}
</script>

<style></style>
