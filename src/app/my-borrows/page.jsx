"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function MyBorrowsPage() {
  const { data: session } = useSession();
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "BookNook | My Borrows";
    if (session?.user?.email) {
      api
        .get(`/borrows?email=${session.user.email}`)
        .then((res) => setBorrows(res.data))
        .catch(() => toast.error("Failed to fetch borrowed books"))
        .finally(() => setLoading(false));
    }
  }, [session]);

  const handleReturnBook = async (borrowId) => {
    try {
      await api.delete(`/borrows/${borrowId}`);
      setBorrows((prev) => prev.filter((item) => item._id !== borrowId));
      toast.success("Book returned successfully!");
    } catch (err) {
      toast.error("Failed to return book");
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">My Borrowed Books</h1>

        {loading ? (
          <div className="min-h-[50vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : borrows.length === 0 ? (
          <div className="text-center py-16 bg-base-200 rounded-xl">
            <p className="text-lg font-medium mb-4">You currently have no borrowed books.</p>
            <Link href="/books" className="btn btn-primary btn-sm">
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 rounded-xl shadow border border-base-300">
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th>Image</th>
                  <th>Book Title</th>
                  <th>Borrow Date</th>
                  <th>Return Date</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {borrows.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.bookImage}
                        alt={item.bookTitle}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="font-bold">{item.bookTitle}</td>
                    <td>{item.borrowDate}</td>
                    <td>{item.returnDate}</td>
                    <td className="text-right">
                      <button
                        onClick={() => handleReturnBook(item._id)}
                        className="btn btn-warning btn-sm"
                      >
                        Return Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
