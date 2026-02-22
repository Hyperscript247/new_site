import { config } from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

// Load environment variables
config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function testCloudinary() {
  console.log('Testing Cloudinary configuration...')
  console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME)
  console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Not set')
  console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Not set')

  try {
    // Test by listing existing resources
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 1,
    })
    console.log('✅ Cloudinary connection successful!')
    console.log('Resources found:', result.resources.length)
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error)
  }
}

testCloudinary()
