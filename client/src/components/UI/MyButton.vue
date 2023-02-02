<template>
    <div class="wrap w btn btn-sm btn-outline-secondary">
        <slot>Close</slot>
    </div>
</template>

<script>
    export default {
        name: "MyButton"
    }
</script>

<style scoped>
    .wrap{
        border: 2px solid gray;
        border-radius: 5px;
        padding: 10px;
        background-color: #9d9b9d;
        color: white;
    }
</style>