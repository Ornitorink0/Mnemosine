"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "./user-table";
import { updateUser } from "@/lib/data";

interface EditUserFormProps {
  user: User;
  onSuccess: () => void;
}

export function EditUserForm({ user, onSuccess }: EditUserFormProps) {
  const [formData, setFormData] = useState({
    username: user.username,
    role: user.role,
    newNote: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      username: formData.username,
      role: formData.role,
      updatedAt: new Date(),
      notes: formData.newNote ? [...user.notes, formData.newNote] : user.notes,
    };

    updateUser(updatedUser);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-3">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="focus-visible:ring-primary"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={formData.role} onValueChange={handleRoleChange}>
          <SelectTrigger id="role" className="focus-visible:ring-primary">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="guest">Guest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="newNote">Add Note (optional)</Label>
        <Textarea
          id="newNote"
          name="newNote"
          value={formData.newNote}
          onChange={handleChange}
          placeholder="Add a new note about this user..."
          className="min-h-[100px] focus-visible:ring-primary"
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
