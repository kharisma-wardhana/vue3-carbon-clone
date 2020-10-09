<template>
  <teleport to="body">
    <div v-show="$store.state.notif.isVisible" class="backdrop"></div>
    <div
      v-show="$store.state.notif.isVisible"
      class="flex justify-center md:mt-24 notif"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div class="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mt-2">
          <p class="text-sm leading-5 font-semibold text-teal-700">
            {{ $store.state.notif.message }}
          </p>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "Notification"
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
.notif {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
}
</style>
