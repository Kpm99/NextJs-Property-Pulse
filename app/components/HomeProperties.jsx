import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
const HomeProperties = async() => {
    await connectDB()
    const properties = await Property.find({}).sort({createdAt:-1}).limit(3).lean();
    const recentProperties = properties.slice(0,3)
    return (  
        <>
        <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-blue-500 mb-5 text-center">
                Recent Properties
            </h2>
            {recentProperties.length == 0 ? <p>No Properties</p>:
            
                (
                    <div className="grid grild-cols-1 md:grid-cols-3 gap-6">
                        {
                            recentProperties.map((property)=>(
                             <PropertyCard key={property._id} property={property} /> 
                            ))
                        }
                        </div>
                )
            }
        </div>

    </section>
    <section  className="m-auto my-10 px-6 max-w-lg">
            <Link href="/properties" className="block text-white my-6 bg-black text-center py-4 px-6 rounded-xl hover:bg-gray-700">
            View All properties
            </Link>
    </section>
    
    </>
    );
}
 
export default HomeProperties;