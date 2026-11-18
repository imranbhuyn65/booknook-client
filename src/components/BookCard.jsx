import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 flex flex-col h-full">
      <figure className="h-64 w-full overflow-hidden bg-base-200">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </figure>
      <div className="card-body flex-1 flex flex-col justify-between p-5">
        <div>
          <div className="flex justify-between items-center gap-2 mb-2">
            <span className="badge badge-primary badge-outline text-xs font-semibold">
              {book.category}
            </span>
            <span className="text-xs opacity-70 font-medium">
              Copies: {book.totalCopies ?? 1}
            </span>
          </div>
          <h3 className="card-title text-lg font-bold line-clamp-1">{book.title}</h3>
          <p className="text-sm opacity-75 mt-1">By {book.author}</p>
        </div>
        <div className="card-actions mt-4">
          <Link href={`/books/${book._id}`} className="btn btn-primary btn-sm w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
