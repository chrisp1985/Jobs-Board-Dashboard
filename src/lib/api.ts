import axios from 'axios';

const API_BASE = 'http://localhost:8080';

// Job endpoints
export const getJobs = (token: string) => {
  return axios.get(`${API_BASE}/api/jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addJob = (token: string, job: any) => {
  return axios.post(`${API_BASE}/api/jobs`, job, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateJob = (token: string, id: number, job: any) => {
  return axios.put(`${API_BASE}/api/jobs/${id}`, job, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteJob = (token: string, id: number) => {
  return axios.delete(`${API_BASE}/api/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
