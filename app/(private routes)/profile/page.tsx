import Link from "next/link";
import { Metadata } from "next";
import css from "./Profile.module.css";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();

  return {
    title: `${user.username} | Profile`,
    description: `View the profile of ${user.username}. Email: ${user.email}`,
    openGraph: {
      title: `${user.username} | Profile`,
      description: `Personal profile page of ${user.username}. Email: ${user.email}`,
      url: `https://09-auth-eight-mu.vercel.app/profile`,
      images: [
        {
          url:
            user.avatar ||
            "https://ac.goit.global/fullstack/react/default-avatar.jpg",
          width: 1200,
          height: 630,
          alt: `${user.username} avatar`,
        },
      ],
    },
  };
}

export default async function Profile() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
