import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://146.190.32.176/diplomado/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Función para obtener la lista de elementos
export async function getAll() {
    const response = await apiClient.get('/hotels');
    return response.data;
}

// Función para obtener un elemento por ID
export async function getItemById(itemId) {
    const response = await apiClient.get(`/hotels/${itemId}`);
    return response.data;
}

// Función para actualizar un elemento
export async function updateItem(itemId, updatedData) {
    const response = await apiClient.put(`/hotels/${itemId}`, updatedData);
    return response.data;
}

// Función para eliminar un elemento
export async function deleteItem(itemId) {
    const response = await apiClient.delete(`/hotels/${itemId}`);
    return response.data;
}

// Función para crear un nuevo elemento
export async function createItem(newItemData) {
    try {
        const response = await apiClient.post('/hotels', newItemData);
        return response.data;
    } catch (error) {
        // Manejar errores aquí
        throw error;
    }
}
