import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "www.gstatic.com",
      "lh3.googleusercontent.com",
    ],
  },
  env: {
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
  },
};

export default withFlowbiteReact(nextConfig);
