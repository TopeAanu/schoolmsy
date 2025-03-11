// // /api/admin/grade-list/route.js
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
//     const gradesCollection = db.collection("grades");

//     // Query parameters
//     let query = {};
//     if (username) {
//       query.username = username;
//     }

//     // Get grades
//     const grades = await gradesCollection
//       .find(query)
//       .sort({ createdAt: -1 })
//       .toArray();

//     return new Response(JSON.stringify(grades), { status: 200 });
//   } catch (error) {
//     console.error("Grade list error:", error);
//     return new Response(JSON.stringify({ message: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }
