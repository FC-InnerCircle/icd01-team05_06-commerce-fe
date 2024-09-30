import { authApi } from '@/lib/api';
import { TokenInfo, TokenResponse } from '@/types/auth-types';

export async function refreshAccessToken(token: TokenInfo): Promise<TokenInfo> {
  try {
    const res = await authApi
      .post('refresh', {
        headers: {
          'Content-Type': 'application/json',
          'refresh-token': `Bearer ${token.refreshToken}`, // Use the refresh token
        },
      })
      .json<TokenResponse>();

    const tokenData = res.data.tokenInfo;

    return {
      ...token,
      accessToken: tokenData.accessToken,
      accessTokenExpiresIn: tokenData.accessTokenExpiresIn,
      refreshToken: tokenData.refreshToken ?? token.refreshToken, // Keep old refresh token if new one not provided
      refreshTokenExpiresIn: tokenData.refreshTokenExpiresIn ?? token.refreshTokenExpiresIn, // Use existing refreshTokenExpiresIn if not provided
    };
  } catch (error) {
    console.log('Error refreshing access token:', error);
    return {
      ...token,
    };
  }
}