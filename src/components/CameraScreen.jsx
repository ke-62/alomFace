import Webcam from 'react-webcam';
import backgroundWidth from '../assets/images/background_width.png';
import cameraIcon from '../assets/images/cameraIcon.png';

function CameraScreen({ webcamRef, imgSrc, isLoading, capture }) {
    return (
        <div className="camera-screen">
            <img src={backgroundWidth} alt="" className="camera-bg-img" />

            <div className="camera-main">
                <div className="camera-ring-wrapper">
                    <img src={cameraIcon} alt="" className="camera-icon-overlay" />

                    <div className="camera-circle">
                        {imgSrc ? (
                            <img src={imgSrc} alt="captured face" className="captured-img" />
                        ) : (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="webcam"
                                videoConstraints={{ facingMode: "user" }}
                                mirrored={false}
                            />
                        )}
                        {isLoading && (
                            <div className="scan-overlay">
                                <div className="scan-line"></div>
                                <div className="scan-text">관상 분석 중...</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="camera-controls">
                    <div className="hint-ribbon">
                        <p className="camera-hint">
                            {isLoading ? "용안을 살피는 중이옵니다... ⏳" : "카메라를 보고..."}
                        </p>
                    </div>
                    <button className="capture-btn" onClick={capture} disabled={isLoading}>
                        관상 보기 (클릭!)
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CameraScreen;
