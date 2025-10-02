// /app/hiring/page.jsx
'use client'

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, MapPin, Clock, UserPlus, SearchX } from "lucide-react";

const HiringPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs"); // <-- replace with your jobs API
        const data = await res.json();
        if (data.success) {
          setJobs(data.data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-zolGreen/5 min-h-screen">
        {/* Hero Section */}
        <section className="text-center py-20 bg-white shadow-md">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-zolGreen">
            Манай багт нэгдээрэй
          </h1>
          <p className="mt-4 text-zolDark/70 max-w-2xl mx-auto">
            Бид хамтдаа үл хөдлөх хөрөнгийн салбарт шинэ боломжуудыг бүтээж байна.
            Хэрэв та урам зоригтой, бүтээлч бол – бид танд боломж олгоно.
          </p>
          <div className="mt-6">
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2 bg-zolGold text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
            >
              <UserPlus size={20} /> Нээлттэй ажлын байр харах
            </a>
          </div>
        </section>

        {/* Jobs Section */}
        <section id="open-positions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-zolGreen mb-10 text-center">
            Нээлттэй ажлын байр
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white h-40 rounded-xl shadow"></div>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-zolDark mb-2 flex items-center gap-2">
                      <Briefcase size={18} className="text-zolGold" /> {job.title}
                    </h3>
                    <p className="text-sm text-zolDark/70 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-zolDark/70">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-6 bg-zolGreen text-white font-medium py-2.5 px-4 rounded-lg hover:bg-opacity-90 transition-all">
                    Өргөдөл гаргах
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white">
              <SearchX size={48} className="mx-auto text-zolGold/50 mb-4" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-zolDark">Нээлттэй ажлын байр алга</h2>
              <p className="mt-2 text-zolDark/70">Одоогоор шинэ ажлын байр байхгүй байна. Дараа дахин шалгана уу.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HiringPage;