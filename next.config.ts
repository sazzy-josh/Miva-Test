import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // optimizePackageImports: ["@chakra-ui/react"],
  images: {
    domains: [
      "images.unsplash.com",
      "miva-university.s3.eu-west-2.amazonaws.com",
      "ui-avatars.com",
    ],
  },
};

export default nextConfig;
