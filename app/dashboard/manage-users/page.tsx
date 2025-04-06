import { UserTable } from "@/components/user-table";
import { AddUserForm } from "@/components/add-user-form";
import { Users } from "lucide-react";

export default function Page() {
  return (
    <div className="container mx-auto py-6 px-4 md:py-10 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
        </div>
        <AddUserForm />
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-4 md:p-6">
          <UserTable />
        </div>
      </div>
    </div>
  );
}
