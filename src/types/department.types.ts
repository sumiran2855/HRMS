export type DepartmentStatus = "active" | "inactive";

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  employeeCount: number;
  email: string;
  phone: string;
  status: DepartmentStatus;
}

export interface DepartmentStats {
  totalDepartments: number;
  activeDepartments: number;
  totalEmployees: number;
  avgEmployeesPerDept: number;
}

export interface UseDepartmentsReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  editingDepartment: Department | null;
  filteredDepartments: Department[];
  stats: DepartmentStats;
  handleAddDepartment: (data: Omit<Department, "id">) => void;
  handleEditDepartment: (data: Omit<Department, "id">) => void;
  handleDeleteDepartment: (id: string) => void;
  openEditModal: (department: Department) => void;
  closeModal: () => void;
}
