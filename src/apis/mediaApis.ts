import { baseApi } from "@/apis/baseApi";
import {
  ApiResponsePaginationWrapper,
  ApiResponseWrapper,
  CommentDataType,
  PinDataType,
  SavedPinDataType,
} from "@/lib/types";
import { PinCreateValues, PinUpdateValues } from "@/lib/validations";

export const getPinsAPI = async ({
  keyword = "",
  page = 1,
  limit = 10,
}: {
  keyword?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await baseApi<ApiResponsePaginationWrapper<PinDataType[]>>(
      {
        method: "GET",
        url: "/media/get-media-list",
        params: {
          keyword,
          page,
          limit,
        },
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

export const getPinDetailAPI = async (pinId: number) => {
  try {
    const { data } = await baseApi.get<ApiResponseWrapper<PinDataType>>(
      "/media/get-media-detail/" + pinId,
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const removePinAPI = async ({ pinId }: { pinId: number }) => {
  try {
    const { data } = await baseApi.delete<ApiResponseWrapper<null>>(
      "/media/remove-media/" + pinId,
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
  replyTo,
}: {
  pinId: number;
  page?: number;
  limit?: number;
  replyTo?: number | null;
}) => {
  try {
    const { data } = await baseApi.get<
      ApiResponsePaginationWrapper<CommentDataType[]>
    >("/media/get-comments/" + pinId, {
      params: {
        page,
        limit,
        replyTo,
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

export const updateCommentAPI = async ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) => {
  try {
    const { data } = await baseApi.patch<ApiResponseWrapper<CommentDataType>>(
      "/media/update-comment/" + commentId,
      {
        content,
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

export const postCommentAPI = async ({
  pinId,
  content,
  replyTo,
}: {
  pinId: number;
  content: string;
  replyTo?: number | null;
}) => {
  try {
    const { data } = await baseApi.post<ApiResponseWrapper<CommentDataType>>(
      "/media/create-comment/" + pinId,
      {
        content,
        replyToCommentId: replyTo,
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

export const removeCommentAPI = async ({
  commentId,
}: {
  commentId: number;
}) => {
  try {
    const { data } = await baseApi.delete<ApiResponseWrapper<null>>(
      "/media/remove-comment/" + commentId,
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const getSavedPinsAPI = async ({
  pinId,
  page = 1,
  limit = 10,
}: {
  pinId?: number;
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await baseApi.get<
      ApiResponsePaginationWrapper<SavedPinDataType[]>
    >("/media/get-saved-medias", {
      params: {
        id: pinId,
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

export const getCreatedPinsAPI = async ({
  userId,
  page = 1,
  keyword,
  limit = 10,
}: {
  userId: number;
  keyword?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await baseApi.get<
      ApiResponsePaginationWrapper<PinDataType[]>
    >("/media/get-media-list/" + userId, {
      params: {
        keyword,
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

export const toggleSavePinAPI = async ({ pinId }: { pinId: number }) => {
  try {
    const { data } = await baseApi.post<
      ApiResponseWrapper<SavedPinDataType | null>
    >("/media/save-media/" + pinId);
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const pinCreateAPI = async (pinData: PinCreateValues) => {
  try {
    const formData = new FormData();

    // Add form data fields to FormData
    Object.entries(pinData).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((file) => {
          formData.append("files", file);
        });
      } else {
        formData.append(key, value as string);
      }
    });

    const { data } = await baseApi.post<ApiResponseWrapper<PinDataType>>(
      "/media/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

export const pinUpdateAPI = async ({
  pinId,
  payload,
}: {
  pinId: number;
  payload: PinUpdateValues;
}) => {
  try {
    const { data } = await baseApi.patch<ApiResponseWrapper<PinDataType>>(
      "/media/update-media/" + pinId,
      payload,
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};
