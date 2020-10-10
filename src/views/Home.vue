<template>
  <div class="flex flex-wrap bg-gray-300 shadow-md overflow-hidden">
    <section class="w-full md:max-w-md">
      <SettingEditor
        :inputCode="inputCode"
        :resultHighlight="resultHighlight"
      />
    </section>
    <section class="px-8 pt-6 pb-8 mb-4 flex flex-grow">
      <FormTextArea
        name="InputCode"
        placeholder="Input Your Code"
        label="Input Code"
        :value="inputCode"
        v-model:inputText="inputCode"
        class="w-full"
      />
    </section>
    <section class="px-8 pt-6 pb-8 mb-4 w-full">
      <ResultCode :code="resultHighlight" />
    </section>
  </div>
</template>

<script>
import ResultCode from "../components/section/ResultCode";
import SettingEditor from "../components/section/SettingEditor";
import FormTextArea from "../components/FormTextArea";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { getHighlighted } from "../service/code";
import debounce from "debounce-fn";

export default {
  name: "Home",
  components: {
    SettingEditor,
    FormTextArea,
    ResultCode
  },
  setup() {
    const store = useStore();
    const inputCode = ref("");
    const dataCode = ref({});
    const resultHighlight = ref("");

    watch(
      inputCode,
      debounce(
        function(code) {
          if (store.state.setting.lang !== "") {
            resultHighlight.value = "";
            highlighter(code);
          }
        },
        { wait: 500 }
      )
    );

    async function highlighter(code) {
      try {
        store.dispatch("process/showProcess", null);
        dataCode.value = {
          lang: store.state.setting.lang,
          fileName: store.state.setting.filename,
          highlight: store.state.setting.highlight,
          twoslash: store.state.setting.twoslash,
          inputCode: code
        };

        const respon = await getHighlighted(dataCode.value);
        if (respon.success && !respon.error) {
          resultHighlight.value = respon.data;
        } else {
          throw new Error(respon.message);
        }
      } catch (error) {
        const notifErr = {
          isVisible: true,
          messabe: error.message || "Programming Language and Code is Required"
        };
        store.dispatch("notif/showNotification", notifErr);
        console.log(error);
      } finally {
        store.dispatch("process/hideProcess", null);
      }
    }
    return {
      inputCode,
      resultHighlight
    };
  }
};
</script>
