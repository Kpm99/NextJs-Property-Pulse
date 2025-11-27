'use server'
import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import User from "@/models/User"

async function bookmarkProperty(propertyId){
    await connectDB();
    //console.log("book mark property",propertyId);
    
    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error("userid required")
    }

    const userId = sessionUser.userId;

    const user = await User.findById(userId);

    let isBookmarked = user.bookmarks.includes(propertyId)

    let message;
    if(isBookmarked){
        user.bookmarks.pull(propertyId);
        message='book mark removed';
        isBookmarked =false
    }else{
        user.bookmarks.push(propertyId);
        message='book mark added';
        isBookmarked =true
    }

    await user.save();
    revalidatePath('/properties/saved','page');
    return {message,isBookmarked}
}

export default bookmarkProperty;