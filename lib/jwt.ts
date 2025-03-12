import jwt from 'jsonwebtoken';

interface Payload {
  userId: string;
  username: string;
}

export function generateToken(payload: Payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h', // Token expiration time
  });
  return token;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    return null;
  }
}
