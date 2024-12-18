import { CaseModel } from "../../models";

export const mockCase: CaseModel.Case = {
    case_id: 1,
    case_identifier: "CASE-12345",
    case_type: "Criminal",
    case_description: "A test case description",
    judge_user_id: 1,
    respondent_user_id: 2,
    clerk_user_id: 3,
};

export const mockCaseCreateInput: CaseModel.CreateCase = {
    case_identifier: "CASE-12345",
    case_type: "Civil",
    case_description: "A new case",
    judge_user_id: 1,
    respondent_user_id: 2,
    clerk_user_id: 3,
};

export const mockCaseUpdateInput: CaseModel.UpdateCase = {
    case_type: "Criminal",
    case_description: "An updated case description",
    judge_user_id: 1,
    respondent_user_id: 2,
    clerk_user_id: 4,
};

export const mockUserCases = [
    {
        case_id: 1,
        case_identifier: "CASE-12345",
        case_description: "Case 1",
    },
    {
        case_id: 2,
        case_identifier: "CASE-67890",
        case_description: "Case 2",
    },
];
