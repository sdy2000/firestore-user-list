import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../services";

const EditUser = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const ref = doc(db, "users", user_id);

    // getDoc(ref).then((doc) => {
    //   if (doc.empty) {
    //     setError("No Document To Load ...!");
    //     setIsLoading(false);
    //   } else {
    //     setUser({ id: doc.id, ...doc.data() });
    //     setIsLoading(false);
    //   }
    // });

    // Real Time
    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.empty) {
        setError("No Document To Load ...!");
        setIsLoading(false);
      } else {
        setUser({ id: snapshot.id, ...snapshot.data() });
        setIsLoading(false);
      }
    });

    return () => unsub();
  }, [user_id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const ref = doc(db, "users", user_id);
      await updateDoc(ref, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center py-32">
      {isLoading && <p>Is Loading ...</p>}
      {user && (
        <form
          className="flex flex-col justify-center items-center gap-6 max-w-lg"
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
              value={user?.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
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
              value={user?.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
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
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              value={user?.age}
              onChange={(e) => setUser({ ...user, age: e.target.value })}
            />
          </div>
          <div className="flex justify-start items-center gap-3 w-full mt-8">
            <button
              type="submit"
              className="w-fit text-white bg-green-500 px-6 py-2 rounded-xl shadow-lg hover:bg-green-700 duration-300"
            >
              Edit User
            </button>
            <Link
              to="/"
              className="w-fit text-white bg-orange-500 px-6 py-2 rounded-xl shadow-lg hover:bg-orange-700 duration-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
export default EditUser;
