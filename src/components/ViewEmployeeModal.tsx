import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import {EmployeeModalProps} from "./types";

const ViewEmployeeModal: React.FC<EmployeeModalProps> = ({
  open,
  onClose,
  employee,
}) => {
  if (!employee) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Employee Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              First Name
            </Typography>
            <Typography variant="body1">{employee?.first_name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Last Name
            </Typography>
            <Typography variant="body1">{employee?.last_name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Phone Number
            </Typography>
            <Typography variant="body1">{employee?.phone_number}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">{employee?.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Address
            </Typography>
            <Typography variant="body1">{employee?.address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Department
            </Typography>
            <Typography variant="body1">{employee?.department}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewEmployeeModal;
