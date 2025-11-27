'use server'
import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"

import Message from "@/models/Message"

async function getUnreadMessageCount() {
     await connectDB();
    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error("userid required")
    }

    const userId = sessionUser.userId;
    //console.log("userId",userId);
    
    const count = await Message.countDocuments({recipient:userId,read:false});
    //console.log("count",count);
    
   return count
}

export default getUnreadMessageCount