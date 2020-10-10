<template>
  <div class="flex flex-row">
    <FormInput
      name="limit"
      label="Data"
      inputType="number"
      :value="filter.limit"
      v-model:inputData="filter.limit"
      class="mr-4"
    />
    <FormDropdown
      name="sortby"
      label="Sort By"
      :listOption="listSortBy"
      :isObject="true"
      :value="filter.sortBy"
      v-model:inputData="filter.sortBy"
      class="mr-4"
    />
    <FormDropdown
      name="sort"
      label="Sort"
      :listOption="listSort"
      :isObject="true"
      :value="filter.sort"
      v-model:inputData="filter.sort"
    />
  </div>
  <div class="flex flex-row flex-no-wrap">
    <button
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150 mr-4"
      :disabled="filter.page === 1"
      @click="prevPage"
    >
      <span class="w-full text-center">Prev</span>
    </button>
    <button
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150 mr-4"
      @click="nextPage"
    >
      <span class="w-full text-center">Next</span>
    </button>
  </div>
  <div class="flex flex-wrap py-8">
    <div class="flex-row">
      <ResultCode
        v-for="itemCode in $store.state.code.listCode"
        :key="itemCode.id"
        :codeId="itemCode.id"
        :code="itemCode.code"
        class="px-4"
      />
    </div>
  </div>
</template>

<script>
import FormInput from "../FormInput";
import FormDropdown from "../FormDropdown";
import ResultCode from "./ResultCode";

import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  name: "ListCode",
  components: {
    FormInput,
    FormDropdown,
    ResultCode
  },
  async created() {
    await this.getListCode();
  },
  setup() {
    const store = useStore();

    const filter = ref({
      page: 1,
      limit: 5,
      sortBy: "createdAt",
      sort: "DESC"
    });

    const listSortBy = ref([
      { value: "fileName", text: "File Name" },
      { value: "lang", text: "Programming Language" },
      { value: "createdAt", text: "Created At" }
    ]);
    const listSort = ref([]);

    watchEffect(() => {
      if (filter.value.sortBy === "createdAt") {
        return (listSort.value = [
          { value: "ASC", text: "New" },
          { value: "DESC", text: "Old" }
        ]);
      }
      return (listSort.value = [
        { value: "ASC", text: "A-Z" },
        { value: "DESC", text: "Z-A" }
      ]);
    });

    async function getListCode() {
      const user = await JSON.parse(localStorage.getItem("user"));
      await store.dispatch("code/getAllCode", {
        userId: user.userId,
        filter: {
          page: filter.value.page,
          limit: filter.value.limit,
          sortBy: filter.value.sortBy,
          sort: filter.value.sort,
          highlighted: true
        }
      });
    }

    function prevPage() {
      if (filter.value.page - 1 < 1) {
        return;
      }
      filter.value.page -= 1;
    }

    function nextPage() {
      filter.value.page += 1;
    }

    return {
      filter,
      listSort,
      listSortBy,
      getListCode,
      prevPage,
      nextPage
    };
  }
};
</script>
