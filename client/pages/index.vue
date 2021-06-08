<template>
  <div>
    <!-- ======= Hero Section ======= -->
    <section id="hero">
      <header id="header">
        <div class="container d-flex align-items-center">
          <div class="logo mr-auto">
            <a href="/"
              ><img src="/client/img/logo.png" alt="" class="img-fluid"
            /></a>
          </div>
        </div>
      </header>
      <!-- End Header -->
      <div class="container">
        <div class="row d-flex align-items-center">
          <div
            class="col-lg-6 py-5 py-lg-0 order-2 order-lg-1"
            style="z-index: 1000"
          >
            <h1 class="text-white">Got 3Bob? Get Bitcoin</h1>
            <h2>
              Buy, Sell, Trade, Invest. Your favorite crypto assets for 3bob or
              less. No Internet. No Problem. Trade Now. Dial *371#
            </h2>
            <nuxt-link
              class="btn-get-started scrollto"
              :to="{ name: 'auth-signin' }"
            >
              Connect Your phone</nuxt-link
            >>
          </div>
          <div
            class="col-lg-6 order-1 order-lg-2 hero-img"
            data-aos="fade-left"
          >
            <img src="/client/img/hero-img.png" class="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </section>
    <!-- End Hero -->

    <main id="main">
      <!-- ======= About Section ======= -->
      <section id="about" class="about section-bg">
        <div class="container">
          <div class="row">
            <div
              class="
                image
                col-xl-5
                d-flex
                align-items-stretch
                justify-content-center justify-content-lg-start
              "
            ></div>
            <div
              class="col-xl-7 pl-0 pl-lg-5 pr-lg-1 d-flex align-items-stretch"
            >
              <div class="content d-flex flex-column justify-content-center">
                <p style="color: aliceblue">
                  3BOB is an innovative USSD, SMS and PWA trading platform built
                  on the Solana Blockchain by Kenyans and for Kenyans. 3BOB aims
                  to bridge the gap between the crypto world and Mpesa thus
                  enabling users to easily deposit and withdraw crypto to Kshs.
                  Building it on the Solana blockchain allows us to minimize the
                  transaction fees to as low as Kshs 3 ($0.03). .
                </p>
              </div>
              <!-- End .content-->
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- End #main -->
  </div>
</template>

<script>
export default {
  layout: 'appLayout',
}
</script>

<style></style>
