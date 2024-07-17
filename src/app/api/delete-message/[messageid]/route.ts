import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authoptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
  const messageId = params.messageid;
  await dbConnect();
  const session = await getServerSession(authoptions);
  const user: User = session?.user as User;

  // Correct the session check
  if (!session || !session.user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Not authenticated",
      }),
      {
        status: 401,
      }
    );
  }

  try {
    const updatedResult = await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        $pull: { messages: { _id: messageId } },
      }
    );

    if (updatedResult.modifiedCount === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message not found or already deleted",
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message Deleted Successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in deleting message:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error deleting message",
      }),
      {
        status: 500,
      }
    );
  }
}
