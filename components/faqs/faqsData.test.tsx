import { faqsData } from './faqsData';

describe('faqsData', () => {
  it('has the correct structure and values', () => {
    expect(Array.isArray(faqsData)).toBe(true);
    expect(faqsData).toHaveLength(5);

    const faq = faqsData[0];
    expect(typeof faq.id).toBe('number');
    expect(typeof faq.question).toBe('string');
    expect(typeof faq.answer).toBe('string');
  });
});