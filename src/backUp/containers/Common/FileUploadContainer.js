import React, { useState, useEffect } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import resource from "../../resources/common.json";
import { useSnackbar } from "notistack";
import UploadFiles from "../../components/common/UploadFiles";
import { env } from "../../ENV";
import { create_UUID, renderSnackbar } from "../../utils";
import axios from "axios";
import { createApiHeaders } from "../../utils/callApi";

// const acceptedFiles =
//   "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*,.csv";

// const sheetsRegex = /^([a-zA-Z0-9\s_\\.\-:])+(.(xlsx|xls|csv))$/;

const FileUploadContainer = ({ docMeta, acceptedFiles }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState({
    selectedFiles: undefined,
    progressInfos: [],
  });

  const [buttonDisable, setButtonDisable] = useState(true);

  if (!window["pdfjs-dist/build/pdf"]) {
    let script = document.createElement("script");
    let head = document.querySelector("head");
    script.src = "https://mozilla.github.io/pdf.js/build/pdf.js";
    head.appendChild(script);
  }

  useEffect(() => {
    const { selectedFiles } = state;
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file, index) => {
        if (index < 3 && file.type === "application/pdf") {
          const fileReader = new FileReader();
          fileReader.onload = function() {
            const pdfData = new Uint8Array(this.result);
            // Using DocumentInitParameters object to load binary data.
            let pdfjsLib = window["pdfjs-dist/build/pdf"];
            pdfjsLib.GlobalWorkerOptions.workerSrc =
              "//mozilla.github.io/pdf.js/build/pdf.worker.js";
            const loadingTask = pdfjsLib.getDocument({ data: pdfData });
            loadingTask.promise.then(
              (pdf) => {
                console.log("PDF loaded");

                // Fetch the first page
                const pageNumber = 1;
                pdf.getPage(pageNumber).then(function(page) {
                  console.log("Page loaded");

                  const scale = 1.5;
                  const viewport = page.getViewport({ scale: scale });

                  // Prepare canvas using PDF page dimensions
                  const canvas = document.getElementById(`canvas${index}`);
                  const context = canvas.getContext("2d");
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;

                  // Render PDF page into canvas context
                  const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                  };
                  const renderTask = page.render(renderContext);
                  renderTask.promise.then(function() {
                    console.log("Page rendered");
                  });
                });
              },
              (reason) => {
                // PDF loading error
                console.error(reason);
              }
            );
          };
          fileReader.readAsArrayBuffer(file);
        } else if (
          index < 3 &&
          ["image/svg+xml", "image/png", "image/jpeg"].includes(file.type)
        ) {
          let reader = new FileReader();

          reader.onloadend = () => {
            const image = document.getElementById(`image${index}`);
            image.setAttribute("src", reader.result);
          };

          reader.readAsDataURL(file);
        }
      });
    }
  }, [state.selectedFiles]);

  const selectFiles = (event) => {
    const target = event.target;
    setState((prevState) => ({
      ...prevState,
      progressInfos: [],
      selectedFiles: target.files,
    }));
    setButtonDisable(false);
  };

  const uploadFiles = () => {
    const selectedFiles = state.selectedFiles;

    let _progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }

    setState((prevState) => ({
      ...prevState,
      progressInfos: _progressInfos,
      message: [],
    }));

    for (let i = 0; i < selectedFiles.length; i++) {
      upload(i, selectedFiles[i], _progressInfos);
    }

    setButtonDisable(true);
  };

  const upload = (idx, file, _progressInfos) => {
    callDocMgmtSrvc(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setState((prevState) => ({
        ...prevState,
        progressInfos: _progressInfos,
      }));
    })
      .then((response) => {
        renderSnackbar(enqueueSnackbar, response.data);
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        const variant = "error";
        enqueueSnackbar(
          getResourceValueByKey(
            resource,
            "COULD_NOT_UPLOAD ",
            "Could not upload "
          ) + file.name,
          { variant }
        );
        setState((prevState) => ({
          ...prevState,
          progressInfos: _progressInfos,
        }));
      });
  };

  const callDocMgmtSrvc = (file, onUploadProgress) => {
    const url = env.DOC_MGMT_SRVC_DOC_UPLOAD_URL;
    let yogiUserInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
    let formData = new FormData();
    const docId = create_UUID();

    const meta = {
      ...docMeta,
      docId: docId, //generate UUID
      // docReference: file.name.toUpperCase(),
      docReference: file.name, //same as file name
      docName: file.name,
      docType: file.type || "CSV",
      docSize: file.size,
      starfleet: yogiUserInfo.loginProfile.member.starfleetId,
      avatarid: yogiUserInfo.loginProfile.member.topId, // get from end point registry
      userid: yogiUserInfo.loginProfile.userProfile.emailId,
      linkedTxnId: docId, // same as docId
    };

    formData.append("document", file);
    formData.append("docmeta", JSON.stringify(meta));

    return axios.post(url, formData, {
      headers: createApiHeaders(),
      onUploadProgress,
    });
  };

  const { selectedFiles, progressInfos } = state;

  return (
    <UploadFiles
      resource={resource}
      acceptedFiles={acceptedFiles}
      selectedFiles={selectedFiles}
      progressInfos={progressInfos}
      selectFiles={selectFiles}
      uploadFiles={uploadFiles}
      buttonDisable={buttonDisable}
    />
  );
};

export default FileUploadContainer;
