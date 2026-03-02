import rollOfPaperWidth from '../assets/images/rollOfPaper_width.png';
import rollOfPaperLength from '../assets/images/rollOfPaper_length.png';
import resultBackgroundBlack from '../assets/images/resultBackgrounBlack.png';
import retryImg from '../assets/images/retry.png';
import resultRoll from '../assets/images/resultRoll.png';
import stampImg from '../assets/images/stamp.png';
import { renderFaceContent, renderFortuneContent } from '../utils/renderContent';

const widthScrollStyle = {
    backgroundImage: `url(${rollOfPaperWidth})`,
    backgroundSize: '152% 125%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

const lengthScrollStyle = {
    backgroundImage: `url(${rollOfPaperLength})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

const resultRollStyle = {
    backgroundImage: `url(${resultRoll})`,
    backgroundSize: '130% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

function ResultScreen({ imgSrc, resultSections, retake }) {
    return (
        <main className="result-layout">
            <img src={resultBackgroundBlack} alt="" className="result-bg-img" />

            <div className="result-content">
                <header className="result-page-header">
                    <h1 className="result-page-title">🏮 ALOM 관상소 🏮</h1>
                    <p className="result-page-subtitle">천기를 읽는 아롬이 다롬이가 그대의 운명을 살펴보겠소</p>
                </header>

                <div className="result-top">
                    <div className="face-scroll" style={resultRollStyle}>
                        <div className="face-image-container">
                            <img src={imgSrc} alt="captured face" className="result-face-img" />
                        </div>
                        <div className="face-scroll-cta">
                            당장 'ALOM' 동아리에 합류하시어 조선 최고의 개발자로 이름을 떨치시옵소서! 🔴
                        </div>
                        <div className="face-scroll-retake-hint">다시 관상 보기를 원하시면...</div>
                        <button className="retake-btn-circle" onClick={retake}>
                            <img src={retryImg} alt="다시 보기" />
                        </button>
                    </div>

                    <div className="identity-roll" style={widthScrollStyle}>
                        <h3 className="roll-section-title">신분 판정서</h3>
                        <div className="huge-title">{resultSections.title}</div>
                        <div className="highlight-desc">{resultSections.identityDesc}</div>
                        <img src={stampImg} alt="stamp" className="identity-stamp" />
                    </div>
                </div>

                <div className="result-grid">
                    <div className="roll-card" style={lengthScrollStyle}>
                        <h3 className="roll-section-title">관상 세밀 풀이</h3>
                        <div className="roll-card-body">
                            {renderFaceContent(resultSections.face)}
                        </div>
                    </div>

                    <div className="roll-card" style={lengthScrollStyle}>
                        <h3 className="roll-section-title">사주 팔자 풀이</h3>
                        <div className="roll-card-body">
                            {renderFortuneContent(resultSections.fortune)}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ResultScreen;