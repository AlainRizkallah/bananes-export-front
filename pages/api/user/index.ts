import prisma from '../../../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = getSession(req, res)
  
  if(req.method === 'POST'){
    const { newName, newEmail, value} = req.body;
    if (!session) return { prisma }
    const result = await prisma.user.create({
      data: {
        name: newName,   
        email: newEmail,
        ArrivalAt : value,
      },
    });
    return res.json(result.id);

  }
  if(req.method === 'GET'){
    const users = await prisma.user.findMany();
    return res.json({users})
  }
  if(req.method === 'DELETE'){

  }
}