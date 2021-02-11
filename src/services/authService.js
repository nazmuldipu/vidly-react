import jwtDecode from 'jwt-decode';

import { apiUrl } from '../config.json';
import http from './httpService';

const apiEndpoint = apiUrl + '/auth';
const tokenKey = 'token';

http.setJwt(getJwt())

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email: email, password: password });
    localStorage.setItem(tokenKey, jwt);

}
export function logout() {
    localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export default {
    login, logout, getCurrentUser, loginWithJwt, getJwt
}