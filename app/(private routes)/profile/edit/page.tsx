import { getServerMe } from "@/lib/api/serverApi";
import EditProfileClient from "./EditProfileClient";

export default async function EditProfile() {
  const user = await getServerMe();

  return <EditProfileClient user={user.data} />;
}
