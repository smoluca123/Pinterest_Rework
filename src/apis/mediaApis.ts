import { baseApi } from '@/apis/baseApi';
import {
  ApiResponsePaginationWrapper,
  ApiResponseWrapper,
  CommentDataType,
  PinDataType,
} from '@/lib/types';

export const getPinsAPI = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await baseApi<ApiResponsePaginationWrapper<PinDataType[]>>(
      {
        method: 'GET',
        url: '/media/get-media-list',
        params: {
          page,
          limit,
        },
      }
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const getPinDetailAPI = async (pinId: number) => {
  try {
    const { data } = await baseApi.get<ApiResponseWrapper<PinDataType>>(
      '/media/get-media-detail/' + pinId
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const getCommentsAPI = async ({
  pinId,
  page = 1,
  limit = 10,
}: {
  pinId: number;
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await baseApi.get<
      ApiResponsePaginationWrapper<CommentDataType[]>
    >('/media/get-comments/' + pinId, {
      params: {
        page,
        limit,
      },
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const postCommentAPI = async ({
  pinId,
  content,
}: {
  pinId: number;
  content: string;
}) => {
  try {
    const { data } = await baseApi.post<ApiResponseWrapper<CommentDataType>>(
      '/media/create-comment/' + pinId,
      {
        content,
      }
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const removeCommentAPI = async ({
  commentId,
}: {
  commentId: number;
}) => {
  try {
    const { data } = await baseApi.delete<ApiResponseWrapper<null>>(
      '/media/remove-comment/' + commentId
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};
