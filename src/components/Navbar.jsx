"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { BookOpen, Sun, Moon, Menu } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("booknook-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      api
        .post("/jwt", { email: session.user.email })
        .then((res) => {
          localStorage.setItem("booknook-token", res.data.token);
        })
        .catch(() => {});
    }
  }, [session]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("booknook-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("booknook-token");
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinkClass = (path) =>
    pathname === path ? "text-primary font-bold bg-base-200" : "font-medium";

  const navItems = (
    <>
      <li>
        <Link href="/" className={navLinkClass("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/books" className={navLinkClass("/books")}>
          All Books
        </Link>
      </li>
      {session && (
        <>
          <li>
            <Link href="/add-book" className={navLinkClass("/add-book")}>
              Add Book
            </Link>
          </li>
          <li>
            <Link href="/my-books" className={navLinkClass("/my-books")}>
              My Books
            </Link>
          </li>
          <li>
            <Link href="/my-borrows" className={navLinkClass("/my-borrows")}>
              My Borrows
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden mr-1">
              <Menu className="w-5 h-5" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
            >
              {navItems}
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary">
            <BookOpen className="w-7 h-7" />
            <span>BookNook</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{navItems}</ul>
        </div>

        <div className="navbar-end gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {!session ? (
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn btn-outline btn-primary btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={session.user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt={session.user.name || "User"}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[50] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-56 border border-base-300"
              >
                <li className="px-3 py-2 border-b border-base-200 mb-1">
                  <span className="font-bold text-primary block truncate">
                    {session.user.name}
                  </span>
                  <span className="text-xs opacity-70 block truncate">
                    {session.user.email}
                  </span>
                </li>
                <li>
                  <Link href="/my-books">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-error font-semibold">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
