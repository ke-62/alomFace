import { SECTION_DELIMITER } from '../constants';

export function parseResult(text) {
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

export function validateResponse(text) {
  const sectionCount = (text.match(/###SECTION###/g) || []).length;
  return sectionCount >= 2;
}
