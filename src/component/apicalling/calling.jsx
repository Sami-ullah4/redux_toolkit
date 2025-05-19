// features/userSlice.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// PUT request to update a mock user
export const addMokUser = createAsyncThunk(
  "addingUser/update", 
  async (updatedData , { rejectWithValue }) => {
    try {
      const response = await fetch(`https://68273edc6b7628c5290f9f00.mockapi.io/CRUD`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "PUT request failed");
    }
  }
);
