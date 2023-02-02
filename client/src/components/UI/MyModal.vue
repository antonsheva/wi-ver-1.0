<template>
    <transition>
        <div class="my_modal_bcrgnd container" v-if="false">
            <div class="container align-self-center">
            <div class="my_modal_wrap">
                <div>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{$index.state.modal.header}}</h5>
                            <button type="button" class="btn-close" aria-label="Закрыть"
                                @click="hideModal"></button>
                        </div>
                        <div class="modal-body">
                            <p><slot name="content">{{$index.state.modal.content}}</slot></p>
                        </div>
                        <div class="modal-footer">
                            <my-button
                                @click="hideModal">
                                {{$index.state.modal.buttonName}}
                            </my-button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapMutations} from 'vuex'
    import MyButton from "@/components/UI/MyButton.vue";

    export default {
        name: "MyModal",
        components: {MyButton},
        data(){
            return{

            }
        },

        methods:{
            ...mapMutations({
                hideModal: 'modal/hideModal'
            }),
        },
    }
</script>

<style scoped>
    .my_modal_wrap{
        --bs-modal-margin: 1.75rem;
        --bs-modal-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        border-radius: 20px;
        border: solid 3px gray;
        background-color: white;
        padding: 15px;

    }
    .my_modal_bcrgnd{
        min-height: 100%;
        min-height: 100vh;
        min-width: 100%;
        min-width: 100vw;
        padding: 3%;
        display: flex;
        align-items: center;
        /*background-color: black;*/
        position: fixed;
        opacity: 90%;
    }
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>