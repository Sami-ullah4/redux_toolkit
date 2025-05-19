import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../features/crudOperation"; //  Import thunk
import Form from "../../component/From";

const Home = () => {
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

  if (isProductsLoading) {
    return <h1>Loadiang...</h1>;
  }

  const handleOnEdite = (item) => {
    setUser({
      name: item.name,
      email: item.email,
      age: item.age,
      gender: item.gender,
      id: item.id, 
    });
  };

  return (
    <>
      <Form user={user} setUser={setUser} />
      <h1>Hello</h1>

      <ul>
        {products &&
          products.map((item) => {
            return (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"
              >
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 mb-1">📧 {item.email}</p>
                  <p className="text-gray-600">🎂 Age: {item.age}</p>
                  <button onClick={() => handleOnEdite(item)}>Edite</button>
                  <button onClick={() => dispatch(deleteUser (item.id))}>Delet</button>
                </div>
              </div>
            );
          })}
      </ul>
    </>
  );
};

export default Home;
