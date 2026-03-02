import Webcam from 'react-webcam';
import backgroundWidth from '../assets/images/background_width.png';
import cameraIcon from '../assets/images/cameraIcon.png';
import { LOADING_TEXT, SCAN_TEXT, CAPTURE_BUTTON_TEXT } from '../constants';

function CameraScreen({ webcamRef, imgSrc, isLoading, hintText, capture }) {
    const displayHint = isLoading ? LOADING_TEXT : hintText;

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
                                <div className="scan-text">{SCAN_TEXT}</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="camera-controls">
                    <div className="hint-ribbon">
                        <p className="camera-hint">
                            {displayHint}
                        </p>
                    </div>
                    <button className="capture-btn" onClick={capture} disabled={isLoading}>
                        {CAPTURE_BUTTON_TEXT}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CameraScreen;
