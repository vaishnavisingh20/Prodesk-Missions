import mongoose, { Document, Model, Schema } from "mongoose";

export type UserRole = "admin" | "client";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  companyName: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
emailVerified: boolean;
lastLogin?: Date;
createdBy?: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },

    companyName: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
  type: String,
  default: "",
},

emailVerified: {
  type: Boolean,
  default: false,
},

lastLogin: {
  type: Date,
},

createdBy: {
  type: Schema.Types.ObjectId,
  ref: "User",
},
  },
  {
    timestamps: true,
  }
);
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
const User: Model<IUser> =
  mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);

export default User;