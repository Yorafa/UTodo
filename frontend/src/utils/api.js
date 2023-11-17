import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000
})

apiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // 对响应错误做些什么
        if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
            // Access Token 过期，尝试使用 Refresh Token 获取新的 Access Token
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post('/account/token/refresh/', {
                        refresh: refreshToken,
                    });
                    const newAccessToken = refreshResponse.data.access;
                    localStorage.setItem('access_token', newAccessToken);

                    // 重新发送之前的请求
                    error.config.__isRetryRequest = true;
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return apiClient(error.config);
                } catch (refreshError) {
                    console.error('Refresh token request failed', refreshError);
                    // 处理 Refresh Token 失效的情况，可能需要用户重新登录
                    signout();
                    alert('token invalid, please login again');
                }
            }
        }
        return Promise.reject(error);
    }
);

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

export const signout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/signin';
}

export const get_all_public_courses_api = async () => {
    return await apiClient.get('/course/public_all/');
}

// auth routes 

export const refresh_token = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token === null) return;
    const data = {
        refresh: refresh_token
    }
    await refresh_token_api(data).then((res) => {
        if (res.status === 200) {
            localStorage.setItem('access_token', res.data.access);
        } else {
            signout();
        }
    }).catch((err) => {
        console.log(err);
        signout();
    });
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

export const get_course_on_list_api = async () => {
    return await apiClient.get('/course/on_list/');
}

export const get_course_by_id_api = async (id) => {
    return await apiClient.get(`/course/${id}/`);
}

export const update_course_by_id_api = async (id, data) => {
    return await apiClient.patch(`/course/${id}/`, data);
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
