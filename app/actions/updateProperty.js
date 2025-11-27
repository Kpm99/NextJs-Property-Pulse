"use server";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const updateProperty = async (propertyId, formData) => {
  console.log("formData in update", formData);
  await connectDB();
  let sessionUser =await getSessionUser();
  console.log("sessionUser", sessionUser);

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("user id required");
  }
  const { userId } = sessionUser;
  console.log("userId",userId);
  
  const existingProperty = await Property.findById(propertyId);
  console.log("existingProperty",existingProperty.owner);

  if(existingProperty.owner.toString() !== userId.toString()){
    throw new Error("Current user does not match tp this property")
  }

   const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities:formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  let updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData);
  console.log("updatedData",updatedProperty);
  revalidatePath("/",'layout');
  redirect(`/properties/${updatedProperty._id}`)

 
};

export default updateProperty;
