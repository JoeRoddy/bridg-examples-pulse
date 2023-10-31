import type { NextApiRequest, NextApiResponse } from 'next';

// import db from 'prisma/db';
import { PrismaClient } from 'prisma/prisma';
// import { DbRules, handleRequest } from 'bridg/server/request-handler';
import { DbRules } from 'prisma/bridg_pulse/server';
import { handleRequest } from 'prisma/bridg_pulse/server/request-handler';

const db = new PrismaClient();
// const prisma = new PrismaClient().$extends(withPulse({ apiKey: PULSE_API_KEY }));
const dbRules: DbRules = { default: true };

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // Mock authentication, replace with any auth system you want.
  const userId = 'cld4ar9fg000clfd96gujbblu';
  const { data, status } = await handleRequest(req.body, { db, uid: userId, rules: dbRules });

  return res.status(status).json(data);
}
