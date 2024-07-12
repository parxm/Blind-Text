import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authoptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request: Request,{params}:{params:{messageid:string}}) {
const messageId =  params.messageid
  await dbConnect();
  const session = await getServerSession(authoptions);
  const user: User = session?.user as User;
  if (!session || session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }try {
    const updatedresult = await UserModel.updateOne({
      _id:user._id
    },{
      $pull:{messages:{_id:messageId}}
    })
    if (updatedresult.modifiedCount==0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        {
          status: 404,
        }
      );
      
    }
    return Response.json(
      {
        success: true,
        message: "Message Deleted Successfully",
      },
      {
        status: 200,
      }
    );
    
  } catch (error) {
    console.log("Error in deleting message",error)
    return Response.json(
      {
        success: false,
        message: "Error deleting Message",
      },
      {
        status: 500,
      }
    );
    
  }

}
