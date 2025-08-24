'use client'
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const [properties, setProperties] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- 1. ШИНЭЭР НЭМСЭН ХЭСЭГ: Танилцах цагийн модал удирдах ---
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [appointmentProperty, setAppointmentProperty] = useState(null);

    const openAppointmentModal = (property) => {
        if (!user) {
            toast.error("Цаг товлохын тулд эхлээд нэвтэрнэ үү.");
            // Эсвэл sign-in хуудас руу үсэргэж болно
            // router.push('/sign-in');
            return;
        }
        setAppointmentProperty(property);
        setIsAppointmentModalOpen(true);
    };

    const closeAppointmentModal = () => {
        setIsAppointmentModalOpen(false);
        setAppointmentProperty(null);
    };
    // -----------------------------------------------------------

    const fetchPropertyData = async () => {
        try {
            const { data } = await axios.get('/api/property/list');
            if (data.success) {
                setProperties(data.properties);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            // console.error("Үл хөдлөх хөрөнгө татахад алдаа гарлаа:", error.message);
        }
    }

    const fetchBackendUserData = async () => {
        if (!user) return;
        try {
            setIsSeller(user.publicMetadata?.role === 'seller');
            const token = await getToken();
            const { data } = await axios.get('/api/user/data', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setUserData(data.user);
                setFavorites(data.user.favorites || []);
            } else {
                toast.error(data.message);
                setUserData(null);
            }
        } catch (error) {
            toast.error('API-ийн алдаа: ' + error.message);
            setUserData(null);
        } finally {
            setIsLoading(false);
        }
    }

    const toggleFavorite = async (propertyId) => {
        if (!user) {
            toast.error("Үл хөдлөх хөрөнгө хадгалахын тулд нэвтэрнэ үү.");
            router.push('/sign-in');
            return;
        }

        const isFavorited = favorites.includes(propertyId);
        let updatedFavorites = isFavorited
            ? favorites.filter(id => id !== propertyId)
            : [...favorites, propertyId];
        
        setFavorites(updatedFavorites);

        try {
            const token = await getToken();
            await axios.post('/api/user/favorites', { propertyId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            toast.error("Дуртай зүйлсийг шинэчлэх боломжгүй байна.");
            setFavorites(favorites);
        }
    };

    useEffect(() => {
        fetchPropertyData();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            if (user) {
                setIsLoading(true);
                fetchBackendUserData();
            } else {
                setUserData(null);
                setIsSeller(false);
                setFavorites([]);
                setIsLoading(false);
            }
        }
    }, [user, isLoaded]);

    const value = {
        user,
        isLoading,
        getToken,
        router,
        isSeller,
        userData,
        properties,
        favorites,
        setFavorites,
        toggleFavorite,
        
        // --- 2. ШИНЭЭР НЭМСЭН УТГУУДЫГ context-д дамжуулах ---
        isAppointmentModalOpen,
        appointmentProperty,
        openAppointmentModal,
        closeAppointmentModal
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}