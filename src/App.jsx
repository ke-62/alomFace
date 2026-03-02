import { useState, useRef, useCallback, useMemo } from 'react';
import OpenAI from 'openai';
import CameraScreen from './components/CameraScreen';
import ResultScreen from './components/ResultScreen';
import {
  USE_MOCK_DATA,
  SECTION_DELIMITER,
  MOCK_DELAY,
  INITIAL_TEXT,
  LOADING_TEXT,
  RETAKE_TEXT,
  SYSTEM_PROMPT,
  MOCK_RESULTS,
} from './constants';
import './App.css';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function parseResult(text) {
  const sections = text.split(SECTION_DELIMITER).map(s => s.trim());
  const identityRaw = sections[0] || '';
  const lines = identityRaw.split('\n').map(line => line.trim()).filter(Boolean);
  return {
    title: lines[0] ?? '분석 중 오류 발생',
    identityDesc: lines.length > 1 ? lines.slice(1).join('\n\n') : identityRaw,
    face: sections[1] || '',
    fortune: sections[2] || text,
  };
}

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [resultText, setResultText] = useState(INITIAL_TEXT);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeFace = useCallback(async (base64Image) => {
    setIsLoading(true);
    setResultText(LOADING_TEXT);

    if (USE_MOCK_DATA) {
      setTimeout(() => {
        setResultText(MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)]);
        setIsLoading(false);
      }, MOCK_DELAY);
      return;
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              { type: 'text', text: '이 사람의 관상을 봐주시오.' },
              { type: 'image_url', image_url: { url: base64Image } },
            ],
          },
        ],
        max_tokens: 1000,
      });
      setResultText(response.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setResultText(`통신 중 요망한 에러가 발생하였소 ㅠㅠ\n(${error.message})`);
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
    setResultText(RETAKE_TEXT);
  }, []);

  const resultSections = useMemo(() => parseResult(resultText), [resultText]);

  return (
    <div className="app-root">
      {imgSrc && !isLoading ? (
        <ResultScreen imgSrc={imgSrc} resultSections={resultSections} retake={retake} />
      ) : (
        <CameraScreen
          webcamRef={webcamRef}
          imgSrc={imgSrc}
          isLoading={isLoading}
          capture={capture}
        />
      )}
    </div>
  );
}

export default App;
