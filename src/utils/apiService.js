import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://gigzi-dev.vercel.app';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMethod = async (path, token = null, params = {}) => {
  try {
    const config = {
      params: Object.keys(params).length > 0 ? params : undefined,
    };

    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    const response = await axiosInstance.get(path, config);
    return response.data;
  } catch (error) {
    console.error('GET Request Error:', {
      url: `${BASE_URL}${path}`,
      error: error.response?.data || error.message,
    });
    
    let errorMessage = 'Failed to fetch data';
    if (error.response?.data) {
      const errorData = error.response.data;
      if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (errorData.error) {
        errorMessage = typeof errorData.error === 'string' ? errorData.error : errorData.error.message || errorMessage;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

export const postMethod = async (path, data = {}, token = null, params = {}) => {
  try {
    const config = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    if (Object.keys(params).length > 0) {
      config.params = params;
    }

    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    if (isFormData) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      };
    }

    const result = await axiosInstance.post(path, data, config);
    return result.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    
    let errorMessage = 'Something went wrong';
    if (error.response?.data) {
      const errorData = error.response.data;
      if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (errorData.error) {
        errorMessage = typeof errorData.error === 'string' ? errorData.error : errorData.error.message || errorMessage;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { error: errorMessage };
  }
};

export const putMethod = async (path, data = {}, token = null, params = {}) => {
  try {
    const config = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    if (Object.keys(params).length > 0) {
      config.params = params;
    }

    const result = await axiosInstance.put(path, data, config);
    return result.data;
  } catch (error) {
    console.error('PUT Request Error:', error.response?.data || error.message);
    
    let errorMessage = 'Something went wrong';
    if (error.response?.data) {
      const errorData = error.response.data;
      if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (errorData.error) {
        errorMessage = typeof errorData.error === 'string' ? errorData.error : errorData.error.message || errorMessage;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { error: errorMessage };
  }
};

export const deleteMethod = async (path, token = null, params = {}) => {
  try {
    const config = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    if (Object.keys(params).length > 0) {
      config.params = params;
    }

    const result = await axiosInstance.delete(path, config);
    return result.data;
  } catch (error) {
    console.error('DELETE Request Error:', error.response?.data || error.message);
    
    let errorMessage = 'Something went wrong';
    if (error.response?.data) {
      const errorData = error.response.data;
      if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (errorData.error) {
        errorMessage = typeof errorData.error === 'string' ? errorData.error : errorData.error.message || errorMessage;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { error: errorMessage };
  }
};

