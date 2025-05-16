'use client';

import { useState } from 'react';
import { addJob, updateJob } from '../lib/api';

interface JobFormProps {
  token: string;
  existingJob?: any;
  onSave: () => void;
}

export default function JobForm({ token, existingJob, onSave }: JobFormProps) {
  const [company, setCompany] = useState(existingJob?.company || '');
  const [title, setTitle] = useState(existingJob?.title || '');
  const [status, setStatus] = useState(existingJob?.status || 'Applied');
  const [notes, setNotes] = useState(existingJob?.notes || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const job = { company, title, status, notes };
    try {
      if (existingJob) {
        await updateJob(token, existingJob.id, job);
      } else {
        await addJob(token, job);
      }
      onSave();
    } catch (err) {
      alert('Error saving job');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6">
      <h2 className="text-xl font-semibold mb-4">{existingJob ? 'Edit Job' : 'Add Job'}</h2>
      <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" className="border p-2 rounded w-full mb-3" />
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Job Title" className="border p-2 rounded w-full mb-3" />
      <input value={status} onChange={e => setStatus(e.target.value)} placeholder="Status" className="border p-2 rounded w-full mb-3" />
      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes" className="border p-2 rounded w-full mb-4" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{existingJob ? 'Update' : 'Add'} Job</button>
    </form>
  );
}