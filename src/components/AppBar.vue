<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link class="flex-shrink-0" to="/">
            <img
              class="h-8 w-8 rounded-full bg-teal-500"
              src="../assets/logo.svg"
              alt="logo"
            />
          </router-link>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                v-if="loggedIn"
                to="/"
                class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Home
              </router-link>

              <div class="flex px-1 py-2" v-else>
                <router-link
                  to="/login"
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Login
                </router-link>
                <div class="line-break"></div>
                <router-link
                  to="/register"
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Register
                </router-link>
              </div>

              <router-link
                to="/about"
                class="block py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                About
              </router-link>
            </div>
          </div>
        </div>
        <div v-if="loggedIn" class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <span class="text-white">{{ username }}</span>
            <AccountDropdown />
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            @click="isExpandMenu = !isExpandMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
          >
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                v-if="isExpandMenu"
                fill-rule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
              <path
                v-else
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div :class="isExpandMenu ? 'block' : 'hidden'" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link
          v-if="loggedIn"
          to="/"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Home</router-link
        >

        <router-link
          v-else
          to="/login"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Login</router-link
        >

        <router-link
          to="/register"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Register
        </router-link>

        <router-link
          to="/about"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >About</router-link
        >
      </div>
      <div v-if="loggedIn" class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5 space-x-3">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="../assets/user.png"
              alt="user"
            />
          </div>
          <div class="space-y-1">
            <div class="text-base font-medium leading-none text-white">
              {{ username }}
            </div>
          </div>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <button
            class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
            @click="signOut"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import AccountDropdown from "./AccountDropdown";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "AppBar",
  components: {
    AccountDropdown
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      this.$store.commit("user/setUser", {
        userId: user.userId,
        username: user.username,
        isLogin: user.isLogin
      });
    }
  },
  setup() {
    const isExpandMenu = ref(false);
    const loggedIn = ref(false);
    const username = ref("");
    const store = useStore();
    const router = useRouter();

    watchEffect(() => {
      loggedIn.value = store.state.user.isLogin;
      username.value = store.state.user.username;
    });

    function signOut() {
      console.log("Ouut");
      store.dispatch("user/signOut");
      isExpandMenu.value = false;
      loggedIn.value = false;
      router.replace("/login");
    }

    return {
      username,
      isExpandMenu,
      loggedIn,
      signOut
    };
  }
};
</script>
