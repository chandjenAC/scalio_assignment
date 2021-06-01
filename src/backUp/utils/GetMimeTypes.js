const uploads = [];

const fileSelector = document.getElementById("file-selector");
fileSelector.addEventListener("change", event => {
  console.time("FileOpen");
  const file = event.target.files[0];

  const filereader = new FileReader();

  filereader.onloadend = function(evt) {
    if (evt.target.readyState === FileReader.DONE) {
      const uint = new Uint8Array(evt.target.result);
      let bytes = [];
      uint.forEach(byte => {
        bytes.push(byte.toString(16));
      });
      const hex = bytes.join("").toUpperCase();

      uploads.push({
        filename: file.name,
        filetype: file.type ? file.type : "Unknown/Extension missing",
        binaryFileType: getMimetype(hex),
        hex: hex
      });
      render();
    }

    console.timeEnd("FileOpen");
  };

  const blob = file.slice(0, 4);
  filereader.readAsArrayBuffer(blob);
});

const render = () => {
  const container = document.getElementById("files");

  const uploadedFiles = uploads.map(file => {
    return `<div class=result><hr />
                    <span class=filename>Filename: <strong>${file.filename}</strong></span><br>
                    <span class=fileObject>File Object (Mime Type):<strong> ${file.filetype}</strong></span><br>
                    <span class=binaryObject>Binary (Mime Type):<strong> ${file.binaryFileType}</strong></span><br>
                    <span class=HexCode>Hex Code (Magic Number):<strong> <em>${file.hex}</strong></span></em>
                    </div>`;
  });

  container.innerHTML = uploadedFiles.join("");
};

const getMimetype = signature => {
  switch (signature) {
    case "D0CF11E0A1B11AE1":
      return "application/msword"; // this is for doc
    case "89504E47":
      return "image/png";
    case "47494638":
      return "image/gif";
    case "25504446":
      return "application/pdf";
    case "FFD8FFDB":
    case "FFD8FFE0":
    case "FFD8FFE1":
      return "image/jpeg";
    case "504B0304":
      return "application/zip"; // this is the same for docx
    case "504B34":
      return "application/vnd.ms-excel.sheet.macroEnabled.12";
    default:
      return "Unknown filetype";
  }
};
