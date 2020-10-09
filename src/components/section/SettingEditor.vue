<template>
  <div class="rounded px-8 pt-6 pb-8 mb-4">
    <FormDropdown
      label="Programming Language"
      name="ProgramLang"
      id="ProgramLang"
      placeholder="Select Language"
      :listOption="listProgramLang"
      :value="setting.lang"
      v-model:inputData="setting.lang"
    />
    <FormDropdown
      v-if="setting.lang === 'typescript' || setting.lang === 'json'"
      label="Twoslash"
      name="twoslash"
      id="twoslash"
      placeholder="Select Twoslash"
      :value="setting.twoslash"
      :listOption="listTwoslash"
      v-model:inputData="setting.twoslash"
    />
    <FormInput
      label="File Name"
      name="File Name"
      id="File Name"
      placeholder="Input File Name"
      :value="setting.filename"
      v-model:input-change="setting.filename"
    />
    <FormInput
      label="Highlight line"
      name="Highlight line"
      id="Highlight line"
      placeholder="Input Highlight line"
      inputType="number"
      :value="setting.highlight"
      v-model:input-change="setting.highlight"
    />
    <div class="flex flex-wrap">
      <Button
        btnName="Reset"
        @action="resetDataCode"
        btnType="button"
        class="mr-3"
      />
      <Button
        v-if="$store.state.user.userId"
        btnName="Save"
        @action="saveCode"
        btnType="button"
        class="mr-3"
      />
      <Button
        v-if="resultHighlight && resultHighlight.length > 0"
        btnName="Download"
        @action="downloadCode"
        btnType="button"
      />
    </div>
  </div>
</template>

<script>
import FormInput from "../FormInput";
import FormDropdown from "../FormDropdown";
import Button from "../Button";
import { getOptions, validator, downloadFile } from "../../utils";
import { STRINGIFY_OPTION, URL_API } from "../../constants";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { stringifyUrl } from "query-string";
import cleanDeep from "clean-deep";

export default {
  name: "SettingEditor",
  props: {
    inputCode: {
      required: true,
      default: ""
    },
    resultHighlight: {
      required: true,
      validator
    }
  },
  components: {
    FormDropdown,
    FormInput,
    Button
  },
  created() {
    this.getListProgramLang();
  },
  setup(props) {
    const store = useStore();
    const listProgramLang = ref([]);
    const listTwoslash = ref(["twoslash", "tsconfig"]);
    const setting = ref({
      lang: null,
      twoslash: null,
      filename: null,
      highlight: null
    });

    watchEffect(async () => {
      if (setting.value.lang !== null) {
        console.log(setting.value);
        await store.dispatch("setting/settingCode", { setting: setting.value });
      }
    });

    async function getListProgramLang() {
      try {
        const respon = await getOptions();
        if (respon.success && !respon.error) {
          listProgramLang.value = respon.data.languages;
        }
      } catch (err) {
        const dataNotifErr = {
          isVisible: true,
          message: err.message
        };
        store.dispatch("notif/showNotification", dataNotifErr);
        console.log(err);
      }
    }

    async function saveCode() {
      try {
        const content = cleanDeep({
          code: props.inputCode,
          lang: store.state.setting.lang,
          highlight: store.state.setting.highlight,
          fileName: store.state.setting.filename,
          twoslash: store.state.setting.twoslash
        });
        await store.dispatch("code/saveCode", {
          userId: store.state.user.userId,
          contentData: content
        });
      } catch (err) {
        const notifErr = {
          isVisible: true,
          message: err.message || "Failed to save"
        };
        store.dispatch("notif/showNotification", notifErr);
        console.log(err);
      }
    }

    async function downloadCode() {
      console.log("download");
      try {
        store.dispatch("process/showProcess", null);
        const objURL = {
          url: URL_API,
          query: {
            lang: store.state.setting.lang,
            fileName: store.state.setting.filename,
            highlight: store.state.setting.highlight,
            twoslash: store.state.setting.twoslash,
            download: 1
          }
        };
        const url = stringifyUrl(objURL, STRINGIFY_OPTION);
        await downloadFile(url, {
          code: props.inputCode
        });
      } catch (err) {
        const notifErr = {
          isVisible: true,
          message: err.message || "Failed to download"
        };
        store.dispatch("notif/showNotification", notifErr);
        console.log(err);
      } finally {
        store.dispatch("process/hideProcess", null);
      }
    }

    function resetDataCode() {
      try {
        store.dispatch("process/showProcess", null);
        store.dispatch("setting/resetCode");
      } catch (err) {
        const notifErr = {
          isVisible: true,
          message: err.message || "Failed to download"
        };
        store.dispatch("notif/showNotification", notifErr);
        console.log(err);
      } finally {
        store.dispatch("process/hideProcess", null);
      }
    }

    return {
      listProgramLang,
      listTwoslash,
      setting,
      getListProgramLang,
      saveCode,
      downloadCode,
      resetDataCode
    };
  }
};
</script>
