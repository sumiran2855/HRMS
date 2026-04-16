export interface Education {
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  cgpa?: string;
  startDate?: string;
  endDate?: string;
}

export interface Experience {
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  userName: string;
  employeeId: string;
  address: string;
  employeeDesignation: string;
  joiningDate: string;
  birthday?: string;
  gender?: string;
  position?: string;
  departmentId?: string;
  phone?: string;
  hireDate?: string;
  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    bicCode?: string;
    salary?: string;
  };
  employeePhoto?: File | null;
  socialProfile?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  emergencyContact?: {
    primary: {
      name?: string;
      relationship?: string;
      phone?: string;
    };
    secondary: {
      name?: string;
      relationship?: string;
      phone?: string;
    };
  };
  education?: Education[];
  experience?: Experience[];
  passport?: {
    passportNumber?: string;
    nationality?: string;
    issueDate?: string;
    expiryDate?: string;
    scanCopy?: string;
  };
}

export interface Employee {
  _id: string;
  // 🔹 Basic Info
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  contactNumber: string;
  address: string;
  employeeId: string;
  employeeDesignation: string;
  joiningDate: string; // ISO Date
  birthday?: string;
  gender?: string;
  position?: string;
  departmentId?: string;
  phone?: string;
  salary?: number;
  hireDate?: string;

  employeePhoto?: File | string | null;

  contactInfo: {
    phone: string;
    email: string;
    address: string;
    hireDate: string;
    userName: string;
  };

  socialProfile?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };

  emergencyContact: {
    primary: {
      name?: string;
      relationship?: string;
      phone?: string;
      email?: string;
      address?: string;
    };
    secondary: {
      name?: string;
      relationship?: string;
      phone?: string;
      email?: string;
      address?: string;
    };
  };

  education?: Education[];

  experience?: Experience[];

  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    bicCode?: string;
    salary?: number;
  };

  passport?: {
    passportNumber?: string;
    nationality?: string;
    issueDate?: string;
    expiryDate?: string;
    scanCopy?: string;
  };

  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeResponse {
  success: boolean;
  message: string;
  data: Employee;
  statusCode: number;
}

export interface EmployeesListResponse {
  success: boolean;
  message: string;
  data: Employee[];
  statusCode: number;
}

// Employees Page Types
export interface EmployeeFilters {
  searchName: string;
  searchId: string;
  selectedDesignation: string;
}

export interface EmployeeStats {
  total: number;
  active: number;
  uniqueDesignations: number;
  currentMonth: number;
}

export interface UseEmployeesPageReturn {
  employees: Employee[];
  filteredEmployees: Employee[];
  filters: EmployeeFilters;
  stats: EmployeeStats;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  setSearchName: (value: string) => void;
  setSearchId: (value: string) => void;
  setSelectedDesignation: (value: string) => void;
  setIsModalOpen: (value: boolean) => void;
  fetchEmployees: () => Promise<void>;
}
