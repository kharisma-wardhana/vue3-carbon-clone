<template>
  <div class="container">
    <form>
      <FormInput
        inputType="number"
        name="max-data"
        placeholder="Input Limit Data"
        label="Limit"
      />
      <Button btnName="Next" />
    </form>
  </div>
</template>

<script>
import FormInput from "../components/FormInput";
import Button from "../components/Button";
export default {
  name: "Repo",
  components: {
    FormInput,
    Button
  }
};
</script>
