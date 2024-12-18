import { AuthModel } from "../../models";

export const mockUser: AuthModel.UserAuthData = {
    user_id: 1,
    login: "testuser",
    password: "$2a$10$saltrandomhash",
    name: "John",
    surname: "Doe",
    role: "USER",
};

export const mockRegisterData: AuthModel.RegisterData = {
    login: "newuser",
    password: "securepassword",
    name: "Jane",
    surname: "Doe",
    role: "USER",
};

export const mockTokenPayload: AuthModel.GenerateTokenData = {
    id: 1,
    role: "USER",
    key: "test-secret",
    expiresIn: "1h",
};

export const mockToken: AuthModel.Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2MjA3MTY4NzksImV4cCI6MTYyMDcyMDQ3OX0.WZvd80BRB3glDkk7kEyyrx1HE6-jAhKsdZHKyycmW_s";
