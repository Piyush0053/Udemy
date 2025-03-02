import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });

  function handleUpload() {
    if (!file) {
      setMsg("file error upload");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);

    setMsg("Uploading...");

    axios
      .post("http://httpbin.org/post", fd, {
        onUploadProgress: (ProgressEvent) => {
          console.log(ProgressEvent.progress * 100);
        },
        headers: {
          "Custom-header": "value",
        },
      })

      .then((res) => {
        setMsg("Upload Complete");
        console.log(res.data);
      })
      .catch((err) => {
        setMsg("Upload failed");
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Uploading files in the react</h1>

      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        type="file"
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;
