<template>
  <div id="main-wrapper">
    <div class="header" v-if="$auth.loggedIn">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12">
            <nav
              class="
                navbar navbar-expand-lg navbar-light
                px-0
                justify-content-between
              "
            >
              <a class="navbar-brand" href="index-2.html"
                ><img src="images/w_logo.png" alt="" /> <span>3BOB</span></a
              >

              <div class="dashboard_log my-2">
                <div class="d-flex align-items-center">
                  <div class="account_money">
                    <ul>
                      <li class="crypto">
                        <span>{{ $auth.user.amount_in_bob }} </span>
                        BOB
                      </li>

                      <li class="usd">
                        <span>{{ $auth.user.amount_balance }} USD</span>
                      </li>
                    </ul>
                  </div>
                  <div class="profile_log dropdown">
                    <div class="user" data-toggle="dropdown">
                      <span class="thumb"><i class="la la-user"></i></span>
                      <span class="name">{{
                        $auth.user.name ? $auth.user.name : $auth.user.email
                      }}</span>
                      <span class="arrow"
                        ><i class="la la-angle-down"></i
                      ></span>
                    </div>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a
                        href="javascript:void()"
                        @click="logout"
                        class="dropdown-item logout"
                      >
                        <i class="la la-sign-out"></i> Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="menu">
        <ul>
          <li>
            <nuxt-link
              data-toggle="tooltip"
              data-placement="right"
              title="Dashboard"
              :to="{ nmae: 'index' }"
            >
              <span><i class="la la-igloo"></i></span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="page_title">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12">
            <div class="page_title-content">
              <p>
                Welcome Back,
                <span>
                  {{
                    $auth.user.name ? $auth.user.name : $auth.user.email
                  }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-body">
      <Nuxt />
    </div>

    <div class="footer">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-xl-6 col-md-6">
            <div class="copy_right">
              Copyright &copy; CodeDevs. All Rights Reserved.
            </div>
          </div>
          <div class="col-xl-6 col-md-6 text-lg-right text-center">
            <div class="social">
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push({ name: 'auth-signin' })
      } catch (error) {}
    },
  },
}
</script>
