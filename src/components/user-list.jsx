import { Link, useNavigate } from "react-router-dom";
import useCollection from "../hooks/useCollection";

const UserList = () => {
  const navigate = useNavigate();
  const { collectionData: data, isLoading, error } = useCollection("users");

  return (
    <div className="flex flex-col justify-center items-center my-32">
      {isLoading ? (
        <p className="text-2xl">Is Loading ...</p>
      ) : (
        <div className="flex flex-col justify-start">
          <Link
            className="w-fit text-white bg-green-500 px-6 py-2 rounded-xl shadow-lg hover:bg-green-700 duration-300"
            to="/user/add-user"
          >
            Add User +
          </Link>
          <table className="table-fixed my-20 w-full max-w-3xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3">ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((user, idx) => (
                  <tr className="hover:bg-slate-200 cursor-pointer" key={idx}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="text-center">
                      <Link to={`/user/${user.id}`}>
                        {user.first_name} {user.last_name}
                      </Link>
                    </td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">{user.age}</td>
                    <td className="flex justify-center items-center gap-4 my-2 pr-3">
                      <button
                        onClick={() => navigate(`/user/delete-user/${user.id}`)}
                        className="text-white bg-red-600 px-4 py-1 rounded-xl shadow-lg hover:bg-red-800 duration-300"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`/user/edit-user/${user.id}`)}
                        className="text-white bg-orange-500 px-4 py-1 rounded-xl shadow-lg hover:bg-orange-700 duration-300"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default UserList;
