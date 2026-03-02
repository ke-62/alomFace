# OpenAI API 키 설정 안내

프로젝트 폴더 안에 `.env` 파일을 만들고, 아래와 같이 작성해 주세요:

```text
VITE_OPENAI_API_KEY=
```

---

## MOCK DATA ↔ API 연동

`constant.js` 파일 첫 줄 수정:

```javascript
export const USE_MOCK_DATA = true; // true: 무료 테스트용, false: 실제 AI 사용
```