<template>
  <header class="fixed fixed-top min-w-full z-10">
    <AppBar />
  </header>
  <main class="pt-16 min-h-screen">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
  <footer class="py-5 bg-gray-700 text-center text-white w-full">
    Made with Love & Vue {{ new Date().getFullYear() }}
  </footer>
  <Notification />
</template>

<script>
import AppBar from "./components/AppBar";
import Notification from "./components/Notification";

export default {
  name: "App",
  components: {
    AppBar,
    Notification
  },
  setup() {}
};
</script>
