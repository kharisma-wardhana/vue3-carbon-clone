<template>
  <div class="flex flex-col">
    <div class="flex-row">
      <div class="overflow-x-hidden" v-html="code"></div>
    </div>
    <div class="flex-row my-4 text-center">
      <button
        v-if="codeId"
        @click="removeCode"
        class="px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import { validator } from "../../utils";

export default {
  name: "ResultCode",
  props: {
    codeId: {
      type: String,
      default: null
    },
    code: {
      default: "",
      required: true,
      validator
    }
  },
  methods: {
    async removeCode() {
      const valConfirm = confirm("Are you sure to delete this code?");
      if (valConfirm && this.codeId) {
        await this.$store.dispatch("code/delCode", {
          userId: this.$store.state.user.userId,
          codeId: this.codeId
        });
        await this.$emit("deleted");
      }
    }
  }
};
</script>
