// // /api/admin/assignment-delete/route.js
// import { connectToDB } from "@/app/lib/db";
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//   try {
//     const { assignmentId, adminUsername, adminPassword } = await req.json();

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
//     const assignmentsCollection = db.collection("assignments");

//     // Validate assignmentId
//     if (!assignmentId) {
//       return new Response(JSON.stringify({ message: "Assignment ID is required" }), {
//         status: 400,
//       });
//     }

//     // Delete the assignment
//     const result = await assignmentsCollection.deleteOne({ 
//       _id: new ObjectId(assignmentId) 
//     });

//     if (result.deletedCount === 0) {
//       return new Response(JSON.stringify({ message: "Assignment not found" }), {
//         status: 404,
//       });
//     }

//     return new Response(JSON.stringify({ message: "Assignment deleted successfully" }), { 
//       status: 200 
//     });

//   } catch (error) {
//     console.error("Delete assignment error:", error);
//     return new Response(
//       JSON.stringify({ message: "Internal server error" }),
//       { status: 500 }
//     );
//   }
// }