import { AppError } from "../../error/custom.error";
import httpStatus from 'http-status'
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcryptjs'
import { generateToken } from "../../utils/generateToekn";
import { Secret } from "jsonwebtoken";
import config from "../../../config";


interface LoginPayload {
  email: string;
  password: string;
  fcmToken?: string;
}

const loginUserFromDB = async (payload: LoginPayload) => {
  const { email, password, fcmToken } = payload;

  const userData: any = await prisma.user.findFirst({ where: { email } });
  if (!userData) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Not Found');
  }
  if (!userData.password) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Please try Google login'
    );
  }

  const isCorrectPassword = await bcrypt.compare(password, userData.password);

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password incorrect');
  }


  // ✅ Generate access token
  const accessToken = await generateToken(
    {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires_in as string,
  );

  return {
    name: userData.name,
    email: userData.email,
    profession: userData.skill,
    profileImage: userData.image,
    selectedFocusAreas: userData.focus,
    bigGoal: userData.goal,
    number: userData.number,
    accessToken,
  };
};


export const authServices={
    loginUserFromDB
}
