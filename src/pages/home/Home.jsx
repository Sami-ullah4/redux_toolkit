import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../features/crudOperation"; 
import Form from "../../component/From";

const Home = () => {
  const [isEditing, setIsEditing] = useState(false); 
  const [showFron , setShowFrom]  = useState(true)
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    id: Date.now(),
  });

  const dispatch = useDispatch();

  const { products, isProductsLoading } = useSelector(
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
    setIsEditing(true); // now show the form
  };

  if (isProductsLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {(showFron || isEditing) && (
        <Form user={user} setUser={setUser} setIsEditing={setIsEditing} isEditing={isEditing}/>
      )}

      <h1 className="text-2xl font-bold text-center mt-6">User Cards</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {products &&
          products.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 mb-1">📧 {item.email}</p>
              <p className="text-gray-600">🎂 Age: {item.age}</p>

              {/* Use button instead of <a> to prevent reload */}
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
