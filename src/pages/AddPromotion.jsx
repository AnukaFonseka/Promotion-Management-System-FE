import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Box,
  Paper,
} from "@mui/material";
import { useAddPromotionMutation, useGetPromotionByIdQuery, useUpdatePromotionMutation } from "../store/api/promotionApi";

const schema = yup.object().shape({
    name: yup.string().required("Promotion name is required"),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End Date is required"),
    image: yup
        .mixed()
        .required("Image is required")
        .test("fileType", "Only JPG, JPEG, PNG files are allowed", 
            (value) => {
        return (
            value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        );
        }
    ),
});

const AddPromotion = () => {
  const { promotionId } = useParams();  // Get promotion ID from URL
  const [addPromotion, { isLoading }] = useAddPromotionMutation(); 
  const [updatePromotion, { isLoading: isUpdating }] = useUpdatePromotionMutation();

  const { data: promotionData, isLoading: isFetching } = useGetPromotionByIdQuery(promotionId, {
    skip: !promotionId,  // Skip the query if there's no promotionId
  });

  

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), 
  });

  const [imagePreview, setImagePreview] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  // Populate the form if editing
  useEffect(() => {
    if (promotionData) {
      setValue("name", promotionData.name);
      setValue("startDate", new Date(promotionData.startDate));
      setValue("endDate", new Date(promotionData.endDate));
      setImagePreview(`http://localhost:8080${promotionData.imagePath}`);
      setSelectedFileName(promotionData.imagePath);
    }
  }, [promotionData, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    const startDateFormatted = new Date(data.startDate).toISOString().split('T')[0];
    const endDateFormatted = new Date(data.endDate).toISOString().split('T')[0];

    formData.append("name", data.name);
    formData.append("startDate", startDateFormatted);
    formData.append("endDate", endDateFormatted);
    formData.append("image", data.image);

    try {
      if (promotionId) {
        // Update existing promotion
        formData.append("id", promotionId);
        await updatePromotion(formData);
        Swal.fire("Updated!", "Your promotion has been updated.", "success");
      } else {
        // Add new promotion
        await addPromotion(formData);
        Swal.fire("Added!", "Your promotion has been added.", "success");
      }
      setImagePreview("");
      setSelectedFileName("");
    } catch (error) {
        console.error("Add Promotion Error:", error);
      Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        return;
      }
      setValue("image", file);
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gradient-to-t from-scn to-prm/50">
      <Paper elevation={6} className="p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-prm mb-6 text-center">{promotionId ? "Edit Promotion" : "Create Promotion"}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Promotion Name"
            fullWidth
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="startDate"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  renderInput={(params) => <TextField {...params} error={!!errors.startDate} helperText={errors.startDate?.message} />}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  renderInput={(params) => <TextField {...params} error={!!errors.endDate} helperText={errors.endDate?.message} />}
                />
              )}
            />
          </LocalizationProvider>

          <FormControl fullWidth error={!!errors.image}>
            <input type="file" accept="image/*" style={{ display: "none" }} id="image-upload" onChange={handleImageChange} />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span" className="!border-prm bg-transparent hover:bg-prm hover:text-white !text-gray-600 font-semibold py-2 px-4 rounded-lg transition-all !my-2">
                Upload Image
              </Button>
              {selectedFileName && <span className="ml-2 text-gray-600">{selectedFileName}</span>}
            </label>
            <FormHelperText>{errors.image?.message}</FormHelperText>
          </FormControl>

          {imagePreview && (
            <Box className="flex justify-center my-4">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover border rounded-lg shadow-md" />
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="!bg-prm hover:bg-opacity-80 text-white"
            disabled={isLoading || isFetching || isUpdating}
          >
            {isLoading || isFetching || isUpdating ? "Processing..." : promotionId ? "Update Promotion" : "Add Promotion"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddPromotion;
