import axios from "axios";
import { getSessionData, setSessionData } from "./core/sStorage";
import { getData } from "./core/lStorage";

const api = axios.create({
    baseURL: 'http://192.168.0.104:3000/',
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

export const getProfile = async () => {
    try {
        const response = await api.get(`/user/profile/${getSessionData('token')}`);
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

export const getRequests = async () => {
    try {
        const response = await api.get(`/requests/${getSessionData('token')}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getMessages = async () => {
    try {
        const response = await api.get(`/requests/messages/${getData('request')}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const sendMessages = async (data: any) => {
    try {
        const response = await api.post(`/requests/messages/`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}