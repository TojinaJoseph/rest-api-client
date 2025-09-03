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
  if (data) {
    return <div>Welcome! {data.name}</div>;
  }
  return (
    <div className={styles.page}>
      <a href={getGoogleOAuthURL()}>Login with Google</a>
      Please login
    </div>
  );
}
