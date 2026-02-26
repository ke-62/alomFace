function ResultScreen({ imgSrc, resultSections, retake }) {
    const renderFaceContent = (text) => {
        const lines = text.split('\n').filter(l => l.trim());
        return lines.map((line, idx) => {
            if (line.startsWith('•')) {
                return <div key={idx} className="face-item">{line}</div>;
            }
            return <div key={idx} className="face-text">{line}</div>;
        });
    };

    const renderFortuneContent = (text) => {
        const lines = text.split('\n').filter(l => l.trim());
        return lines.map((line, idx) => {
            if (line.match(/^[💻🚀🐛🎯📚🤝💰🏆✨]/u) || line.includes('운:')) {
                return <div key={idx} className="fortune-item">{line}</div>;
            }
            return <div key={idx} className="fortune-text">{line}</div>;
        });
    };

    return (
        <main className="result-layout">
            <div className="result-header">
                <div className="face-image-wrapper">
                    <div className="alom-cta">당장 'ALOM' 동아리에 합류하시어 조선 최고의 개발자로 이름을 떨치시옵소서! 🚀✨</div>
                    <div className="face-image-container">
                        <img src={imgSrc} alt="captured face" className="result-face-img" />
                    </div>
                    <button className="retake-btn-top" onClick={retake}>
                        🔄 다시 관상 보기
                    </button>
                </div>

                <div className="identity-scroll">
                    <div className="card-seal">🏮</div>
                    <h3 className="card-title">신분 판정서</h3>
                    <div className="card-content">
                        <div className="huge-title">{resultSections.title}</div>
                        <div className="highlight-desc">{resultSections.identityDesc}</div>
                    </div>
                </div>
            </div>

            <div className="result-grid">
                <div className="face-scroll">
                    <div className="card-seal">👁️</div>
                    <h3 className="card-title">관상 세밀 풀이</h3>
                    <div className="card-content">
                        {renderFaceContent(resultSections.face)}
                    </div>
                </div>

                <div className="fortune-scroll">
                    <div className="card-seal">📜</div>
                    <h3 className="card-title">사주 팔자 풀이</h3>
                    <div className="card-content">
                        {renderFortuneContent(resultSections.fortune)}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ResultScreen;
