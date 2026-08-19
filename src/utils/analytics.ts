export interface TrackingParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  referrer: string;
  pageUrl: string;
}

export function getTrackingData(): TrackingParams {
  if (typeof window === 'undefined') {
    return { referrer: '', pageUrl: '' };
  }

  const urlParams = new URLSearchParams(window.location.search);

  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    gclid: urlParams.get('gclid') || undefined,
    referrer: document.referrer || '',
    pageUrl: window.location.href,
  };
}

const STORAGE_KEY = 'arkos_quote_form_draft';

export function saveFormDraft(data: unknown): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Unable to save draft to sessionStorage', e);
  }
}

export function loadFormDraft<T>(): T | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (e) {
    return null;
  }
}

export function clearFormDraft(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Ignore error
  }
}
