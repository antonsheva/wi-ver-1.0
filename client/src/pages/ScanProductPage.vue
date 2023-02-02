<template>
    <div>

    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "ScanProductPage",
        data(){
           return{
               csrf: "-----"
           }
        },
        methods:{
            getCsrf(func){
                axios
                    .get('http://localhost:8000/csrf')
                    .then(response => {
                        this.csrf = response.data;
                        console.log('getCsrf -> '+ this.csrf);

                        func();
                    });
            },
            addDataToDb(){
                const body = {
                    item:"my item 1",
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 1",
                    img: "https://avatars.dzeninfra.ru/get-zen_doc/2749135/pub_60349202a332dd7373e13016_60349237a332dd7373e16221/scale_1200"
                }
                const config = {
                    headers:{
                        'X-CSRF-TOKEN'    : this.csrf,
                        'X-Requested-With': 'XMLHttpRequest',
                    }
                }
                axios
                    .post('http://localhost:8080/',body,config)
                    .then(response => {
                         console.log(response)
                    });
            }
        }
    }

</script>

<style scoped>

</style>