<template>
  <div class="container-fluid page-body-wrapper">
    <section class="contact section-padding">
      <br />
    <br />
    <br />
      <div class="container mt-3">
        <div class="row">
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title float-left">Data Pengaduan</h2>
                <!-- <p class="card-description float-right">
                  <b-button variant="success" v-b-modal.modalPengaduan v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button>
                </p> -->
                <div class="table-responsive">
                  <b-table striped hover :items="pengaduan" :fields="fields">
                    <template v-slot:cell(foto)="data">
                      <img style="width:200px; height: 150px; border-radius:5%" :src="'http://localhost:8000/uploads/' + data.item.foto" />
                    </template>
                    <template v-slot:cell(tanggapan)="data">
                      {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan :null }}
                    </template>
                    <template v-slot:cell(kategori)="data">
                      {{ (data.item.kategori !== null) ? data.item.kategori.nama_kategori :null }}
                    </template>
                  </b-table>
                  <b-pagination
                    v-model="currentPage"
                    :per-page="perPage"
                    :total-rows="rows"
                    align="center"
                    v-on:input="pagination">
                  </b-pagination>

                  <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                    <b-spinner label="Spinning" variant="success"></b-spinner>
                    <strong class="text-success">Loading...</strong>
                  </b-toast>

                  <!-- toast untuk tampilan message box -->
                  <b-toast id="message" title="Message">
                    <strong class="text-success">{{ message }}</strong>
                  </b-toast>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <b-modal 
      id="modalTanggapan"
      @ok="Save"
    >
      <template v-slot:modal-title>
        Masukkan Tanggapan Anda Disini
      </template>
        <form ref="form">
          <div class="form-group">
            <label for="id_pengaduan" class="col-form-label">Id Pengaduan</label>
            <input type="text" name="id_pengaduan" class="form-control" id="id_pengaduan" 
            placeholder="Isikan Id Pengaduan Disini" v-model="id_pengaduan">
          </div>
          <div class="form-group">
            <label for="tanggapan" class="col-form-label">Tanggapan</label>
            <input type="text" name="tanggapan" class="form-control" id="tanggapan" 
            placeholder="Beri Tanggapan Disini" v-model="tanggapan">
          </div>
        </form>
    </b-modal>

    <b-modal 
      id="modalStatus"
      @ok="Save"
    >
      <template v-slot:modal-title>
        Ubah Status Pengaduan
      </template>
        <form ref="form">
          <div class="form-group">
            <label for="id_pengaduan" class="col-form-label">Id Pengaduan</label>
            <input type="text" name="id_pengaduan" class="form-control" id="id_pengaduan" 
            placeholder="Isikan Id Pengaduan Disini" v-model="id_pengaduan">
          </div>
          <div class="form-group">
            <label for="status" class="col-form-label">Status</label>
            <select class="form-control" v-model="status">
              <option value="terkirim">Terkirim</option>
              <option value="proses">Proses</option>
              <option value="selesai">Selesai</option>
              <option value="tolak">Tolak</option>
            </select>
          </div>
        </form>
    </b-modal>

  </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id_pengaduan: "",
      tgl_pengaduan: "",
      isi_laporan: "",
      foto: "",
      status: "",
      tanggapan: "",
      id_kategori: "",
      nama_kategori: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      pengaduan: [],
      tanggapan: [],
      kategori: [],
      fields: ["tgl_pengaduan", "isi_laporan", "foto", "status", "kategori", "tanggapan"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/pengaduan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.tanggapan = response.data.data.pengaduan.tanggapan;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pelanggaran atau anda bukan admin"
          this.$bvToast.show("message");
          // this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },

getKategori : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/masyarakat/kategori", conf)
      .then(response => {
        if(response.data.success){
          this.$bvToast.hide("loadingToast");
          this.kategori = response.data.data.kategori.nama_kategori;
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
      this.action = "insert";
      this.tanggapan = "";
      this.id_pengaduan= "";
    },

    Edit : function(item){
      this.action = "update";
      this.id_pengaduan = item.id_pengaduan;
      this.status = item.status;
      // this.getStatusDropdown();
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        // form.append("id", this.id);
        form.append("tanggapan", this.tanggapan);
        form.append("id_pengaduan", this.id_pengaduan);

        this.axios.post("/pengaduan/tanggapan", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let form = {
          id_pengaduan: this.id_pengaduan,
          status: this.status,
        }
        this.axios.post("/pengaduan/status", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
    this.getKategori();

  }
}
</script>