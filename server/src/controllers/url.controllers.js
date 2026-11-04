
import { redisClient } from "../db/redis.js";
import base62Convert from "../library/base62conversion.js";
import Url from "../models/url.model.js";

const notImplemented = (action) => (req, res) => {
  res.status(501).json({
    message: `${action} is not implemented yet`,
  });
};
function isValidUrl(input) {
  try {
    const url = new URL(input)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}
async function createShortUrl(req,res) {
  const{ longUrl}=req.body
  const isValid=isValidUrl(longUrl)
  if (!longUrl||!isValid) {
    return res.status(400).json({
      message:"Url is empty or invalid"
    })
  }
  try {
    const count=await redisClient.incr("url:counter")
    const base62String = base62Convert(count)

    await Url.create({
      originalUrl:longUrl,
      shortCode:base62String,
    })
    await redisClient.set(`url:${base62String}`,longUrl,{EX:86400})

    res.status(201).json({
      shortUrl:`${process.env.BASE_URL}/${base62String}`
    })

  } catch (error) {
    res.status(500).json({
      error
    })
    
  }
}
async function redirectToOriginalUrl(req,res) {
  const {shortCode}=req.params
  try {
    let longUrl= await redisClient.get(`url:${shortCode}`)
    if (!longUrl) {
      const doc=await Url.findOne({shortCode})
      if (!doc) {

        return res.status(404).json({
          message:"url not found"
        })
        
      }
      longUrl=doc.originalUrl
      await redisClient.set(`url:${shortCode}`,longUrl,{EX:86400})

      
    }
    return res.redirect(longUrl)
    
  } catch (error) {
    res.status(500).json({
      error
    })
    
  }
  
}
async function getUrlStats(params) {
  
}
async function deleteShortUrl(params) {
  
}

export {createShortUrl,redirectToOriginalUrl,getUrlStats,deleteShortUrl}
