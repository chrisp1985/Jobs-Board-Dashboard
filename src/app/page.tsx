'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getJobs, deleteJob } from '../lib/api';
import JobForm from '../components/JobForm';

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [token, setToken] = useState('');
  const [editingJob, setEditingJob] = useState<any>(null);
  const router = useRouter();

  const fetchJobs = async (token: string) => {
    const res = await getJobs(token);
    setJobs(res.data);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJob(token, id);
      fetchJobs(token);
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      setToken(stored);
      fetchJobs(stored);
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Job Applications</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <JobForm token={token} existingJob={editingJob} onSave={() => {
        setEditingJob(null);
        fetchJobs(token);
      }} />
      <ul className="space-y-4">
        {jobs.map(job => (
          <li key={job.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{job.title} @ {job.company}</p>
              <p className="text-sm text-gray-600">Status: {job.status}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => setEditingJob(job)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(job.id)} className="bg-gray-700 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}