import mongoose, { Schema } from "mongoose";

import { IUser } from "./types";


const userSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: { type: String, enum: ["user", "admin"], default: "user", required: false },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
