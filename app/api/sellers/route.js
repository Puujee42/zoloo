// /app/api/user/sellers/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import User from '@/models/User'; // Таны User модел

export const GET = async () => {
    try {
        await connectDB();

        // MongoDB aggregation ашиглан борлуулагчдыг олж, тэдний зарын тоог хамт тоолно.
        const sellers = await User.aggregate([
            // 1-р алхам: "seller" үүрэгтэй бүх хэрэглэгчийг олох
            {
                $match: {
                    'publicMetadata.role': 'seller'
                }
            },
            // 2-р алхам: `properties` collection-той холбох
            {
                $lookup: {
                    from: 'properties', // properties collection-ийн нэр
                    localField: '_id',   // User модел дахь талбар
                    foreignField: 'userId', // Property модел дахь талбар
                    as: 'listedProperties' // Олдсон заруудыг хадгалах талбарын нэр
                }
            },
            // 3-р алхам: Зарын тоог тоолох шинэ талбар нэмэх
            {
                $addFields: {
                    propertyCount: { $size: '$listedProperties' }
                }
            },
            // 4-р алхам: Зөвхөн хэрэгтэй мэдээллээ сонгож буцаах
            {
                $project: {
                    name: 1,
                    email: 1,
                    image: 1,
                    propertyCount: 1,
                    // Нууцлалтай мэдээллийг буцаахгүй
                    clerkId: 0,
                    favorites: 0,
                    listedProperties: 0, 
                }
            },
            // 5-р алхам: Нэрээр нь эрэмбэлэх
            {
                $sort: { name: 1 }
            }
        ]);

        return NextResponse.json({ success: true, data: sellers });

    } catch (error) {
        console.error("Борлуулагчдыг татахад алдаа гарлаа:", error);
        return NextResponse.json({ success: false, message: "Серверийн алдаа" }, { status: 500 });
    }
};