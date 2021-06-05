<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-lg-4 col-xxl-4">
        <div class="card balance-widget">
          <div class="card-header border-0 py-0">
            <h4 class="card-title">Your Portfolio</h4>
          </div>
          <price-preview />
        </div>
      </div>

      <div class="col-xl-6 col-lg-8 col-xxl-8">
        <div class="card profile_chart">
          <div class="card-header py-0">
            <div class="chart_current_data">
              <h3>254856 <span>USD</span></h3>
              <p class="text-success">125648 <span>USD (20%)</span></p>
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
              <price-change />
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-12 col-xxl-12">
        <Exchange />
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12 col-lg- col-xxl-8">
        <div class="card">
          <div class="card-header border-0 py-0">
            <h4 class="card-title">Transactions</h4>
            <!-- <a href="#">View More </a> -->
          </div>
          <div class="card-body">
            <div class="transaction-table">
              <div class="table-responsive">
                <table class="table mb-0 table-responsive-sm">
                  <tbody>
                    <tr>
                      <td>
                        <span class="sold-thumb"
                          ><i class="la la-arrow-down"></i
                        ></span>
                      </td>

                      <td>
                        <span class="badge badge-danger">Sold</span>
                      </td>
                      <td><i class="cc BTC"></i> Bitcoin</td>
                      <td>Using - Bank *******5264</td>
                      <td class="text-danger">-0.000242 BTC</td>
                      <td>-0.125 USD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Exchange from '../components/Exchange/Exchange.vue'
import PriceChange from '../components/Price/PriceChange.vue'
import PricePreview from '../components/Price/PricePreview.vue'
import UserBalance from '../components/Price/UserBalance.vue'
export default {
  components: { PricePreview, PriceChange, UserBalance, Exchange },
}
</script>

<style></style>
