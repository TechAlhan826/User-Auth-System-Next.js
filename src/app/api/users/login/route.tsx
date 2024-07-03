import { connect } from "@/dbConfig/dbConfig";
import users  from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs" ;

export async function POST(request: NextRequest){
    try{
        const reqBody  = await request.json();
        var { email, password } = reqBody;
        interface Useru {
            email: string;
            password: string;
          }

        console.log(reqBody); // remove in PROD

        await connect();

        const euser: Useru | null = await users.findOne({ email });

        if(euser){
        const verifyPass = await bcryptjs.compare(password, euser.password);
        if(verifyPass){
        return NextResponse.json({message: "Login Successfull !"}, {status: 200});
        } else {
            return NextResponse.json({message: "Invalid Password !"}, {status: 401});
            
        }
        
        } else {
            return NextResponse.json({message: "User Does Not Exist !"}, {status: 404});
        }
        

    } catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}