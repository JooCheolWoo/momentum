# 베이스 이미지로 nginx를 사용합니다.
FROM nginx

# HTML 파일을 컨테이너 내부의 특정 디렉토리로 복사합니다.
COPY html.html ../index.html

# 80번 포트로 들어오는 요청을 처리할 것임을 Docker에 알려줍니다.
EXPOSE 10900