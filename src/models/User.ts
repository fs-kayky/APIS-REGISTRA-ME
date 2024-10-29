import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    UserId: number;
    nickname: string;
    email: string;
    password: string;
}

const UserSchema = new Schema({
    UserId: { type: Number, required: true, unique: true },
    nickname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.model<IUser>("User", UserSchema);