import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firestore";
import { Employee, EmployeeModalProps } from "./types";

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  open,
  onClose,
  refreshData,
  employee,
}) => {
  const isEditMode = Boolean(employee);
  const initialFormData: Employee = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    department: "",
    address: "",
  };
  const [formData, setFormData] = useState<Employee>(initialFormData);
  const [errors, setErrors] = useState<Partial<Employee>>({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData(initialFormData);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  const validateForm = () => {
    const newErrors: Partial<Employee> = {};
    if (!formData.first_name) newErrors.first_name = "First Name is required";
    if (!formData.last_name) newErrors.last_name = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone_number)
      newErrors.phone_number = "Phone Number is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.address) newErrors.address = "Address is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isEditMode && employee?.id) {
        await updateDoc(doc(db, "employees", employee.id), {
          ...formData,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "employees"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      if (refreshData) {
        refreshData();
      }
      handleClose();
    } catch (error) {
      <Alert severity="error">Error in Adding Employee</Alert>;
    }
  };

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      onClose={(_, reason) => {
        if (reason !== "backdropClick") return;
      }}
    >
      <DialogTitle>{isEditMode ? "Edit Employee" : "Add Employee"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.first_name}
          helperText={errors.first_name}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.last_name}
          helperText={errors.last_name}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.phone_number}
          helperText={errors.phone_number}
        />
        <TextField
          fullWidth
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.department}
          helperText={errors.department}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.address}
          helperText={errors.address}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          {isEditMode ? "Update" : "Add"}
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeModal;
