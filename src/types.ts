export type PlanAudience = 'empresa' | 'familia' | 'individual';

export interface PersonAge {
  id: string;
  age: number | '';
}

export interface QuoteFormData {
  audience: PlanAudience;
  // Step 2: Location & Quantity/Ages
  uf: string;
  city: string;
  peopleCount: number;
  peopleAges: PersonAge[];
  // Step 3: Current Plan & Priorities
  hasCurrentPlan: 'sim' | 'nao' | '';
  currentOperator: string;
  priority: string;
  // Step 4: Contact
  name: string;
  whatsapp: string;
  email: string;
  companyName?: string;
  cnpj?: string;
  lgpdAccepted: boolean;
}

export interface LeadSubmissionPayload extends QuoteFormData {
  submittedAt: string;
  pageUrl: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
}

export interface PartnerOperator {
  id: string;
  name: string;
  category?: string;
  description?: string;
  logoUrl?: string;
  logoSvg?: string;
  accentColor?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
