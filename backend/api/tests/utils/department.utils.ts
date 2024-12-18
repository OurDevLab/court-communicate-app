import { DepartmentModel } from "../../models";

export const mockDepartment: DepartmentModel.Department = {
    id: 1,
    name: "Wydział Cywilny",
    court_id: 1,
};

export const mockDepartmentCreateInput: DepartmentModel.CreateDepartment = {
    name: "Wydział Karny",
    court_id: 1,
};

export const mockDepartmentUpdateInput: DepartmentModel.UpdateDepartment = {
    name: "Zaktualizowany Wydział",
};

export const mockDepartmentSelector: DepartmentModel.DepartmentSelector = {
    court_id: 1,
};
