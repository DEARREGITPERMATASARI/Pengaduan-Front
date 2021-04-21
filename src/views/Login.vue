<template>
    <div class="container-scroller">
    <div class="page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <!-- <div class="navbar-brand brand-logo">
                  <img height="auto" width="auto" class="my-3" src="../../public/img/Logo.png" alt="">
                </div> -->
                <h2>Selamat datang!</h2>
                <p class="font-weight-light">Login untuk menambahkan pengaduan.</p>
                  <form v-on:submit.prevent="Login">
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="mdi mdi-account-outline text-primary"></i>
                      </span>
                    </div>
                    <input type="username" class="form-control form-control-lg border-left-0" v-model="username" id="username" name="username" placeholder="Username" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="mdi mdi-lock-outline text-primary"></i>
                      </span>
                    </div>
                    <input type="password" class="form-control form-control-lg border-left-0" name="password" v-model="password" id="input_password" placeholder="Kata Sandi" required>                        
                  </div>
                </div>
                <div class="my-3">
                  <input type="submit" name="submit" class="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn" value="MASUK">
                </div>
                 <h6 class="font-weight-light akun"><center>Belum punya akun?</center></h6>
                <a href="/register" class="font-weight-bold"><center>DAFTAR SEKARANG</center></a>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>
<script>
export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
        Login: function(){
            let username = this.username 
            let password = this.password
            this.$store
            .dispatch('login', { username, password })
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
        }
    }
}
</script>