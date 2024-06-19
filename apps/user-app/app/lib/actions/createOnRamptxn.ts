"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRamptxn(amount : number,provider : string){
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token = Math.random().toString(); // this token comes from the bank; here simulated to random

    if(!userId){
        return {
            message : "User not logged in"
        };
    }

    await prisma.onRampTransaction.create({
        data : {
            userId : Number(userId),
            amount : Number(amount) * 100,
            status : "Processing",
            startTime : new Date(),
            provider,
            token : token
        }
    })

    return {
        message : "OnRamp transaction added"
    }

}