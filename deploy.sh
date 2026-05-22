#!/bin/bash
# Sherry-Web 自动部署脚本到 ChemiCloud

set -e  # 遇到错误立即退出

echo "🚀 开始构建 Sherry-Web..."

# 1. 构建项目
echo "📦 正在构建..."
npm run build

# 2. 压缩构建文件
echo "🗜️  正在压缩..."
rm -f sherry-web-build.tar.gz
tar -czf sherry-web-build.tar.gz -C out .

# 3. 显示文件大小
echo "✅ 构建完成！"
ls -lh sherry-web-build.tar.gz

echo ""
echo "📤 下一步："
echo "1. 上传 sherry-web-build.tar.gz 到 ChemiCloud"
echo "2. 解压到 /it.swisspro.site 目录"
echo "3. 访问 https://it.swisspro.site/it.swisspro.site/"
echo ""
echo "或者使用 SCP 上传："
echo "scp sherry-web-build.tar.gz user@server:/path/to/it.swisspro.site/"
