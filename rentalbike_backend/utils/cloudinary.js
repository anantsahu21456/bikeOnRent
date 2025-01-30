import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config();


(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARI_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:  process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    // console.log("Cloudinary Config:", {
    //     cloud_name: process.env.CLOUDINARI_CLOUD_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET ? "*******" : "Missing"
    // });
    
       
})();

const uploadOnCloudinary = async function (localfilePath) {
    try {
        if(! localfilePath) return null

        //^ upload the file on cloudinary
         const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type: "auto",
        })
        // file has been sucessfully uploaded
        console.log("file is uploaded sucessfully",response.url)
        fs.unlinkSync(localfilePath)
        return response;
        
    } catch (error) {
        fs.unlinkSync(localfilePath) //removed the locally saved tempory file as the upload operation got failed
        return null; 

        
    }
    
}
export {uploadOnCloudinary}