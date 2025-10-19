<template>
    <div id="detail">
        <!-- Start header -->
        <HeaderComponent />
        <!-- End header -->

        <!-- Start content -->
        <div class="flex h-screen">
            <!-- Start list streaming -->
            <div class="w-1/6 bg-[#272727] mt-16" id="list-stream">
                <p class="p-5 text-xl font-medium text-center text-white">Khám phá thêm</p>
                <ul id="list-stream-video"
                    class="pl-3 pr-2 mr-1 flex flex-col gap-3 scrollbar-thumb-[#3e3e3e] scrollbar-track-transparent scrollbar overflow-y-scroll h-[90%]">
                    <li v-for="otherLive in live.list_live" class="flex flex-col cursor-pointer">
                        <img :src="otherLive.thumbnail" onerror="../assets/W-03/list-stream-thumbnail.png"
                            class="flex object-cover overflow-hidden transition-all duration-200 opacity-100 rounded-xl hover:opacity-60 aspect-video"
                            alt="">
                        <div class="flex mt-4 h-[15%] items-center">
                            <img src="../assets/W-02/avatar.jpg" class="rounded-full size-10" alt="">
                            <div class="flex flex-col justify-center flex-grow ml-2 text-white">
                                <div class="flex items-center justify-between w-full text-base font-medium">
                                    <p>{{ otherLive.streamer_name }}</p>
                                    <div class="flex items-center gap-1 space-x-1">
                                        <p class="text-sm">{{ otherLive.time_start }}</p>
                                        <div class="flex px-2 bg-red-500">
                                            <p>LIVE</p>
                                        </div>
                                    </div>
                                </div>
                                <p class="mt-1 text-sm">{{ otherLive.title }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- End list streaming -->

            <!-- Start streaming frame -->
            <div class="flex flex-col flex-grow mt-16 bg-black">
                <div class="flex flex-row justify-between flex-grow h-[10%] mx-6 items-center content-center">
                    <div id="author-infor" class="flex items-center gap-4">
                        <img :src="live.live.avatar" onerror="'../assets/W-02/avatar.jpg'" class="rounded-full size-12"
                            alt="">
                        <div class="flex flex-col justify-center flex-grow text-white">
                            <div id="author-name"
                                class="flex items-center justify-between w-full text-base font-medium">
                                <p>{{ live.live.streamer_name }}</p>
                            </div>
                            <p id="stream-caption" class="mt-1 text-sm">{{ live.live.title }}</p>
                        </div>
                        <!-- Start chưa follow -->
                        <button v-if="live.live.follows == 0" id="follow-btn" v-on:click="actionFollow('follow')"
                            class="h-10 px-5 text-white transition-all duration-200 bg-red-700 rounded-md hover:opacity-75">
                            <i class="fa-solid fa-plus"></i> Follow
                        </button>
                        <button v-if="live.live.follows == 1" id="unfollow-btn" v-on:click="actionFollow('unfollow')"
                            class="h-10 px-5 text-white transition-all duration-200 bg-red-700 rounded-md hover:opacity-75">
                            <i class="fa-regular fa-circle-check"></i> Unfollow
                        </button>
                        <button v-if="live.live.follows == 2" disabled id="follow-btn"
                            class="h-10 px-5 text-white transition-all duration-200 bg-red-700 rounded-md hover:opacity-75">
                        </button>
                        <!-- End chưa follow -->

                        <!-- Start đã follow -->
                        <!-- <div class="content-center px-2 ml-2 text-2xl text-green-500">
                        <i class="fa-regular fa-circle-check"></i>
                    </div> -->
                        <!-- End chưa follow -->
                    </div>

                    <div id="stream-time" class="fixed text-lg text-white right-[50%]">
                        <i class="fa-regular fa-clock"></i> 1:32:54
                    </div>

                    <div class="flex gap-5 text-2xl text-white">
                        <!-- Start report component -->
                        <input type="checkbox" id="modal-report" class="hidden peer/modal-report">
                        <label for="modal-report">
                            <i class="fa-regular fa-flag hover:text-red-500 hover:cursor-pointer"></i>
                        </label>
                        <div
                            class="fixed inset-0 z-20 items-center justify-center hidden mx-auto text-white bg-black/30 backdrop-blur-sm peer-checked/modal-report:flex">
                            <div
                                class="bg-[#121212] w-[600px]  rounded-xl outline outline-2 outline-[#383838] text-white overflow-hidden">
                                <div class="flex justify-end bg-black">
                                    <label for="modal-report"
                                        class="p-4 text-xl text-white cursor-pointer hover:opacity-75">
                                        <i class="fa-solid fa-xmark"></i>
                                    </label>
                                </div>
                                <div class="flex flex-col gap-6 px-6 py-5">
                                    <h1 class="w-full text-2xl font-bold text-center text-white">Báo cáo phiên live</h1>
                                    <div class="flex flex-col gap-4">
                                        <div class="flex flex-col gap-4">
                                            <label for="modal-report"
                                                class="text-xl font-medium text-white cursor-pointer">Mô tả vi
                                                phạm</label>
                                            <input
                                                class="px-5 py-4 bg-[#222222] rounded-xl transition-all duration-200 outline outline-2 outline-transparent focus:outline-white text-base"
                                                type="text" id="modal-report"
                                                placeholder="Hành vi bạo lực, ngôn từ xúc phạm,...">
                                        </div>
                                    </div>
                                    <div class="flex justify-end w-full gap-4">
                                        <label for="modal-report"
                                            class="px-5 py-2 text-lg font-semibold text-center text-white transition-all duration-200 bg-red-500 cursor-pointer rounded-xl hover:opacity-75 min-w-24">Hủy</label>
                                        <label for="modal-report"
                                            class="text-white bg-[#222222] py-2 px-5 font-semibold rounded-xl hover:opacity-75 min-w-24 text-center cursor-pointer transition-all duration-200 text-lg">Xác
                                            nhận</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End report component-->

                        <!-- Start get stream infor -->
                        <input type="checkbox" id="modal-stream-infor" class="hidden peer/modal-stream-infor">
                        <label for="modal-stream-infor">
                            <i class="fa-solid fa-circle-info hover:text-red-500 hover:cursor-pointer"></i>
                        </label>
                        <div
                            class="fixed inset-0 z-20 items-center justify-center hidden mx-auto text-white bg-black/30 backdrop-blur-sm peer-checked/modal-stream-infor:flex">
                            <div
                                class="bg-[#121212] w-[600px]  rounded-xl outline outline-2 outline-[#383838] text-white overflow-hidden">
                                <div class="flex justify-end bg-black">
                                    <label for="modal-stream-infor"
                                        class="p-4 text-xl text-white cursor-pointer hover:opacity-75">
                                        <i class="fa-solid fa-xmark"></i>
                                    </label>
                                </div>
                                <div class="flex flex-col gap-6 px-6 py-5">
                                    <h1 class="w-full text-2xl font-bold text-center text-white">Thông tin phiên live
                                    </h1>
                                    <!-- Start phiên live của tôi -->
                                    <div class="flex flex-col gap-4">
                                        <div class="flex flex-col gap-2">
                                            <label for="modal-stream-infor"
                                                class="ml-2 text-xl font-medium text-white">watch_url</label>
                                            <p class="text-base px-5 py-4 bg-[#222222] rounded-xl text-gray-300"
                                                type="text" id="modal-stream-infor">{{ live.live.watch_url }}</p>
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label for="modal-stream-infor"
                                                class="ml-2 text-xl font-medium text-white">stream_url</label>
                                            <p class="text-base px-5 py-4 bg-[#222222] rounded-xl text-gray-300"
                                                type="text" id="modal-stream-infor">{{ live.live.stream_url }}</p>
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label for="modal-stream-infor"
                                                class="ml-2 text-xl font-medium text-white">stream_key</label>
                                            <p class="text-base px-5 py-4 bg-[#222222] rounded-xl text-gray-300"
                                                type="text" id="modal-stream-infor">{{ live.live.stream_key }}</p>
                                        </div>
                                    </div>
                                    <!-- End phiên live của tôi -->

                                    <!-- Start phiên live khác -->

                                    <!-- End phiên live khác -->
                                    <div class="flex justify-end w-full gap-4">
                                        <label for="modal-stream-infor"
                                            class="px-5 py-2 text-lg font-semibold text-center text-white transition-all duration-200 bg-red-500 cursor-pointer rounded-xl hover:opacity-75 min-w-24">Hủy</label>
                                        <label for="modal-stream-infor"
                                            class="text-white bg-[#222222] py-2 px-5 font-semibold rounded-xl hover:opacity-75 min-w-24 text-center cursor-pointer transition-all duration-200 text-lg">Xác
                                            nhận</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End get stream infor -->
                    </div>
                </div>

                <iframe id="stream-frame" class="h-[90%] mb-5 mx-1 rounded-sm" :src="live.live.embed_url"></iframe>
            </div>
            <!-- End streaming frame -->

            <!-- Start live chatroom -->
            <div id="live-chat-room" class="w-[20%] bg-[#272727] mt-16">
                <p class="p-5 text-xl font-medium text-center text-white">
                    <i class="fa-brands fa-rocketchat"></i> Trò chuyện
                </p>
                <div id="list-comment"
                    class="flex flex-col h-[80%] overflow-y-scroll scrollbar-thumb-[#3e3e3e] scrollbar-track-transparent scrollbar">
                    <ul class="flex flex-col gap-3">
                        <li v-for="comment in comments" class="flex flex-col mx-4">
                            <div class="flex flex-row content-center gap-2">
                                <img :src="comment.avatar" class="rounded-full size-6" :title="comment.name" alt="">
                                <p class="text-base font-bold text-gray-200">{{ comment.name }}</p>
                            </div>
                            <p class="ml-8 text-base text-white">{{ comment.comment }}</p>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col h-[10%] px-5 py-2 gap-2 border-t-2 border-t-gray-500 border-opacity-50">
                    <p v-if="userJustJoin !== ''" class="text-white">
                        <i class="fa-solid fa-arrow-right-to-bracket"></i> {{ userJustJoin }} đã tham gia
                    </p>
                    <div class="flex flex-row items-center gap-3">
                        <input id="comment-box" type="text" v-model="txt_comment"
                            class="px-3 py-3 w-full pl-4 bg-[#444444] rounded-xl transition-all outline outline-2 outline-transparent focus:outline-white scrollbar-none text-white placeholder:text-gray-400 resize-none"
                            placeholder="Hãy nói gì đó">
                        <div class="flex content-center text-xl text-white cursor-pointer size-5 hover:opacity-75">
                            <i v-if="txt_comment !== ''" v-on:click="sendComment()" class="fa-solid fa-paper-plane"></i>
                            <i v-else class="fa-solid fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End live chatroom -->
        </div>
        <!-- End content -->
    </div>
</template>

<script>
/**
 * Vue.js code in here!
 */
// import Vue from 'vue'
import HeaderComponent from './HeaderComponent.vue';
import axios from 'axios'

export default {
    components: {
        HeaderComponent
    },
    /***********************************************************************************************************
     ******************************* Pass data to child component **********************************************
        **********************************************************************************************************/
    props: [""],
    // components: {component1, component2},
    data() {
        /***********************************************************************************************************
         ******************************* Initialize global variables ***********************************************
            **********************************************************************************************************/
        return {
            liveId: 0,
            access_token: sessionStorage.getItem('access_token'),
            live: [],
            txt_comment: "",
            comments: [],
            userJustJoin: '',
        }
    },
    created() {
        /***********************************************************************************************************
         *********************** Initialize data when this component is used. **************************************
            **********************************************************************************************************/

        this.getLiveIdFromURL();
        this.getLiveDetail();
        this.getComments();
        this.joinCommentRoom();
    },
    mounted() {
        // this.intervalId = setInterval(() => {
        //     this.callAPI();
        // }, 2000);

    },
    watch: {

    },
    computed: {
        appendMsg() {
            return msg + "Process the value and assign the value to the corresponding variable the var has changed.";
        }
    },
    /**
     * Define global service socket
     *
     * Listing event from socket.io server
     * "ServerSendCommentToClient" is the name of the channel that sends notifications to all clients installed in the server socket
     */
    sockets: {
        // Send data to server
        ClientSendCommentToServer: function (responseComment) {
            this.comment = responseComment;
        },
        // Listen event from server and render data again
        ServerSendCommentToClient: function (responseComment) {
            // Push to the comment list
            if (responseComment.type === 'comment' &&
                this.liveId == responseComment.live_id &&
                responseComment.action == 'comment') {
                // Append comment to list, reupdate data
                this.comments.push(responseComment);
                this.$forceUpdate();
            }
            if (responseComment.type === 'comment' &&
                this.liveId == responseComment.live_id &&
                responseComment.action == 'join') {
                this.userJustJoin = responseComment.name;
            }
        },
    },

    methods: {
        /**
         * Example default function not using param
         */
        defaultFunction() {
            this.msg = "Replace message here!";
        },

        // Leave comment room
        leaveCommentRoom() {
            this.$socket.emit('ClientSendCommentToServer', {
                id: 1,
                comment: "",
                avatar: "",
                name: "",
                created_at: "2022-07 -09 07:00: 41",
                updated_at: "2022-07 -09 07:00: 41",
                live_id: this.liveId,
                type: "comment",
                action: "join"
            });
        },
        // Join a comment room
        joinCommentRoom() {
            this.$socket.emit('ClientSendCommentToServer', {
                id: 1,
                comment: "",
                avatar: "",
                name: JSON.parse(sessionStorage.getItem('user_infor')).name,
                created_at: "2022-07 -09 07:00: 41",
                updated_at: "2022-07 -09 07:00: 41",
                live_id: this.liveId,
                type: "comment",
                action: "join",
            });
        },

        getLiveIdFromURL() {
            this.liveId = parseInt(window.location.href.split("id=")[1]);
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
        async getLiveDetail() {
            try {
                const callAPI = await axios.get('http://localhost:8000/api/live-detail', {
                    /************ Attach param for request here ***************/
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token
                    },
                    params: {
                        'live_id': this.liveId
                    }
                })
                this.live = callAPI.data.data;
            } catch (err) {
                console.log(err);
            }
        },

        async actionFollow(type) {
            try {
                const callAPI = await axios.get('http://localhost:8000/api/follow', {
                    /************ Attach param for request here ***************/
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token
                    },
                    params: {
                        'live_id': this.liveId,
                        'follow_id': this.live.live.streamer_id,
                        'type': type
                    }
                })
                if (type == 'follow') {
                    this.live.live.follows = 1;
                } else {
                    this.live.live.follows = 0;
                }
            } catch (err) {
                console.log(err);
            }
        },

        async sendComment() {
            try {
                const formData = new FormData();
                formData.append("live_id", this.liveId);
                formData.append("comment", this.txt_comment);
                const callAPI = await axios.post('http://localhost:8000/api/send-comment', formData, {
                    /************ Attach param for request here ***************/
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': 'Bearer ' + this.access_token
                    },
                });
                // this.comments.push(callAPI.data.data);
                this.txt_comment = '';
                // Send comment data to socket.io
                this.$socket.emit('ClientSendCommentToServer', callAPI.data.data);
            } catch (err) {
                console.log(err);
            }
        },

        async getComments() {
            try {
                const callAPI = await axios.get('http://localhost:8000/api/get-comments', {
                    /************ Attach param for request here ***************/
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token
                    },
                    params: {
                        'live_id': this.liveId
                    }
                });
                this.comments = callAPI.data.data;
            } catch (err) {
                console.log(err);
            }
        },
    },
}
</script>

<style scoped></style>