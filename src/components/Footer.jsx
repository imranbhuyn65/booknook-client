import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary mb-3">
            <BookOpen className="w-7 h-7" />
            <span>BookNook</span>
          </Link>
          <p className="text-sm opacity-80 leading-relaxed max-w-sm">
            A cozy community online library where readers share stories, discover timeless classics, and borrow books effortlessly.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>42 Readers Avenue, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>+880 1711-223344</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>hello@booknook.org</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Connect With Us</h3>
          <div className="flex items-center gap-3">
            {/* New X Logo */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="btn btn-circle btn-outline btn-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="btn btn-circle btn-outline btn-sm font-bold"
            >
              f
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="btn btn-circle btn-outline btn-sm font-bold"
            >
              in
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 py-4 text-center text-sm opacity-75">
        © {new Date().getFullYear()} BookNook Online Library. All rights reserved.
      </div>
    </footer>
  );
}
