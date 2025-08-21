// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/HomeComponent.vue";
import About from "../components/AboutComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";

const routes = [
    // {
    //     path: "/home",
    //     name: "Home",
    //     component: Home,
    // },
    // {
    //     path: "/about",
    //     name: "About",
    //     component: About,
    // },
    {
        path: "/login",
        name: "Login",
        component: LoginComponent,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
