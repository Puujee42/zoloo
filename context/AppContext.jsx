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

    const fetchPropertyData = async () => {
        try {
            const { data } = await axios.get('/api/property/list');
            if (data.success) {
                setProperties(data.properties);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            // console.error("Failed to fetch properties:", error.message);
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
                // --- FIX 1: Use the consistent American spelling ---
                setFavorites(data.user.favorites || []);
            } else {
                toast.error(data.message);
                setUserData(null);
            }
        } catch (error) {
            toast.error('API Error: ' + error.message);
            setUserData(null);
        } finally {
            setIsLoading(false);
        }
    }

    const toggleFavorite = async (propertyId) => {
        if (!user) {
            toast.error("Please log in to save properties.");
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
            // --- FIX 2: Use the consistent American spelling for the API route ---
            await axios.post('/api/user/favorites', { propertyId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            toast.error("Could not update favorites.");
            setFavorites(favorites); // Revert UI on failure
        }
    };

    const getFavoritesCount = () => {
        return favorites.length;
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
        getFavoritesCount
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}