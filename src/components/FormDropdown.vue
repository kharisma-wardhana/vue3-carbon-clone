<template>
  <div class="form-group mb-3">
    <label :for="name">{{ label }}</label>
    <select
      :id="name"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      @change="$emit('update:inputData', $event.target.value)"
    >
      <option value="">Pilih</option>
      <option
        v-for="(lang, i) in listOption"
        :key="i"
        :value="valOption(lang)"
        :selected="selectedOption(lang)"
      >
        {{ displayOption(lang) }}
      </option>
    </select>
  </div>
</template>

<script>
import { computed } from "vue";
import { form } from "../mixins/form";
export default {
  name: "FormDropdown",
  mixins: [form],
  props: {
    listOption: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    isObject: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log(`check log data ${this.listOption}`);
  },
  setup(props, context) {
    const selectedOption = computed(function() {
      return option => {
        if (props.isObject) {
          return props.value === option.value;
        }
        return props.value === option;
      };
    });

    const displayOption = computed(function() {
      return option => {
        if (props.isObject) {
          return option.text;
        }
        return option;
      };
    });

    const valOption = computed(function() {
      return option => {
        if (props.isObject) {
          return option.value;
        }
        return option;
      };
    });

    function valChange(e) {
      if (e.target.value && e.target.value.length > 0) {
        context.emit("update:input", e.target.value);
      } else {
        context.emit("update:input", null);
      }
    }
    return {
      selectedOption,
      displayOption,
      valOption,
      valChange
    };
  }
};
</script>
