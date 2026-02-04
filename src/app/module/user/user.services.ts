import { AppError } from "../../error/custom.error";
import { prisma } from "../../lib/prisma"
import httpStatus from 'http-status'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { SubscriptionStatus } from "@prisma/client";
import { generateOtp } from "../../utils/generate.otp";

interface UserPayload{
    name:string;
    email:string;
    password:string;
    fcmToken?:string
}

const registerUserIntoDB = async (payload: UserPayload) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload?.email },
  });
  if (existingUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User already exists!');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const otp = generateOtp(4);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  const transactionId = crypto.randomBytes(16).toString("hex");

//   const result = await prisma.$transaction(async (tx) => {
    const newUser = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        fcmToken: payload?.fcmToken || null,
        twoFactor: true,
        twoFactorOTP: otp,
        twoFactorOTPExpires: expiry,
      }
    });

    

    // await Promise.all([
    //   tx.userSubscription.create({
    //     data: {
    //       userId: newUser.id,
    //       planId: "68fc9404209bf54133292b28",
    //       status: SubscriptionStatus.ACTIVE,
    //       startDate: new Date(),
    //       transactionId: `sub_${transactionId}`,
    //       paymentMethod: "stripe",
    //     },
    //   }),

    //   tx.microGoal.create({
    //     data: {
    //       userId: newUser.id,
    //     },
    //   }),
    // ]);
  // Queue OTP *after* successful commit
//   await otpQueueEmail.add(
//     "registrationOtp",
//     {
//       // name: "loginOtp",
//       userName: result.name,
//       email: payload.email,
//       otpCode: otp,
//       subject: "Your Verification OTP",
//     },
//     {
//       jobId: `${result.id}-${Date.now()}`,
//       removeOnComplete: true,
//       attempts: 3,
//       backoff: { type: "fixed", delay: 5000 },
//     }
//   )
  return {
    message: "Verification OTP sent to your email. Please verify to activate account.",
    newUser
  };
};


export const userServices={
    registerUserIntoDB
}