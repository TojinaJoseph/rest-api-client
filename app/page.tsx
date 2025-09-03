"use client";
import useSWR from "swr";
import styles from "./page.module.css";
import swr from "swr";
import fetcher from "@/utils/fetcher";
import getGoogleOAuthURL from "@/utils/getGoogleUrl";

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

export default function Home() {
  const { data, error } = useSWR<User | null>(
    `
    ${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me
    `,
    fetcher
  );

  async function handleLogout() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/logout`,
        {
          method: "POST", // Or GET, depending on how you set up the route
        }
      );

      if (response.ok) {
        console.log("User logged out successfully");
        // Redirect the user to the login page or home page
        window.location.href = "/auth/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  }
  if (data) {
    return (
      <div>
        <p>Welcome! {data.name}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  return (
    <div className={styles.page}>
      <button>
        <a href={getGoogleOAuthURL()}>Login with Google</a>
      </button>
      <a href="/auth/login">Please login</a>
    </div>
  );
}
