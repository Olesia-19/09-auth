"use client";
import { useRouter } from "next/navigation";
import css from "./EditProfile.module.css";
import { editMe } from "@/lib/api/clientApi";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/lib/store/authStore";

interface Props {
  user: {
    email: string;
    username: string;
    avatar: string;
  };
}

export default function EditProfileClient({ user }: Props) {
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await editMe({
        email: user.email,
        username,
        avatar,
      });

      if (response) {
        setUsername(response.username);
        setAvatar(response.avatar);
        updateUser(response);
        router.push("/profile");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Unknown error");
      } else {
        setError("Unexpected error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleOnChange}
            />
          </div>

          <label htmlFor="avatar">Avatar URL:</label>
          <input
            id="avatar"
            type="text"
            className={css.input}
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <p>Email: {user.email}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
