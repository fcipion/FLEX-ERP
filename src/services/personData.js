import { url } from '../api/Peticiones';
import { http } from '../api/http';

const fetchPersonData = async (cedula) => {
    try {
        const { data } = await http.get(`${url}/consultar_cedula/${cedula}`);
        return data.data;
    } catch (error) {
        throw new Error('Failed to fetch person data');
    }
};

export { fetchPersonData };
