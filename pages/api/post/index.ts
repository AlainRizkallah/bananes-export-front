import prisma from '../../../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = getSession(req, res)
  
  if(req.method === 'POST'){
  const { postType, employee } = req.body;
  if (!session) return { prisma }
  const { user, accessToken } = session
  const result = await prisma.post.create({
    data: {
      postType: postType,    
      User_author: { connect: { email: user?.email } },
      User_employee: { connect: { email: employee?.email } },
    },
  });
  return res.json(result.id);
  }
  if(req.method === 'GET'){
    const posts = await prisma.post.findMany({
      include: {
        User_author: {
          select: { name: true, email: true },
        },
        User_employee: {
          select: { name: true, email: true },
        }
      },
    });
    return res.json({posts})
  }
  if(req.method === 'DELETE'){
    const { post } = req.body;
    if (!session) return { prisma }
    const { user, accessToken } = session
    if (user.email !== post.author.email) return { prisma }
    const result = await prisma.post.delete({
      where: {
        id: post.id,
      },
    });
    return res.json(result);
  }
}