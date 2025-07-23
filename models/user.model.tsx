import mongoose, { models, model, Document } from "mongoose";

export interface Iuser extends Document{
    _id: mongoose.Types.ObjectId;
    username: string;
    email : string;
    password: string;
    isVerified:boolean;
    isAdmin: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenEpiry: Date;
    verifyToken: string;
    verifyTokenExpiry: Date;
};

const userSchema = new mongoose.Schema<Iuser>({
    username : {
        type: String,
        required: [true, "please provide a username"],
        unique: true,
    },
    email :{
        type: String,
        required: [true, "please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please provide a email"],
    },
    isVerified: {
        type: Boolean,
        default : false,
    },

    isAdmin : {
        type: Boolean,
        default : false,
    },

    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenEpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {       
        type: Date,
    }
} ,
{
    timestamps: true,
})


const User = models?.user || model<Iuser>("user", userSchema);
export default User;


