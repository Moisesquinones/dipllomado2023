import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://146.190.32.176/diplomado/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Función para obtener la lista de elementos
export async function getAllTypes() {
    const response = await apiClient.get('/room-types');
    return response.data;
}

export async function getAllAccommodation() {
    const response = await apiClient.get('/accommodation-types');
    return response.data;
}
