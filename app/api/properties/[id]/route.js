import Property from "@/models/Property"
import connectDB from "@/config/database"
export const GET =async(request, {params})=>{
    try {
        await connectDB();
        const property = await Property.findById(params.id);
        if(!property)
            return new Response('Property Not Found',{
                status:404
            })
        return new Response(properties,{
            status:200
        })
    } catch (error) {
        return new Response({message:"Something went wrong"},{
            status:500
        })
    }
   
}