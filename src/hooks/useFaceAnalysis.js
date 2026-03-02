import { useState, useRef, useCallback, useMemo } from 'react';
import { fetchFaceAnalysis } from '../services/openaiService';
import { parseResult, validateResponse } from '../utils/parseResult';
import {
  USE_MOCK_DATA,
  USE_MOCK_ERROR,
  MOCK_DELAY,
  INITIAL_TEXT,
  LOADING_TEXT,
  RETAKE_TEXT,
  MOCK_RESULTS,
  MOCK_ERROR_RESULT,
} from '../constants';

export function useFaceAnalysis() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [resultText, setResultText] = useState(INITIAL_TEXT);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeFace = useCallback(async (base64Image) => {
    setIsLoading(true);
    setResultText(LOADING_TEXT);

    if (USE_MOCK_DATA) {
      setTimeout(() => {
        const mockText = USE_MOCK_ERROR
          ? MOCK_ERROR_RESULT
          : MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
        if (!validateResponse(mockText)) {
          console.error('[Mock] AI 얼굴 인식 실패: 섹션 구분자 없음. 응답 내용:', mockText);
          setImgSrc(null);
          setResultText('관상을 제대로 읽지 못하였소...\n얼굴이 잘 보이도록 다시 한번 찍어주시오! 📸');
          setIsLoading(false);
          return;
        }
        setResultText(mockText);
        setIsLoading(false);
      }, MOCK_DELAY);
      return;
    }

    try {
      const responseText = await fetchFaceAnalysis(base64Image);
      if (!validateResponse(responseText)) {
        console.error('[AI 얼굴 인식 실패] 섹션 구분자 부족. 응답 내용:', responseText);
        setImgSrc(null);
        setResultText('관상을 제대로 읽지 못하였소...\n얼굴이 잘 보이도록 다시 한번 찍어주시오! 📸');
        return;
      }
      setResultText(responseText);
    } catch (error) {
      if (error.status === 401) {
        console.error('[AI 호출 오류] API 키 인증 실패:', error.message);
      } else if (error.status === 429) {
        console.error('[AI 호출 오류] 요청 한도 초과 (Rate Limit):', error.message);
      } else if (error.status >= 500) {
        console.error('[AI 호출 오류] OpenAI 서버 오류:', error.message);
      } else if (error.status >= 400) {
        console.error('[AI 호출 오류] 잘못된 요청:', error.message);
      } else {
        console.error('[AI 호출 오류] 네트워크 또는 알 수 없는 오류:', error);
      }
      setImgSrc(null);
      setResultText('통신 중 요망한 에러가 발생하였소...\n잠시 후 다시 시도해 주시오! 🙏');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    analyzeFace(imageSrc);
  }, [analyzeFace]);

  const retake = useCallback(() => {
    setImgSrc(null);
    setResultText(INITIAL_TEXT);
  }, []);

  const resultSections = useMemo(() => parseResult(resultText), [resultText]);

  return { webcamRef, imgSrc, isLoading, resultText, resultSections, capture, retake };
}
