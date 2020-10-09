<template>
  <div class="form-group">
    <label :for="name"> {{ label }}: </label>
    <textarea
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :name="name"
      :id="id"
      cols="30"
      rows="10"
      @input="$emit('update:inputText', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
import { form } from "../mixins/form";

export default {
  name: "FormTextArea",
  mixins: [form],
  props: {
    inputText: {
      type: String
    }
  }
};
</script>
