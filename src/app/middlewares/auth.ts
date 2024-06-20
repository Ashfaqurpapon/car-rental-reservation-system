import httpStatus from 'http-status';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const inputToken = req.headers.authorization;
    const prefix = 'Bearer ';
    if (!inputToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    if (!inputToken.startsWith(prefix)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Not valid token!');
    }
    const token = inputToken.replace('Bearer ', '');

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role } = decoded;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
