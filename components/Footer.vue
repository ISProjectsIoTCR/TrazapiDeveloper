<script>
/**
 * Footer component
 */
export default {

    data() {
    return {
   
      infoDeveloper: {
        developer: "ISCorporación",
        year: "",
        url: "https://iscr.com",
      },
   
    };
  },
};
</script>

<template>
<footer class="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">{{ new Date().getFullYear()}} © Corona Dorada.</div>
            <div class="col-sm-6">
                <div class="text-sm-end d-none d-sm-block">
                    Made with <i class="fa fa-laptop text-dark"></i> and
                      <i class="fa fa-coffee text-dark"></i>, by
                      <a class="text-dark" :href="infoDeveloper.url" target="_blank">{{
                        infoDeveloper.developer
                      }}</a></div>
            </div>
        </div>
    </div>
</footer>
</template>
