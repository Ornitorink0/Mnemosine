/**
 * @file        components/add-user-form.tsx
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-04-07
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Form di aggiunta utente
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/components/add-user-form.tsx
 */

'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Plus } from 'lucide-react';
import { addUser } from '@/lib/data';

export function AddUserForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (value: 'super' | 'admin' | 'patient') => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser(
        formData.name,
        formData.password,
        formData.role === 'super'
          ? 'super'
          : formData.role === 'admin'
            ? 'admin'
            : 'patient'
      );
      setIsOpen(false);
      setFormData({ name: '', password: '', role: '' }); // reset
    } catch (error) {
      console.error("Errore nell'aggiunta utente:", error);
      // eventualmente mostra un toast qui
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Aggiungi utente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Aggiungi un nuovo utente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-3">
          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Ruolo</Label>
            <Select
              value={formData.role}
              onValueChange={handleRoleChange}
              required
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super">Super utente</SelectItem>
                <SelectItem value="admin">Amministratore</SelectItem>
                <SelectItem value="patient">Paziente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancella
            </Button>
            <Button type="submit">Aggiungi</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
