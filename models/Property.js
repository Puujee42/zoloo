import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk хэрэглэгчийн ID
  title: { type: String, required: true },
  description: String,
  address: String,
  duureg: { type: String, required: true }, // Улаанбаатар хотын дүүрэг
  khoroo: { type: String, required: true }, // Хороо
  davhar: { type: Number, required: true }, // Давхар
  type: String,
  status: String,
  price: Number,
  area: Number,
  number: Number,
  images: { type: [String], required: true },
  videos: { type: [String], default: [] }, // Видео бичлэгийн URL
  features: [String],

  // Нэмэлт талбарууд
  oirhonTogloomiinTalbai: { type: Boolean, default: false }, // Ойрхон тоглоомын талбай (тийм/үгүй)
  surguuli: { type: Boolean, default: false }, // Ойрхон сургууль (тийм/үгүй)
  roomCount: { type: Number, default: 0 }, // Өрөөний тоо

  // --- Шинээр нэмэгдсэн төлбөрийн нөхцөлийн талбарууд ---
  zeel: { type: Boolean, default: false }, // Зээлээр авах боломжтой (тийм/үгүй)
  barter: { type: Boolean, default: false }, // Бартер хийх боломжтой (тийм/үгүй)
  lizing: { type: Boolean, default: false }, // Лизингээр авах боломжтой (тийм/үгүй)

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);