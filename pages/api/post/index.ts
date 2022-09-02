import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = getSession(req, res)
  
  if(req.method === 'POST'){
  const { postType} = req.body;
  var pcType = null;
  var Phone = null;
  var screen = null;
  if(postType==="TRADE"){
    pcType = "fixe";
    screen = 3;
  }else if(postType==="COM"){
    pcType = "portable";
    Phone = "smartphone";
  }
  if (!session) return { prisma }
  const { user, accessToken } = session
  const result = await prisma.post.create({
    data: {
      postType: postType,   
      pcType: pcType,
      Phone : Phone,
      screen : screen,
      User_author: { connect: { email: user?.email } }
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
    if ((user.email !== post.User_author.email) && (user.email !== post.User_employee.email)) return { prisma }
    const result = await prisma.post.delete({
      where: {
        id: post.id,
      },
    });
    return res.json(result);
  }
  if(req.method === 'PUT'){
    const { post, personId, pcType, nbScreen, phone, checked} = req.body;
    if (!session) return { prisma }
    const { user, accessToken } = session
    if ((user.email !== post.User_author.email) && (user.email !== post.User_employee.email)) return { prisma }
    
    const result = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        pcType: pcType,
        employee: personId,
        screen : nbScreen,
        Phone: phone,
        Headset: checked 
      },
    });
    return res.json(result);

  }
}