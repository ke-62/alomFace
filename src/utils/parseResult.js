import { SECTION_DELIMITER } from '../constants';
import { ERROR_MESSAGES } from '../error/messages';

export function parseResult(text) {
  const sections = text.split(SECTION_DELIMITER).map(s => s.trim());
  const identityRaw = sections[0] || '';
  const lines = identityRaw.split('\n').map(line => line.trim()).filter(Boolean);
  return {
    title: lines[0] ?? ERROR_MESSAGES.TITLE_FALLBACK,
    identityDesc: lines.length > 1 ? lines.slice(1).join('\n\n') : identityRaw,
    face: sections[1] || '',
    fortune: sections[2] || text,
  };
}

export function validateResponse(text) {
  const sectionCount = (text.match(/###SECTION###/g) || []).length;
  return sectionCount === 2;
}

const ERROR_KEYWORDS = ['판단 불가', '판단할 수 없', '인식 불가', '확인 불가', '알 수 없', '분석 불가', '오류 발생', '에러', '실패', '죄송'];

export function validateTitle(title) {
  if (!title || title.length < 5) return false;
  return !ERROR_KEYWORDS.some(keyword => title.includes(keyword));
}
