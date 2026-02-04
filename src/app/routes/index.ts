import { Router } from "express";
import { userRoutes } from "../module/user/user.routes";
import { authRoutes } from "../module/auth/auth.routes";

const router=Router()

const routes=[
    {
        path:'/users',
        route:userRoutes
    },
    {
        path:'/auth',
        route:authRoutes
    }
]

routes.forEach(route=>{
    router.use(route.path,route.route)
})

export default router