<template>
  <div class="form-group mb-4">
    <label :for="name">{{ label }}</label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :type="inputType"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :required="isRequired"
      :value="value"
      @input="valChange"
    />
  </div>
</template>

<script>
import { form } from "../mixins/form";

export default {
  name: "FormInput",
  mixins: [form],
  props: {
    inputType: {
      type: String,
      default: "text"
    },
    isRequired: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    function valChange(e) {
      if (props.inputType === "number") {
        context.emit("input-change", parseInt(e.target.value));
      } else {
        context.emit("input-change", e.target.value);
      }
    }
    return {
      valChange
    };
  }
};
</script>
