export interface PropsWithClassName {
  className?: string;
}

export interface ApiResponseWrapper<T> {
  statusCode: number;
  message: string;
  data: T;
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
