import Property from "@/models/Property"
import connectDB from "@/config/database"
export const GET =async()=>{
    try {
        await connectDB();
        const properties = await Property.find({});
        return new Response(properties,{
            status:200
        })
    } catch (error) {
        return new Response({message:"Something went wrong"},{
            status:500
        })
    }
   
}