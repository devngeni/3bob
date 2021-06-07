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
        <div class="row contents">
          <div class="home-content-left"></div>
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
      <div>
        <h1 style="text-align: right; color: #fff; margin-right: 50px">3BOB</h1>
        <p style="text-align: right; color: #fff; margin-right: 50px">
          3BOB is an innovative USSD, SMS and PWA trading platform <br />
          built on the Solana Blockchain by Kenyans and for Kenyans. <br />3BOB
          aims to bridge the gap between the crypto world and Mpesa<br />
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
    </section>
  </div>
</template>

<script>
export default {
  layout: 'appLayout',
}
</script>

<style></style>
