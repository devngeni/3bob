<template>
  <div>
    <!-- home
   ================================================== -->
    <section
      id="home"
      data-parallax="scroll"
      data-natural-width="3000"
      data-natural-height="2000"
    >
      <div class="overlay"></div>
      <div class="home-content">
        <div class="row">
          <div class="home-content-left col-12 col-xl-12">
            <h1 class="banner__header">Got 3Bob? Get Bitcoin</h1>
            <p class="banner__left-content banner__size">
              Buy, Sell, Trade, Invest. Your favorite crypto assets for 3bob or
              less. No Internet. No Problem. Trade Now. Dial &times;371#
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="home-scrolldown">
        <a href="#about" class="scroll-icon smoothscroll">
          <span>Scroll Down</span>
          <i class="icon-arrow-right" aria-hidden="true"></i>
        </a>
      </div> -->
    </section>
    <!-- end home -->

    <section
      id="about"
      data-parallax="scroll"
      data-image-src="/images/about1.png"
      data-natural-width="3000"
      data-natural-height="2000"
    >
      <div class="row">
        <div class="col-lg-6 col-sm-12 col-xl-6 col-xxl-12"></div>

        <div class="col-lg-6 col-sm-12 col-xl-6 col-xxl-12">
          <h1 style="text-align: right; color: #fff; margin-right: 50px">
            3BOB
          </h1>
          <p
            style="
              text-align: right;
              color: #fff;
              margin-right: 50px;
              font-size: 21px !important;
            "
            class="banner__size"
          >
            3BOB is an innovative USSD, SMS and PWA trading platform <br />
            built on the Solana Blockchain by Kenyans and for Kenyans.
            <br />3BOB aims to bridge the gap between the crypto world and
            Mpesa<br />
            thus enabling users to easily deposit<br />
            and withdraw crypto to Kshs.<br />
            Building it on the Solana blockchain allows us to minimize the
            transaction <br />
            fees to as low as Kshs 3 ($0.03).
            <br />
            <br />
            <nuxt-link
              class="btn btn-primary text-white"
              :to="{ name: 'auth-signin' }"
              >{{ $auth.loggedIn ? 'Dashboard' : `Connect Phone` }}</nuxt-link
            >
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'appLayout',
}
</script>

<style>
.banner__header {
  padding: 10px;
  margin-top: -20px !important;
  margin-bottom: -2px !important;
  font-size: 55px !important;
}

.banner__size {
  font-size: 26px !important;
  color: #fff;
  line-height: 38px !important;
  font-weight: bold;
  letter-spacing: 1.7px;
}

.banner__left-content {
  width: 600px;
  padding: 10px;
}

@media only screen and (max-width: 600px) {
  .banner__header {
    font-size: 30px !important;
    width: 100% !important;
  }

  .banner__left-content {
    width: 300px important;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    text-align: left !important;
  }

  .banner__size {
    font-size: 12px !important;
    color: #fff;
  }
}
</style>
