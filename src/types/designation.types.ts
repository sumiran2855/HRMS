export type DesignationStatus = "active" | "inactive";

export interface Designation {
  id: number;
  title: string;
  department: string;
  level: string;
  employeeCount: number;
  description: string;
  skills: string[];
  minSalary: number;
  maxSalary: number;
  status: DesignationStatus;
  createdAt: string;
}

export interface DesignationStats {
  totalDesignations: number;
  activeDesignations: number;
  totalEmployees: number;
  avgEmployeesPerRole: number;
}

export interface DesignationFilters {
  searchTerm: string;
  selectedDepartment: string;
  selectedLevel: string;
  selectedStatus: string;
}

export interface UseDesignationsReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  editingDesignation: Designation | null;
  filteredDesignations: Designation[];
  stats: DesignationStats;
  handleAddDesignation: (data: Omit<Designation, "id" | "createdAt">) => void;
  handleEditDesignation: (data: Omit<Designation, "id" | "createdAt">) => void;
  handleDeleteDesignation: (id: number) => void;
  openEditModal: (designation: Designation) => void;
  closeModal: () => void;
}
