
import React, { useState, useEffect } from "react";
import PromotionsTable from "../components/tables/PromotionsTable";
import { useGetAllPromotionsQuery } from "../store/api/promotionApi";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";

const Promotions = () => {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredRows, setFilteredRows] = useState([]); 

  const navigate = useNavigate();

  // API Call with selected category filter
  const {
    data: promotions,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllPromotionsQuery();


  const rows = promotions || [];

  useEffect(() => {
    let updatedRows = rows;

    // Filter based on search input
    if (search) {
      updatedRows = rows.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredRows(updatedRows); 
  }, [rows, search]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value); 
  };

  // Handle filter menu toggle
  const toggleFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); 
    setAnchorEl(null); 
    refetch(); 
  };

  return (
    <div className="px-32 py-10 bg-scn min-h-screen">
      <h1 className="text-3xl font-bold text-prm mb-6">Promotions</h1>
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <TextField
            label="Search Promotions..."
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            className="w-full border-prm focus:ring-prm focus:border-prm"
          />
        </div>

        <div className="flex items-center space-x-20 "> 
          {/* Selected Category Display */}
          <div className="text-gray-700 text-sm font-medium">
            {selectedCategory ? (
              <span className="px-4 py-2 rounded-lg bg-scn border border-prm text-prm">
                {selectedCategory}
              </span>
            ) : (
              <span className="text-gray-400"></span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Add New Button */}
            <Tooltip title="Add New">
              <IconButton
                onClick={() => navigate("add-promotion")}
                size="large"
                className="text-white !bg-prm hover:bg-opacity-50 shadow-md rounded-full  focus:outline-none"
              >
                <Add className="" />
              </IconButton>
            </Tooltip>

            {/* Filter Button */}
            {/* <Tooltip title="Filter">
              <IconButton
                onClick={toggleFilterMenu}
                size="large"
                className="text-white !bg-prm hover:bg-opacity-50 shadow-md rounded-full  focus:outline-none"
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip> */}
          </div>
        </div>
      </div>

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseFilterMenu}
        className="z-50"
      >
        <MenuItem onClick={() => handleCategorySelect("Electronics")}>
          Electronics
        </MenuItem>
        <MenuItem onClick={() => handleCategorySelect("Fashion")}>
          Fashion
        </MenuItem>
        <MenuItem onClick={() => handleCategorySelect("Home")}>
          Home
        </MenuItem>
        <MenuItem onClick={() => handleCategorySelect("Books")}>
          Books
        </MenuItem>
        <MenuItem onClick={() => handleCategorySelect("")}>
          Clear Filter
        </MenuItem>
      </Menu>

      <br />
      {/* Products Table */}
      {isLoading ? (
        <div className="flex justify-center w-full text-center pt-36">
          <CircularProgress />
        </div>
      ) : isError ? (
        <div className="text-red-500 w-full text-center pt-36">
          <p>
            Error fetching products! {error?.data?.message || error?.message}
          </p>
        </div>
      ) : (
        <PromotionsTable promotions={filteredRows} refetch={refetch} />
      )}
    </div>
  );
};

export default Promotions;