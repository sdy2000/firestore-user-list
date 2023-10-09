import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./components/user-list";
import UserDetail from "./components/user-detail";
import AddUser from "./components/add-user";
import DeleteUser from "./components/delete-user";
import EditUser from "./components/edit-user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:user_id" element={<UserDetail />} />
        <Route path="/user/add-user" element={<AddUser />} />
        <Route path="/user/delete-user/:user_id" element={<DeleteUser />} />
        <Route path="/user/edit-user/:user_id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
