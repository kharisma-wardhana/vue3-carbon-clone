import { saveAs } from "file-saver";
import { ENDPOINT_OPTIONS } from "../constants";

export async function sendData(url, data) {
  const respon = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(_ => (_.ok ? _.json() : null))
    .catch(err => console.log(err));
  return respon;
}

export async function downloadFile(url, data) {
  const respon = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(_ => (_.ok ? _.blob() : null))
    .then(blob =>
      blob ? saveAs(blob, `${new Date().getTime()}-kode.png`) : null
    )
    .catch(err => console.log(err));

  return respon;
}

export async function getOptions() {
  return fetch(ENDPOINT_OPTIONS)
    .then(_ => (_.ok ? _.json() : null))
    .catch(err => console.log(err));
}

export function validator(val) {
  return typeof val === "string" || val === null;
}
