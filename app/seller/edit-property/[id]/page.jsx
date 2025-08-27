// /app/seller/edit-property/[id]/page.jsx

'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// We will reuse the form component from the 'list-property' page.
// Adjust the import path if your file structure is different.
import ListPropertyPage from '@/app/seller/list-property/page'; 
import Loading from '@/components/Loading'; // A generic loading spinner component

const EditPropertyPage = () => {
    const { id } = useParams(); // Extracts the '[id]' part from the URL
    const router = useRouter();

    const [propertyToEdit, setPropertyToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Ensure we have an ID before trying to fetch
        if (!id) {
            setIsLoading(false);
            return;
        }

        const fetchPropertyData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/property/${id}`);
                
                if (!response.ok) {
                    // Handle cases like 404 Not Found or 403 Forbidden
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Failed to fetch data: ${response.statusText}`);
                }

                const data = await response.json();
                
                if (data.success) {
                    setPropertyToEdit(data.property);
                } else {
                    throw new Error(data.error || "Could not retrieve property details.");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                toast.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPropertyData();
    }, [id]);

    // Show a loading indicator while data is being fetched
    if (isLoading) {
        return <Loading />;
    }

    // Show an error message if the fetch failed
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-semibold text-red-600 mb-4">Алдаа гарлаа</h2>
                <p className="text-zolDark/70 mb-6">{error}</p>
                <button
                    onClick={() => router.back()}
                    className="bg-zolGreen text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-opacity-90 transition-all"
                >
                    Буцах
                </button>
            </div>
        );
    }
    
    // If data is successfully loaded, render the form component
    // and pass the fetched data as a prop.
    return (
        <ListPropertyPage propertyToEdit={propertyToEdit} />
    );
};

export default EditPropertyPage;