// // /api/admin/assignment-list/route.js
// import { connectToDB } from "@/app/lib/db";

// export async function POST(req) {
//   try {
//     const { adminUsername, adminPassword, username } = await req.json();

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

//     // Query parameters
//     let query = {};
//     if (username) {
//       query.username = username;
//     }

//     // Get assignments with date formatting directly in the aggregation pipeline
//     const assignments = await assignmentsCollection
//       .aggregate([
//         { $match: query },
//         { $sort: { createdAt: -1 } },
//         {
//           $addFields: {
//             createdAt: {
//               $dateToString: {
//                 format: "%Y-%m-%d",
//                 date: "$createdAt",
//               },
//             },
//           },
//         },
//       ])
//       .toArray();

//     return new Response(JSON.stringify(assignments), { status: 200 });
//   } catch (error) {
//     console.error("Assignment list error:", error);
//     return new Response(JSON.stringify({ message: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }
