import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyDetails from "@/app/components/PropertyDetails";
import PropertyHeaderImage from "@/app/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyImages from "@/app/components/PropertyImages";
import { FaArrowLeft } from "react-icons/fa";
import BookMarkButton from "@/app/components/BookmarkButton";
import ShareButton from "@/app/components/ShareButton";
import PropertyContactForm from "@/app/components/PropertyContactForm";
const PropertyPage = async ({ params }) => {
  //const params = useParams();

  await connectDB();
  const property = await Property.findById(params.id).lean();
  console.log("property", property);
  const plainProperty = JSON.parse(JSON.stringify(property));

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to
            Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
            <PropertyDetails property={plainProperty} />
            <aside className="space-y-4">
              <BookMarkButton property={plainProperty} />
              <ShareButton property={plainProperty} />
              <PropertyContactForm property={plainProperty} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
