import axios from "axios";
import { getSessionData, setSessionData } from "./core/sStorage";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
});

export const postRegister = async (entity: string, data: any) => {
    try {
        const response = await api.post(`/user/${entity}/register`, data);
        setSessionData('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postLogin = async (data: any) => {
    try {
        const response = await api.post('/user/login', data);
        setSessionData('token', response.data.token);
        return response.data.type;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postPet = async (data: FormData) => {
    try {
        const response = await api.post('/user/ong/new-pet', data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getPets = async (data: any) => {
    try {
        const response = await api.post('/user/ong/pets', data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getProfile = async (data: any) => {
    try {
        const response = await api.get(`/user/profile/${getSessionData('token')}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getPet = async (data: any) => {
    try {
        const response = await api.get(`/pet/about/${data.petId}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};