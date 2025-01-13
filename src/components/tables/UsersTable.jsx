import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useDeleteUserMutation } from "../../store/api/userApi";

const UsersTable = ({ rows, refetch, onEdit }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId);

          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          refetch();
        } catch (error) {
          console.error("Delete Error:", error);

          Swal.fire({
            title: "Error!",
            text: "Failed to delete the user.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <TableContainer
      component={Paper}
      className="rounded-lg shadow-lg overflow-hidden border border-gray-200"
    >
      <Table className="min-w-full">
        <TableHead className="bg-prm text-white">
          <TableRow>
            <TableCell className="font-bold text-white !pl-10">Name</TableCell>
            <TableCell align="left" className="font-bold text-white">
              Role
            </TableCell>
            <TableCell align="center" className="font-bold text-white">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-6 text-gray-500 font-medium"
              >
                No Users Found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={`${
                  index % 2 === 0 ? "bg-scn" : "bg-white"
                } hover:bg-gray-100 transition duration-200`}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="text-gray-700 !pl-10"
                >
                  {row.username}
                </TableCell>
                <TableCell align="left" className="text-gray-600">
                  {row.roles[0]?.name}
                </TableCell>
                <TableCell align="center" className="text-gray-600">
                  {/* Edit Button */}
                  <IconButton onClick={() => onEdit(row)}>
                    <EditIcon />
                  </IconButton>
                  {/* Delete Button */}
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
