
import PropertyEditForm from "@/app/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";

const PropertyEdit = async ( {params} ) => {
    
  await connectDB();
  console.log("params in edit",params);
  
  const propertyDoc = await Property.findById(params.id).lean();
  const property =await convertToSerializableObject(propertyDoc);

  if (!property) {
    throw new Error("Properties not found!");
  }
  return (
    <section className="bg-blue-50">
      <div className="container m-auto w-2xl py-24 bg-white">
        <div className="bg-white px-6 py-8 mb-8 rounded-md shadow-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEdit;
