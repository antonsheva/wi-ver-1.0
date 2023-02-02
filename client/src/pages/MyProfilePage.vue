<template>
  <div class="my_h-100">
    <div>
      <p class="text-center h3 fw-bold mb-3 mt-3 text-secondary">{{ title }}</p>
      <sign-up-form v-if="signUpTrigger"></sign-up-form>
      <login-form v-else></login-form>
      <a @click="changeForm" class="mt-5 text-secondary">{{ actionName }}</a
      ><br />
    </div>
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import { onMounted } from "vue";
import signUpForm from "@/components/SignUpForm";

export default {
  components: { SignUpForm, LoginForm },
  setup() {
    let signUpTrigger = false;
    onMounted(()=>{
       setTimeout(()=>{
         signUpTrigger = true;
       }, 3000)
     })


    return {
      actionName: "Зарегистрироваться",
      title: "Вход",
      signUpTrigger,
    };
  },
};
// export default {
//   name: "MyProfilePage",
//   components: { LoginForm, SignUpForm },
//   data() {
//     return {
//       actionName: "Зарегистрироваться",
//       title: "Вход",
//       signUpTrigger: false,
//     };
//   },
//   methods: {
//     changeForm() {
//       this.signUpTrigger = !this.signUpTrigger;
//       if (this.signUpTrigger) {
//         this.title = "Регистрация";
//         this.actionName = "Войти";
//       } else {
//         this.title = "Вход";
//         this.actionName = "Зарегистрироваться";
//       }
//     },
//   },
// };
</script>

<style scoped>
.my_h-100 {
  min-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
