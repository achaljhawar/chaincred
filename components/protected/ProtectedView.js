import { useState } from "react";
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

const AddButton = ({ setSem }) => {
  return (
    <button
      className="flex items-center gap-2 px-2 py-2 self-center font-sans text-md text-center text-gray-900 transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20"
      type="button"
      onClick={(e) => {
        setSem((prev) => [...prev, { "": "" }]);
      }}
    >
      Add course
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 50 50"
      >
        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
      </svg>
    </button>
  );
};

const ProtectedView = () => {
  const [studentName, setStudentName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [institutionId, setInstitutionId] = useState("");
  const [sem11, setSem11] = useState([]);

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col w-full max-w-[1200px] pt-8 items-center ">
        <form className="flex flex-col gap-4 items-center">
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
          <div className="flex flex-col pt-4 self-stretch">
            <Separator label="1-1" />
            <div className="flex flex-col gap-2">
              {sem11.map((ele, i) => (
                <div className="flex gap-4" key={i}>
                  <FormInput
                    field="Course ID"
                    value={Object.keys(ele)[0]}
                    setter={(newVal) => {
                      setSem11((prev) => {
                        const _new = prev.slice();
                        const _obj = {};
                        _obj[newVal] = Object.values(prev[i])[0];
                        _new[i] = _obj;
                        return _new;
                      });
                    }}
                  />
                  <FormInput
                    field="grade"
                    value={Object.values(sem11[i])[0]}
                    setter={(newVal) => {
                      setSem11((prev) => {
                        const _new = prev.slice();
                        const _obj = {};
                        _obj[Object.keys(prev[i])[0]] = newVal;
                        _new[i] = _obj;
                        return _new;
                      });
                    }}
                  />
                </div>
              ))}
              <AddButton sem={sem11} setSem={setSem11} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProtectedView;
