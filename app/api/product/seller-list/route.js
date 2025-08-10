import connectDB from "@/config/db";
import { syncUserCreation } from "@/config/inngest";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId} = getAuth(request)
        const isSeller = authSeller(userId)
        if (!isSeller) {
            return NextResponse.json({syncUserCreation:false,message:"not authroized seller"})
        }
        await connectDB()
        const products = await Product.find({})
        return NextResponse.json({success:true,products})
    } catch (error) {
        return NextResponse.json({success:false,message:error.message})
    }
}