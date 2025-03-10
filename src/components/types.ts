export interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  refreshData?: () => void;
  employee: Employee | null;
}

export interface Employee {
  id?: string, 
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  department: string;
  address: string;
  updatedAt?: { seconds: number; nanoseconds: number };
}

export interface Column {
  id:
  | "first_name"
  | "last_name"
  | "email"
  | "phone_number"
  | "department"
  | "address";
  label: string;
  minWidth?: number;
  align?: "right";
}

export const columns: readonly Column[] = [
  { id: "first_name", label: "First Name", minWidth: 170 },
  { id: "last_name", label: "Last Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone_number", label: "Phone Number", minWidth: 170 },
  { id: "department", label: "Department", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
];
