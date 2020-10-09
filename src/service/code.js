import {
  URL_API,
  ENDPOINT_LIST_CODE,
  ENDPOINT_STORE_CDOE,
  ENDPOINT_EDIT_CODE,
  ENDPOINT_DEL_CODE,
  STRINGIFY_OPTION
} from "../constants";
import { sendData } from "../utils";
import { stringifyUrl } from "query-string";

async function getAllCode(userId, filter) {
  const objURL = {
    url: ENDPOINT_LIST_CODE,
    query: {
      page: filter.page,
      limit: filter.limit,
      sortBy: filter.sortBy,
      sort: filter.sort,
      highlighted: filter.highlight
    }
  };
  const url = stringifyUrl(objURL, STRINGIFY_OPTION);

  return await sendData(url, { user: userId });
}

async function saveCode(userId, contentData) {
  const data = {
    user: userId,
    content: {
      code: contentData.code,
      lang: contentData.programLang,
      highlight: contentData.highlight,
      fileName: contentData.fileName,
      twoslash: contentData.twoslash
    }
  };

  return await sendData(ENDPOINT_STORE_CDOE, data);
}

async function editCode(codeId, userId, contentData) {
  const data = {
    id: codeId,
    user: userId,
    content: {
      code: contentData.code,
      lang: contentData.programLang,
      highlight: contentData.highlight,
      fileName: contentData.fileName,
      twoslash: contentData.twoslash
    }
  };

  const respon = await sendData(ENDPOINT_EDIT_CODE, data);

  return respon;
}

async function delCode(codeId, userId) {
  const data = {
    id: codeId,
    user: userId
  };

  const respon = await sendData(ENDPOINT_DEL_CODE, data);

  return respon;
}

async function getHighlighted(dataCode, download) {
  const objURL = {
    url: URL_API,
    query: {
      lang: dataCode.lang,
      fileName: dataCode.fileName,
      highlight: dataCode.highlight,
      twoslash: dataCode.selectedSlash,
      download
    }
  }
  const url = stringifyUrl(objURL, STRINGIFY_OPTION)

  return await sendData(url, { code: dataCode.inputCode })
}

export { getAllCode, saveCode, editCode, delCode, getHighlighted };
