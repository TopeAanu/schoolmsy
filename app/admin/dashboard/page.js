"use client";

import { useState } from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCredentials(null);

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
  };

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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </CardHeader>
        <CardContent>
          {/* Admin credentials section - always visible */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-4">Admin Authentication</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Admin Username</label>
                <Input
                  required
                  type="text"
                  value={formData.adminUsername}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      adminUsername: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Admin Password</label>
                <Input
                  required
                  type="password"
                  value={formData.adminPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      adminPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="create">Create Student</TabsTrigger>
              <TabsTrigger value="assignment">Add Assignment</TabsTrigger>
              <TabsTrigger value="grade">Add Grades</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Student information section */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Student Name</label>
                    <Input
                      required
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          studentName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Age</label>
                    <Input
                      type="number"
                      min="5"
                      max="18"
                      required
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Grade</label>
                    <Input
                      required
                      value={formData.grade}
                      onChange={(e) =>
                        setFormData({ ...formData, grade: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      Subjects (comma-separated)
                    </label>
                    <Input
                      required
                      value={formData.subjects}
                      onChange={(e) =>
                        setFormData({ ...formData, subjects: e.target.value })
                      }
                      placeholder="Math, Science, English"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Image URL</label>
                    <Input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://example.com/student-image.jpg"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Create Student Account
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="assignment">
              <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">Student Username</label>
                  <Input
                    required
                    value={assignmentData.username}
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        username: e.target.value,
                      })
                    }
                    placeholder="johndoe"
                  />
                </div>

                <div>
                  <label className="block mb-2">Subject</label>
                  <Input
                    required
                    value={assignmentData.subject}
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        subject: e.target.value,
                      })
                    }
                    placeholder="Math"
                  />
                </div>

                <div>
                  <label className="block mb-2">Assignment Title</label>
                  <Input
                    required
                    value={assignmentData.title}
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Chapter 5 Problems"
                  />
                </div>

                <div>
                  <label className="block mb-2">Description</label>
                  <Textarea
                    required
                    value={assignmentData.description}
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Complete problems 1-10 from Chapter 5"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block mb-2">Due Date</label>
                  <Input
                    type="date"
                    required
                    value={assignmentData.dueDate}
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </div>

                <Button type="submit" className="w-full">
                  Create Assignment
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="grade">
              <form onSubmit={handleGradeSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">Student Username</label>
                  <Input
                    required
                    value={gradeData.username}
                    onChange={(e) =>
                      setGradeData({ ...gradeData, username: e.target.value })
                    }
                    placeholder="johndoe"
                  />
                </div>

                <div>
                  <label className="block mb-2">Subject</label>
                  <Input
                    required
                    value={gradeData.subject}
                    onChange={(e) =>
                      setGradeData({ ...gradeData, subject: e.target.value })
                    }
                    placeholder="Math"
                  />
                </div>

                <div>
                  <label className="block mb-2">Assignment Title</label>
                  <Input
                    required
                    value={gradeData.assignment}
                    onChange={(e) =>
                      setGradeData({ ...gradeData, assignment: e.target.value })
                    }
                    placeholder="Chapter 5 Problems"
                  />
                </div>

                <div>
                  <label className="block mb-2">Score</label>
                  <Input
                    required
                    type="text"
                    value={gradeData.score}
                    onChange={(e) =>
                      setGradeData({ ...gradeData, score: e.target.value })
                    }
                    placeholder="95/100"
                  />
                </div>

                <div>
                  <label className="block mb-2">Feedback</label>
                  <Textarea
                    value={gradeData.feedback}
                    onChange={(e) =>
                      setGradeData({ ...gradeData, feedback: e.target.value })
                    }
                    placeholder="Great work! You need to work on question 7."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Add Grade
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {credentials && (
            <Alert className="mt-4 bg-green-50">
              <AlertDescription>
                <div className="font-bold">Student Account Created!</div>
                <div>Username: {credentials.username}</div>
                <div>Temporary Password: {credentials.password}</div>
                <div className="text-sm text-gray-600 mt-2">
                  Please provide these credentials to the student securely.
                </div>
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 bg-green-50">
              <AlertDescription className="text-green-600">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mt-4 bg-red-50">
              <AlertDescription className="text-red-600">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
