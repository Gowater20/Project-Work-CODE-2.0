import { IUser } from "../types/user.type";
import { User } from "../models/user.models";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";


export const registerUser = async (newUser: IUser): Promise<IUser> => {
    const userExists = await User.findOne({ email: newUser.email });
    if (userExists) {
        throw new Error("User already exists");
    }
    // Hash della password prima di salvarla nel database
	// controlla la stringona perchè dovrebbe essere sbagliata
	const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt); // TODO inserisci bcrypt.genSalt(10);
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