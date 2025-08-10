# Contact Service GraphQL API

MongoDB와 GraphQL을 이용한 연락처 관리 API 서버

## 📋 프로젝트 개요

연락처 정보를 관리하고 사진 업로드를 지원하는 GraphQL API 서버입니다.
- **프론트엔드**: GraphiQL Playground
- **백엔드**: GraphQL Yoga v5 + Node.js
- **데이터베이스**: MongoDB (Mongoose ODM)
- **파일 처리**: 이미지 업로드 및 저장

## 🚀 기술 스택

- **Runtime**: Node.js
- **GraphQL**: GraphQL Yoga v5, @graphql-tools/schema
- **Database**: MongoDB Atlas, Mongoose v7
- **Build**: Babel (ES6+ → ES5)
- **Deployment**: Vercel
- **Development**: Nodemon, dotenv

## 📁 프로젝트 구조

```
contactsvc_graphql/
├── src/
│   ├── index.js              # GraphQL 서버 엔트리포인트
│   ├── constant.js           # 상수 정의
│   ├── db/
│   │   ├── index.js         # 비즈니스 로직 (CRUD 함수)
│   │   └── testdb.js        # MongoDB 스키마 & 연결
│   ├── graphql/
│   │   ├── schema.js        # GraphQL 스키마 정의
│   │   └── resolvers.js     # GraphQL 리졸버
│   └── init/
│       └── initializeData.js # 초기 데이터 생성 스크립트
├── build/                   # Babel 빌드 결과
├── temp_photom/             # 남성 테스트 이미지
├── temp_photow/             # 여성 테스트 이미지
├── .env                     # 환경 변수
├── package.json
└── vercel.json              # Vercel 배포 설정
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 MongoDB URI를 설정:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=4000
```

### 3. 개발 서버 실행
```bash
# 개발 모드 (Babel + Nodemon)
npm run start-dev

# 프로덕션 빌드 후 실행
npm run build
npm start
```

### 4. 초기 데이터 생성 (선택사항)
```bash
node src/init/initializeData.js
```

## 🌐 접근 점 (Endpoints)

| 용도 | URL | 설명 |
|------|-----|------|
| **GraphQL Playground** | `http://localhost:4000/graphql` | GraphiQL 인터페이스 |
| **GraphQL API** | `http://localhost:4000/graphql` | GraphQL 쿼리/뮤테이션 엔드포인트 |
| **루트 리다이렉트** | `http://localhost:4000/` | `/graphql`로 자동 리다이렉트 |
| **이미지 서빙** | `http://localhost:4000/photos/:id` | 업로드된 이미지 조회 |

## 📊 GraphQL 스키마

### Queries (조회)
```graphql
# 모든 연락처 조회 (페이지네이션 지원)
query {
  contactsAll(pageno: 1, pagesize: 10) {
    pageno
    pagesize
    totalcount
    contacts {
      _id
      name
      tel
      address
      photo
    }
  }
}

# 특정 연락처 조회
query {
  contactOne(_id: "contact_id") {
    _id
    name
    tel
    address
    photo
  }
}

# 이름으로 연락처 검색
query {
  searchContact(name: "검색할이름") {
    _id
    name
    tel
    address
    photo
  }
}
```

### Mutations (수정)
```graphql
# 연락처 추가
mutation {
  insertContact(name: "홍길동", tel: "010-1234-5678", address: "서울시") {
    status
    message
    _id
  }
}

# 연락처 수정
mutation {
  updateContact(_id: "contact_id", name: "김철수", tel: "010-9876-5432", address: "부산시") {
    status
    message
    _id
  }
}

# 연락처 삭제
mutation {
  deleteContact(_id: "contact_id") {
    status
    message
    _id
  }
}

# 사진 변경 (파일 업로드)
mutation {
  changePhoto(_id: "contact_id", file: $file) {
    status
    message
    _id
  }
}
```

## 🗄️ 데이터베이스 스키마

### Contact Collection
```javascript
{
  _id: String,      // ObjectId 문자열
  name: String,     // 연락처 이름
  tel: String,      // 전화번호
  address: String,  // 주소
  photo: String     // 사진 ID (Photo 컬렉션 참조)
}
```

### Photo Collection
```javascript
{
  _id: String,      // shortid
  image: Buffer,    // 이미지 바이너리 데이터
  mimetype: String  // MIME 타입 (image/jpeg, image/png 등)
}
```

## 🔧 주요 기능

### ✅ CRUD 기능
- **조회**: 전체 목록, 개별 조회, 검색 (정규표현식)
- **추가**: 새 연락처 생성
- **수정**: 기존 연락처 정보 변경
- **삭제**: 연락처 및 관련 사진 삭제

### ✅ 파일 관리
- **이미지 업로드**: GraphQL multipart 업로드 지원
- **이미지 저장**: MongoDB에 Buffer로 저장
- **이미지 서빙**: HTTP 엔드포인트로 이미지 제공
- **MIME 검증**: 이미지 파일만 업로드 허용

### ✅ 페이지네이션
- `pageno`: 페이지 번호 (0: 전체, 1+: 페이지)
- `pagesize`: 페이지 크기
- `totalcount`: 전체 레코드 수

## 🔒 보안 고려사항

### ✅ 현재 구현된 보안
- MIME 타입 검증 (이미지만 업로드 허용)
- 입력 타입 검증
- CORS 활성화

### ⚠️ 추가 보안 필요사항
- 인증/권한 시스템
- API Rate Limiting  
- 파일 크기 제한
- SQL Injection 방지 강화

## 🚀 배포

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 환경 변수 설정
Vercel 대시보드에서 다음 환경 변수를 설정:
- `MONGODB_URI`: MongoDB 연결 문자열
- `PORT`: 포트 번호 (기본값: 4000)

## 📝 개발 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run clean` | 빌드 디렉토리 정리 |
| `npm run build-babel` | Babel 트랜스파일 |
| `npm run build` | 전체 빌드 |
| `npm start` | 프로덕션 서버 시작 |
| `npm run start-dev` | 개발 서버 시작 (Nodemon) |

## 🧪 테스트

GraphiQL Playground에서 다음과 같이 테스트할 수 있습니다:

1. **서버 시작**: `http://localhost:4000`
2. **자동 리다이렉트**: `/graphql`로 이동
3. **스키마 문서**: 좌측 "Docs" 탭 확인
4. **쿼리 실행**: 왼쪽 패널에서 GraphQL 쿼리 작성 후 실행

## 📚 참고 자료

- [GraphQL Yoga v5 문서](https://the-guild.dev/graphql/yoga-server)
- [Mongoose ODM](https://mongoosejs.com/)
- [GraphQL 스펙](https://spec.graphql.org/)

## 📄 라이센스

MIT License

## 👤 작성자

stepanowon@hotmail.com

---

*이 프로젝트는 GraphQL과 MongoDB를 학습하기 위한 예제 프로젝트입니다.*
