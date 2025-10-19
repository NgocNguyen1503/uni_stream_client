import "./assets/main.css";

import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import vue3GoogleLogin from "vue3-google-login";
// sudo npm install vue-3-socket.io socket.io-client --save
import VueSocketIO from "vue-3-socket.io"; // Vue 3 compatible plugin
import SocketIO from "socket.io-client";

const app = createApp(App);

app.use(vue3GoogleLogin, {
    clientId:
        "369872052021-k5ntimu6cnhfpvscv4vq8uuigv0pcb40.apps.googleusercontent.com",
});

app.use(
    new VueSocketIO({
        debug: true,
        connection: SocketIO("http://127.0.0.1:3000"),
        options: {
            path: "/socket.io",
        },
    })
);

app.use(router);
app.mount("#app");
