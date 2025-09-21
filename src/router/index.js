// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "@/components/LoginComponent.vue";
import HomeComponent from "@/components/HomeComponent.vue";

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
    {
        path: "/index",
        name: "Index",
        component: HomeComponent,
    },
    {
        path: "/home",
        name: "Home",
        component: HomeComponent,
    },
    {
        path: "/youtube-live-callback",
        name: "HomeCallback",
        component: HomeComponent,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
