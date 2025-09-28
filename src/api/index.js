export const BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Translate text using backend translation API
 * body: { text: string, target_lang: string, source_lang: string }
 * returns: translated text (string) or throws
 */
export async function translateText({ text, target_lang, source_lang = 'auto' }) {
	if (!text) return '';
	const res = await fetch(`${BASE_URL}/translation/translate`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text, target_lang, source_lang })
	});
	if (!res.ok) {
		const err = await res.text();
		throw new Error(err || `Translation API error: ${res.status}`);
	}
	const data = await res.json();
	// Expecting { translated_text: '...' } or similar. Try common shapes.
	if (data.translated_text) return data.translated_text;
	if (data.translation) return data.translation;
	// If API returns raw string
	if (typeof data === 'string') return data;
	// Fallback: return original
	return data?.text || '';
}