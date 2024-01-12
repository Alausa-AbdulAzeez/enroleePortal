import React from "react";

const Step2 = ({ handleNext, handlePrev }) => {
  return (
    <form
      className=" flex flex-col bg-white mx-32 p-5 rounded-sm overflow-y-auto mb-[50px] gap-[20px]"
      // onSubmit={handleCreateDependant}
    >
      <div className="flex justify-between">
        <h1 className="font-bold">Past medical history</h1>
        <h1 className="font-extrabold text-blue-500">Step 2/4</h1>
      </div>

      <div className="flex justify-end gap-[20px] mt-[20px]">
        <button
          type="submit"
          onClick={() => handlePrev("enroleesDetails")}
          className="hover:bg-gray-300 border hover:text-white hover:border-none border-gray-500  text-gray-500 py-2 px-4 rounded-md h-[40px] self-end w-[120px]"
        >
          Previous
        </button>

        <button
          type="submit"
          className="hover:bg-gray-600   bg-gray-400 text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px]"
          onClick={() => handleNext("pastMedicalHistory")}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
