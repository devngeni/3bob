<template>
  <div class="card-body">
    <div class="row">
      <div class="col-xl-12 col-lg-6 col-xxl-6">
        <div class="widget-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="widget-stat">
              <div class="coin-title">
                <span><i class="cc BTC-alt"></i></span>
                <h5 class="d-inline-block ml-2 mb-3">
                  Bitcoin <span>(24h)</span>
                </h5>
              </div>
              <h4>
                USD 1254.36
                <span class="badge badge-success ml-2">+ 06%</span>
              </h4>
            </div>
            <div id="btcChart"></div>
          </div>
        </div>
      </div>
      <div class="col-xl-12 col-lg-6 col-xxl-6">
        <div class="widget-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="widget-stat">
              <div class="coin-title">
                <span><i class="cc ETH-alt"></i></span>
                <h5 class="d-inline-block ml-2 mb-3">
                  Ethereum <span>(24h)</span>
                </h5>
              </div>
              <h4>
                USD 1254.36
                <span class="badge badge-danger ml-2">- 06%</span>
              </h4>
            </div>
            <div id="ltcChart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
