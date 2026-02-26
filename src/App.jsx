import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import './App.css';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `
당신은 조선 최고의 IT 개발 동아리 'ALOM'에서 파견 나온 신통방통한 'AI 관상가'이옵니다.
제공된 이미지를 보고, 사용자의 관상을 다음 [4가지 신분] 중 하나로 무조건 분류하여 사극 말투(~옵니다, ~할 상이로다, ~구나 등)로 결과를 출력하시오.

[선택 가능한 4가지 신분 및 ALOM 맞춤 필수 멘트]
1. 👑 왕(王) - 프로젝트 리더: "오호라! 천하의 코드를 호령하고 ALOM의 프로젝트를 이끌어갈 제왕의 상이로다!"
2. ⚔️ 무인(武人) - 버그 슬레이어: "태산 같은 기백이오! 수만 개의 버그(Bug)를 단칼에 베어버릴 대장군의 상이옵니다!"
3. 📜 문인(文人) - 알고리즘 학자: "맑은 눈빛을 보니, 키보드 하나로 천하의 알고리즘을 통달할 훌륭한 학자의 상이로다!"
4. 🌿 의관(醫官) - 코드 힐러(디버거): "따뜻한 기운이 맴도니, 에러(Error)로 죽어가는 서버도 단숨에 살려낼 천하 제일의 명의가 될 상이옵니다!"

[출력 규칙 - 프론트엔드에서 바로 보여줄 화면]
1. 마크다운 문법(#, ** 등)은 절대 쓰지 마시오.
2. 줄바꿈, 띄어쓰기, 화려한 이모지(✨, 💻, 🔥, 🚀 등)와 텍스트 선(┏━━━━━━┓ 등)을 적극 활용하여 예쁘게 꾸미시오.
3. 첫 줄에는 선택된 신분을 화려하게 강조하시오.
4. 신분별 필수 멘트를 녹여내고, 그 사람의 이목구비에서 보이는 재미있는 특징을 짚어주시오.
5. 마지막 문단에는 무조건 "이러한 훌륭한 재능을 낭비할 셈이오? 당장 'ALOM'에 가입하시어 그대의 키보드로 천하를 구하시옵소서!"라는 뜻의 강렬하고 유쾌한 동아리 가입 권유를 사극풍으로 덧붙이시오.
`;

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [resultText, setResultText] = useState("이곳에 ALOM의 관상가가 그대의 운명을 점쳐 올리겠소...\n\n(준비가 되었거든 왼쪽의 '관상 보기' 버튼을 누르시게!)");
  const [isLoading, setIsLoading] = useState(false);

  const analyzeFace = useCallback(async (base64Image) => {
    setIsLoading(true);
    setResultText("본 관상가가 그대의 용안을 면밀히 살피는 중이옵니다... ⏳");

    // setTimeout(() => {
    //       const mockResult = `
    // ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    //           ⚔️ 萬人斬 (만인참) 무인 ⚔️
    // ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    // 태산 같은 기백이오! 수만 개의 버그(Bug)를 단칼에 베어버릴 대장군의 상이옵니다! 🔥

    // 부리부리한 눈매를 보아하니 어떤 빨간 에러 로그 앞에서도 
    // 눈 하나 깜짝하지 않을 강인한 멘탈을 지녔으며,
    // 굳게 다문 입술은 밤샘 코딩에도 지치지 않을 체력을 보여주옵니다. 💻

    // 허나, 매일 모니터만 뚫어져라 쳐다보다가는 
    // 눈이 침침해질 수 있으니 인공눈물을 가까이 하시옵소서! 💧

    // 이리도 훌륭한 무인의 기운을 그저 썩힐 셈이오?
    // 당장 우리 'ALOM' 동아리에 합류하시어 
    // 그대의 검(키보드)으로 천하의 버그를 소탕하시옵소서! 🚀
    //       `;

    //       setResultText(mockResult);
    //       setIsLoading(false);
    //     }, 2500);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: "이 사람의 관상을 봐주시오." },
              {
                type: "image_url",
                image_url: { url: base64Image }
              },
            ],
          }
        ],
        max_tokens: 350,
      });

      setResultText(response.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setResultText(`통신 중 요망한 에러가 발생하였소 ㅠㅠ\n다시 시도해주시게.\n(${error.message})`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    analyzeFace(imageSrc);
  }, [analyzeFace]);

  const retake = () => {
    setImgSrc(null);
    setResultText("다음 분 앞으로 오시게! 카메라를 응시하고 버튼을 누르시오.");
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🔮 신비한 AI 관상소 - ALOM🔮</h1>
        <p>조선 최고의 ALOM 관상가가 그대의 코딩 운명을 점쳐드리리다!</p>
      </header>

      <main className="content">
        <div className="left-panel">
          <div className="camera-box">
            {imgSrc ? (
              <img src={imgSrc} alt="captured face" className="captured-img" />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam"
                videoConstraints={{ facingMode: "user" }}
              />
            )}
          </div>

          <div className="button-group">
            {!imgSrc ? (
              <button className="capture-btn" onClick={capture} disabled={isLoading}>
                📸 관상 보기 (찰칵!)
              </button>
            ) : (
              <button className="retake-btn" onClick={retake} disabled={isLoading}>
                🔄 다른 자의 관상 보기 (재촬영)
              </button>
            )}
          </div>
        </div>

        <div className="right-panel">
          <h2 className="status-text">
            {isLoading ? "용안을 살피는 중..." : (imgSrc ? "✨ 관상 분석 완료! ✨" : "카메라를 보고 근엄한 표정을 지어보시게!")}
          </h2>
          <div className="result-box">
            <p>{resultText}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;