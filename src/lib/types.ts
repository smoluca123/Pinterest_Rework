export interface PropsWithClassName {
  className?: string;
}

export interface ApiResponseWrapper<T> {
  statusCode: number;
  message: string;
  data: T;
  date: string;
}

export interface ApiResponsePaginationWrapper<T> {
  statusCode: number;
  message: string;
  data: {
    currentPage: number;
    totalPage: number;
    totalItems: number;
    items: T;
  };
  date: string;
}

export interface UserDataType {
  id: number;
  username: string;
  email: string;
  full_name: string;
  avatar: string;
  age: number;
  created_at: string;
  updated_at: string;
  is_hidden: number;
  is_active: number;
  user_type: UserType;
}

export interface UserDataWithTokenType extends UserDataType {
  accessToken: string;
}

interface UserType {
  id: number;
  type_name: string;
}

export interface PinDataType {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
  type: string;
  user: UserDataType;
  image: ImageDataType[];
}

export interface ImageDataType {
  id: number;
  img_name: string;
  url: string;
  created_at: string;
}

export interface CommentDataType {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  level: number;
  reply_to: number | null;
  media_id: number;
  replies: number;
  user: UserDataType;
}

export interface SavedPinDataType {
  id: number;
  created_at: string;
  media: PinDataType;
}

export type coppedAreaType = {
  width: number;
  height: number;
  x: number;
  y: number;
};
