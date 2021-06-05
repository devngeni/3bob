<template>
  <div class="card-body pt-0">
    <div class="balance-widget">
      <div class="total-balance">
        <h3>$ {{ $auth.user.amount_balance | currency }}</h3>
        <h6>Total Balance</h6>
      </div>
      <ul class="list-unstyled">
        <li class="media">
          <i class="cc BTC mr-3"></i>
          <div class="media-body">
            <h5 class="m-0">Bitcoin</h5>
          </div>
          <div class="text-right">
            <h5>0.000242 BTC</h5>
            <span>0.125 USD</span>
          </div>
        </li>
        <li class="media">
          <i class="cc LTC mr-3"></i>
          <div class="media-body">
            <h5 class="m-0">Litecoin</h5>
          </div>
          <div class="text-right">
            <h5>0.000242 LTC</h5>
            <span>0.125 USD</span>
          </div>
        </li>
        <li class="media">
          <i class="cc XRP mr-3"></i>
          <div class="media-body">
            <h5 class="m-0">Ripple</h5>
          </div>
          <div class="text-right">
            <h5>0.000242 XRP</h5>
            <span>0.125 USD</span>
          </div>
        </li>
        <li class="media">
          <i class="cc DASH mr-3"></i>
          <div class="media-body">
            <h5 class="m-0">Dash</h5>
          </div>
          <div class="text-right">
            <h5>0.000242 XRP</h5>
            <span>0.125 USD</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
