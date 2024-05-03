import { IUser } from "../types/user.type";
import { User } from "../models/user.models";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";


export const registerUser = async (newUser: IUser): Promise<IUser> => {
    const userExists = await User.findOne({ email: newUser.email });
    if (userExists) {
        throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    if (newUser.email === "admin@admin.it") {
        throw new Error("This email is not valid for user register");
    };
    const user = await User.create({ ...newUser, password: hashedPassword, role: "user" });
    return user;
}

export const adminRegister = async (newADMIN: IUser): Promise<IUser> => {
    const ADMINExists = await User.findOne({ email: newADMIN.email });
    if (ADMINExists) {
        throw new Error("ADMIN already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newADMIN.password, salt);
    if (newADMIN.email === "admin@admin.it") {
        const role = "admin";
        const ADMIN = await User.create({ ...newADMIN, password: hashedPassword, role: role });
        return ADMIN;
    }
    throw new Error("Mail not valid for ADMIN register");
};

export const matchUser = async (email: string, password: string): Promise<IUser | null> => {
    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        return user;
    }
    return null;
};

export const findUserById = async (id: string) => {
    return await User.findById(id);
}

export const updateLoginStatus = async (
    userId: string,
    status: boolean,
): Promise<Partial<IUser | null>> => {
    return await User.findOneAndUpdate(
        { _id: userId },
        { loggedIn: status },
        { new: true },
    );
};