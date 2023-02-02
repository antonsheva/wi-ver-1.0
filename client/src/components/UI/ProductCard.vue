<template>
    <div class="col">
        <div class="card shadow-sm">
            <img :src="product.prod_img"/>
            <div class="card-body">
                <h3>{{product.title}}</h3>
                <p class="card-text">{{descr}}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <my-button
                        @click="$router.push('/product/'+product.id)">Смотреть</my-button>
                    <small class="text-muted">9 mins</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyButton from "@/components/UI/MyButton.vue";
    export default {
        name: "ProductCard",
        components: {MyButton},
        props:{
            product:{
                type: Object,
                required: true
            }
        },
        data(){
            return{
                descr: ""
            }
        },
        mounted(){
            if(this.product.description.length > 120){
                this.descr = this.product.description.substring(0,110)+"...";
            }else {
                this.descr = this.product.description;
            }

        }
    }
</script>

<style scoped>
    .card img{
        border-radius: 10px;
    }
</style>