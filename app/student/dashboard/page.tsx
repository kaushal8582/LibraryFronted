"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppDispatch, RootState } from "@/lib/store";
import {
  Loader2,
  User,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { updatePassword } from "@/lib/slices/authSlice";
import toast from "react-hot-toast";
import { Header } from "@/components/header";
import { Pencil } from "lucide-react";
import StudentModal from "./UpdateStudentModal";
import { formatMongoDate } from "@/common/commonAction";

export default function StudentDashboard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  const { user, userFullData, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // if (!isAuthenticated || !userFullData) {
  //   return null;
  // }

  const studentData = userFullData;

  const handleUpdatePassword = async () => {
    try {
      console.log("isload", isLoading);
      const response = await dispatch(
        updatePassword({
          oldPassword,
          newPassword,
        })
      );

    

      if (response?.payload?.success) {
        toast.success("Password updated successfully");
        setShowPasswordModal(false);
        setOldPassword("");
        setNewPassword("");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className=" space-y-6">
          {/* <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Student</Badge>
              <Badge
                variant={studentData?.isActive ? "default" : "destructive"}
              >
                {studentData?.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div> */}
          <Header title="Dashboard" />

          <div className="p-6 space-y-6">
            {/* Personal Information Card */}
            <Card className="relative">
              <div
                onClick={() => setEditProfile(true)}
                className="absolute top-3 right-10 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center"
              >
                <Pencil className="h-5 w-5 text-black" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your profile details and library information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{studentData?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Email Address
                    </p>
                    <p className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {studentData?.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {studentData?.phone || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {studentData?.studentData?.address || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Join Date</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                       {formatMongoDate(studentData?.studentData?.joinDate || "")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Library</p>
                    <p className="font-medium">
                      {studentData?.libraryData?.name}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Library Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Library Details</CardTitle>
                <CardDescription>
                  Information about your associated library
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Library Name
                    </p>
                    <p className="font-medium">
                      {studentData?.libraryData?.name}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Contact Email
                    </p>
                    <p className="font-medium">
                      {studentData?.libraryData?.contactEmail}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Contact Phone
                    </p>
                    <p className="font-medium">
                      {studentData?.libraryData?.contactPhone}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Subscription Status
                    </p>
                    <Badge
                      variant={
                        studentData?.libraryData?.subscriptionStatus ===
                        "active"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {studentData?.libraryData?.subscriptionStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Library Timing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Contact your library for specific operating hours and
                    availability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => router.push("/student/payments")}
                  >
                    View Payment History
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/student/payment")}
                  >
                    Make Payment
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Update Password Modal */}
            {showPasswordModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
                <Card className="w-full max-w-md relative modal">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <CardHeader>
                    <CardTitle>Update Password</CardTitle>
                    <CardDescription>
                      Enter your old and new password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="oldPassword"
                        className="text-sm font-medium"
                      >
                        Old Password
                      </label>
                      <input
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter old password"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="newPassword"
                        className="text-sm font-medium"
                      >
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter new password"
                      />
                      {newPassword.length > 0 && newPassword.length < 8 && (
                        <p className="text-xs text-destructive">
                          Password must be at least 8 characters
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleUpdatePassword}
                        disabled={!oldPassword || newPassword.length < 8}
                        className="flex-1"
                      >
                        Update
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowPasswordModal(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <StudentModal
              open={editProfile}
              value={studentData}
              onClose={() => setEditProfile(false)}
              onSubmit={() => {}}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
