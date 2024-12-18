import { CourtModel } from "../../models";

export const mockCourt: CourtModel.Court = {
    id: 1,
    name: "Sąd Okręgowy w Krakowie",
    seat: "Kraków",
    court_type: "Okręgowy",
};

export const mockCourtCreateInput: CourtModel.CreateCourt = {
    name: "Sąd Rejonowy w Warszawie",
    seat: "Warszawa",
    court_type: "Rejonowy",
};

export const mockCourtUpdateInput: CourtModel.UpdateCourt = {
    name: "Sąd Rejonowy w Gdańsku",
    seat: "Gdańsk",
    court_type: "Rejonowy",
};
