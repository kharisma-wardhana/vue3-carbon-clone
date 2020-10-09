<template>
  <header>
    <AppBar />
  </header>
  <main>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
  <footer></footer>
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
