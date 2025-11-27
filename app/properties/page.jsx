import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyCard from "../components/PropertyCard";
import Pagination from "@/app/components/Pagination";
const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 8 } }) => {
  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments();
  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();
  const showPagination = total > pageSize;
  console.log("properties", properties);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length == 0 ? (
          <p>No Properties</p>
        ) : (
          <div className="grid grild-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} total={total} />}
      </div>
    </section>
  );
};

export default PropertiesPage;
