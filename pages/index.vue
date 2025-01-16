<script>
/**
 * Dashboard component
 */
export default {
  //middleware: "authlogin",
  head() {
    return {
      title: `${this.title} | Cuaderno del Apicultor`,
    };
  },
  data() {
    return {
      title: "Index",
      items: [
        {
          text: "Cuaderno del Apicultor",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
    };
  },



  mounted() {
    $nuxt.$router.push("/dashboard");
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
  </div>
</template>

<style></style>
