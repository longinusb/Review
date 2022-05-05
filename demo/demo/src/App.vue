<template>
  <phone />
</template>

<script>
import phone from "./components/phone.vue";

export default {
  name: "App",
  components: {
    phone,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;

  width: 100%;
  position: relative;
  width: 350px;
  height: 750px;
  border-radius: 12px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
