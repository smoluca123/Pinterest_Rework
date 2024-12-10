import { baseApi } from "@/apis/baseApi";
import {
  ApiResponseWrapper,
  UserDataType,
  UserDataWithTokenType,
} from "@/lib/types";
import {
  ProfileUpdateValues,
  SignInValues,
  SignUpValues,
} from "@/lib/validations";

export const signInAPI = async (credentials: SignInValues) => {
  try {
    const { data } = await baseApi<ApiResponseWrapper<UserDataWithTokenType>>({
      method: "POST",
      url: "/auth/login",
      data: credentials,
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const signUpAPI = async (credentials: SignUpValues) => {
  try {
    const { data } = await baseApi<ApiResponseWrapper<UserDataWithTokenType>>({
      method: "POST",
      url: "/auth/register",
      data: credentials,
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const sendActiveCodeToEmailAPI = async (userId: number) => {
  try {
    const { data } = await baseApi.post<ApiResponseWrapper<null>>(
      "/auth/send-activation-mail",
      {
        userId,
      },
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const verifyEmailAPI = async ({
  userId,
  code,
}: {
  userId: number;
  code: string;
}) => {
  try {
    const { data } = await baseApi.post<
      ApiResponseWrapper<UserDataWithTokenType>
    >("/auth/activation-by-code", {
      userId,
      code,
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const getMeAPI = async () => {
  try {
    const { data } =
      await baseApi.get<ApiResponseWrapper<UserDataType>>("/user/infomation");

    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const getUserProfileAPI = async ({ userId }: { userId: string }) => {
  try {
    const { data } = await baseApi.get<
      ApiResponseWrapper<UserDataWithTokenType>
    >("/user/infomation/" + userId);
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const updateProfileAPI = async ({
  newData,
}: {
  newData: ProfileUpdateValues;
}) => {
  try {
    const { data } = await baseApi.put<
      ApiResponseWrapper<UserDataWithTokenType>
    >("/user/update-info", newData);
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};
