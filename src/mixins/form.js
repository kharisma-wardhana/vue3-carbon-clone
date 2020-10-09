export const form = {
  props: {
    id: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      required: true,
      default: ""
    },
    name: {
      type: String,
      required: true,
      default: "empty"
    },
    placeholder: {
      type: String,
      required: true,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    }
  }
};
