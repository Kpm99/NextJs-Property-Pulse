import connectDB from "@/config/database";
import Message from "@/models/Message";
import  "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "../components/MessageCard";
const Messages = async() => {
    await connectDB();
    const sessionUser = await getSessionUser();
    
    const {userId} = sessionUser;
   
    
    const readMessages = await Message.find({recipient:userId,read:true}).sort({createdAt:-1}).populate('sender','username').populate('property','name').lean();
    const unReadMessages = await Message.find({recipient:userId,read:false}).sort({createdAt:-1}).populate('sender','username').populate('property','name').lean();
    console.log("unReadMessages",unReadMessages);
    console.log("readMessages",readMessages);
    
    const messages = [...readMessages, ...unReadMessages].map((i)=>{
        const message = convertToSerializableObject(i);
        message.sender = convertToSerializableObject(i.sender)
        message.property = convertToSerializableObject(i.property);
        return message;
    })
    return ( 
        <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div className="bg-whote px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold md-4">Your Messages</h1>
                    <div>
                        {
                        messages.length ==0? (<p>You have no messages</p>):(
                            messages.map((message)=>(
                           <h3 key={message._id}>
                               <MessageCard message={message}/>
                           </h3> 
                        )))
                    }
                    </div>

                </div>
            </div>
        </section>
     );
}
 
export default Messages;