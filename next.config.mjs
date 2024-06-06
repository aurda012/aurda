// import './src/env.mjs';
/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/isomorphic-furyroad/public/**',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'subdomain',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
      },
      { hostname: 'public.blob.vercel-storage.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'abs.twimg.com' },
      { hostname: 'pbs.twimg.com' },
      { hostname: 'avatar.vercel.sh' },
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'www.google.com' },
      { hostname: 'flag.vercel.app' },
      { hostname: 'illustrations.popsy.co' },
      { hostname: 'dashfusion.vercel.app' },
      { hostname: 'aceternity.com' },
    ],
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
