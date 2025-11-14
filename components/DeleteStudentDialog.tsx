"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { deleteStudent } from "@/lib/slices/studentsSlice";
import toast from "react-hot-toast";

export function DeleteStudentDialog({ studentId, setIsAction }: { studentId: string; setIsAction: (isAction: boolean) => void }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    const res = await dispatch(deleteStudent(studentId));

    if(res.meta.requestStatus === "fulfilled"){
      toast.success("Student deleted successfully");
      setIsAction(true);
    } else {
      toast.error( "Failed to delete student");
    }

  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            student's account and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
