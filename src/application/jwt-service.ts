import * as jwt from 'jsonwebtoken';
import { formatISO } from 'date-fns';
import { settings } from '../settings';

export const jwtService = {
  async createAccessToken(userId: number) {
    const accessToken = jwt.sign({ userId }, settings.ACCESS_TOKEN_SECRET, {
      expiresIn: '10d',
    });
    return accessToken;
  },
  async createRefreshToken(userId: number, deviceId: string) {
    const refreshToken = jwt.sign(
      { userId, deviceId },
      settings.REFRESH_TOKEN_SECRET,
      { expiresIn: '20d' },
    );
    return refreshToken;
  },
  async getUserIdByAccessToken(token: string) {
    try {
      const result: any = jwt.verify(token, settings.ACCESS_TOKEN_SECRET);
      return result.userId;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getRefreshTokenUserIdAndDeviceId(token: string) {
    try {
      const result: any = jwt.verify(token, settings.REFRESH_TOKEN_SECRET);

      return {
        userId: result.userId,
        deviceId: result.deviceId,
        iat: formatISO(new Date(result.iat * 1000)),
      };
    } catch (error) {
      console.log('getRefreshTokenUserIdAndDeviceId error', error);
      return null;
    }
  },
  async getIatRefreshToken(token: string) {
    try {
      const result: any = jwt.verify(token, settings.REFRESH_TOKEN_SECRET);
      return result.iat * 1000;
    } catch (error) {
      return null;
    }
  },
};