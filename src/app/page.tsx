'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getJobs, deleteJob } from '../lib/api';
import JobForm from '../components/JobForm';
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<any[]>([]);
  const [editingJob, setEditingJob] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !session.accessToken) {
      router.replace('/login');
    } else {
      fetchJobs(session.accessToken);
    }
  }, [session, status]);

  const fetchJobs = async (token: string) => {
    try {
      const res = await getJobs(token);
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJob(session?.accessToken || '', id);
      fetchJobs(session?.accessToken || '');
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  const handleLogout = () => {
    const idToken = session?.idToken;

    if (!idToken) {
      console.warn('No idToken found; falling back to regular signOut');
      signOut({ callbackUrl: '/login' });
      return;
    }

    const keycloakLogoutUrl = `http://localhost:8081/realms/jobsboard/protocol/openid-connect/logout?post_logout_redirect_uri=http://localhost:3000/login&id_token_hint=${idToken}`;

    signOut({ redirect: false }).then(() => {
      window.location.href = keycloakLogoutUrl;
    });
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!session || !session.accessToken) {
    if (typeof window !== 'undefined') {
      router.replace('/login');
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold">Redirecting to login...</p>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Job Applications</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <JobForm
        token={session.accessToken}
        existingJob={editingJob}
        onSave={() => {
          setEditingJob(null);
          fetchJobs(session.accessToken);
        }}
      />
      <ul className="space-y-4">
        {jobs.map((job) => (
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
