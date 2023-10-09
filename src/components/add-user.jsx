import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../services";

const AddUser = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const ref = collection(db, "users");
      await addDoc(ref, inputValues);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col justify-center items-center gap-6 my-32 max-w-lg"
        onSubmit={submitHandler}
      >
        <div className="flex justify-between items-center gap-8 w-full">
          <label className="whitespace-nowrap" htmlFor="first_name">
            First Name :
          </label>
          <input
            className="bg-slate-400 px-4 py-1 rounded-xl shadow-lg outline-none border-2 border-slate-600"
            type="text"
            required
            id="first_name"
            value={inputValues.first_name}
            onChange={(e) =>
              setInputValues({ ...inputValues, first_name: e.target.value })
            }
          />
        </div>
        <div className="flex justify-between items-center gap-8 w-full">
          <label className="whitespace-nowrap" htmlFor="last_name">
            Last Name :
          </label>
          <input
            className="bg-slate-400 px-4 py-1 rounded-xl shadow-lg outline-none border-2 border-slate-600"
            type="text"
            required
            id="last_name"
            value={inputValues.last_name}
            onChange={(e) =>
              setInputValues({ ...inputValues, last_name: e.target.value })
            }
          />
        </div>
        <div className="flex justify-between items-center gap-8 w-full">
          <label className="whitespace-nowrap" htmlFor="email">
            Email :
          </label>
          <input
            className="bg-slate-400 px-4 py-1 rounded-xl shadow-lg outline-none border-2 border-slate-600"
            type="email"
            required
            id="email"
            value={inputValues.email}
            onChange={(e) =>
              setInputValues({ ...inputValues, email: e.target.value })
            }
          />
        </div>
        <div className="flex justify-between items-center gap-8 w-full">
          <label className="whitespace-nowrap" htmlFor="age">
            Age :
          </label>
          <input
            className="bg-slate-400 px-4 py-1 rounded-xl shadow-lg outline-none border-2 border-slate-600"
            type="number"
            required
            id="age"
            value={inputValues.age}
            onChange={(e) =>
              setInputValues({ ...inputValues, age: e.target.value })
            }
          />
        </div>
        <div className="flex justify-start items-center gap-3 w-full mt-8">
          <button
            type="submit"
            className="w-fit text-white bg-green-500 px-6 py-2 rounded-xl shadow-lg hover:bg-green-700 duration-300"
          >
            Add User +
          </button>
          <Link
            to="/"
            className="w-fit text-white bg-orange-500 px-6 py-2 rounded-xl shadow-lg hover:bg-orange-700 duration-300"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
export default AddUser;
