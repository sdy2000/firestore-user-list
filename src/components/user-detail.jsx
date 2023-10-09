import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services";
import { Link, useParams } from "react-router-dom";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [isLoadingSingle, setIsLoadingSingle] = useState(false);
  const [errorSingle, setErrorSingle] = useState(false);
  const { user_id } = useParams();

  useEffect(() => {
    setIsLoadingSingle(true);

    const ref = doc(db, "users", user_id);

    getDoc(ref).then((doc) => {
      if (doc.empty) {
        setErrorSingle("No Document To Load ...!");
        setIsLoadingSingle(false);
      } else {
        setUser({ id: doc.id, ...doc.data() });
        setIsLoadingSingle(false);
      }
    });

    return () => {
      setUser(null);
      setIsLoadingSingle(true);
    };
  }, [user_id]);

  return (
    <div className="flex flex-col gap-10 w-full mx-auto my-20 max-w-lg">
      {isLoadingSingle && <p className="text-2xl">Is Loading User ...</p>}
      {user && (
        <dl className="max-w-lg w-full">
          <div className="flex justify-between pb-3">
            <dt className="mb-1 text-gray-500 md:text-lg">ID :</dt>
            <dd className="text-lg font-semibold">{user.id}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="mb-1 text-gray-500 md:text-lg">User Name :</dt>
            <dd className="text-lg font-semibold">
              {user.first_name} {user.last_name}
            </dd>
          </div>
          <div className="flex justify-between pt-3">
            <dt className="mb-1 text-gray-500 md:text-lg">Email :</dt>
            <dd className="text-lg font-semibold">{user.email}</dd>
          </div>
          <div className="flex justify-between pt-3">
            <dt className="mb-1 text-gray-500 md:text-lg">Age : </dt>
            <dd className="text-lg font-semibold">{user.age}</dd>
          </div>
        </dl>
      )}

      <Link
        to="/"
        className="w-fit self-start text-white bg-blue-500 px-6 py-2 rounded-xl shadow-lg hover:bg-blue-700 duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default UserDetail;
