import { prisma } from "../lib/prisma"

export const connectDB=async()=>{
    await prisma.$connect().then(()=>{
        console.log('Database connected succed')
    }).catch(()=>{
        console.log('Database connected failed')
    })
}