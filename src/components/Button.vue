<template>
  <button
    :type="btnType"
    :class="isLoading ? 'cursor-wait' : 'cursor-pointer'"
    class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150"
    :disabled="isDisabled"
    @click="clickEvent"
  >
    <svg
      v-if="isLoading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
    <span class="w-full text-center">{{ btnName }}</span>
  </button>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  name: "Button",
  props: {
    btnType: {
      type: String,
      default: "submit"
    },
    btnName: {
      type: String,
      require: true,
      default: "button"
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(_, context) {
    const isLoading = ref(false);
    const store = useStore();

    function clickEvent(e) {
      context.emit("action", e);
      isLoading.value = true;
    }

    watchEffect(() => {
      isLoading.value = store.state.process.isVisible;
    });

    return {
      clickEvent,
      isLoading
    };
  }
};
</script>
