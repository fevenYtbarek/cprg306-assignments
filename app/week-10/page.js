"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log("Sign out error:", error);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Shopping List App</h1>

      {!user ? (
        <div>
          <p className="mb-4">Please log in to continue.</p>
          <button
            onClick={handleSignIn}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login with GitHub
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">
            Welcome, {user.displayName} ({user.email})
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>

            <Link
              href="/week-10/shopping-list"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Go to Shopping List
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
