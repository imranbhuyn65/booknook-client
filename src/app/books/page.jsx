"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import BookCard from "@/components/BookCard";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "BookNook | All Books";
    api
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">All Books</h1>
        <p className="opacity-75 mt-2">Browse our complete collection of community-shared books.</p>
      </div>

      {loading ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-xl">
          <p className="text-lg font-medium">No books found in the library yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
