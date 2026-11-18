"use client";
import { useState, useEffect, Suspense } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  useEffect(() => {
    document.title = "BookNook | Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    const { error: authError } = await signIn.email({
      email,
      password,
    });
    setLoading(false);

    if (authError) {
      const msg = authError.message || "Invalid email or password";
      setError(msg);
      toast.error(msg);
    } else {
      toast.success("Welcome back to BookNook!");
      router.push(redirectPath);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: redirectPath,
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">Login to BookNook</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
            <div className="text-right mt-1">
              <button
                type="button"
                onClick={() => toast("Password reset is disabled for demo evaluation.")}
                className="text-xs text-primary hover:underline"
              >
                Forget Password?
              </button>
            </div>
          </div>

          {error && <p className="text-error text-sm font-medium">{error}</p>}

          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider text-xs opacity-60">OR</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          Continue with Google
        </button>

        <p className="text-center text-sm mt-5">
          New to BookNook?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>}>
      <LoginForm />
    </Suspense>
  );
}
