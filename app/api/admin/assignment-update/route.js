// // /api/admin/assignment-update/route.js
// import { connectToDB } from "@/app/lib/db";
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//   try {
//     const {
//       adminUsername,
//       adminPassword,
//       assignmentId,
//       username,
//       subject,
//       title,
//       description,
//       dueDate,
//       status
//     } = await req.json();

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

//     // Ensure the assignment exists
//     const assignment = await assignmentsCollection.findOne({
//       _id: new ObjectId(assignmentId)
//     });

//     if (!assignment) {
//       return new Response(
//         JSON.stringify({ message: "Assignment not found" }),
//         { status: 404 }
//       );
//     }

//     // Update the assignment
//     await assignmentsCollection.updateOne(
//       { _id: new ObjectId(assignmentId) },
//       {
//         $set: {
//           username,
//           subject,
//           title,
//           description,
//           dueDate: new Date(dueDate),
//           status: status || assignment.status,
//           updatedAt: new Date(),
//         }
//       }
//     );

//     return new Response(
//       JSON.stringify({ message: "Assignment updated successfully" }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Assignment update error:", error);
//     return new Response(
//       JSON.stringify({
//         message: error.message || "Internal server error",
//       }),
//       { status: 500 }
//     );
//   }
// }
