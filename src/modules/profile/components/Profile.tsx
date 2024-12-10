import ProfileLayout from "@/modules/profile/components/ProfileLayout";
import {
  useGetCreatedPins,
  useQueryUserProfile,
} from "@/modules/profile/components/querys";
import { Navigate, useParams } from "react-router-dom";

export default function Profile() {
  const { username, userId } = useParams();
  if (!username || !userId) return <Navigate to="/" replace />; // Handle invalid username

  const profileQuery = useQueryUserProfile({
    userId: userId,
  });
  const createdPinsQuery = useGetCreatedPins({
    userId: +userId,
  });
  return (
    <div>
      <ProfileLayout
        profileQuery={profileQuery}
        createdPinsQuery={createdPinsQuery}
      />
    </div>
  );
}
