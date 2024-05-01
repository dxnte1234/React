/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        "cdn-icons-png.flaticon.com",
        "upload.wikimedia.org",
        "raw.githubusercontent.com",
        "pokeapi.co",
        "dev-to-uploads.s3.amazonaws.com",
        "res.cloudinary.com",
        "media.dev.to",
      ],
    },
  };
  
  export default nextConfig;
  