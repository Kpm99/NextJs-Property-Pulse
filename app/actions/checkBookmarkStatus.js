'use server'
import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import User from "@/models/User"

async function checkBookMark(propertyId) {
     await connectDB();
    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error("userid required")
    }

    const userId = sessionUser.userId;

    const user = await User.findById(userId);

    let isBookmarked = user.bookmarks.includes(propertyId)


    return {isBookmarked}
}

export default checkBookMark