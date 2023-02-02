<template>
  <div class="app">
    <router-view></router-view>
    <my-modal></my-modal>
    <nav-bar/>
  </div>
</template>

<script>

// import NavBar from "./components/UI/NavBar";
// import MyModal from "./components/UI/MyModal";
export default {
  name: 'App',
  components: {
    // NavBar,MyModal
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
}
.app{
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
}
</style>
