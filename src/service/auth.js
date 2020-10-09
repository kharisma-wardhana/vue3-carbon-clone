import { ENDPOINT_SIGNIN, ENDPOINT_SIGNUP } from "../constants";
import { sendData } from "../utils";

async function signIn(username) {
  const respon = await sendData(ENDPOINT_SIGNIN, {
    name: username
  });

  return respon;
}

async function signUp(username) {
  const respon = await sendData(ENDPOINT_SIGNUP, {
    name: username
  });
  return respon;
}

export { signIn, signUp };
