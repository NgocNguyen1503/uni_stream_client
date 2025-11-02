<!-- Define html code -->
<template>
    <!-- html code here -->
    <div class="flex items-center justify-center h-screen bg-black">
        <div class="bg-white h-[65%] w-[50%] rounded-2xl flex">
            <div class="m-2 w-[600px] rounded-xl overflow-hidden">
                <div class="w-full h-full overflow-hidden rounded-xl">
                    <img class="object-cover w-full h-full transition-all duration-300 cursor-pointer hover:scale-105 hover:blur-sm"
                        src="../assets/W-01/login3.jpg" alt="" />
                </div>
            </div>
            <div class="flex flex-col items-center justify-center w-full gap-10">
                <h1 class="text-4xl font-bold text-center">Đăng nhập vào Uni Stream</h1>
                <div class="flex flex-col gap-3">
                    <button @click="loginWithGoogle" class=" flex gap-4 border border-gray-300 w-[450px] p-5
                        rounded-2xl hover:border-gray-800 duration-200 transition-all">
                        <img class=" w-8" src=" ../assets/W-01/google.png" alt=" google icon">
                        <p class=" text-xl">Tiếp tục với Google</p>
                    </button>
                    <div class="flex items-center justify-center gap-4">
                        <hr class="w-48 text-gray-800">
                        <span class="text-gray-500">hoặc</span>
                        <hr class="w-48 text-gray-800">
                    </div>
                    <button
                        class="flex gap-4 border border-gray-300 w-[450px] p-5 rounded-2xl hover:border-gray-800 duration-200 transition-all">
                        <img class="w-8" src="../assets/W-01/facebook.png" alt="facebook icon">
                        <p class="text-xl">Tiếp tục với Facebook</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Define JS code -->
<script>
/**
 * Vue.js code in here!
 */
// import Vue from 'vue'
import axios from 'axios'
import { googleTokenLogin } from "vue3-google-login";
import { requestPermission } from "../firebase.js"; // Import firebase settings
// import component1 from 'component1'
// import component2 from 'component2'

export default {
    /***********************************************************************************************************
     ******************************* Pass data to child component **********************************************
        **********************************************************************************************************/
    // prop: [variable1, variable2],
    // components: {component1, component2},
    data() {
        /***********************************************************************************************************
         ******************************* Initialize global variables ***********************************************
            **********************************************************************************************************/
        return {
            msg: 'Hello world!',

        }
    },
    created() {
        /***********************************************************************************************************
         *********************** Initialize data when this component is used. **************************************
            **********************************************************************************************************/
        console.log('Init created component and call to function get data from api server.');
        // Co the goi toi cac ham khac (trong methods)
    },
    mounted() {
        /***********************************************************************************************************
         ******************** Once created, the interface is displayed and calls mounted. **************************
            **********************************************************************************************************/
        $(document).ready(function () {

        });
    },
    watch: {
        /***********************************************************************************************************
         ********************************* Methods change value for a variable *************************************
            **********************************************************************************************************/
        msg() {
            console.log("When the value of the msg variable changes, this method will be executed.");
        },
    },
    computed: {
        appendMsg() {
            return msg + "Process the value and assign the value to the corresponding variable the var has changed.";
        }
    },
    methods: {
        /***********************************************************************************************************
         ******************************* Default functions that handle local data **********************************
            **********************************************************************************************************/

        /**
         * Example default function not using param
         */
        defaultFunction() {
            this.msg = "Replace message here!";
        },

        /**
         * Example default function using param
         *
         * @param int pageNum number of page
         * @return boolean
         */
        defaultFunctionUsingParam(pageNum) {
            console.log(pageNum);
            return false;
        },
        /***********************************************************************************************************
         ******* Async and await functions for manipulating server-side data through internal API protocols ********
            **********************************************************************************************************/

        /**
         * Call API sample
         */
        async callAPI() {
            try {
                const callAPI = await axios.get('/apiendpoint', {
                    /************ Attach param for request here ***************/
                }).then(function (response) {
                    if (response.data.code == 200) {
                        sessionStorage.setItem("access_token", response.data.data.accessToken);
                        window.location.replace('/index');
                        return true;
                    }
                    alert("401 Unauthorization");
                    return false;
                }).catch(function (errors) {
                    console.log(errors);
                });
                console.log(callAPI.data);
            } catch (err) {
                console.log(err);
            }
        },

        async loginWithGoogle() {
            const googleUser = await googleTokenLogin();
            let doLogin = await axios.post('http://localhost:8000/api/login', {
                'access_token': googleUser.access_token
            }).then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    sessionStorage.setItem('access_token', response.data.data.accessToken);
                    sessionStorage.setItem('user_infor', JSON.stringify(response.data.data.user_infor));
                    // Request notification permission when the app starts.
                    requestPermission().then(token => {
                        console.log("FCM Token: ", token);
                        // Using axios call to server add token to DB
                        axios.get('http://localhost:8000/api/set-device-token', {
                            // Pass param to header
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + response.data.data.accessToken
                            },
                            params: {
                                fcmToken: token,
                            }
                        }).then(function () {
                            window.location.href = "/index";
                        });
                    }).catch(err => {
                        console.error("Get token ereors: : ", err);
                    });
                    window.location.replace('/home');
                    return true;
                }
            }).catch(function (errors) {
                console.log(errors);
            });
            console.log("Google token: ", googleUser.access_token);
        }
    },
}
</script>

<style>
/**
* Custom local style css
*/
</style>