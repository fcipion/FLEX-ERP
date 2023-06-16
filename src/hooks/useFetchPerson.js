import { useState } from 'react';
import { fetchPersonData } from '../services/personData';

export const useFetchPersonData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [personData, setPersonData] = useState(null);

    const getPerson = async (cedula) => {
        setIsLoading(true);
        try {
            const data = await fetchPersonData(cedula);
            setPersonData(data);
        } catch (error) {
            console.error('Failed to fetch person data', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, personData, getPerson };
};
