// context/AppContext.jsx

'use client'
import { productsDummyData } from "@/assets/assets";
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
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Simplified to one loading state

    const fetchProductData = async () => {
        setProducts(productsDummyData);
    }

    const fetchBackendUserData = async () => {
        if (!user) return; // Should not happen due to the useEffect logic, but it's a safe guard

        try {
            // This logic to check role remains perfect
            if (user.publicMetadata.role === 'seller') {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
           //setIsSeller(true)


            const token = await getToken();
            const { data } = await axios.get('/api/user/data', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setUserData(data.user);
                setCartItems(data.user.cartItems || {});
            } else {
                toast.error(data.message);
                setUserData(null); // Clear data if user not found in our DB
            }
        } catch (error) {
            toast.error('API Error: ' + error.message);
            setUserData(null); // Clear data on any API error
        } finally {
            // When the fetch is complete (success or fail), we are no longer loading
            setIsLoading(false);
        }
    }

    // --- All your cart logic is perfect, no changes needed ---
    const addToCart = async (itemId) => { let cartData = structuredClone(cartItems); if (cartData[itemId]) { cartData[itemId] += 1; } else { cartData[itemId] = 1; } setCartItems(cartData); }
    const updateCartQuantity = async (itemId, quantity) => { let cartData = structuredClone(cartItems); if (quantity === 0) { delete cartData[itemId]; } else { cartData[itemId] = quantity; } setCartItems(cartData) }
    const getCartCount = () => { let totalCount = 0; for (const items in cartItems) { if (cartItems[items] > 0) { totalCount += cartItems[items]; } } return totalCount; }
    const getCartAmount = () => { let totalAmount = 0; for (const items in cartItems) { let itemInfo = products.find((product) => product._id === items); if (itemInfo && cartItems[items] > 0) { totalAmount += itemInfo.offerPrice * cartItems[items]; } } return Math.floor(totalAmount * 100) / 100; }
    // ---

    useEffect(() => {
        fetchProductData();
    }, []);

    // !! --- THIS IS THE IMPROVED LOGIC --- !!
    useEffect(() => {
        if (isLoaded) { // First, wait for Clerk to be ready
            if (user) {
                // If a user is logged in, start fetching their data from our backend
                setIsLoading(true);
                fetchBackendUserData();
            } else {
                // If no user is logged in, reset all user-specific state and stop loading
                setUserData(null);
                setIsSeller(false);
                setCartItems({});
                setIsLoading(false);
            }
        }
    }, [user, isLoaded]); // This effect now correctly reacts to user logging in or out

    const value = {
        user,
        isLoading, // Pass the single, reliable loading state
        getToken,
        currency, router,
        isSeller,
        userData,
        products,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}