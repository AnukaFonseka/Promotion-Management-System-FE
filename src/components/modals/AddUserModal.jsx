import React, { useEffect } from "react";
import { Modal, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddUserMutation, useUpdateUserMutation } from "../../store/api/userApi";

// Validation Schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: yup.number().required("Role is required"), // Added validation for role
});

const AddUserModal = ({ open, onClose, userData }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [addUser, { isLoading, isError, error }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Reset form if modal is closed or user data changes
  useEffect(() => {
    if (userData) {
      reset({ username: userData.username, password: "", role: userData.role }); 
    } else {
      reset({ username: "", password: "", role: 1 }); 
    }
  }, [userData, open, reset]);

  // Handle form submission for adding or updating
  const onSubmit = async (data) => {
    try {
      if (userData) {
        await updateUser({ ...data, id: userData.id }).unwrap(); // Update user
      } else {
        await addUser(data).unwrap(); // Add new user
      }
      reset();
      onClose();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center outline-none"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md outline-none">
        <h2 className="text-2xl font-semibold text-prm mb-6 text-center">
          {userData ? "Edit User" : "Add User"} {/* Change title based on action */}
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          {/* Role Select Input */}
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Role</InputLabel>
                <Select {...field} label="Role">
                  <MenuItem value={1}>ADMIN</MenuItem>
                  <MenuItem value={2}>USER</MenuItem>
                </Select>
                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
              </FormControl>
            )}
          />
          {isError && (
            <p className="text-red-500 text-center">
              {error?.data?.message || "Failed to add user"}
            </p>
          )}
          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition-all"
              disabled={isLoading || isUpdating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-prm hover:bg-prm/80 text-black py-2 rounded-lg font-semibold transition-all"
              disabled={isLoading || isUpdating}
            >
              {isLoading || isUpdating ? "Saving..." : userData ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
