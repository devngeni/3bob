<template>
  <div class="card">
    <div class="card-header border-0 py-0">
      <h4 class="card-title">Deposit to BOB</h4>
    </div>
    <div class="card-body">
      <div class="buy-sell-widget">
        <form @submit.prevent="depositToWallet" class="currency_validate">
          <div class="form-group">
            <label class="mr-sm-2">Phone Number </label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text">
                  <i class="fa fa-phone mr-4"> </i>
                </label>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="form.phone"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="mr-sm-2">Phone Number </label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text">KES</label>
              </div>
              <input
                type="number"
                class="form-control"
                v-model="form.amount"
                placeholder="e.g 1000"
              />
            </div>
          </div>
          <button type="submit" name="submit" class="btn btn-success btn-block">
            Deposit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: '',
        amount: '',
      },
    }
  },

  created() {
    this.form.phone = this.$store.$auth.user.phone

    console.log(this.$auth)
  },

  mounted() {
    this.form.phone = this.$store.$auth.user.phone
  },
  methods: {
    async convert(event) {
      const amount = event.target.value

      if (!this.form.currency) {
        this.$toast.error(`Please choose the currency to buy`)
        return
      }
      if (amount) {
        const { data } = await this.$axios.post('currency/conversion', {
          from_currency: 'USD',
          to_currency: this.form.currency,
          amount,
        })
        this.form.amount = data.amount
      }
    },
    depositToWallet() {
      this.$nextTick(async () => {
        this.$nuxt.$loading.start()
        this.$axios
          .post(`transactions/deposit`, { ...this.form })
          .then((res) => {
            this.$toast.success(res.data.message)
            this.$nuxt.$loading.finish()
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

<style>
.form-control:disabled,
.form-control[readonly] {
  background-color: rgba(255, 132, 0, 0.817) !important;
  opacity: 1;
}
</style>
