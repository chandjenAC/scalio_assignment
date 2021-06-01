import { env } from "../ENV";
import download from "downloadjs";

export const viewOrDownloadFile = ({ id, name, format, viewOrDownloadKey }) => {
  const yogiUserInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
  const usertoken = yogiUserInfo?.usertoken;
  const url = `${env.DOC_MGMT_SRVC_DOC_RETRIEVE_URL}${id}`;

  let postData = new FormData();
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader("usertoken", usertoken);
  xhr.responseType = viewOrDownloadKey === "view" ? "arraybuffer" : "blob";
  xhr.onload = function(e) {
    let blob = xhr.response;
    if (viewOrDownloadKey === "view") {
      //opens the document in new tab...have to specify type(format)..
      let file = new Blob([blob], { type: "application/pdf" });
      let fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } else if (viewOrDownloadKey === "download") {
      //downloads file
      download(blob, name, format);
    }
  };
  xhr.send(postData);

  return null;
};
