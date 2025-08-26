import { NextResponse } from 'next/server';
import Property from '@/models/Property';
import connectDB from '@/config/db';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // --- Бүх боломжит шүүлтүүрийн утгыг URL-аас унших ---
    const searchTerm = searchParams.get('q');
    const propertyType = searchParams.get('type');
    const status = searchParams.get('status');
    const duureg = searchParams.get('duureg');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const roomCount = searchParams.get('roomCount');
    const davhar = searchParams.get('davhar');
    const surguuli = searchParams.get('surguuli');
    const oirhonTogloomiinTalbai = searchParams.get('oirhonTogloomiinTalbai');
    const zeel = searchParams.get('zeel');
    const barter = searchParams.get('barter');
    const lizing = searchParams.get('lizing');

    // --- Хайлтын query объектыг динамикаар үүсгэх ---
    const query = {};

    // 1. Түлхүүр үгээр хайх
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { duureg: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    // 2. Үл хөдлөх хөрөнгийн төрөл
    if (propertyType && propertyType !== 'all') {
      query.type = propertyType;
    }

    // 3. Зарын төлөв (Зарах / Түрээслэх)
    if (status && status !== 'all') {
        query.status = status;
    }

    // 4. Дүүрэг
    if (duureg && duureg !== 'all') {
        query.duureg = duureg;
    }

    // 5. Үнийн муж
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // 6. Өрөөний тоо
    // ЗАСВАР: "0" гэсэн утгыг хүчинтэй гэж тооцохоор шалгалтыг өөрчилсөн.
    if (roomCount !== null && roomCount !== '') {
        query.roomCount = Number(roomCount);
    }
    
    // 7. Давхар
    // ЗАСВАР: "0" гэсэн утгыг хүчинтэй гэж тооцохоор шалгалтыг өөрчилсөн.
    if (davhar !== null && davhar !== '') {
        query.davhar = Number(davhar);
    }

    // 8. Boolean (Checkbox) төрлийн шүүлтүүрүүд
    if (surguuli === 'true') {
        query.surguuli = true;
    }
    if (oirhonTogloomiinTalbai === 'true') {
        query.oirhonTogloomiinTalbai = true;
    }
    if (zeel === 'true') {
        query.zeel = true;
    }
    if (barter === 'true') {
        query.barter = true;
    }
    if (lizing === 'true') {
        query.lizing = true;
    }
    
    // Эцсийн query-г ашиглан мэдээллийн сангаас хайлт хийх
    const properties = await Property.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: properties });

  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ success: false, error: 'Сервер дээр алдаа гарлаа' }, { status: 500 });
  }
}