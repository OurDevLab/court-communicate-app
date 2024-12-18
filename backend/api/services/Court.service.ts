import prisma from "../../prisma";

import { CourtModel } from "../models";

class CourtService {
    async createCourt(
        courtData: CourtModel.CreateCourt
    ): Promise<CourtModel.Court> {
        const { name, seat, court_type } = courtData;
        try {
            const newCourt = await prisma.court.create({
                data: {
                    name,
                    seat,
                    court_type,
                },
            });
            return newCourt;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findManyCourts(
        courtSelector?: CourtModel.CourtSelector
    ): Promise<CourtModel.Court[]> {
        try {
            let courts;
            if (courtSelector) {
                courts = await prisma.court.findMany({
                    where: courtSelector,
                });
            } else {
                courts = await prisma.court.findMany();
            }
            return courts;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findCourtByID(courtID: number): Promise<CourtModel.Court> {
        try {
            const court = await prisma.court.findUnique({
                where: { id: Number(courtID) },
            });
            if (court) {
                return court;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateCourt(courtID: number, courtData: CourtModel.UpdateCourt) {
        const { name, seat, court_type } = courtData;
        try {
            const updatedCourt = await prisma.court.update({
                where: { id: Number(courtID) },
                data: { name, seat, court_type },
            });
            return updatedCourt;
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeCourt(courtID: number): Promise<CourtModel.Court> {
        try {
            const deletedCase = await prisma.court.delete({
                where: { id: Number(courtID) },
            });
            return deletedCase;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default CourtService;
