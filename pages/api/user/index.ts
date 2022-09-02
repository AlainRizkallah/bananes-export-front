import prisma from '../../../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = getSession(req, res)
  
  if(req.method === 'POST'){
  }
  if(req.method === 'GET'){
    const users = await prisma.user.findMany();
    return res.json({users})
  }
  if(req.method === 'DELETE'){

  }
}