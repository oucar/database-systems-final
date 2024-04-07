import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:2000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchProject = (id) => API.get(`/projects/${id}`);
export const fetchProjects = (page) => API.get(`/projects?page=${page}`);
export const fetchProjectsByCreator = (name) => API.get(`/projects/creator?name=${name}`);
export const fetchProjectsBySearch = (searchQuery) => API.get(`/projects/search?searchQuery=${searchQuery.search || 'none'}&employees=${searchQuery.employees}&techStack=${searchQuery.techStack}`);
export const createProject = (newProject) => API.post('/projects', newProject);
export const changelog = (value, id) => API.post(`/projects/${id}/changelogProject`, { value });
export const updateProject = (id, updatedProject) => API.patch(`/projects/${id}`, updatedProject);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
