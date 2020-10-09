<template>
  <div class="flex flex-wrap bg-gray-300 shadow-md overflow-hidden">
    <section class="setting md:max-w-xs">
      <SettingEditor
        :inputCode="inputCode"
        :resultHighlight="resultHighlight"
      />
    </section>
    <section class="rounded px-2 pt-6 pb-8 mb-4">
      <FormTextArea
        name="InputCode"
        placeholder="Input Your Code"
        label="Input Code"
        :value="inputCode"
        v-model:inputText="inputCode"
      />
    </section>
    <section class="rounded px-5 pt-6 pb-8 mb-4">
      <!-- <ResultCode
        :code="resultHighlight"
        :lang="this.$store.state.setting.lang"
      /> -->
      <!-- <data-code
        v-show="resultHighlight.length > 0"
        :code="resultHighlight"
        :lang="this.$store.state.setting.lang"
        :is-highlighted="1"
      /> -->
      <div v-html="resultHighlight" />
      <!-- <button @click="removeCode">
        Remove
      </button> -->
    </section>
  </div>
</template>

<script>
// import ResultCode from "../components/section/ResultCode";
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
    FormTextArea
    // ResultCode
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
          resultHighlight.value = "";
          highlighter(code);
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
          messabe: error.message || "Bahasa Pemrograman dan Kode wajib diisi"
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
