import Chance from "chance";
import axios from "axios";
import { env } from "../ENV";
import { createApiHeaders } from "./callApi";

export const uploadFile = async (
  file,
  docId,
  setDocumentState,
  setDisableButton,
  docRef
) => {
  const url = env.DOC_MGMT_SRVC_DOC_UPLOAD_URL;
  let docMeta;
  let chance = new Chance();
  let randomCompanyName = chance.company();
  let yogiUserInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));

  // let docMeta = JSON.parse(localStorage.getItem("docMeta"));
  if (docRef === "logo") {
    let token = JSON.parse(localStorage.getItem("nodeDescriptions"));
    const tokenName = token.avatar.tokenName.replace(/ /g, "");
    docMeta = {
      docId: docId,
      docReference: `LOGO_FOR_${tokenName}`,
      docName: `LOGO_FOR_${tokenName}`,
      docType: file.type,
      docSize: file.size,
      starfleet: yogiUserInfo.loginProfile.member.starfleetId,
      avatarid: token.avatar.id,
      userid: yogiUserInfo.loginProfile.userProfile.emailId,
      linkedTxnId: token.avatar.id,
      linkedTxnType: "LOGO",
      category: "IMAGES",
      event: "ATTACH_AVATAR_LOGO",
    };
  } else {
    docMeta = {
      docId: docId,
      // docReference: file.name.toUpperCase(),
      docReference: `Invoice-${randomCompanyName}`, //inputted by the user
      docName: file.name,
      docType: file.type,
      docSize: file.size,
      starfleet: yogiUserInfo.loginProfile.member.starfleetId,
      avatarid: yogiUserInfo.loginProfile.member.topId, // check whether topId is required here
      userid: yogiUserInfo.loginProfile.userProfile.emailId,
      linkedTxnId: "907e4bc5-9694-4374-acc4-d018c0229e01",
      linkedTxnType: "DocToken",
      category: "T-DOCS",
      event: "DOCUMENT_MGMT_SERVICE.ATTACH_TOKEN_DOCUMENT",
    };
  }

  const formData = new FormData();
  formData.append("document", file);
  formData.append("docmeta", JSON.stringify(docMeta));

  setDisableButton(true);
  let response;
  await axios
    .post(url, formData, {
      headers: createApiHeaders(),
      onUploadProgress: (ProgressEvent) => {
        setDocumentState((prevValues) => ({
          ...prevValues,
          loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
        }));
      },
    })
    .then((res) => {
      response = res;
    });

  return response.data;
};
