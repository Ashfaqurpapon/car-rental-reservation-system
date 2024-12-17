import { Document, Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser extends Document {
  // confusion . I think, better to use mongo _id
  //   id: string;

  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'vendor';
  password: string;
  phone: string;
  address: string;
  imageUrlID: string;
  isPremium: boolean;
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
