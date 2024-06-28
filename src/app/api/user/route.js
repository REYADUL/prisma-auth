import { NextResponse } from "next/server";
import db from "@/utils/db";
import { hash } from "bcrypt";

export async function POST(req){
    try{
        const body = await req.json();
        const {email, phone , password} = body;
        const phoneNumber =  Number(phone);
        console.log(body);

        const existinguserByEmail = await db.user.findUnique({
            where: {email: email}
        });
        if(existinguserByEmail){
            return NextResponse.json({user: null, message:"this email already exist"},{status:400})
        }
        const existinguserByPhone = await db.user.findUnique({
            where: {phone: phone}
        });
        if(existinguserByPhone){
            return NextResponse.json({user: null, message:"this phone number already exist"},{status:400})
        }

        const hashedPass = await hash(password,10);

        const newuser = await db.user.create({
            data: {
                email,
                phone,
                password: hashedPass
            }
        })

        const {password:newUserPassword,...rest} = newuser;
        return NextResponse.json({user:rest,message: 'user created successfully'},{status:201});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:'it is error'},{status:500});
        
    }
}


export async function GET(req, res) {
  
    try {
      const users = await db.user.findMany();
      return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' });
    }

}
