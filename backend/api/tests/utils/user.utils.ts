import { UserModel } from "../../models";

export const mockUser: UserModel.User = {
    user_id: 1,
    login: "testuser",
    password: "hashedpassword123",
    name: "Test",
    surname: "User",
    role: "USER",
};

export const mockUserCreateInput: UserModel.CreateUser = {
    login: "newuser",
    password: "newpassword123",
    name: "New",
    surname: "User",
    role: "ADMIN",
};

export const mockUserUpdateInput: UserModel.UpdateUser = {
    name: "Updated",
    surname: "User",
    role: "MODERATOR",
};
