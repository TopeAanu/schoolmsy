"use client";

import { useState, useEffect } from "react";
import { Card1, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AdminCredentials from "./AdminCredentials";
import ManageStudents from "./ManageStudents";
import CreateStudentForm from "./CreateStudentForm";
import AddAssignmentForm from "./AddAssignmentForm";
import AddGradeForm from "./AddGradeForm";
import CredentialsAlert from "./CredentialsAlert";
import MessageAlert from "./MessageAlert";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    grade: "",
    subjects: "",
    image: "",
    adminUsername: "",
    adminPassword: "",
  });

  const [assignmentData, setAssignmentData] = useState({
    username: "",
    subject: "",
    title: "",
    description: "",
    dueDate: "",
    adminUsername: "",
    adminPassword: "",
  });

  const [gradeData, setGradeData] = useState({
    username: "",
    subject: "",
    assignment: "",
    score: "",
    feedback: "",
    adminUsername: "",
    adminPassword: "",
  });

  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("create");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showManageStudents, setShowManageStudents] = useState(false);

  // Fetch all students
  const fetchStudents = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (!formData.adminUsername || !formData.adminPassword) {
        setError("Admin credentials required to fetch students");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/admin/student-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminUsername: formData.adminUsername,
          adminPassword: formData.adminPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle manage students view
  const toggleManageStudents = () => {
    const newShowState = !showManageStudents;
    setShowManageStudents(newShowState);
    if (newShowState) {
      fetchStudents();
    }
  };

  // Handle edit student
  const handleEditStudent = (student) => {
    setIsEditing(true);
    setSelectedStudent(student);
    setFormData({
      ...formData,
      studentName: student.name,
      age: student.age?.toString() || "",
      grade: student.grade,
      subjects: Array.isArray(student.subjects)
        ? student.subjects.join(", ")
        : student.subjects,
      image: student.image || "",
    });
    setActiveTab("create");
    setShowManageStudents(false);
  };

  // Handle delete student
  const handleDeleteStudent = async (username) => {
    if (
      !confirm(
        `Are you sure you want to delete the student account for ${username}?`
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/student-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          adminUsername: formData.adminUsername,
          adminPassword: formData.adminPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete student");
      }

      setSuccess(`Student ${username} deleted successfully!`);
      fetchStudents(); // Refresh the student list
    } catch (err) {
      setError(err.message);
    }
  };

  // Reset form when switching to create mode
  const handleCreateNewStudent = () => {
    setIsEditing(false);
    setSelectedStudent(null);
    setFormData((prev) => ({
      ...prev,
      studentName: "",
      age: "",
      grade: "",
      subjects: "",
      image: "",
    }));
  };

  // Handle submit for both create and edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setCredentials(null);

    if (isEditing && selectedStudent) {
      // Update existing student
      try {
        const updateData = {
          username: selectedStudent.username,
          name: formData.studentName,
          age: parseInt(formData.age),
          grade: formData.grade,
          subjects: formData.subjects.split(",").map((s) => s.trim()),
          image: formData.image,
          adminUsername: formData.adminUsername,
          adminPassword: formData.adminPassword,
        };

        const response = await fetch("/api/admin/student-update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to update student");
        }

        setSuccess(`Student ${selectedStudent.username} updated successfully!`);
        setIsEditing(false);
        setSelectedStudent(null);

        // Reset form but keep admin credentials
        setFormData((prev) => ({
          studentName: "",
          age: "",
          grade: "",
          subjects: "",
          image: "",
          adminUsername: prev.adminUsername,
          adminPassword: prev.adminPassword,
        }));
      } catch (err) {
        setError(err.message);
      }
    } else {
      // Create new student
      try {
        const response = await fetch("/api/admin/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to create student account");
        }

        setCredentials(data.credentials);
        setSuccess("Student account created successfully!");

        // Clear form but keep admin credentials for convenience
        setFormData((prev) => ({
          studentName: "",
          age: "",
          grade: "",
          subjects: "",
          image: "",
          adminUsername: prev.adminUsername,
          adminPassword: prev.adminPassword,
        }));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Assignment submission handler
  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Copy admin credentials to assignment data
    const submitData = {
      ...assignmentData,
      adminUsername: formData.adminUsername,
      adminPassword: formData.adminPassword,
    };

    try {
      const response = await fetch("/api/admin/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create assignment");
      }

      setSuccess("Assignment created successfully!");

      // Clear form but keep credentials
      setAssignmentData((prev) => ({
        username: "",
        subject: "",
        title: "",
        description: "",
        dueDate: "",
        adminUsername: formData.adminUsername,
        adminPassword: formData.adminPassword,
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  // Grade submission handler
  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Copy admin credentials to grade data
    const submitData = {
      ...gradeData,
      adminUsername: formData.adminUsername,
      adminPassword: formData.adminPassword,
    };

    try {
      const response = await fetch("/api/admin/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add grade");
      }

      setSuccess("Grade added successfully!");

      // Clear form but keep credentials
      setGradeData((prev) => ({
        username: "",
        subject: "",
        assignment: "",
        score: "",
        feedback: "",
        adminUsername: formData.adminUsername,
        adminPassword: formData.adminPassword,
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  // Clear success and error messages on tab change
  useEffect(() => {
    setError("");
    setSuccess("");
    setCredentials(null);
  }, [activeTab]);

  // Rest of the component remains the same as in the previous artifact
  return (
    <div className="max-w-2xl mx-auto p-4 text-black dark:text-dark">
      <Card1>
        <CardHeader>
          <div className="flex flex-row justify-between items-center gap-2">
            {/* Left side - heading */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
              Admin Dashboard
            </h2>

            {/* Right side - buttons grouped together */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <Button
                variant="outline"
                onClick={toggleManageStudents}
                className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
              >
                {showManageStudents ? (
                  <span className="hidden sm:inline">Hide Student List</span>
                ) : (
                  <span className="hidden sm:inline">Manage Students</span>
                )}
                {showManageStudents ? (
                  <span className="sm:hidden">Hide</span>
                ) : (
                  <span className="sm:hidden">Manage</span>
                )}
              </Button>
              <AdminLogoutButton />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AdminCredentials formData={formData} setFormData={setFormData} />

          {showManageStudents ? (
            <ManageStudents
              isLoading={isLoading}
              students={students}
              fetchStudents={fetchStudents}
              handleEditStudent={handleEditStudent}
              handleDeleteStudent={handleDeleteStudent}
            />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger
                  value="create"
                  className="text-xs sm:text-sm px-1 sm:px-2"
                >
                  {isEditing ? "Edit" : "Create"}
                  <span className="hidden sm:inline">&nbsp;Student</span>
                </TabsTrigger>
                <TabsTrigger
                  value="assignment"
                  className="text-xs sm:text-sm px-1 sm:px-2"
                >
                  <span className="hidden sm:inline">Add </span>&nbsp;Assignment
                </TabsTrigger>
                <TabsTrigger
                  value="grade"
                  className="text-xs sm:text-sm px-1 sm:px-2"
                >
                  <span className="hidden sm:inline">Add </span>&nbsp;Grades
                </TabsTrigger>
              </TabsList>

              <TabsContent value="create">
                <CreateStudentForm
                  isEditing={isEditing}
                  selectedStudent={selectedStudent}
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={handleSubmit}
                  handleCreateNewStudent={handleCreateNewStudent}
                />
              </TabsContent>

              <TabsContent value="assignment">
                <AddAssignmentForm
                  assignmentData={assignmentData}
                  setAssignmentData={setAssignmentData}
                  handleAssignmentSubmit={handleAssignmentSubmit}
                />
              </TabsContent>

              <TabsContent value="grade">
                <AddGradeForm
                  gradeData={gradeData}
                  setGradeData={setGradeData}
                  handleGradeSubmit={handleGradeSubmit}
                />
              </TabsContent>
            </Tabs>
          )}

          {credentials && <CredentialsAlert credentials={credentials} />}

          {success && <MessageAlert type="success" message={success} />}

          {error && <MessageAlert type="error" message={error} />}
        </CardContent>
      </Card1>
    </div>
  );
};

export default AdminDashboard;
