<template>
  <div class="ml-3 relative">
    <div>
      <button
        @click="isOpen = !isOpen"
        class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
        id="user-menu"
        aria-label="User menu"
        aria-haspopup="true"
      >
        <img class="h-8 w-8 rounded-full" src="../assets/user.png" alt="user" />
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
      >
        <div
          class="py-1 rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <button
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            @click="signOut"
          >
            Sign out
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "AccountDropdown",
  created() {
    const handleEscape = e => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpen = false;
      }
    };

    document.addEventListener("keydown", handleEscape);
  },
  setup() {
    const isOpen = ref(false);
    const store = useStore();
    const router = useRouter();

    function signOut() {
      console.log("Ouut");
      store.dispatch("user/signOut");
      isOpen.value = false;
      router.replace("/login");
    }
    return {
      isOpen,
      signOut
    };
  }
};
</script>
