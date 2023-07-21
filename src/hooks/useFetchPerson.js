import { useState } from "react";
import { fetchPersonData } from "../services/personData";
import { toast } from "react-hot-toast";

export const useFetchPersonData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [personData, setPersonData] = useState(null);

  const getPerson = async (cedula) => {
    setIsLoading(true);
    try {
      const data = await fetchPersonData(cedula);
      setPersonData(data);
    } catch (error) {
      setPersonData({});
      toast.error("Documento no encontrada.", {
        position: "top-right",
        style: { zIndex: 1300 },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, personData, getPerson };
};
