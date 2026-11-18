"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "BookNook | Book Details";
    if (session && id) {
      api
        .get(`/books/${id}`)
        .then((res) => setBook(res.data))
        .catch(() => toast.error("Failed to load book details"))
        .finally(() => setLoading(false));
    }
  }, [id, session]);

  const handleConfirmBorrow = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const borrowDate = new Date().toISOString().split("T")[0];
    const returnDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    try {
      await api.post("/borrows", {
        bookId: book._id,
        bookTitle: book.title,
        bookImage: book.image,
        userEmail: session.user.email,
        borrowDate,
        returnDate,
      });
      toast.success("Book borrowed successfully!");
      setIsModalOpen(false);
      router.push("/my-borrows");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not borrow this book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PrivateRoute>
      {loading ? (
        <div className="min-h-[65vh] flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : !book ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Book not found</h2>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          <div className="card lg:card-side bg-base-100 shadow-xl border border-base-300 overflow-hidden">
            <figure className="lg:w-1/2 bg-base-200">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-[420px] object-cover"
              />
            </figure>
            <div className="card-body lg:w-1/2 p-8 justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="badge badge-primary font-semibold">{book.category}</span>
                  <span className="badge badge-outline font-semibold">
                    Available Copies: {book.totalCopies}
                  </span>
                </div>
                <h1 className="text-3xl font-bold">{book.title}</h1>
                <p className="text-lg font-medium opacity-80">Author: {book.author}</p>
                <p className="text-sm leading-relaxed opacity-90">{book.description}</p>
                <div className="pt-4 border-t border-base-200 text-sm opacity-75 space-y-1">
                  <p>
                    Added by: <span className="font-semibold">{book.userName}</span>
                  </p>
                  <p>Contact: {book.userEmail}</p>
                </div>
              </div>

              <div className="card-actions mt-6">
                <button
                  disabled={book.totalCopies <= 0}
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-primary w-full"
                >
                  {book.totalCopies > 0 ? "Borrow This Book" : "Not Available"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Borrow Confirmation Modal */}
      {isModalOpen && book && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-primary mb-2">Borrow Book</h3>
            <p className="text-sm opacity-75 mb-4">
              You are borrowing <span className="font-semibold">{book.title}</span> for 7 days.
            </p>
            <form onSubmit={handleConfirmBorrow} className="space-y-4">
              <div>
                <label className="label text-sm font-medium">User Name</label>
                <input
                  type="text"
                  value={session?.user?.name || ""}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                />
              </div>
              <div>
                <label className="label text-sm font-medium">User Email</label>
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button disabled={submitting} type="submit" className="btn btn-primary">
                  {submitting ? "Confirming..." : "Confirm Borrow"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PrivateRoute>
  );
}
