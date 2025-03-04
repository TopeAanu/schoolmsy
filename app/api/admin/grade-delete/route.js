// // /api/admin/grade-delete/route.js
// import { connectToDB } from "@/app/lib/db";
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//   try {
//     const { gradeId, adminUsername, adminPassword } = await req.json();

//     // Verify admin credentials
//     if (
//       adminUsername !== process.env.ADMIN_USERNAME ||
//       adminPassword !== process.env.ADMIN_PASSWORD
//     ) {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     // Connect to the database
//     const db = await connectToDB("student");
//     const gradesCollection = db.collection("grades");

//     // Validate gradeId
//     if (!gradeId) {
//       return new Response(JSON.stringify({ message: "Grade ID is required" }), {
//         status: 400,
//       });
//     }

//     // Delete the grade
//     const result = await gradesCollection.deleteOne({ 
//       _id: new ObjectId(gradeId) 
//     });

//     if (result.deletedCount === 0) {
//       return new Response(JSON.stringify({ message: "Grade not found" }), {
//         status: 404,
//       });
//     }

//     return new Response(JSON.stringify({ message: "Grade deleted successfully" }), { 
//       status: 200 
//     });

//   } catch (error) {
//     console.error("Delete grade error:", error);
//     return new Response(
//       JSON.stringify({ message: "Internal server error" }),
//       { status: 500 }
//     );
//   }
// }