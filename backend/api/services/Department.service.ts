import prisma from "../../prisma";

import { DepartmentModel } from "../models";

class DepartmentService {
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

    async findManyDepartments(
        departmentSelector?: DepartmentModel.DepartmentSelector
    ): Promise<DepartmentModel.Department[]> {
        try {
            let departments;
            if (departmentSelector) {
                departments = await prisma.department.findMany({
                    where: departmentSelector,
                });
            } else {
                departments = await prisma.department.findMany();
            }
            return departments;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findDepartmentsByCourtID(
        courtID: number
    ): Promise<DepartmentModel.Department[]> {
        try {
            const departments = await prisma.department.findMany({
                where: { court_id: courtID },
            });
            return departments;
        } catch (error) {
            throw new Error(error);
        }
    }

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

    async deleteDepartment(
        departmentID: number
    ): Promise<DepartmentModel.Department> {
        try {
            const deletedDepartment = await prisma.department.delete({
                where: { id: Number(departmentID) },
            });
            return deletedDepartment;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default DepartmentService;
