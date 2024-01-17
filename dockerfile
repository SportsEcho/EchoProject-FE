# 베이스 이미지 명시
FROM node:16

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 복사
COPY ./ ./

# 앱 실행을 위한 포트 설정
EXPOSE 3000

# 앱 실행 명령
CMD ["npm", "start"]