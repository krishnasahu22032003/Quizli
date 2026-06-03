import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { SignUpSchema } from "@/schemas/User.schema";

const SALT_ROUNDS = 12 ; 

export async function POST(req: Request) {

    try{

        const body =await  req.json() ;

        const parsedData = SignUpSchema.safeParse(body) ;

        if(!parsedData.success){

            return NextResponse.json({
                success:false ,
                message:"Invalid Credentials",
                error:parsedData.error.flatten()
            },{
                status:400
            });
        };
    
         
     const {username , email , password} = parsedData.data ; 

       const checkUser = await prisma.user.findUnique({
        where:{
            email
        }
       });

     if(checkUser){

        return NextResponse.json({
            success:false ,
            message:"User with this email Already exists"
        },{
            status:400
        });
     };
    
     const hashedPassword = await bcrypt.hash(password , SALT_ROUNDS) ;

     const user = await prisma.user.create({
        data:{
            email,
            username,
            password:hashedPassword
        }
     });

     return NextResponse.json({
        success:true ,
        message:"User created Successfully",
        data:{
            id:user.id,
            name:user.username,
            email:user.email
        }
     },{
        status:201
     });

     }catch(error){
       console.log((error as Error).message) ;
       return NextResponse.json({
        success:false ,
        message:"Internal server error"
       },{
        status:500
       });
    };
};


