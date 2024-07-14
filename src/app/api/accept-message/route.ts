import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authoptions);
  const user: User = session?.user as User;
  if (!session ||!session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }
  const userid = user._id;
  const { acceptmessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userid,
      {
        isAcceptingMessages: acceptmessages,
      },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user status to accept messages",
        },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to update user status to accept messages ",
      },
      { status: 500 }
    );
  }
}
export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authoptions);
  const user: User = session?.user as User;
  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }
  
  try {
    const founduser = await UserModel.findById(user._id);
    if (!founduser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json({
      success:true,
      isAcceptingMessages:founduser.isAcceptingMessage
    },{
      status:200
    })
  } catch (error) {
    console.log("Failed to update user status to accept messages ");
    return Response.json(
      {
        success: false,
        message: "Error in getting message accept ance status ",
      },
      { status: 500 }
    );
  }
}
