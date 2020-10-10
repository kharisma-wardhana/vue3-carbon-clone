<template>
  <div class="flex justify-center md:mt-24">
    <form
      class="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="userSignUp"
    >
      <h2 class="text-center font-semibold text-teal-700">Register</h2>
      <FormInput
        name="username"
        placeholder="Username"
        label="Username"
        :isRequired="true"
        :value="username"
        v-model:inputData="username"
      />
      <div class="container text-center mb-5">
        <Button btnName="Register" />
      </div>
      <span>
        Already have account,
        <router-link to="/login" class="text-teal-700 hover:text-teal-400">
          Login
        </router-link>
      </span>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

export default {
  name: "Register",
  components: {
    Button,
    FormInput
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");

    function userSignUp() {
      store.dispatch("user/signUp", { username: username.value });
      router.replace("/");
    }

    return {
      username,
      userSignUp
    };
  }
};
</script>
