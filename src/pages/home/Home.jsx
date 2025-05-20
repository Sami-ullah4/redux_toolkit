import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, searchUser } from "../../features/crudOperation";

import Form from "../../component/From";

const Home = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showFron, setShowFrom] = useState(true);
  const [serch, setSerch] = useState("");
  const [resioCheck, SetRadioCheck] = useState();
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    id: Date.now(),
  });

  const dispatch = useDispatch();
  // search function
  useEffect(() => {
    dispatch(searchUser(serch));
  }, [serch, dispatch]);

  const { products, searchData , isProductsLoading} = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleOnEdit = (item) => {
    setUser({
      name: item.name,
      email: item.email,
      age: item.age,
      gender: item.gender,
      id: item.id,
    });
    setIsEditing(true);
  };

  

  return (
    <>
    {isProductsLoading && <h1>loading...</h1>}
      <div className="m-auto">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={serch}
          onChange={(e) => setSerch(e.target.value)}
          className="border px-3 py-2 rounded-md shadow"
        />
        <label htmlFor="">female</label>
        <input
          type="radio"
          value={"female"}
          checked={resioCheck === "female"}
          onChange={(e) => SetRadioCheck(e.target.value)}
        />

        <label htmlFor="">femail</label>
        <input
          type="radio"
          value={"female "}
          checked={resioCheck === "female "}
          onChange={(e) => SetRadioCheck(e.target.value)}
        />
        <label htmlFor="">All</label>
        <input type="radio" onChange={(e) => SetRadioCheck(e.target.value)} />
      </div>

      {(showFron || isEditing) && (
        <Form
          user={user}
          setUser={setUser}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      )}

      <h1 className="text-2xl font-bold text-center mt-6">User Cards</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {products &&
          products
            .filter((item) => {
              if (searchData.trim().length === 0) {
                return true;
              } else {
                const combined =
                  `${item.name} ${item.email} ${item.age} ${item.gender}`.toLowerCase();
                return combined.includes(searchData.toLowerCase());
              }
            })
            .filter((item) => {
              if (resioCheck === "male") {
                return item.gender === resioCheck;
              } else if (resioCheck === "female") {
                return item.gender === resioCheck;
              } else {
                return item;
              }
            })
            .map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-600 mb-1">📧 {item.email}</p>
                <p className="text-gray-600">🎂 Age: {item.age}</p>
                <p className="text-gray-600">👤 Gender: {item.gender}</p>

                <button
                  onClick={() => handleOnEdit(item)}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Edit
                </button>

                <button
                  onClick={() => dispatch(deleteUser(item.id))}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
      </ul>
    </>
  );
};

export default Home;
