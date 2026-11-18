"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import api from "@/lib/api";
import BookCard from "@/components/BookCard";
import { BookPlus, BookCheck, RotateCcw, Layers, Quote } from "lucide-react";

const slides = [
  {
    title: "Discover Your Next Great Adventure",
    text: "Explore hundreds of community-curated books across fiction, science, history, and children's literature.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Share the Joy of Reading",
    text: "Have great books sitting on your shelf? Add them to BookNook and let fellow readers enjoy them.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Borrow & Return With Ease",
    text: "Simple digital borrowing for a few days. Keep track of your reading list from anywhere.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function HomePage() {
  const [newBooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "BookNook | Home";
    api
      .get("/books?limit=6")
      .then((res) => setNewBooks(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Banner Slider */}
      <section className="w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-[460px] md:h-[540px]"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="w-full h-full bg-cover bg-center relative flex items-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white">
                  <h1 className="text-3xl md:text-5xl font-extrabold max-w-2xl leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg text-gray-200 max-w-xl mb-6 leading-relaxed">
                    {slide.text}
                  </p>
                  <Link href="/books" className="btn btn-primary btn-md">
                    Browse Books
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">New Arrivals</h2>
          <p className="opacity-75 mt-2 max-w-xl mx-auto">
            Freshly added titles from our community members ready to be borrowed today.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : newBooks.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-xl">
            <p className="text-lg font-medium mb-4">No books added yet. Be the first to share one!</p>
            <Link href="/add-book" className="btn btn-primary btn-sm">
              Add a Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/books" className="btn btn-primary">
            See All Books
          </Link>
        </div>
      </section>

      {/* Extra Section 1: How Borrowing Works */}
      <section className="bg-base-200 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">How Borrowing Works</h2>
            <p className="opacity-75 mt-2">Three simple steps to keep the stories circulating.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 p-6 shadow border border-base-300 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <BookPlus className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Add a Book</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Upload details and cover photo of a book you would like to share with the community.
              </p>
            </div>
            <div className="card bg-base-100 p-6 shadow border border-base-300 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <BookCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Borrow a Book</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Browse available books, view details, and borrow your pick for a 7-day reading window.
              </p>
            </div>
            <div className="card bg-base-100 p-6 shadow border border-base-300 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Return a Book</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Finished reading? Return it with one click from My Borrows so the next reader can enjoy it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Section 2: Top Categories & Reader Reviews */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Top Categories</h2>
          <p className="opacity-75 mt-2">Curated shelves tailored to every kind of curiosity.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {["Fiction", "Science", "History", "Kids", "Others"].map((cat) => (
            <Link
              key={cat}
              href="/books"
              className="card bg-base-100 border border-base-300 hover:border-primary p-6 text-center shadow-sm hover:shadow transition"
            >
              <Layers className="w-7 h-7 text-primary mx-auto mb-2" />
              <span className="font-bold">{cat}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-200 p-6 border border-base-300">
            <Quote className="w-8 h-8 text-primary mb-3 opacity-60" />
            <p className="italic opacity-90 mb-4 leading-relaxed">
              &ldquo;BookNook helped me discover rare science and history books right from fellow students without spending a fortune.&rdquo;
            </p>
            <p className="font-bold text-sm text-primary">— Tanvir Ahmed, Dhaka</p>
          </div>
          <div className="card bg-base-200 p-6 border border-base-300">
            <Quote className="w-8 h-8 text-primary mb-3 opacity-60" />
            <p className="italic opacity-90 mb-4 leading-relaxed">
              &ldquo;Sharing my finished novels and borrowing new fiction every week has turned reading into my favorite daily habit.&rdquo;
            </p>
            <p className="font-bold text-sm text-primary">— Nusrat Jahan, Chattogram</p>
          </div>
        </div>
      </section>
    </div>
  );
}
