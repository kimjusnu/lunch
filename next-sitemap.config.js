/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://lunchmenu-one.vercel.app", // ← 배포된 실제 URL
    generateRobotsTxt: true, // robots.txt 자동 생성
    sitemapSize: 7000, // 한 sitemap에 담을 최대 URL 수
};
