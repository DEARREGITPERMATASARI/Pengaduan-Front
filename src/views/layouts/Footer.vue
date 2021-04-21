<template>
     <!-- ======= Footer ======= -->
  <footer class="footer">
    <div class="copyrights">
      <div class="container">
        <p>Copyright &copy; {{ year }}. All rights reserved.</p>
        <span class="float-none  text-muted float-sm-right d-block mt-1 mt-sm-0 text-center">UKK Moklet & Made With <i class="bi bi-heart-fill"></i></span>

      </div>
    </div>

  </footer>
  <!-- End  Footer -->
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>