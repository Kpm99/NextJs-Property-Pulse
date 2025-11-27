'use server'
import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import User from "@/models/User"
import Message from "@/models/Message"

async function markMessagesRead(messageId) {
     await connectDB();
    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error("userid required")
    }

    const userId = sessionUser.userId;

    const message = await Message.findById(messageId);
    if(!message){
        throw new Error('Message not found!')
    }

    if(message.recipient.toString() !== userId){
        throw new Error("unauthorized")
    }   

    message.read = !message.read;
    revalidatePath('/message','page');

    await message.save();


    return message.read
}

export default markMessagesRead