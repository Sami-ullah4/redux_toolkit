import React from "react";
import { useDispatch } from "react-redux";
import { addMokUser, upDataUser } from "../features/crudOperation";
import { toast } from "react-toastify";


const Form = ({ setUser, user, setIsEditing, isEditing }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !user.age.toString().trim() ||
      !user.gender.trim()
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    if (isEditing) {
      dispatch(upDataUser({ id: user.id, updatedUser: user })).then(() => {
        setIsEditing(false);
        setUser({
          name: "",
          email: "",
          age: "",
          gender: "",
          id: Date.now(),
        });
      });
    } else {
      dispatch(addMokUser(user));
      setUser({
        name: "",
        email: "",
        age: "",
        gender: "",
        id: Date.now(),
      });
    }
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
        {isEditing ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default Form;
