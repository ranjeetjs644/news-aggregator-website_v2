import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

// configurations 


cloudinary.config({
    cloud_name: 'dsswwhcrk',
    api_key: '865488674549722',
    api_secret: 'nXQCZtWsW_lpEveRblvxF4ozL-Y' // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log('LocalPath of file not found')
            return null;
        }
        // upload
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto' })
        // uploaded successfully
        console.log('File uploaded on cloudinary successfully', response.url);
        // remove localpathFile after successfull response
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log('Error in uploading file on cloudinary', error);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadOnCloudinary };