import "./assets/main.css";

import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.use(vue3GoogleLogin, {
    clientId:
        "369872052021-k5ntimu6cnhfpvscv4vq8uuigv0pcb40.apps.googleusercontent.com",
});

app.use(router);
app.mount("#app");
