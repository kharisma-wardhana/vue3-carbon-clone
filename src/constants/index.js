const URL_API = "https://highlight-code-api.vercel.app/api";
const ENDPOINT_SIGNIN = `${URL_API}/user/login`;
const ENDPOINT_SIGNUP = `${URL_API}/user/register`;
const ENDPOINT_LIST_CODE = `${URL_API}/code/list`;
const ENDPOINT_STORE_CDOE = `${URL_API}/code/store`;
const ENDPOINT_EDIT_CODE = `${URL_API}/code/edit`;
const ENDPOINT_DEL_CODE = `${URL_API}/code/delete`;
const ENDPOINT_OPTIONS = `${URL_API}/options`;
const STRINGIFY_OPTION = {
  skipEmptyString: true,
  skipNull: true
};

export {
  URL_API,
  ENDPOINT_SIGNIN,
  ENDPOINT_SIGNUP,
  ENDPOINT_LIST_CODE,
  ENDPOINT_STORE_CDOE,
  ENDPOINT_EDIT_CODE,
  ENDPOINT_DEL_CODE,
  ENDPOINT_OPTIONS,
  STRINGIFY_OPTION
};
