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
      @input="
        inputType === number
          ? $emit('update:inputData', parseInt($event.target.value))
          : $emit('update:inputData', $event.target.value)
      "
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
  }
};
</script>
