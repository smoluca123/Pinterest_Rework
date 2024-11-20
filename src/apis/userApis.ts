import { baseApi } from '@/apis/baseApi';
import { ApiResponseWrapper, UserDataWithTokenType } from '@/lib/types';
import { SignInValues, SignUpValues } from '@/lib/validations';

export const signInAPI = async (credentials: SignInValues) => {
  try {
    const { data } = await baseApi<ApiResponseWrapper<UserDataWithTokenType>>({
      method: 'POST',
      url: '/auth/login',
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
      method: 'POST',
      url: '/auth/register',
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
