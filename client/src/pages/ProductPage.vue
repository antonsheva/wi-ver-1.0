<template>
        <div class="card shadow-sm container">
            <img :src="product.prod_img"/>
            <div class="card-body">
                <h3>{{product.title}}</h3>
                <p class="card-text">{{product.description}}</p>
            </div>
        </div>
</template>

<script>
    import {mapState}from 'vuex'
    export default {
        name: "ProductPage",
        data(){
            return {
                id:0,
                product:{}
            }
        },
        computed:{

            ...mapState({
                products: state => state.products.products
            })
        },
        mounted(){
            this.id = this.$route.params.id;
            this.product = this.products.find(product => product.id == this.id);

            console.log(this.product)


        }

    }
</script>

<style scoped>
    .card img{
        max-width: 100%;
        border-radius: 10px;
    }
</style>