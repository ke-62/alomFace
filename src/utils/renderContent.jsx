export function renderFaceContent(text) {
  return text.split('\n').filter(l => l.trim()).map((line, idx) => {
    if (line.startsWith('•')) {
      return <div key={idx} className="face-item">{line}</div>;
    }
    return <div key={idx} className="face-text">{line}</div>;
  });
}

export function renderFortuneContent(text) {
  return text.split('\n').filter(l => l.trim()).map((line, idx) => {
    if (line.match(/^[💻🚀🐛🎯📚🤝💰🏆✨]/u) || line.includes('운:')) {
      return <div key={idx} className="fortune-item">{line}</div>;
    }
    return <div key={idx} className="fortune-text">{line}</div>;
  });
}
