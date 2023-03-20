import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import OrderView from "../views/OderView.vue";
import InvoiceView from "../views/InvoiceView.vue";
import HomeView from "../views/HomeView.vue";
import BillSearchView from "../views/BillSearchView.vue";
import NewOrderView from "../views/NewOrderView.vue";
import OrderReView from "../views/OrderReView.vue";
import OrderListView from "../views/OrderListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/order",
      name: "order",
      component: OrderView,
    },
    {
      path: "/invoice/:id",
      name: "invoice",
      component: InvoiceView,
      props: true,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/bs",
      name: "bill search",
      component: BillSearchView,
    },
    {
      path: "/newo",
      name: "new order",
      component: NewOrderView,
    },
    {
      path: "/orderRe/:id",
      name: "order reciept",
      component: OrderReView,
      props: true,
    },
    {
      path: "/orlist",
      name: "order list",
      component: OrderListView,
    },
  ],
});

export default router;
