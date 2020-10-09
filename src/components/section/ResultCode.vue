<template>
  <div class="bg-gray-700">
    <data-code
      v-show="code.length > 0"
      :code="code"
      :lang="lang"
      :is-highlighted="isHighlight"
    />
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
    },
    lang: {
      default: "",
      required: true,
      validator
    },
    isHighlight: {
      type: Number,
      default: 1
    }
  },
  methods: {
    async removeCode() {
      const valConfirm = confirm("Are you sure to delete this code?");
      if (valConfirm && this.codeId) {
        await this.$store.dispatch("code/delCode", {
          userId: this.$store.state.pengguna.userId,
          codeId: this.codeId
        });
        await this.$emit("deleted");
      }
    }
  }
};
</script>
