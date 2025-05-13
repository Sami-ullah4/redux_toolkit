import React from "react";
import "../app.css";
import { fakeUserData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../features/todo/UserSlice"; // ⬅️ import removeUser

const TodoList = () => {
  const userName = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleAddUser = () => {
    const name = fakeUserData();
    const payload = {
      id: Date.now(),
      name: name,
    };
    dispatch(addUser(payload));
  };

  const handleDeleteUser = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <>
      <div className="container">
        <div className="list">
          <h1>user</h1>
          <button onClick={handleAddUser} className="button">
            Add New User
          </button>
        </div>

        {userName.map((item) => (
          <React.Fragment key={item.id}>
            <div className="list_map">
              <div>{item.name}</div>
              <button onClick={() => handleDeleteUser(item.id)} className="button">
                delete
              </button>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default TodoList;
