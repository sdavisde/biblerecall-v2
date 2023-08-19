/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    GOOGLE_CLIENT_ID:
      '807175798071-fqaqphhf9ua5ou82n7c5pni45hg2lh5k.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    NEXTAUTH_SECRET: 'mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=',
  },
}

module.exports = nextConfig
