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
                      <a href="accounts.html" class="dropdown-item">
                        <i class="la la-user"></i> Account
                      </a>
                      <a href="history.html" class="dropdown-item">
                        <i class="la la-book"></i> History
                      </a>
                      <a href="settings.html" class="dropdown-item">
                        <i class="la la-cog"></i> Setting
                      </a>
                      <a href="lock.html" class="dropdown-item">
                        <i class="la la-lock"></i> Lock
                      </a>
                      <a href="signin.html" class="dropdown-item logout">
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
            <a
              href="index-2.html"
              data-toggle="tooltip"
              data-placement="right"
              title="Home"
            >
              <span><i class="la la-igloo"></i></span>
            </a>
          </li>
          <li>
            <a
              href="buy-sell.html"
              data-toggle="tooltip"
              data-placement="right"
              title="Exchange"
            >
              <span><i class="la la-exchange-alt"></i></span>
            </a>
          </li>
          <li>
            <a
              href="accounts.html"
              data-toggle="tooltip"
              data-placement="right"
              title="Account"
            >
              <span><i class="la la-user"></i></span>
            </a>
          </li>
          <li>
            <a
              href="settings.html"
              data-toggle="tooltip"
              data-placement="right"
              title="Setting"
            >
              <span><i class="la la-tools"></i></span>
            </a>
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
