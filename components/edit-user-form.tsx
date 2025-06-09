/**
 * @file        components/edit-user-form.tsx
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-04-07
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Form di modifica utente
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/components/edit-user-form.tsx
 */

'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { User } from './user-table';
import { updateUser } from '@/lib/data';

interface EditUserFormProps {
  user: User;
  onSuccess: () => void;
}

export function EditUserForm({ user, onSuccess }: EditUserFormProps) {
  console.log('EditUserForm user:', user);

  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    notes: user.notes || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: 'super' | 'admin' | 'patient') => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: User = {
      id: user.id,
      _id: user._id,
      name: formData.name,
      password: user.password,
      role: formData.role,
      createdAt: user.createdAt,
      updatedAt: new Date(),
      sessionIds: user.sessionIds,
      notes: formData.notes,
    };

    updateUser(updatedUser);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-3">
      <div className="space-y-2">
        <Label htmlFor="name">Username</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="focus-visible:ring-primary"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Ruolo</Label>
        <Select value={formData.role} onValueChange={handleRoleChange}>
          <SelectTrigger id="role" className="focus-visible:ring-primary">
            <SelectValue placeholder="Seleziona un ruolo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="super">Super utente</SelectItem>
            <SelectItem value="admin">Amministratore</SelectItem>
            <SelectItem value="patient">Paziente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Note</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Inserisci una nota relativa all'utente..."
          className="min-h-[100px] focus-visible:ring-primary max-h-[30dvh]"
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Annulla
        </Button>
        <Button type="submit">Salva</Button>
      </div>
    </form>
  );
}
