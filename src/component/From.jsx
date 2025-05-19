import React from "react";
import { useDispatch } from "react-redux";
import { addMokUser } from "../features/crudOperation";

const Form = ({setUser , user}) => {
    const dispatch = useDispatch();

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     age: "",
//     gender: "",
//     id: Date.now(), 
//   });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted User:", user);
    // You can now dispatch an action or post this data
    dispatch(addMokUser(user))
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-4 border rounded shadow"
    >
      <h1 className="text-2xl font-bold text-center">Register Here</h1>

      <input
        type="text"
        placeholder="Enter your name"
        name="name"
        value={user.name}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Enter your email"
        name="email"
        value={user.email}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Enter your age"
        name="age"
        value={user.age}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <select
        name="gender"
        value={user.gender}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
