<template>
  <teleport to="body">
    <div
      v-show="$store.state.notif.isVisible || $store.state.process.isVisible"
      class="backdrop"
    ></div>
    <svg
      v-show="$store.state.process.isVisible"
      class="loading-data animate-spin h-16 w-16 text-teal-700"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
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
.loading-data {
  position: fixed;
  top: 35vh;
  left: 45vw;
  z-index: 100;
}
</style>
