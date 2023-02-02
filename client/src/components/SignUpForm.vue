<template>
        <form>
            <div class="d-flex flex-row align-items-center mb-2">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="text" id="form3Example1c" class="form-control" autocompleted="">
                    <label class="form-label" for="form3Example1c" style="margin-left: 0px;">Логин</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 71.2px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">
                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="email" id="form3Example3c" class="form-control">
                    <label class="form-label" for="form3Example3c" style="margin-left: 0px;">Email</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 68.8px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">
                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="password" id="form3Example4c" class="form-control">
                    <label class="form-label" for="form3Example4c" style="margin-left: 0px;">Пароль</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 64px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">
                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="password" id="form3Example4cd" class="form-control">
                    <label class="form-label" for="form3Example4cd" style="margin-left: 0px;">Повторить пароль</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 134.4px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <my-button>Зарегистрироваться</my-button>
            </div>

        </form>
</template>

<script>
    import MyButton from "@/components/UI/MyButton.vue";
    export default {
        name: "SignUpForm",
        components: {MyButton}
    }
</script>

<style scoped>

</style>