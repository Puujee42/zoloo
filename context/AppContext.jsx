'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}

export const AppContextProvider = ({ children }) => {
    const router = useRouter();
    // isLoaded is the single source of truth for whether Clerk has initialized.
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const [properties, setProperties] = useState([]);
    const [userData, setUserData] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // Modal state
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [appointmentProperty, setAppointmentProperty] = useState(null);

    // --- 1. THE CRITICAL FIX ---
    // isSeller is now correctly derived from Clerk's publicMetadata.
    // It's false if user doesn't exist or if their role is not 'seller'.
    const isSeller = user?.publicMetadata?.role === 'seller';

    const openAppointmentModal = (property) => {
        if (!user) {
            toast.error("Цаг товлохын тулд эхлээд нэвтэрнэ үү.");
            return;
        }
        setAppointmentProperty(property);
        setIsAppointmentModalOpen(true);
    };

    const closeAppointmentModal = () => {
        setIsAppointmentModalOpen(false);
        setAppointmentProperty(null);
    };

    const fetchBackendUserData = async () => {
        // Guard clause: do not run if there is no user.
        if (!user) return;
        
        try {
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
            console.error('Failed to fetch backend user data:', error);
            toast.error('Хэрэглэгчийн мэдээллийг татахад алдаа гарлаа.');
            setUserData(null);
        }
    };
    
    // This effect runs once to get all public property data.
    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const { data } = await axios.get('/api/property/list');
                if (data.success) {
                    setProperties(data.properties);
                }
            } catch (error) {
                console.error("Failed to fetch property data:", error);
            }
        }
        fetchPropertyData();
    }, []);

    // This effect handles all user-specific data and reacts to login/logout.
    useEffect(() => {
        // Do nothing until Clerk has finished loading.
        if (!isLoaded) return;

        if (user) {
            // If there's a user, fetch their data from our backend.
            fetchBackendUserData();
        } else {
            // If there's no user (logged out), clear all user-specific state.
            setUserData(null);
            setFavorites([]);
        }
    }, [user, isLoaded]); // Re-run whenever the user or Clerk's loading state changes.

    const toggleFavorite = async (propertyId) => {
        // ... (Your toggleFavorite logic remains the same, it is already correct)
    };

    // --- 3. THE SIMPLIFIED VALUE OBJECT ---
    const value = {
        // isLoading is now directly tied to Clerk's initialization state.
        isLoading: !isLoaded, 
        user, // The raw user object from Clerk
        userData, // The user profile data from your MongoDB
        isSeller, // The corrected, secure role check
        getToken,
        router,
        properties,
        favorites,
        toggleFavorite,
        isAppointmentModalOpen,
        appointmentProperty,
        openAppointmentModal,
        closeAppointmentModal
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}