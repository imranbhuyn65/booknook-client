"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "BookNook | Add Book";
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const imageFile = form.image.files[0];

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await imgRes.json();

      if (!imgData.success) {
        throw new Error("Image upload failed. Please check your ImgBB API key.");
      }

      const newBook = {
        title: form.title.value,
        author: form.author.value,
        category: form.category.value,
        totalCopies: parseInt(form.totalCopies.value),
        image: imgData.data.display_url,
        description: form.description.value,
        userName: session.user.name,
        userEmail: session.user.email,
      };

      await api.post("/books", newBook);
      toast.success("Book added to BookNook successfully!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Add a New Book</h1>
        <form
          onSubmit={handleAddBook}
          className="space-y-4 bg-base-100 p-8 rounded-xl shadow-lg border border-base-300"
        >
          <div>
            <label className="label text-sm font-medium">Book Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g., The Alchemist"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label text-sm font-medium">Author Name</label>
            <input
              name="author"
              type="text"
              placeholder="e.g., Paulo Coelho"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-sm font-medium">Category</label>
              <select name="category" className="select select-bordered w-full" required>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="label text-sm font-medium">Total Copies</label>
              <input
                name="totalCopies"
                type="number"
                min="1"
                defaultValue="1"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="label text-sm font-medium">Book Cover Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label text-sm font-medium">Short Description</label>
            <textarea
              name="description"
              placeholder="Write a brief summary of the book..."
              className="textarea textarea-bordered w-full h-28"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-sm font-medium">Added By (Name)</label>
              <input
                type="text"
                value={session?.user?.name || ""}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>
            <div>
              <label className="label text-sm font-medium">Added By (Email)</label>
              <input
                type="email"
                value={session?.user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>
          </div>

          <button disabled={loading} className="btn btn-primary w-full mt-2">
            {loading ? "Uploading & Saving..." : "Add Book"}
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
}
