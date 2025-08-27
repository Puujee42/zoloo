import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk хэрэглэгчийн ID
  title: { type: String, required: true },
  description: String,
  address: String,
  duureg: { type: String, required: true }, // Улаанбаатар хотын дүүрэг
  khoroo: { type: String, required: true }, // Хороо
  davhar: { type: Number, required: true }, // Давхар
  
  // --- ЭНЭ ХЭСЭГТ ӨӨРЧЛӨЛТ ОРОВ ---
  type: { 
    type: String, 
    required: true,
    // Зөвхөн эдгээр утгыг зөвшөөрнө
    enum: ['Apartment', 'House', 'Car', 'Barter', 'Land'] 
  },
  
  status: String,
  price: Number,
  area: Number,
  number: Number,
  images: { type: [String], required: true },
  videos: { type: [String], default: [] }, // Видео бичлэгийн URL
  features: [String],

  // Нэмэлт талбарууд
  oirhonTogloomiinTalbai: { type: Boolean, default: false },
  surguuli: { type: Boolean, default: false },
  roomCount: { type: Number, default: 0 },

  // Төлбөрийн нөхцөлийн талбарууд
  zeel: { type: Boolean, default: false },
  barter: { type: Boolean, default: false },
  lizing: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);