import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodedusername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 500 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

if(isCodeValid && isCodeNotExpired){
    user.isVerified=true
    await user.save()
    return Response.json(
        {
          success: true,
          message: 'User Verified Successfully',
        },
        { status: 200 }
      );

} else if(!isCodeNotExpired){
    return Response.json(
        {
          success: false,
          message: 'Code is expired',
        },
        { status: 400  }
      );
}
else{
    return Response.json(
        {
          success: false,
          message: 'Incorrect Verification Code',
        },
        { status: 500 }
      );
}


  } catch (error) {
    console.error("Code is not correct ", error);
    return Response.json(
      {
        success: false,
        message: "Code is not correct",
      },
      { status: 500 }
    );
  }
}
