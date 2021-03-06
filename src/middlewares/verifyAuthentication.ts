import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const verifyAuthentication = (
  request: Request,
  response: Response,
  next: NextFunction,
): any => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Auth header is missing!', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token!', 401);
  }
};

export default verifyAuthentication;
