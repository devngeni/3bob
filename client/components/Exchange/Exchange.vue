<template>
  <div class="card">
    <div class="card-header border-0 py-0">
      <h4 class="card-title">Buy Crypto</h4>
    </div>
    <div class="card-body">
      <div class="buy-sell-widget">
        <form method="post" name="myform" class="currency_validate">
          <div class="form-group">
            <label class="mr-sm-2">Currency To Buy </label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text"
                  ><i class="cc BTC-alt"></i
                ></label>
              </div>
              <select v-model="form.currency" class="form-control">
                <option value="">Select</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
              </select>
            </div>
          </div>

          <div class="form-group" v-if="form.currency">
            <label>{{ form.currency }} Address</label>
            <input
              type="password"
              class="form-control"
              v-model="form.addess"
              placeholder="Address"
            />
          </div>

          <div class="form-group">
            <label class="mr-sm-2">Enter your amount</label>
            <div class="input-group">
              <input
                type="number"
                step="0.00000000001"
                @input="convert"
                class="form-control"
                placeholder="0.0 USD"
              />
              <input
                type="text"
                name="usd_amount"
                :disabled="true"
                v-model="form.amount"
                class="form-control"
                :placeholder="`0.00 ${form.currency ? form.currency : ''}`"
              />
            </div>
            <div class="d-flex justify-content-between mt-3">
              <p class="mb-0">Limit</p>
              <h6 class="mb-0">${{ $auth.user.amount_balance }} remaining</h6>
            </div>
            <template>
              <hr />
              <div
                class="d-flex justify-content-between mt-3"
                v-if="form.amount"
              >
                <p class="mb-0">Buy Amount</p>
                <h6 class="mb-0">{{ form.currency }} {{ form.amount }}</h6>
              </div>
            </template>
          </div>
          <button type="submit" name="submit" class="btn btn-success btn-block">
            Buy Now
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
        currency: 'ETH',
        address: '',
        amount: '',
      },
    }
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
