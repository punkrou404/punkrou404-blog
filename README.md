This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# how to deploy

```
yarn run clean:deployment
# たぶん失敗するが、問題なし
# TypeError: Cannot read property 'debug' of undefined
# cloudfrontを見てDisabledになっているか確認し次へ
# https://console.aws.amazon.com/cloudfront/home?region=ap-northeast-1#distributions:
yarn run deploy:prod
# 5~10分くらいたてば成功
```