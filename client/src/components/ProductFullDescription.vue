<template>
    <div class="card shadow-sm my_st">
        <img :src="product.prod_img"/>
        <div class="card-body">
            <h3>{{product.title}}</h3>
            <p class="card-text">{{descr}}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Смотреть</button>
                </div>
                <small class="text-muted">9 mins</small>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductFullDescription",
        props:{
            product:{
                type: Object,
                required: true
            }
        },
    }
</script>

<style scoped>
    .my_st{
        height: 100%;
        min-height: 100%;
    }
</style>