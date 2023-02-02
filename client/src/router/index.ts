import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import AddProductPage from "@/pages/AddProductPage.vue";
import ScanProductPage from "@/pages/ScanProductPage.vue";
import MyProfilePage from "@/pages/MyProfilePage.vue";
import ProductPage from "@/pages/ProductPage.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/add-product",
    name: "add-product",
    component: AddProductPage,
  },
  {
    path: "/scan-product",
    name: "scan-product",
    component: ScanProductPage,
  },
  {
    path: "/my-profile",
    name: "my-profile",
    component: MyProfilePage,
  },
  {
    path: "/product/:id",
    name: "product-description",
    component: ProductPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory("http://localhost:5173"), //process.env.BASE_URL
});

export default router;
