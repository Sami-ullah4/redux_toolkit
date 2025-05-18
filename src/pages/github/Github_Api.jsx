import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../features/gitSlice/gitSlicer";

const Github_Api = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.gitUser);

  if (data.loading) {
    return <h1>Loading...</h1>;
  }

  if (data.error) {
    return <h1>{data.error}</h1>;
  }

  return (
    <>
      <div>Github_Api</div>
      <button onClick={() => dispatch(getAllData())}>
        <h1>Click here for git users</h1>
      </button>
      <ul>
        {data.user.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </>
  );
};

export default Github_Api;
