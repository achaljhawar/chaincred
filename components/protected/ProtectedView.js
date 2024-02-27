import { useState } from "react";
import { sha256 } from "js-sha256";
import FormInput from "../FormInput";

const Separator = ({ label }) => {
  return (
    <div className="inline-flex items-center w-full justify-center">
      <hr className="w-full h-0.5 my-4 bg-gray-200 border-0" />
      <span className="absolute px-2 text-sm text-gray-600 -translate-x-1/2 bg-white left-1/2">
        {label}
      </span>
    </div>
  );
};

const AddButton = ({ onClick }) => {
  return (
    <button
      className="flex border border-gray-300 items-center gap-2 px-2 py-2 font-sans text-xs mt-2 text-center text-gray-900 transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20"
      type="button"
      onClick={onClick}
    >
      Add course
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-plus"
        viewBox="0 0 16 16"
      >
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
      </svg>
    </button>
  );
};

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className="flex border border-gray-300 items-center gap-2 px-2 py-2 self-center font-sans text-md text-center text-gray-900 transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20"
      type="button"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash"
        viewBox="0 0 16 16"
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
      </svg>
    </button>
  );
};

const ProtectedView = () => {
  const [studentName, setStudentName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [institutionId, setInstitutionId] = useState("");
  const [sems, setSems] = useState({
    11: [],
    12: [],
    21: [],
    22: [],
    31: [],
    32: [],
    41: [],
    42: [],
    51: [],
    52: [],
  });
  const [qrLink, setQrLink] = useState("");
  const [jsonString, setJsonString] = useState("");
  const [hash, setHash] = useState("");

  const getSemsSetter = (sem, courseIndex, field) => {
    return (newVal) => {
      setSems((prev) => {
        const _sems = { ...prev };
        _sems[sem][courseIndex][field] = newVal;
        return _sems;
      });
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.stringify({
      studentName,
      studentId,
      institutionName,
      institutionId,
      sems,
    });
    setJsonString(data);
    const size = "1000x1000";
    const baseURL = "http://api.qrserver.com/v1/create-qr-code/";
    const url = `${baseURL}?data=${encodeURIComponent(
      jsonString
    )}&size=${size}`;
    setQrLink(url);
    setHash(sha256(data));
    console.log("Submitted. ", url);
  };

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col w-full max-w-[1200px] items-center">
        <h2 className="text-2xl text-gray-700 text-center py-4">
          Enter graduation details
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center py-2"
        >
          <div className="flex gap-4 items-center">
            <FormInput
              field="Student name"
              value={studentName}
              setter={setStudentName}
            />
            <FormInput
              field="Student id"
              value={studentId}
              setter={setStudentId}
            />
          </div>
          <div className="flex gap-4 items-center justify-center">
            <FormInput
              field="Institution name"
              value={institutionName}
              setter={setInstitutionName}
            />
            <FormInput
              field="Institution id"
              value={institutionId}
              setter={setInstitutionId}
            />
          </div>
          <div className="flex flex-col self-stretch w-[720px]">
            {Object.keys(sems).map((sem) => (
              <>
                <Separator label={`${sem[0]}-${sem[1]}`} key={"sep" + sem} />
                <div className="flex flex-col items-end" key={"div" + sem}>
                  {sems[sem].map((_course, courseIndex) => (
                    <div
                      className="flex gap-4 self-stretch py-2"
                      key={courseIndex}
                    >
                      <FormInput
                        field="Course ID"
                        value={sems[sem][courseIndex]["id"]}
                        setter={getSemsSetter(sem, courseIndex, "id")}
                        key={"id" + courseIndex}
                      />
                      <FormInput
                        field="Grade"
                        value={sems[sem][courseIndex]["grade"]}
                        setter={getSemsSetter(sem, courseIndex, "grade")}
                        key={"grade" + courseIndex}
                      />
                      <FormInput
                        field="Credits"
                        value={sems[sem][courseIndex]["credits"]}
                        setter={getSemsSetter(sem, courseIndex, "credits")}
                        key={"credits" + courseIndex}
                      />
                      <DeleteButton
                        onClick={() =>
                          setSems((prev) => {
                            const _sems = { ...prev };
                            _sems[sem].splice(courseIndex, 1);
                            return _sems;
                          })
                        }
                      />
                    </div>
                  ))}
                  <AddButton
                    onClick={() =>
                      setSems((prev) => {
                        const _sems = { ...prev };
                        _sems[sem].push({ id: "", grade: "", credits: "" });
                        return _sems;
                      })
                    }
                    key={"add" + sem}
                  />
                </div>
              </>
            ))}
          </div>
          <input
            type="submit"
            value="Submit"
            className="py-2 px-3 bg-indigo-400 cursor-pointer rounded-md text-white text-md"
          />
        </form>
        <div className="flex flex-col gap-4 pt-2 pb-8">
          <button
            className="flex border self-center disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400 border-black hover:text-indigo-600 hover:border-indigo-600 transition-colors py-2 px-4 rounded-lg items-center cursor-pointer"
            disabled={qrLink.length == 0}
            onClick={() => {
              window.open(qrLink, "_blank");
              setQrLink("");
              setHash("");
            }}
          >
            Download QR
          </button>
          {hash.length ? "HASH: " + hash : <></>}
        </div>
      </div>
    </div>
  );
};

export default ProtectedView;
