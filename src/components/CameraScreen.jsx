import Webcam from 'react-webcam';

function CameraScreen({ webcamRef, imgSrc, isLoading, capture, resultText }) {
    return (
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
                    {isLoading && (
                        <div className="scan-overlay">
                            <div className="scan-line"></div>
                            <div className="scan-corners">
                                <div className="scan-corner-bl"></div>
                                <div className="scan-corner-br"></div>
                            </div>
                            <div className="scan-text">관상 분석 중...</div>
                        </div>
                    )}
                </div>

                <div className="button-group">
                    <button className="capture-btn" onClick={capture} disabled={isLoading}>
                        📸 관상 보기 (찰칵!)
                    </button>
                </div>
            </div>

            <div className="right-panel">
                <h2 className="status-text">
                    {isLoading ? "용안을 살피는 중..." : "카메라를 보고 근엄한 표정을 지어보시게!"}
                </h2>
                <div className="result-box">
                    <p>{resultText}</p>
                </div>
            </div>
        </main>
    );
}

export default CameraScreen;
