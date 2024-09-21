import prisma from "../../prisma";

import { DepartmentModel } from "../models";

// 2. CRUD dla modelu Department (Departament)

class DepartmentService {
    // a) Tworzenie departamentu:

    async createDepartment(
        departmentData: DepartmentModel.CreateDepartment
    ): Promise<DepartmentModel.Department> {
        const { name, court_id } = departmentData;

        try {
            const newDepartment = await prisma.department.create({
                data: {
                    name,
                    court_id,
                },
            });

            return newDepartment;
        } catch (error) {
            throw new Error(error);
        }
    }

    // b) Odczyt wszystkich departamentów:

    async findManyDepartments(
        departmentSelector?: DepartmentModel.DepartmentSelector
    ): Promise<DepartmentModel.Department[]> {
        try {
            let departments;
            if (departmentSelector) {
                departments = await prisma.case.findMany({
                    where: departmentSelector,
                });
            } else {
                departments = await prisma.case.findMany();
            }
            return departments;
        } catch (error) {
            throw new Error(error);
        }
    }

    // c) Odczyt konkretnego departamentu:

    async findDepartmentByID(
        departmentID: number
    ): Promise<DepartmentModel.Department> {
        try {
            const department = await prisma.department.findUnique({
                where: { id: Number(departmentID) },
            });
            if (department) {
                return department;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    // d) Aktualizacja departamentu:

    async updateDepartment(
        departmentID: number,
        departmentData: DepartmentModel.UpdateDepartment
    ) {
        const { name } = departmentData;
        try {
            const updatedDepartment = await prisma.department.update({
                where: { id: Number(departmentID) },
                data: { name },
            });
            return updatedDepartment;
        } catch (error) {
            throw new Error(error);
        }
    }

    // e) Usunięcie departamentu:

    async deleteDepartment(
        departmentID: number
    ): Promise<DepartmentModel.Department> {
        try {
            const deletedDepartment = await prisma.department.delete({
                where: { id: Number(departmentID) },
            });
            deletedDepartment;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default DepartmentService;
