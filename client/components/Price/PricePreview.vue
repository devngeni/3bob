<template>
  <div class="card-body">
    <div class="row">
      <div
        class="col-xl-12 col-lg-6 col-xl-6"
        v-for="(curr, index) in currency"
        :key="index"
      >
        <div class="widget-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="widget-stat">
              <div class="coin-title">
                <span></span>
                <h5 class="d-inline-block ml-2 mb-3">
                  {{ curr.name }} <span>({{ curr.symbol }})</span>
                </h5>
              </div>
              <h4>
                USD {{ curr.amount }}
                <span class="badge badge-success ml-2">{{
                  curr.increase_percentage
                }}</span>
              </h4>
            </div>
            <div id="btcChart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { currency: { type: Array, required: true } },
}
</script>

<style></style>
