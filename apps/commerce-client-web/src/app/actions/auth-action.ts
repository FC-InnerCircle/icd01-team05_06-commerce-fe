'use server';

import { api } from '@/lib/api';
import { LoginFormData, SignupFormData } from '@/stores/use-auth-store';
import { ApiResponse } from '@/types/api-types';
import { AuthToken, TokenInfo, TokenResponse, UserInfo } from '@/types/auth-types';
import { getHeadersWithToken } from './utils/action-helper';
import { removeTokenInfo, setTokenInfo } from '@/lib/cookies';
import { redirect } from 'next/navigation';
import { UserInfoFormData } from '@/stores/use-user-store';

export const login = async (formData: LoginFormData) => {
  const response = await api
    .post('auth/v1/login', {
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .json<TokenResponse>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message);
  }

  setTokenInfo(response.data.tokenInfo);
};

export const signUp = async (formData: SignupFormData) => {
  try {
    console.log('formData:', formData);

    const response = await api
      .post('auth/v1/sign-up', {
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message);
    }
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export const logout = async () => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const response = await api
      .post('auth/v1/logout', {
        headers,
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message);
    }
  } catch (error) {
    console.error('Error logging out:', error);
  } finally {
    removeTokenInfo();
    redirect('/');
  }
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const headers = await getHeadersWithToken();

  if (!headers) {
    throw new Error('No token found');
  }

  const response = await api
    .get('auth/v1/info', {
      headers,
    })
    .json<ApiResponse<UserInfo>>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message);
  }

  return response.data;
};

export const updateUserInfo = async (
  userInfo: UserInfoFormData,
  authToken: string,
): Promise<boolean> => {
  const headers = await getHeadersWithToken();

  if (!headers) {
    throw new Error('No token found');
  }

  const filteredUserInfo = { ...userInfo };

  if (!filteredUserInfo.password) {
    delete filteredUserInfo.password;
  }

  const response = await api
    .put('auth/v1/update', {
      body: JSON.stringify(filteredUserInfo),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
        ...headers,
      },
    })
    .json<ApiResponse<null>>();

  if (!response.success) {
    throw new Error(response.error?.message);
  }

  return response.success;
};

export const refreshAccessToken = async (refreshToken: string): Promise<TokenInfo> => {
  try {
    const response = await api
      .post('auth/v1/refresh', {
        headers: {
          'Content-Type': 'application/json',
          'refresh-token': `Bearer ${refreshToken}`,
        },
      })
      .json<TokenResponse>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message);
    }

    return response.data.tokenInfo;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    removeTokenInfo();
    redirect('/');
  }
};

export const verifyPassword = async (password: string): Promise<AuthToken> => {
  const headers = await getHeadersWithToken();

  if (!headers) {
    throw new Error('No token found');
  }

  const response = await api
    .post('auth/v1/password-verify', {
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
    .json<ApiResponse<AuthToken>>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message);
  }

  return response.data;
};

export const deleteUserAccount = async () => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const response = await api
      .delete('auth/v1/withdrawal', {
        headers,
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message);
    }
  } catch (error) {
    console.error('Error deleting user account:', error);
  } finally {
    removeTokenInfo();
    redirect('/');
  }
};
