"use client";
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "../actions/bookmarkProperty";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import checkBookMark from "../actions/checkBookmarkStatus";
const BookMarkButton = (property) => {
  console.log("book my button ",property.property._id);
  
  const [isBookmarked, setisBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    checkBookMark(property.property._id)
      .then((bookmark) => {
        console.log("bookmark",bookmark);
        
        setisBookmarked(bookmark.isBookmarked);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err)
      });
  }, [property.property._id,userId,checkBookMark]);
  const handleClick = async () => {
    if (!userId) {
      setLoading(false);
      toast.error("You need to be signed in to bookmark listing");
      return;
    }
    bookmarkProperty(property.property._id).then((response) => {
      if (response.error) {
        return toast.error(response.error);
      }

      toast.success(response.message);
      setisBookmarked(response.isBookmarked);
    });
  };
  return (
    session && (<div>
      {
        loading ? <h3>Loading...</h3>:
    !isBookmarked ? (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  ) : (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" />
      Remove Bookmark
    </button>
  )
}

</div>
      )  )
}


export default BookMarkButton;
