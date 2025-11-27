// export function convertToSerializableObject(leanDocument){
//     for(const key of Object.keys(leanDocument)){
//         if(leanDocument[key].toJSON && leanDocument[key].toString()){
//             leanDocument[key] = leanDocument[key].toString();
//         }
//     }
//     return leanDocument;
// }

export function convertToSerializableObject(leanDocument) {
  if (!leanDocument || typeof leanDocument !== "object") return leanDocument;

  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key];

    if (value && typeof value === "object") {
      // Handle Mongo ObjectId or Date
      if (typeof value.toString === "function" && value.constructor?.name === "ObjectId") {
        leanDocument[key] = value.toString();
      } else if (value instanceof Date) {
        leanDocument[key] = value.toISOString();
      } else {
        // Recursively handle nested objects
        leanDocument[key] = convertToSerializableObject(value);
      }
    }
  }

  return leanDocument;
}
