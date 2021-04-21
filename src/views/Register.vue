<template>
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100">
            <div class="col-lg-5 mx-auto">
              <div class="auth-form-light text-left p-5">
                <form class="pt-3" v-on:submit.prevent="Register">
                    <br />
                    <br />
                     <br />
                    <br />
                     <br />
                    <br />
                <h2>Daftar Sekarang!</h2>
                <p class="font-weight-light">Lengkapi data diri anda dibawah ini.</p>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-checkbook text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="nik" name="nik" placeholder="NIK" v-model="nik" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-account-box-outline text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="nama" name="nama" placeholder="Nama Lengkap" v-model="nama" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-cellphone text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="telp" name="telp" placeholder="Telepon" v-model="telp" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-account-outline text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="username" name="username" placeholder="Username" v-model="username" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-lock-outline text-primary"></i>
                        </span>
                      </div>
                      <input type="password" class="form-control form-control-lg border-left-0" name="password" id="password" placeholder="Kata Sandi" v-model="password" required>                        
                    </div>
                  </div>
                 <!-- <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-chart-bar text-primary"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control form-control-lg border-left-0" id="level" name="level" placeholder="Level" v-model="level" required>
                    </div>
                  </div> -->
                <div class="form-group" placeholder="Jenis Kelamin">
                    <div class="input-group" >
                      <div class="input-group-prepend bg-transparent" >
                        <span class="input-group-text bg-transparent border-right-0" >
                          <i class="mdi mdi-face text-primary"></i>
                        </span>
                      </div>
                      <select class="form-control" v-model="gender" placeholder="Jenis Kelamin">
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                    </div>
                  </div>
                 <div class="my-3">
                  <input type="submit" name="submit" class="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn" value="MASUK">
                </div>
                </form>
                <p>
                <a href="/login" align-text="center info" class="font-weight-bold"><center>Sudah memiliki akun? Klik disini</center></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
</template>

<script>
export default {
    data() {
      return {
        nik: '',
        nama: '',
        telp: '',
        username: '',
        password: '',
        level: '',
        gender: '',
      }
    },
    methods: {
        Register : function(){
        let nik = this.nik;
        let nama = this.nama;
        let telp = this.telp;
        let username = this.username;
        let password = this.password;
        let level = this.level;
        let gender = this.gender;
        this.$store
        .dispatch('register',{
        nik,
        nama,
        telp,
        username,
        password,
        level,
        gender,
       })
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err));
     }
    //  onFileChange(e) {
    //   var files = e.target.files || e.dataTransfer.files;
    //   if (!files.length)
    //     return;
    //   this.createImage(files[0]);
    //   },
    //   createImage(file) {
    //     var foto = new Foto();
    //     var reader = new FileReader();
    //     var vm = this;

    //   reader.onload = (e) => {
    //     vm.foto = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // }
  }
}
</script>