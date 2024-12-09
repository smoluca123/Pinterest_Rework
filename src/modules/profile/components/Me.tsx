import ProfileLayout from "@/modules/profile/components/ProfileLayout";
import {
  useGetCreatedPins,
  useGetSavedPins,
  useQueryMe,
} from "@/modules/profile/components/querys";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import { Navigate } from "react-router-dom";

export default function Me() {
  const { user } = useAppSelector(selectAuth);
  if (!user) return <Navigate to="/" />;
  const { data } = useQueryMe();
  const savedPinsQuery = useGetSavedPins();
  const createdPinsQuery = useGetCreatedPins({
    userId: user.id,
  });
  return (
    <div>
      {data && (
        <ProfileLayout
          userData={data}
          savedPinsQuery={savedPinsQuery}
          createdPinsQuery={createdPinsQuery}
        />
      )}
    </div>
  );
}
