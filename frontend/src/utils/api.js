import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000
})


apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem('user');
        if (userDetails) { 
            const token = JSON.parse(userDetails).token;
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// public routes

export const signup_api = async (data) => {
    return await apiClient.post('/account/signup/', data);
}

export const signin_api = async (data) => {
    return await apiClient.post('/account/signin/', data);
}

export const refresh_token_api = async (data) => {
    return await apiClient.post('/account/token/refresh', data);
}

export const get_all_public_courses_api= async () => {
    return await apiClient.get('/course/public_all/');
}

// auth routes 

export const signout_api = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export const get_profile_api = async () => {
    return await apiClient.get('/account/profile/');
}

export const create_course_api = async (data) => {
    return await apiClient.post('/course/create/', data);
}

export const get_all_my_courses_api = async () => {
    return await apiClient.get('/course/my_all/');
}

export const get_course_by_id_api = async (id) => {
    return await apiClient.get(`/course/${id}/`);
}

export const update_course_by_id_api = async (id, data) => {
    return await apiClient.put(`/course/${id}/`, data);
}

export const delete_course_by_id_api = async (id) => {
    return await apiClient.delete(`/course/${id}/`);
}

export const like_course_by_id_api = async (id) => {
    return await apiClient.patch(`/course/${id}/like/`);
}

export const unlike_course_by_id_api = async (id) => {
    return await apiClient.patch(`/course/${id}/unlike/`);
}

export const get_who_like_course_by_id_api = async (id) => {
    return await apiClient.get(`/course/${id}/like/`);
}

export const create_assessment_to_course_by_id_api = async (id, data) => {
    return await apiClient.post(`/course/${id}/create/`, data);
}

export const get_all_assessments_of_course_by_id_api = async (id) => {
    return await apiClient.get(`/course/${id}/assessments/`);
}

export const get_assessment_by_id_api = async (id) => {
    return await apiClient.get(`/course/assessment/${id}/`);
}

export const update_assessment_by_id_api = async (id, data) => {
    return await apiClient.put(`/course/assessment/${id}/`, data);
}

export const delete_assessment_by_id_api = async (id) => {
    return await apiClient.delete(`/course/assessment/${id}/`);
}

export const create_task_to_assessment_by_id_api = async (id, data) => {
    return await apiClient.post(`/course/assessment/${id}/create/`, data);
}

export const get_all_tasks_of_assessment_by_id_api = async (id) => {
    return await apiClient.get(`/course/assessment/${id}/tasks/`);
}

export const get_task_by_id_api = async (id) => {
    return await apiClient.get(`/course/assessment/task/${id}/`);
}

export const update_task_by_id_api = async (id, data) => {
    return await apiClient.put(`/course/assessment/task/${id}/`, data);
}

export const delete_task_by_id_api = async (id) => {
    return await apiClient.delete(`/course/assessment/task/${id}/`);
}
