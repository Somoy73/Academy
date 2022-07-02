import axios from 'axios';
import { validUser } from '../utils/Authentication/ValidUser';

//const baseUrl = "http://localhost:8080";
const baseUrl = '';
let token = localStorage.getItem('token');

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':
      'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Authorization: `Bearer ${token}`,
  },
};

export const login = async (user) => {
  return axios
    .post(baseUrl + '/api/auth/signin', user)
    .then((res) => {
      if (validUser(res?.data)) {
        localStorage.setItem('user', JSON.stringify(res?.data));
        localStorage.setItem(
          'authType',
          JSON.stringify(res?.data?.accessLevel)
        );
        localStorage.setItem('token', res?.data?.token);
        token = res?.data?.token;
      }
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const getAllUsers = async () => {
  return axios
    .get(baseUrl + '/api/users/', config)
    .then((res) => {
      if (res) {
        return res;
      } else {
        throw 'failed to get users';
      }
    })
    .catch((e) => {
      return e;
    });
};

export const getAllStudents = async () => {
  return axios
    .get(baseUrl + '/api/users/students/', config)
    .then((res) => {
      if (res) {
        return res;
      } else {
        throw 'failed to get students';
      }
    })
    .catch((e) => {
      return e;
    });
};

export const getUsersByAccessLevel = async (accessLevel) => {
  return axios
    .get(baseUrl + '/api/users/role/' + accessLevel, config)
    .then((res) => {
      if (res) {
        return res;
      } else {
        throw 'failed to get users';
      }
    })
    .catch((e) => {
      return e;
    });
};

export const getUserByUserId = async (userId) => {
  return axios
    .get(baseUrl + '/api/users/' + userId, config)
    .then((res) => {
      if (res) {
        return res;
      } else {
        throw 'failed to get user';
      }
    })
    .catch((e) => {
      return e;
    });
};

export const getAllCourses = async () => {
  return axios
    .get(baseUrl + '/api/courses/', config)
    .then((res) => {
      if (res) {
        return res;
      } else {
        throw 'failed to get courses';
      }
    })
    .catch((e) => {
      return e;
    });
};

export const getCourseById = async (courseId) => {
  return axios
    .get(baseUrl + '/api/courses/' + courseId, config)
    .then((res) => {
      if (res) {
        return res;
      } else {
        throw 'failed to get course';
      }
    })
    .catch((e) => {
      return e;
    });
};

export const getStudentsByCourseId = async (courseId) => {
  return axios
    .get(baseUrl + '/api/courses/' + courseId + '/students', config)
    .then((res) => {
      if (res) {
        return res;
      } else {
        throw 'failed to get students';
      }
    })
    .catch((e) => {
      return e;
    });
};

export const enrollUserInCourseByCourseId = async (
  courseId,
  userId
) => {
  return axios
    .post(
      baseUrl + '/api/courses/' + courseId + '/students',
      userId,
      config
    )
    .then((res) => {
      if (res) {
        return res;
      } else {
        throw 'failed to enroll user in course';
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
