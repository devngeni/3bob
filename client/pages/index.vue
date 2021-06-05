<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-lg-4 col-xxl-4">
        <div class="card balance-widget">
          <div class="card-header border-0 py-0">
            <h4 class="card-title">Your Portfolio</h4>
          </div>
          <price-preview :currency="currency" />
        </div>
      </div>

      <div class="col-xl-6 col-lg-8 col-xxl-8">
        <div class="card profile_chart">
          <div class="card-header py-0">
            <div class="chart_current_data">
              <!-- <h3>254856 <span>USD</span></h3>
              <p class="text-success">125648 <span>USD (20%)</span></p> -->
            </div>
            <div class="duration-option">
              <a id="all" class="active">ALL</a>
              <a id="one_month" class="">1M</a>
              <a id="six_months">6M</a>
              <a id="one_year" class="">1Y</a>
              <a id="ytd" class="">YTD</a>
            </div>
          </div>
          <div class="card-body">
            <div id="timeline-chart"></div>
            <div class="chart-content text-center">
              <client-only>
                <compare-crypto-price />
              </client-only>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-12 col-xxl-12">
        <div>
          <b-tabs content-class="mt-3" fill>
            <b-tab title="Buy Crypto" active>
              <br />
              <Exchange />
              ></b-tab
            >
            <b-tab title="Deposit">
              <br />
              <deposit-to-account />
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12 col-lg- col-xxl-8">
        <div class="card">
          <div class="card-header border-0 py-0">
            <h4 class="card-title">Transactions</h4>
            <!-- <a href="#">View More </a> -->
          </div>
          <client-only>
            <paginated-table
              @table-search-results="searchResults"
              @next-page-handler="setCurrentPage"
              @limit-records="chooseLimit"
              searchURL="transactions"
              searchResultsVariable="transactions"
              :limit="parseInt(page.limit)"
              :rowCount="parseInt(count)"
              :currentPage="parseInt(page.current)"
            >
              <thead slot="theader">
                <tr role="row">
                  <th class="sorting_asc">#</th>
                  <th class="sorting">Transaction ID</th>
                  <th class="sorting">Transaction Type</th>
                  <th class="text-center sorting">Phone Number</th>
                  <th class="text-center sorting">Status</th>
                  <th class="text-center sorting">Date</th>
                </tr>
              </thead>

              <tbody slot="tcontent">
                <tr v-for="(transaction, index) in transactions" :key="index">
                  <td>
                    <span class="sold-thumb">
                      {{ getIndex(index, page.current) }}
                    </span>
                  </td>

                  <td>
                    <span class="badge badge-danger">
                      {{ transaction.transactionId }}
                    </span>
                  </td>
                  <td>{{ transaction.transaction_type }}</td>
                  <td>{{ transaction.phone }}</td>
                  <td class="text-uppercase">{{ transaction.status }}</td>
                  <td class="text-danger">{{ transaction.created_at }}</td>
                </tr>
              </tbody>
            </paginated-table>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompareCryptoPrice from '../components/Charts/CompareCryptoPrice.vue'
import DepositToAccount from '../components/Deposit/DepositToAccount.vue'
import Exchange from '../components/Exchange/Exchange.vue'
import PaginatedTable from '../components/PaginatedTable/PaginatedTable.vue'
import PriceChange from '../components/Price/PriceChange.vue'
import PricePreview from '../components/Price/PricePreview.vue'
import UserBalance from '../components/Price/UserBalance.vue'
export default {
  components: {
    PricePreview,
    PriceChange,
    UserBalance,
    Exchange,
    CompareCryptoPrice,
    DepositToAccount,
    PaginatedTable,
  },

  middleware: ['requireAuth'],

  data() {
    return {
      limit: 10,
    }
  },

  computed: {
    pageCount() {
      const page_count = this.count / this.limit
      return page_count ? page_count : 10
    },
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('transactions')
    const currency = await $axios.get('currency/current')
    return {
      transactions: data.transactions,
      currency: currency.data.currency,
      page: data.page,
      count: data.count,
    }
  },

  methods: {
    async setCurrentPage(page) {
      const { data } = await this.$axios.get(
        `transactions?page=${page}&limit=${this.limit}`
      )
      this.page = data.page
      this.count = data.count
      this.transactions = data.transactions
    },

    chooseLimit(event) {
      this.limit = event.target.value
      this.$nextTick(async () => {
        this.$nuxt.$loading.start()
        const { data } = await this.$axios.get(
          `transactions?&limit=${this.limit}`
        )
        this.page = data.page
        this.count = data.count
        this.transactions = data.transactions
        this.$nuxt.$loading.finish()
      })
      this.$nuxt.$loading.finish()
    },

    searchResults(resultData) {
      this.count = resultData.count
      this.transactions = resultData.transactions
    },
    getIndex(index, page) {
      const currentPage = parseInt(page)
      let page_label = index + 1
      if (currentPage > 1) {
        return page_label + 10 * (currentPage - 1)
      }
      return page_label
    },
  },
}
</script>

<style></style>
