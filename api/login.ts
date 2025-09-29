import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET!;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && await bcrypt.compare(password, ADMIN_PASSWORD_HASH)) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`);
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}