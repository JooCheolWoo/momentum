# 베이스 이미지 선택
FROM nginx:latest

# 작업 디렉토리 설정
WORKDIR /usr/share/nginx/html

# 소스 코드 복사
COPY index.html .
COPY css ./css
COPY img ./img
COPY js ./js

# 인증서 복사
COPY ca_bundle.crt /etc/nginx/ssl/
COPY certificate.crt /etc/nginx/ssl/
COPY private.key /etc/nginx/ssl/private/

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 10900
