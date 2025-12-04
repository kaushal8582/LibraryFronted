"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import { getStudents, searchStudents } from "@/lib/slices/studentsSlice";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Download, Plus, MoreVertical } from "lucide-react";
import { AddStudentModel } from "../AddStudentModel";
import { EditStudentModel } from "../EditStudentModel";
import { DeleteStudentDialog } from "../DeleteStudentDialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeFirstChar, formatMongoDate } from "@/common/commonAction";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/common/debounce";
import { AddCashPaymentModal } from "../AddCashPaymentDialog";
import { useMediaQuery } from "@/common/useMediaQuery";

export function Students() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { filteredStudents, searchQuery } = useSelector(
    (state: RootState) => state.students
  );
  const [search, setSearch] = useState("");
  const [isAction, setIsAction] = useState<boolean>(false);

  const debounceSearchValue = useDebounce(search, 500);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const queryParams = new URLSearchParams();

  useEffect(() => {
    queryParams.append("search", debounceSearchValue);
    dispatch(getStudents(queryParams.toString()));
  }, [dispatch, debounceSearchValue, isAction]);

  return (
    <div>
      <Header
        title="Students"
        subtitle="Manage all the students in your library."
      />

      <div className="p-8 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-4 pr-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button
              variant="outline"
              disabled={true}
              className="flex items-center gap-2 bg-transparent"
            >
              {isMobile ? (
                <Download className="w-4 h-4" />
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export
                </>
              )}
            </Button>
          </div>
          <AddStudentModel setIsAction={setIsAction} />
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow
                  key={student._id}
                  onClick={() => router.push(`/dashboard/students/${student.user?._id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {capitalizeFirstChar(student?.user?.name || "")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {student?.user?.email || ""}
                  </TableCell>
                  <TableCell>
                    {formatMongoDate(student?.joinDate || "")}
                  </TableCell>
                  <TableCell>₹{student.fee} / mo</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          style={{
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 500,
                          }}
                          onClick={() =>
                            router.push(`/students/${student.user?._id}`)
                          }
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <div onClick={(e) => e.stopPropagation()}>
                            <EditStudentModel
                              student={student}
                              setIsAction={setIsAction}
                            />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <div onClick={(e) => e.stopPropagation()}>
                            <AddCashPaymentModal
                              studentId={student.user?._id}
                              setIsAction={setIsAction}
                            />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <DeleteStudentDialog
                            studentId={student._id}
                            setIsAction={setIsAction}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
