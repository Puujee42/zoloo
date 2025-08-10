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
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Fetch real product data from backend
    const fetchProductData = async () => {
        try {
            const {data} = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchBackendUserData = async () => {
        if (!user) return;
        try {
            if (user.publicMetadata.role === 'seller') {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }

            const token = await getToken();
            const { data } = await axios.get('/api/user/data', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setUserData(data.user);
                setCartItems(data.user.cartItems || {});
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

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);
    }

    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (product) {
                totalAmount += product.offerPrice * cartItems[itemId];
            }
        }
        return Math.round(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            if (user) {
                setIsLoading(true);
                fetchBackendUserData();
            } else {
                setUserData(null);
                setIsSeller(false);
                setCartItems({});
                setIsLoading(false);
            }
        }
    }, [user, isLoaded]);

    const value = {
        user,
        isLoading,
        getToken,
        currency,
        router,
        isSeller,
        userData,
        products,
        cartItems,
        setCartItems,
        addToCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}
