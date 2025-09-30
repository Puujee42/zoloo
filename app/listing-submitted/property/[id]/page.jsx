
'use client'

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import PropertyCard from "@/components/PropertyCard";
import { BedDouble, Bath, LandPlot, Heart, Phone } from "lucide-react";
import { motion } from "framer-motion";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// StatItem (animated)
const StatItem = ({ icon, label }) => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col items-center gap-2 text-center p-2"
  >
    <div className="text-zolGreen">{icon}</div>
    <span className="font-medium text-zolDark/90">{label}</span>
  </motion.div>
);

export default function PropertyDetailsPage({ property, relatedProperties }) {
  const { favorites, toggleFavorite, openAppointmentModal } = useAppContext();
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(property?.images?.[0]);

  if (!property) return <Loading />;

  useEffect(() => {
    setIsFavorited(favorites.includes(property._id));
  }, [favorites, property._id]);

  const handleFavoriteClick = () => {
    toggleFavorite(property._id);
  };

  const handleBookTourClick = () => {
    openAppointmentModal(property);
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="bg-zolGreen/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* --- Image Gallery --- */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="aspect-w-16 aspect-h-10 w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 mb-4"
              >
                <Image
                  src={selectedImage}
                  alt={property.title}
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                />
              </motion.div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {property.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square w-full rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === image
                        ? "border-zolGold scale-105 shadow-md"
                        : "border-transparent hover:border-zolGold/70"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} thumbnail ${index + 1}`}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* --- Info Section --- */}
            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-playfair text-3xl md:text-4xl font-bold tracking-tight text-zolGreen"
              >
                {property.title}
              </motion.h1>
              <p className="text-lg text-zolDark/80">{property.address}</p>
              <p className="font-playfair text-5xl font-bold text-zolGreen">
                {property.price.toLocaleString()}₮
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-4 text-center border-t border-b border-gray-100 py-5"
              >
                <StatItem
                  icon={<BedDouble size={28} />}
                  label={`${property.bedrooms} Ор`}
                />
                <StatItem
                  icon={<Bath size={28} />}
                  label={`${property.bathrooms} Угаалгын`}
                />
                <StatItem
                  icon={<LandPlot size={28} />}
                  label={`${property.area.toLocaleString()} м²`}
                />
              </motion.div>

              <div>
                <h3 className="font-semibold text-lg text-zolDark mb-2">
                  Энэ үл хөдлөх хөрөнгийн тухай
                </h3>
                <p className="text-zolDark/90 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {property.features?.length > 0 && (
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-semibold text-lg text-zolDark mb-3">
                    Онцлог ба давуу тал
                  </h3>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-3"
                  >
                    {property.features.map((feature, i) => (
                      <motion.span
                        key={i}
                        variants={fadeInUp}
                        className="bg-zolGreen/10 text-zolGreen text-sm font-medium px-4 py-2 rounded-full"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* --- Action Buttons --- */}
              <div className="flex items-center gap-4 pt-4">
                <motion.button
                  onClick={handleBookTourClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-zolGold text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all shadow-md"
                >
                  <Phone size={18} />
                  Цаг товлох
                </motion.button>
                <motion.button
                  onClick={handleFavoriteClick}
                  whileTap={{ scale: 0.9 }}
                  aria-label={
                    isFavorited ? "Хадгалснаас устгах" : "Хадгалах"
                  }
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isFavorited
                      ? "bg-zolGold/10 border-zolGold text-zolGold"
                      : "bg-gray-100 border-gray-200 text-gray-600 hover:border-zolGold/70 hover:text-zolGold"
                  }`}
                >
                  <Heart fill={isFavorited ? "currentColor" : "none"} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Related Properties --- */}
          {relatedProperties?.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="mt-24 border-t border-gray-200 pt-16"
            >
              <h2 className="font-playfair text-3xl font-bold text-zolGreen mb-8">
                Танд таалагдаж болох зарууд
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProperties.map((prop, i) => (
                  <motion.div
                    key={prop._id}
                    variants={fadeInUp}
                    transition={{ delay: i * 0.1 }}
                  >
                    <PropertyCard property={prop} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
