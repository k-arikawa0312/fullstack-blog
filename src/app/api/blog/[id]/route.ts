import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma =new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
    try {
        console.log(25)
      const id: number = parseInt(req.url.split("/blog/")[1]);
      await main();
  
      const post = await prisma.post.findFirst({ where: { id : id } });
  
      if (!post) {
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        console.log(8599)
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        console.log(99999999)
      await prisma.$disconnect();
    }
  };
  
  export const PUT = async (req: Request, res: NextResponse) => {
    try {
      const id: number = parseInt(req.url.split("/blog/")[1]);
      const { title, description } = await req.json();
  
      await main();
  
      const post = await prisma.post.update({
        data: { title, description },
        where: { id },
      });
  
      return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
  
  export const DELETE = async (req: Request, res: NextResponse) => {
    try {
      const id: number = parseInt(req.url.split("/blog/")[1]);
  
      await main();
  
      const post = await prisma.post.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };