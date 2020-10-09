<template>
  <div class="flex justify-center md:mt-24">
    <form
      class="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="userLogin"
    >
      <h2 class="text-center font-semibold text-teal-700">Login</h2>
      <FormInput
        name="username"
        placeholder="Input Username"
        label="Username"
        :isRequired="true"
        @input-change="getUsername"
      />
      <div class="container text-center mb-5">
        <Button
          btnName="Login"
          :isDisabled="this.$store.state.notif.isVisible"
        />
      </div>

      <span>
        Don't have account?
        <router-link to="/register" class="text-teal-700 hover:text-teal-400">
          Register
        </router-link>
      </span>
    </form>
  </div>
</template>

<script>
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  components: {
    Button,
    FormInput
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");

    async function userLogin() {
      await store.dispatch("user/login", { username: username.value });
      const isLogin = store.state.user.isLogin;
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(store.state.user));
        router.replace("/");
      }
    }

    function getUsername(val) {
      username.value = val;
    }

    return {
      username,
      userLogin,
      getUsername
    };
  }
};
</script>
