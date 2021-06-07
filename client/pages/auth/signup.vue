<template>
  <div class="auth-form card">
    <div class="card-header justify-content-center">
      <h4 class="card-title">Sign Up</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="signUpUser" name="myform" class="signin_validate">
        <div class="form-group">
          <label>Full Name</label>
          <input
            type="text"
            class="form-control"
            v-model="form.name"
            autocomplete="off"
            placeholder="Full Name"
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="form.email"
            autocomplete="off"
            placeholder="Email Address"
          />
        </div>

        <div class="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            v-model="form.phone"
            class="form-control"
            autocomplete="off"
            placeholder="Phone Number"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="form.password"
            autocomplete="off"
            class="form-control"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            v-model="form.confirm_password"
            autocomplete="off"
            class="form-control"
            placeholder="Password"
          />
        </div>
        <div class="form-row d-flex justify-content-between mt-4 mb-2">
          <div class="form-group mb-0"></div>
          <div class="form-group mb-0">
            <!-- <a href="#">Forgot Password?</a> -->
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-success btn-block">
            Sign Up
          </button>
        </div>
      </form>
      <div class="new-account mt-3">
        <p>
          Already have an account?
          <nuxt-link class="text-primary" :to="{ name: 'auth-signin' }">
            Sign In
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'nosidebar',
  middleware: ['guest'],
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
      },
    }
  },
  methods: {
    signUpUser() {
      this.$nextTick(async () => {
        this.$nuxt.$loading.start()
        this.$axios
          .post(`users/signup`, { ...this.form })
          .then((res) => {
            this.$toast.success(res.data.message)
            this.$nuxt.$loading.finish()
            this.$router.push({ name: 'auth-signin' })
          })
          .catch(({ response }) => {
            this.$nuxt.$loading.finish()
            const { errors } = response.data
            errors.forEach((err) => {
              this.$toast.error(err.message)
            })
          })
      })

      this.$nuxt.$loading.finish()
    },
  },
}
</script>

<style></style>
