import { useFaceAnalysis } from './hooks/useFaceAnalysis';
import CameraScreen from './components/CameraScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';

function App() {
  const { webcamRef, imgSrc, isLoading, resultText, resultSections, capture, retake } = useFaceAnalysis();

  return (
    <div className="app-root">
      {imgSrc && !isLoading ? (
        <ResultScreen imgSrc={imgSrc} resultSections={resultSections} retake={retake} />
      ) : (
        <CameraScreen
          webcamRef={webcamRef}
          imgSrc={imgSrc}
          isLoading={isLoading}
          hintText={resultText}
          capture={capture}
        />
      )}
    </div>
  );
}

export default App;
