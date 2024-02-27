import { useState, useRef } from "react";
import { sha256 } from "js-sha256";

const ViewPage = () => {
  const fileInputField = useRef(null);
  const [file, setFile] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [verify, verified] = useState(null);
  const formRef = useRef(null);
  const [qrData, setQrData] = useState({});

  const handleSubmit = async (e) => {
    let formData = null;
    if (e) {
      e.preventDefault();
      formData = new FormData(e.target);
    } else {
      formData = new FormData(formRef.current);
    }
    const fetchOptions = {
      method: "post",
      body: formData,
    };
    try {
      const res = await (
        await fetch("http://api.qrserver.com/v1/read-qr-code/", fetchOptions)
      ).json();
      const body = JSON.parse(res[0].symbol[0].data);
      if (body == null) throw Error("Not QR");
      setQrData(body);
      const hash = sha256(JSON.stringify(body))
      const response = await fetch("/api/verifydegree",{
        method: "POST",
        headers: {
          'Content-Type': 'text/plain'
        },
        body: hash ,
      })
      console.log(response);
      const rest = await response.json();
      console.log(rest);
      if (response.status === 400){
        verified(false);
      } else {
        verified(true);
      }
      setFile(null);
      
    } catch (e) {
      console.error(e);
      setFile(null);
      alert("Failed to read QR code");
    }
  };

  const handleFileChange = async (e) => {
    let file = null;
    if (e.target.files && e.target.files.length > 0) {
      file = e.target.files[0];
      if (file.size > 1048576) {
        setErrMsg("Max filesize 1MB");
        return;
      }
      setFile(file);
      setErrMsg("");
    } else {
      setFile(null);
      return;
    }
    handleSubmit();
  };

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col w-full max-w-[1200px]">
        <form
          className="flex flex-col items-center gap-4 p-4"
          onSubmit={handleSubmit}
          ref={formRef}
          encType="multipart/form-data"
        >
          Choose QR code image to read/scan:
          <input type="hidden" name="MAX_FILE_SIZE" value="1048576" />
          <label
            className={
              "flex items-center justify-center rounded-md h-24 w-52 border-2 border-dashed " +
              (file == null
                ? "cursor-pointer border-indigo-400 text-indigo-600"
                : "cursor-wait border-gray-500 text-gray-500")
            }
            htmlFor="file"
          >
            {file == null ? "Upload QR" : "Uploading..."}
          </label>
          <input
            id="file"
            type="file"
            name="file"
            ref={fileInputField}
            title=""
            value=""
            className="hidden"
            onChange={handleFileChange}
            disabled={file != null}
          />
          <label className="text-red-400 text-sm text-center">{errMsg}</label>
        </form>
        {verify === false && <p> ❌ Degree not verified</p>}

        {verify === true && (
          <>
            {qrData ? (
              <pre>
                {JSON.stringify(qrData, null, 4)}
                <br />
                <br />
                Hash: {sha256(JSON.stringify(qrData))}  
                <p> ✅ Degree verified</p>
              </pre>
            ) : (
              <p>No QR data found</p> 
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPage;
