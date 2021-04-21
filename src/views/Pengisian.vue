<template>
  <div>
    <br />
    <br />
    <br />
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title float-left">Masukkan Pengaduan</h2>
              <p class="card-description float-right">
              <div class="table-responsive">
                <form v-on:submit.prevent="Save">
                    Tanggal 
                    <b-form-input v-model="tgl_pengaduan" class="mb-1" required></b-form-input>
                    Laporan 
                    <b-form-input v-model="isi_laporan" class="mb-1" required></b-form-input>
                    Foto
                    <b-form-file id="foto" class="mb-1" :required="req_file"></b-form-file>
                    Kategori
                    <b-form-select v-model="id_kategori" class="mb-1" required>
                        <option v-for="item in kategori" :value="item.id_kategori" :key="item.id_kategori">
                            {{ item.nama_kategori }}
                        </option>
                    </b-form-select> 
                    <b-button variant="success" v-b-modal.modalDB type="submit">
                        <i></i>Kirim</b-button>
                </form>

                 <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="success"></b-spinner>
                  <strong class="text-success">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message"  no-auto-hide>
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      id_pengaduan: "",
      tgl_pengaduan: "",
      id_user: "",
      isi_laporan: "",
      foto: "",
      status: "",
      id_kategori: "",
      file: "",
      nama: "",
      item: "",
      nama_kategori: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      fields: ["id_pengaduan", "tgl_pengaduan", "id_user", "isi_laporan", "foto","id_kategori"],
      pengaduan: [],
      kategori: [],
      users: [],
      req_file: true,
    }
  },

  methods: {
   getKategori : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/masyarakat/kategori", conf)
      .then(response => {
        if(response.data.success){
          this.$bvToast.hide("loadingToast");
          this.kategori = response.data.data.kategori;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data kategori."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getKategori();
      } else {
        this.searching();
      }
    },

    Add : function(){
      let user=JSON.parse(localStorage.getItem('user'))
      this.action = "insert";
      this.id_pengaduan = "";
      this.tgl_pengaduan = "";
      this.id_user = user.id;
      this.isi_laporan = "";
      this.foto = null;
      this.status = "";
      this.id_kategori = this.id_kategori;
      this.file = null;
      document.getElementById("foto").value = null;
      this.req_file = true;
    },

 Save : function(){
     
    //  alert("hai")
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id_pengaduan", this.id_pengaduan);
        form.append("tgl_pengaduan", this.tgl_pengaduan);
        form.append("id_user", this.id_user);
        form.append("isi_laporan", this.isi_laporan);
        form.append("foto", document.getElementById("foto").files[0]);
        form.append("status", this.status);
        form.append("id_kategori", this.id_kategori);
        
        this.axios.post("masyarakat/pengaduan", form, conf)
         .then(response => {
          this.$bvToast.hide("loadingToast");
          this.message = response.data.message;
          // this.$bvToast.hide("loadingToast");
          this.$bvToast.show("message");
          this.get_document(this.id_pengaduan);
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  },
   mounted(){
    this.key = localStorage.getItem("Authorization");
    this.Add();
    this.getKategori();
    }
}

</script>