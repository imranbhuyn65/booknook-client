"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function MyBooksPage() {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBookId, setDeletingBookId] = useState(null);

  useEffect(() => {
    document.title = "BookNook | My Books";
    if (session?.user?.email) {
      api
        .get(`/books?email=${session.user.email}`)
        .then((res) => setBooks(res.data))
        .catch(() => toast.error("Failed to fetch your books"))
        .finally(() => setLoading(false));
    }
  }, [session]);

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      author: form.author.value,
      category: form.category.value,
      totalCopies: parseInt(form.totalCopies.value),
      description: form.description.value,
    };

    try {
      await api.patch(`/books/${editingBook._id}`, updated);
      setBooks((prev) =>
        prev.map((b) => (b._id === editingBook._id ? { ...b, ...updated } : b))
      );
      toast.success("Book updated successfully!");
      setEditingBook(null);
    } catch (err) {
      toast.error("Failed to update book");
    }
  };

  const handleDeleteBook = async () => {
    try {
      await api.delete(`/books/${deletingBookId}`);
      setBooks((prev) => prev.filter((b) => b._id !== deletingBookId));
      toast.success("Book deleted successfully!");
      setDeletingBookId(null);
    } catch (err) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">My Added Books</h1>
          <Link href="/add-book" className="btn btn-primary btn-sm">
            + Add New Book
          </Link>
        </div>

        {loading ? (
          <div className="min-h-[50vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16 bg-base-200 rounded-xl">
            <p className="text-lg font-medium mb-4">You haven&apos;t added any books yet.</p>
            <Link href="/add-book" className="btn btn-primary btn-sm">
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 rounded-xl shadow border border-base-300">
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Copies</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="font-bold">{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <span className="badge badge-outline">{book.category}</span>
                    </td>
                    <td>{book.totalCopies}</td>
                    <td className="text-right space-x-2">
                      <button
                        onClick={() => setEditingBook(book)}
                        className="btn btn-info btn-xs text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingBookId(book._id)}
                        className="btn btn-error btn-xs text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {editingBook && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-xl text-primary mb-4">Edit Book</h3>
              <form onSubmit={handleUpdateBook} className="space-y-3">
                <div>
                  <label className="label text-xs font-medium">Title</label>
                  <input
                    name="title"
                    defaultValue={editingBook.title}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label text-xs font-medium">Author</label>
                  <input
                    name="author"
                    defaultValue={editingBook.author}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label text-xs font-medium">Category</label>
                    <select
                      name="category"
                      defaultValue={editingBook.category}
                      className="select select-bordered w-full"
                    >
                      <option value="Fiction">Fiction</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Kids">Kids</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="label text-xs font-medium">Copies</label>
                    <input
                      name="totalCopies"
                      type="number"
                      min="0"
                      defaultValue={editingBook.totalCopies}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="label text-xs font-medium">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingBook.description}
                    className="textarea textarea-bordered w-full h-24"
                    required
                  ></textarea>
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => setEditingBook(null)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Custom Delete Confirmation Modal */}
        {deletingBookId && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-error">Confirm Deletion</h3>
              <p className="py-4">
                Are you sure you want to permanently remove this book from BookNook?
              </p>
              <div className="modal-action">
                <button
                  onClick={() => setDeletingBookId(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button onClick={handleDeleteBook} className="btn btn-error text-white">
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
