import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Users, 
  User, 
  MapPin, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  MessageCircle,
  ExternalLink,
  Lock
} from 'lucide-react';
import { PlanAudience, QuoteFormData, PersonAge, LeadSubmissionPayload } from '../types';
import { formatPhone, formatCNPJ, isValidEmail, isValidPhone } from '../utils/validation';
import { buildWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';
import { getTrackingData, saveFormDraft, loadFormDraft, clearFormDraft } from '../utils/analytics';

const BRAZILIAN_UFS = [
  'SP', 'RJ', 'MG', 'PR', 'RS', 'SC', 'BA', 'PE', 'CE', 'GO', 
  'DF', 'ES', 'MT', 'MS', 'PA', 'AM', 'RN', 'PB', 'AL', 'SE', 
  'PI', 'MA', 'TO', 'RO', 'AC', 'AP', 'RR'
];

const POPULAR_PRIORITIES = [
  'Melhor custo-benefício',
  'Rede de hospitais de referência',
  'Abrangência nacional',
  'Opção com reembolso',
  'Quero comparar tudo'
];

const INITIAL_FORM: QuoteFormData = {
  audience: 'empresa',
  uf: 'SP',
  city: '',
  peopleCount: 1,
  peopleAges: [{ id: 'p-1', age: 32 }],
  hasCurrentPlan: '',
  currentOperator: '',
  priority: 'Melhor custo-benefício',
  name: '',
  whatsapp: '',
  email: '',
  companyName: '',
  cnpj: '',
  lgpdAccepted: false,
};

interface QuoteWizardProps {
  initialAudience?: PlanAudience;
  onCompleted?: () => void;
  className?: string;
}

export const QuoteWizard: React.FC<QuoteWizardProps> = ({
  initialAudience,
  className = "",
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuoteFormData>(() => {
    const draft = loadFormDraft<QuoteFormData>();
    if (draft) return draft;
    return initialAudience ? { ...INITIAL_FORM, audience: initialAudience } : INITIAL_FORM;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>('');

  useEffect(() => {
    if (initialAudience && formData.audience !== initialAudience) {
      setFormData(prev => ({ ...prev, audience: initialAudience }));
    }
  }, [initialAudience]);

  // Persist draft to sessionStorage
  useEffect(() => {
    if (!isSuccess) {
      saveFormDraft(formData);
    }
  }, [formData, isSuccess]);

  const updateField = <K extends keyof QuoteFormData>(field: K, value: QuoteFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step 1: Audience selection
  const handleSelectAudience = (audience: PlanAudience) => {
    updateField('audience', audience);
    if (audience === 'individual') {
      updateField('peopleCount', 1);
      updateField('peopleAges', [{ id: 'p-1', age: 30 }]);
    } else if (audience === 'familia' && formData.peopleAges.length < 2) {
      updateField('peopleCount', 3);
      updateField('peopleAges', [
        { id: 'p-1', age: 35 },
        { id: 'p-2', age: 33 },
        { id: 'p-3', age: 7 }
      ]);
    } else if (audience === 'empresa' && formData.peopleAges.length < 2) {
      updateField('peopleCount', 4);
      updateField('peopleAges', [
        { id: 'p-1', age: 34 },
        { id: 'p-2', age: 29 },
        { id: 'p-3', age: 42 },
        { id: 'p-4', age: 25 }
      ]);
    }
    setStep(2);
  };

  // Age helpers
  const handleAddPerson = () => {
    const newId = `p-${Date.now()}`;
    const updated = [...formData.peopleAges, { id: newId, age: 30 }];
    setFormData(prev => ({
      ...prev,
      peopleAges: updated,
      peopleCount: updated.length
    }));
  };

  const handleRemovePerson = (id: string) => {
    if (formData.peopleAges.length <= 1) return;
    const updated = formData.peopleAges.filter(p => p.id !== id);
    setFormData(prev => ({
      ...prev,
      peopleAges: updated,
      peopleCount: updated.length
    }));
  };

  const handleAgeChange = (id: string, ageVal: string) => {
    const parsed = ageVal === '' ? '' : Math.min(110, Math.max(0, parseInt(ageVal, 10) || 0));
    const updated = formData.peopleAges.map(p => (p.id === id ? { ...p, age: parsed } : p));
    setFormData(prev => ({ ...prev, peopleAges: updated }));
  };

  // Validation
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.city.trim()) {
      newErrors.city = 'Informe sua cidade';
    }
    if (!formData.uf) {
      newErrors.uf = 'Selecione o estado';
    }
    if (formData.peopleAges.length === 0) {
      newErrors.people = 'Adicione ao menos uma pessoa';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Informe seu nome completo';
    }
    if (!formData.whatsapp.trim() || !isValidPhone(formData.whatsapp)) {
      newErrors.whatsapp = 'Informe um WhatsApp válido com DDD';
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      newErrors.email = 'Informe um e-mail válido';
    }
    if (!formData.lgpdAccepted) {
      newErrors.lgpd = 'É necessário concordar para receber o contato com a cotação.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Final submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    setIsSubmitting(true);
    const tracking = getTrackingData();
    const payload: LeadSubmissionPayload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      ...tracking,
    };

    // 1. Submit lead to server API /api/lead (resilient webhook forward)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Lead capture endpoint fallback', err);
    }

    // 2. Prepare WhatsApp handover
    const message = buildWhatsAppMessage(formData);
    const waUrl = getWhatsAppUrl(message);
    setGeneratedWhatsAppUrl(waUrl);

    clearFormDraft();
    setIsSubmitting(false);
    setIsSuccess(true);

    // Auto open WhatsApp in new window/tab after 800ms
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return (
    <div id="cotacao" className={`bg-[#06110C]/90 border border-emerald-900/40 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl glow-arkos relative overflow-hidden ${className}`}>
      {/* Top progress indicator */}
      {!isSuccess && (
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Simulação de Plano
            </span>
            <span className="text-emerald-300/80 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
              Etapa {step} de 4
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#076633] via-emerald-500 to-[#34D399]"
              initial={false}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* SUCCESS SCREEN */}
        {isSuccess ? (
          <motion.div
            key="step-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6 px-2"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Tudo certo!
            </h3>
            <p className="text-emerald-100/90 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
              Recebemos suas preferências. Agora vamos continuar sua análise com um especialista Arkos pelo WhatsApp para apresentar as melhores opções.
            </p>

            <a
              href={generatedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#076633] to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Continuar no WhatsApp
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>

            <p className="text-[12px] text-emerald-300/60 mt-4">
              Caso a janela não tenha aberto automaticamente, clique no botão acima.
            </p>
          </motion.div>
        ) : step === 1 ? (
          /* STEP 1: AUDIENCE */
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Para quem você procura um plano?
              </h2>
              <p className="text-emerald-200/70 text-sm mt-1">
                Selecione a opção que melhor define sua necessidade hoje.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-3.5 mb-6">
              {/* Option 1: Empresa */}
              <button
                type="button"
                onClick={() => handleSelectAudience('empresa')}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  formData.audience === 'empresa'
                    ? 'border-emerald-500 bg-emerald-950/50 shadow-md ring-1 ring-emerald-500/50'
                    : 'border-emerald-900/40 bg-[#031B10]/60 hover:border-emerald-600/60 hover:bg-emerald-950/30'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-800/50 transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">Minha empresa</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/30">
                        PME & MEI
                      </span>
                    </div>
                    <p className="text-xs text-emerald-200/70 mt-0.5">
                      A partir de 2 ou 3 vidas com CNPJ. Valores reduzidos.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all shrink-0" />
              </button>

              {/* Option 2: Família */}
              <button
                type="button"
                onClick={() => handleSelectAudience('familia')}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  formData.audience === 'familia'
                    ? 'border-emerald-500 bg-emerald-950/50 shadow-md ring-1 ring-emerald-500/50'
                    : 'border-emerald-900/40 bg-[#031B10]/60 hover:border-emerald-600/60 hover:bg-emerald-950/30'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-800/50 transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-base">Minha família</span>
                    <p className="text-xs text-emerald-200/70 mt-0.5">
                      Para cônjuge, filhos ou dependentes com cobertura sob medida.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all shrink-0" />
              </button>

              {/* Option 3: Individual */}
              <button
                type="button"
                onClick={() => handleSelectAudience('individual')}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  formData.audience === 'individual'
                    ? 'border-emerald-500 bg-emerald-950/50 shadow-md ring-1 ring-emerald-500/50'
                    : 'border-emerald-900/40 bg-[#031B10]/60 hover:border-emerald-600/60 hover:bg-emerald-950/30'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-800/50 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-base">Para mim</span>
                    <p className="text-xs text-emerald-200/70 mt-0.5">
                      Planos individuais ou por adesão para profissionais e autônomos.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-emerald-300/70 pt-2 border-t border-emerald-900/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sem custos ou compromisso • Comparativo de +60 operadoras</span>
            </div>
          </motion.div>
        ) : step === 2 ? (
          /* STEP 2: LOCATION & PEOPLE */
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Onde você está?
              </h2>
              <p className="text-emerald-200/70 text-xs mt-0.5">
                Os planos e redes hospitalares variam de acordo com a sua região.
              </p>
            </div>

            {/* Location Inputs */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              <div className="col-span-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80 mb-1">
                  UF *
                </label>
                <select
                  value={formData.uf}
                  onChange={e => updateField('uf', e.target.value)}
                  className="w-full bg-[#031B10] border border-emerald-800/60 rounded-xl px-3 py-2.5 text-white text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                >
                  {BRAZILIAN_UFS.map(uf => (
                    <option key={uf} value={uf} className="bg-[#031B10] text-white">
                      {uf}
                    </option>
                  ))}
                </select>
                {errors.uf && <p className="text-red-400 text-[11px] mt-1">{errors.uf}</p>}
              </div>

              <div className="col-span-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80 mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  placeholder="Ex: São Paulo, Campinas..."
                  value={formData.city}
                  onChange={e => updateField('city', e.target.value)}
                  className="w-full bg-[#031B10] border border-emerald-800/60 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-emerald-800 focus:border-emerald-400 focus:outline-none transition-colors"
                />
                {errors.city && <p className="text-red-400 text-[11px] mt-1">{errors.city}</p>}
              </div>
            </div>

            {/* People & Ages */}
            <div className="mb-5 pt-3 border-t border-emerald-900/40">
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Quantas pessoas vão entrar no plano?
                  </h3>
                  <p className="text-[11px] text-emerald-300/70">
                    A idade define a faixa de preço das operadoras.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPerson}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/60 text-emerald-300 border border-emerald-700/40 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar pessoa
                </button>
              </div>

              {/* Ages Grid */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {formData.peopleAges.map((person, idx) => (
                  <div
                    key={person.id}
                    className="flex items-center justify-between gap-3 bg-[#031B10]/80 border border-emerald-900/60 rounded-xl px-3 py-2"
                  >
                    <span className="text-xs font-medium text-emerald-200/90 whitespace-nowrap">
                      Pessoa {idx + 1}
                    </span>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="110"
                        placeholder="Idade"
                        value={person.age}
                        onChange={e => handleAgeChange(person.id, e.target.value)}
                        className="w-16 bg-[#06110C] border border-emerald-800/60 rounded-lg px-2 py-1 text-center text-white text-sm font-semibold focus:border-emerald-400 focus:outline-none"
                      />
                      <span className="text-xs text-emerald-400/80">anos</span>

                      {formData.peopleAges.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePerson(person.id)}
                          className="p-1 text-emerald-500/50 hover:text-red-400 transition-colors ml-1"
                          title="Remover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-300/80 hover:text-white px-3 py-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : step === 3 ? (
          /* STEP 3: CURRENT PLAN & PRIORITIES */
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Você já tem plano de saúde atualmente?
              </h2>
              <p className="text-emerald-200/70 text-xs mt-0.5">
                Se tiver, podemos analisar opções com redução de carência ou melhor custo.
              </p>
            </div>

            {/* Yes / No buttons */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <button
                type="button"
                onClick={() => updateField('hasCurrentPlan', 'sim')}
                className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                  formData.hasCurrentPlan === 'sim'
                    ? 'border-emerald-500 bg-emerald-950/60 text-white ring-1 ring-emerald-500'
                    : 'border-emerald-900/40 bg-[#031B10]/60 text-emerald-200/80 hover:border-emerald-700'
                }`}
              >
                Sim, já tenho
              </button>

              <button
                type="button"
                onClick={() => {
                  updateField('hasCurrentPlan', 'nao');
                  updateField('currentOperator', '');
                }}
                className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                  formData.hasCurrentPlan === 'nao'
                    ? 'border-emerald-500 bg-emerald-950/60 text-white ring-1 ring-emerald-500'
                    : 'border-emerald-900/40 bg-[#031B10]/60 text-emerald-200/80 hover:border-emerald-700'
                }`}
              >
                Não tenho plano
              </button>
            </div>

            {/* Current operator input if yes */}
            {formData.hasCurrentPlan === 'sim' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4"
              >
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80 mb-1">
                  Qual é a operadora atual?
                </label>
                <input
                  type="text"
                  placeholder="Ex: SulAmérica, Bradesco, Amil, Unimed, etc."
                  value={formData.currentOperator}
                  onChange={e => updateField('currentOperator', e.target.value)}
                  className="w-full bg-[#031B10] border border-emerald-800/60 rounded-xl px-3 py-2 text-white text-sm placeholder:text-emerald-800 focus:border-emerald-400 focus:outline-none"
                />
              </motion.div>
            )}

            {/* Priority selection */}
            <div className="mb-5 pt-3 border-t border-emerald-900/40">
              <label className="block text-sm font-bold text-white mb-2">
                O que é mais importante para você?
              </label>
              <div className="space-y-1.5">
                {POPULAR_PRIORITIES.map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => updateField('priority', item)}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                      formData.priority === item
                        ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500/60'
                        : 'border-emerald-900/40 bg-[#031B10]/40 text-emerald-300/80 hover:bg-emerald-950/30'
                    }`}
                  >
                    <span>{item}</span>
                    {formData.priority === item && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-300/80 hover:text-white px-3 py-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Próxima etapa
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* STEP 4: CONTACT & LGPD */
          <motion.form
            key="step-4"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Onde podemos enviar sua análise?
              </h2>
              <p className="text-emerald-200/70 text-xs mt-0.5">
                Um especialista Arkos preparará seu comparativo sem custo.
              </p>
            </div>

            <div className="space-y-3 mb-4">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80 mb-1">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  placeholder="Como podemos te chamar?"
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  className="w-full bg-[#031B10] border border-emerald-800/60 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-emerald-800 focus:border-emerald-400 focus:outline-none transition-colors"
                />
                {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
              </div>

              {/* WhatsApp & Email in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80 mb-1">
                    WhatsApp (com DDD) *
                  </label>
                  <input
                    type="tel"
                    placeholder="(11) 98765-4321"
                    value={formData.whatsapp}
                    onChange={e => updateField('whatsapp', formatPhone(e.target.value))}
                    className="w-full bg-[#031B10] border border-emerald-800/60 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-emerald-800 focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                  {errors.whatsapp && <p className="text-red-400 text-[11px] mt-1">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    className="w-full bg-[#031B10] border border-emerald-800/60 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-emerald-800 focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Company Fields if Empresa */}
              {formData.audience === 'empresa' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80 mb-1">
                      Empresa (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Nome da sua empresa"
                      value={formData.companyName || ''}
                      onChange={e => updateField('companyName', e.target.value)}
                      className="w-full bg-[#031B10] border border-emerald-800/60 rounded-xl px-3 py-2 text-white text-sm placeholder:text-emerald-800 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80 mb-1">
                      CNPJ / MEI (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="00.000.000/0000-00"
                      value={formData.cnpj || ''}
                      onChange={e => updateField('cnpj', formatCNPJ(e.target.value))}
                      className="w-full bg-[#031B10] border border-emerald-800/60 rounded-xl px-3 py-2 text-white text-sm placeholder:text-emerald-800 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* LGPD Consent (Unchecked by default) */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.lgpdAccepted}
                    onChange={e => updateField('lgpdAccepted', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-emerald-700 text-emerald-600 focus:ring-emerald-500 bg-[#031B10] shrink-0"
                  />
                  <span className="text-[11px] text-emerald-200/80 leading-tight">
                    Concordo em receber o contato da Arkos Benefícios com o comparativo de planos e informações personalizadas de acordo com a Política de Privacidade.
                  </span>
                </label>
                {errors.lgpd && <p className="text-red-400 text-[11px] mt-1">{errors.lgpd}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-300/80 hover:text-white px-3 py-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#076633] to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Organizando...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 opacity-80" />
                    Receber minha análise
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
