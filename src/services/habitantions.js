import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://146.190.32.176/diplomado/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Función para obtener un elemento por ID
export async function getItemById(itemId) {
    const response = await apiClient.get(`/rooms/show/${itemId}`);
    return response.data;
}

// Función para actualizar un elemento
export async function updateItem(itemId, updatedData) {
    const response = await apiClient.put(`/rooms/${itemId}`, updatedData);
    return response.data;
}

// Función para eliminar un elemento
export async function deleteItem(itemId) {
    const response = await apiClient.delete(`/rooms/${itemId}`);
    return response.data;
}

// Función para crear un nuevo elemento
export async function createItem(newItemData) {
    try {
        const response = await apiClient.post('/rooms', newItemData);
        return response.data;
    } catch (error) {
        // Manejar errores aquí
        throw error;
    }
}
