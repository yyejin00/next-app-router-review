/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  logging: {
    fetches: {//서버 리퀘스 로그 확인하기
      fullUrl: true,
    },
  },
};

export default nextConfig;
