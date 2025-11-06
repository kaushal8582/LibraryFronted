"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import { searchStudents } from "@/lib/slices/studentsSlice"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, Download, Plus, MoreVertical } from "lucide-react"
import { AddStudentModel } from "../AddStudentModel"
import { EditStudentModel } from "../EditStudentModel"
import { DeleteStudentDialog } from "../DeleteStudentDialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function Students() {
  const dispatch = useDispatch<AppDispatch>()
  const { filteredStudents, searchQuery } = useSelector((state: RootState) => state.students)
  const [search, setSearch] = useState("")

  const handleSearch = (value: string) => {
    setSearch(value)
    dispatch(searchStudents(value))
  }

  return (
    <div>
      <Header title="Students" subtitle="Manage all the students in your library." />

      <div className="p-8 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
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
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
          <AddStudentModel />
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.joinDate}</TableCell>
                  <TableCell>${student.fee.toFixed(2)} / mo</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === "Active"
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
                      <DropdownMenuItem asChild>
                        <EditStudentModel student={student} />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DeleteStudentDialog studentId={student.id} />
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
  )
}
