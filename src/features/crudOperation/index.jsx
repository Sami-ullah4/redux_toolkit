import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// GET users
export const getUsers = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://68273edc6b7628c5290f9f00.mockapi.io/CRUD"
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(`${error} - Something went wrong in API call`);
    }
  }
);

// POST user (you named it `addMokUser`, not a PUT)

export const addMokUser = createAsyncThunk(
  "addingUser/post",
  async (newUserData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://68273edc6b7628c5290f9f00.mockapi.io/CRUD",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "POST request failed");
    }
  }
);
///delet req
export const deleteUser = createAsyncThunk(
  "deletingUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://68273edc6b7628c5290f9f00.mockapi.io/CRUD/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "DELETE request failed");
    }
  }
);
///update req
// id = user ID, updatedUser = data to update
export const upDataUser = createAsyncThunk(
  "upDataUser",
  async ({ id, updatedUser }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://68273edc6b7628c5290f9f00.mockapi.io/CRUD/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Update request failed");
    }
  }
);

// Redux slice
const userData = createSlice({
  name: "products",
  initialState: {
    products: [],
    searchData: [],
    isProductsLoading: false,
    isProductsRejected: false,
    isProducts: false,
    error: null,
  },
  reducers: {
    searchUser:(state,action)=>{
state.searchData = action.payload;
    }
  },
  extraReducers: (builder) => {
    // GET users
    builder
      .addCase(getUsers.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = true;
        state.products = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = false;
        state.isProductsRejected = true;
        state.error = action.payload;
      });

    // POST user
    builder
      .addCase(addMokUser.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(addMokUser.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = true;
        state.products.push(action.payload);
          toast.success("User added successfully ✅");
      })
      .addCase(addMokUser.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = false;
        state.isProductsRejected = true;
        state.error = action.payload;
      });
    //delet user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isProductsLoading = false;

        const id = action.payload;
        if (id) {
          state.products = state.products.filter((user) => user.id !== id);
          toast.success("User deleted successfully ✅");
        }
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.isProducts = false;
        state.isProductsRejected = true;
        state.error = action.payload;
      });
    ////update request
    builder
     .addCase(upDataUser.pending, (state) => {
  state.isProductsLoading = true;
  state.error = null;
})
.addCase(upDataUser.fulfilled, (state, action) => {
  state.isProductsLoading = false;
  const index = state.products.findIndex(
    (u) => String(u.id) === String(action.payload.id)
  );
  if (index !== -1) {
    state.products[index] = action.payload;
    console.log(state.payload)
    toast.success("User updated successfully ✅");
  }
})
.addCase(upDataUser.rejected, (state, action) => {
  state.isProductsLoading = false;
  state.isProducts = false;
  state.isProductsRejected = true;
  state.error = action.payload;
});

  },
});

export default userData.reducer;
export const {searchUser} = userData.actions;
