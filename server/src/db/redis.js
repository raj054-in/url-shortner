import { createClient } from "redis";


const redisClient=createClient({url:process.env.REDIS_URL})
async function connectRedis() {
    try {
        await redisClient.connect()
        console.log("connected to redis")
    } catch (error) {
        console.log(error)
        
    }
    
}

async function startCounter(req,res) {

   await redisClient.set("url:counter",10000,{NX:true})
    
}
export {redisClient, connectRedis,startCounter}