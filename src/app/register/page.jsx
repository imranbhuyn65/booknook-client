"use client";
import { useState, useEffect } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "BookNook | Register";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // Simple password rule: just a short minimum length
    if (password.length < 4) {
      return setError("Password must be at least 4 characters long.");
    }

    setLoading(true);
    const { error: authError } = await signUp.email({
      email,
      password,
      name,
    });
    setLoading(false);

    if (authError) {
      const msg = authError.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    } else {
      toast.success("Account created successfully! Welcome to BookNook.");
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">Register Account</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label text-sm font-medium">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Your email address"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="At least 4 characters"
              className="input input-bordered w-full"
              required
            />
          </div>

          {error && <p className="text-error text-sm font-medium">{error}</p>}

          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="divider text-xs opacity-60">OR</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          Continue with Google
        </button>

        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
