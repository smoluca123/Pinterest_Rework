import { PropsWithClassName, UserDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface IProps extends PropsWithChildren, PropsWithClassName {
  userData: UserDataType;
}

export default function UsernameLink({
  userData,
  children,
  className,
}: IProps) {
  const { user } = useAppSelector(selectAuth);
  const toPath =
    user?.id !== userData.id
      ? `/profile/${userData.username}/${userData.id}`
      : "/profile   ";

  return (
    <Link to={toPath} className={cn("", className)}>
      {children}
    </Link>
  );
}
