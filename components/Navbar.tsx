"use client";

export default function Navbar({ user }: { user: { username: string } | null }) {
  return (
    <nav>
      <div className="nav-container">
        <a href="/">Home</a>
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <a href="/api/logout">Logout</a>
          </>
        ) : (
          <a href="/auth/signin">Sign In</a>
        )}
      </div>
    </nav>
  );
}
