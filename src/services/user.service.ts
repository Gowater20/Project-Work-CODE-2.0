import { IUser } from "../types/user.type";
import { User } from "../models/user.models";
import bcrypt from 'bcrypt';

export const registerUser = async (newUser: IUser): Promise<IUser> => {
    const userExists = await User.findOne({ email: newUser.email });
    if (userExists) {
        throw new Error("User already exists");
    }
    // Hash della password prima di salvarla nel database
    const hashedPassword = await bcrypt.hash(newUser.password, "$2a$10$7h/0SQ4FXRG5eX3602o3/.6xGWZdP6oqHGWcCHS1A3oRFZ70gSB8a");
    const user = await User.create({ ...newUser, password: hashedPassword });

    return user;
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
