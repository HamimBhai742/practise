import { prisma } from "../lib/prisma"

export const connectDB=async()=>{
    await prisma.$connect().then(()=>{
        console.log('✅ Database connected successed')
    }).catch(()=>{
        console.log('❌ Database connected failed')
    })
}