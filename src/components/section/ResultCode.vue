<template>
  <div class="bg-gray-700">
    <div class="overflow-x-hidden" v-html="code"></div>
    <button v-if="codeId" @click="removeCode">
      Remove
    </button>
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
