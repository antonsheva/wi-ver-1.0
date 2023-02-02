<template>
  <div class="center">
    <product-list />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import axios from "axios";
export default {
  name: "MainPage",
  components: { ProductList },
  methods: {
    addDataToDb() {
      const body = {
        item: "my item 1",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 1",
        img: "https://avatars.dzeninfra.ru/get-zen_doc/2749135/pub_60349202a332dd7373e13016_60349237a332dd7373e16221/scale_1200",
      };
      const config = {
        headers: {
          "X-CSRF-TOKEN": this.csrf,
        },
      };
      axios.post("http://localhost:8080/", body, config).then((response) => {
        this.csrf = response.data;
      });
    },
  },
};
</script>

<style scoped>
.center {
  padding: 10px;
  height: calc(100% - 60px);
  min-height: calc(100% - 60px);
  width: 100%;
  overflow: hidden;
}
</style>
