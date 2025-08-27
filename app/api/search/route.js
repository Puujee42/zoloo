import { NextResponse } from 'next/server';
import Property from '@/models/Property';
import connectDB from '@/config/db';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // --- Бүх боломжит шүүлтүүрийн утгыг URL-аас унших ---
    const searchTerm = searchParams.get('q'); // <-- ЭНЭ ХУВЬСАГЧ ЧУХАЛ
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
    const minArea = searchParams.get('minArea');
    const maxArea = searchParams.get('maxArea');

    // --- Хайлтын query объектыг динамикаар үүсгэх ---
    const query = {};

    // 1. Түлхүүр үгээр хайх (searchTerm)
    // ЭНЭ ХЭСЭГ НЬ ТАНЫ ХАЙЛТЫГ БОЛОВСРУУЛНА
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

    // 3. Зарын төлөв
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
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 6. Талбайн хэмжээний муж
    if (minArea || maxArea) {
      query.area = {};
      if (minArea) query.area.$gte = Number(minArea);
      if (maxArea) query.area.$lte = Number(maxArea);
    }

    // 7. Өрөөний тоо
    if (roomCount !== null && roomCount !== '') {
        query.roomCount = Number(roomCount);
    }
    
    // 8. Давхар
    if (davhar !== null && davhar !== '') {
        query.davhar = Number(davhar);
    }

    // 9. Boolean төрлийн шүүлтүүрүүд
    if (surguuli === 'true') query.surguuli = true;
    if (oirhonTogloomiinTalbai === 'true') query.oirhonTogloomiinTalbai = true;
    if (zeel === 'true') query.zeel = true;
    if (barter === 'true') query.barter = true;
    if (lizing === 'true') query.lizing = true;
    
    // Эцсийн query-г ашиглан мэдээллийн сангаас хайлт хийх
    const properties = await Property.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: properties });

  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ success: false, error: 'Сервер дээр алдаа гарлаа' }, { status: 500 });
  }
}