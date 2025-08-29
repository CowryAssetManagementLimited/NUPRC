import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"; // backend

// Portfolios
export const getPortfolios = (params) => axios.get(`${BASE_URL}/portfolios/`, { params });
export const createPortfolio = (data) => axios.post(`${BASE_URL}/portfolios/`, data);

// Transactions
export const getTransactions = (params) => axios.get(`${BASE_URL}/transactions/`, { params });
export const createTransaction = (data) => axios.post(`${BASE_URL}/transactions/`, data);

// Types
export const getTypes = (params) => axios.get(`${BASE_URL}/types/`, { params });
export const createType = (data) => axios.post(`${BASE_URL}/types/`, data);
export const deleteType = (id) => axios.delete(`${BASE_URL}/types/${id}`);