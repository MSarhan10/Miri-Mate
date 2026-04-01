// =============================================
// sheet.js — Master Buckets & Symptom Database
// =============================================

// ── 1. MASTER VOCABULARY BUCKETS ──────────────
const HX_VOCABULARY = {
    pmh: [
        'Hypertension', 'Diabetes Mellitus', 'IHD', 'Heart Failure', 'CKD',
        'Asthma', 'COPD', 'Atrial Fibrillation', 'Stroke/TIA', 'Liver Cirrhosis',
        'Thyroid Disease', 'Epilepsy', 'DVT/PE', 'Peptic Ulcer Disease', 'Migraine',
        'Gallstones', 'Inflammatory Bowel Disease', 'GERD', 'Pericarditis',
        'Renal Stones / Nephrolithiasis', 'Gout', 'Rheumatoid Arthritis',
        'SLE (Systemic Lupus Erythematosus)', 'Osteoporosis', 'Anemia',
        'Hemorrhoids', 'Pancreatitis', 'Malignancy',
        'BPH (Benign Prostatic Hyperplasia)',
        'Depression', 'Anxiety Disorder', 'Bipolar Disorder', 'Schizophrenia'
    ],
    psh: [
        'Appendectomy', 'Cholecystectomy', 'Hernia Repair', 'C-Section',
        'Tonsillectomy', 'Joint Replacement', 'CABG',
        'Previous abdominal surgery', 'Neurosurgery',
        'Urinary catheterization', 'Recent intubation'
    ],
    drug: [
        'Aspirin', 'Metformin', 'Amlodipine', 'Statins', 'Warfarin/DOACs',
        'Recent Antibiotics', 'Steroids', 'Immunosuppressants', 'NSAIDs',
        'Beta Blockers', 'Nitrates', 'Salbutamol Inhaler', 'Chemotherapy',
        'Oral Contraceptives', 'ACE Inhibitors / ARBs', 'Diuretics',
        'Calcium Channel Blockers', 'Opioids', 'Benzodiazepines',
        'Antidepressants (SSRIs/TCAs)', 'Antipsychotics', 'Antiepileptics',
        'Proton Pump Inhibitors (PPIs)', 'Iron Supplements',
        'Thyroid Medications (Levothyroxine/Carbimazole)', 'Antihistamines',
        'Laxatives'
    ],
    fam: [
        'Hypertension', 'Diabetes Mellitus', 'IHD', 'Malignancy', 'Stroke',
        'Asthma', 'Premature CAD', 'Sudden cardiac death', 'Bleeding disorders',
        'Mental Illness', 'Epilepsy'
    ],
    soc: [
        'Smoking', 'Alcohol', 'Illicit Drugs', 'Pets/Animal Contact',
        'Travel History', 'Occupational Exposure', 'Sexual History'
    ]
};

// ── 2. BASELINE DEFAULTS ──────────────
const HX_BASELINE_PAST = {
    medical:  ['Hypertension', 'Diabetes Mellitus', 'IHD', 'Asthma', 'COPD', 'CKD', 'Thyroid Disease'],
    surgical: ['Appendectomy', 'Cholecystectomy', 'C-Section', 'CABG'],
    drug:     ['Aspirin', 'NSAIDs', 'Statins', 'Recent Antibiotics', 'Steroids'],
    family:   ['Hypertension', 'Diabetes Mellitus', 'IHD', 'Malignancy'],
    social:   ['Smoking', 'Alcohol', 'Illicit Drugs']
};

// ── 3. STRIPPED CORE PHENOTYPES ──────────────
const HX_PHENOTYPES = {
    PAIN: {
        fields: [
            { id: "site",        label: "Location/Site",   type: "text" },
            { id: "radiation",   label: "Radiation",       type: "text" },
            { id: "character",   label: "Character",       type: "toggle", options: ["Dull/Aching", "Sharp/Stabbing", "Crushing", "Burning", "Throbbing", "Colicky"] },
            { id: "severity",    label: "Severity (1-10)", type: "number", min: 1, max: 10 }
        ]
    },
    BLEEDING: {
        fields: [
            { id: "amount",     label: "Amount",       type: "toggle", options: ["Scant/Streaks", "Moderate", "Massive/Profuse"] },
            { id: "color",      label: "Color",        type: "toggle", options: ["Bright Red", "Dark Red", "Coffee-ground", "Black/Tarry"] }
        ]
    },
    GENERIC: { fields: [] }
};

// ── 4. SPECIFIC SYMPTOM DATABASE ──────────────
const HX_SYMPTOMS = {
'❤️ chest pain': {
        keywords: ['cp', 'chest', 'pain', 'angina', 'ألم بالصدر'],
        syndrome: ['Fever', 'Dyspnea', 'Nausea & Vomiting', 'Headache', 'Cough', 'Dizziness', 'Hemoptysis', 'LL Swelling', 'Fatigue', 'Palpitations', 'Syncope'],
        phenotype: 'PAIN',
        customFields: [
            { id: "aggravating", label: "Aggravated by", type: "chips",  options: ["Exertion", "Deep breathing", "Lying flat", "Palpation"] },
            { id: "relieving",   label: "Relieved by",   type: "chips",  options: ["Rest", "Nitrites", "Sitting up", "Antacids"] },
            { id: "diaphoresis", label: "Diaphoresis?",  type: "toggle" },
            { id: "palpitations",label: "Palpitations?", type: "toggle" }
        ],
        associations: [
            'Hypertension', 'Diabetes Mellitus', 'Dyslipidemia', 'IHD', 'DVT/PE', 'GERD', 'Pericarditis', 'Aortic Dissection',
            'CABG', 'PCI/Stents', 'Recent immobilization/surgery',
            'Nitrates', 'Beta Blockers', 'Aspirin', 'Statins', 'Oral Contraceptives', 'Warfarin/DOACs',
            'Premature CAD', 'Sudden cardiac death',
            'Smoking', 'Illicit Drugs',
            'cvs_ausc', 'resp_ausc', 'cvs_pulse',
            'Troponin I', 'D-Dimer', 'Hemoglobin (Hb)', 'Creatinine', 'CRP', 'ECG',
            'Chest X-Ray', 'CT Pulmonary Angiography (CTPA)', 'Echocardiogram', 'CT Angiography'
        ]
    },

    '🫁 dyspnea': {
        keywords: ['sob', 'dyspnea', 'breathless', 'shortness of breath', 'ضيق تنفس', 'نهجان'],
        syndrome: ['Fever', 'Chest Pain', 'Nausea & Vomiting', 'Headache', 'Cough', 'Dizziness', 'Hemoptysis', 'LL Swelling', 'Fatigue', 'Palpitations', 'Syncope'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "orthopnea",    label: "Orthopnea?",          type: "toggle" },
            { id: "pnd",          label: "PND?",                type: "toggle" },
            { id: "wheezing",     label: "Associated Wheezing?",type: "toggle" },
            { id: "exercise_tol", label: "Exercise Tolerance",  type: "chips",  options: ["At Rest", "Minimal Exertion", "Moderate Exertion"] }
        ],
        associations: [
            'Asthma', 'COPD', 'Heart Failure', 'IHD', 'DVT/PE', 'CKD', 'Anemia', 'Pericarditis',
            'Recent intubation', 'CABG', 'Recent immobilization/surgery',
            'Beta Blockers', 'Oral Contraceptives', 'Amiodarone',
            'Asthma', 'Sudden cardiac death',
            'Smoking', 'Occupational Exposure',
            'resp_insp', 'resp_ausc', 'cvs_ausc', 'gen_signs',
            'WBC', 'Troponin I', 'D-Dimer', 'pH', 'pCO2', 'pO2', 'HCO3', 'Hemoglobin (Hb)', 'BNP', 'Lactate', 'ECG',
            'Chest X-Ray', 'CT Pulmonary Angiography (CTPA)', 'Echocardiogram', 'V/Q Scan'
        ]
    },
    '🫀 palpitations': {
        systems: ['CVS', 'ENDO', 'PSYCH', 'GEN'],
        keywords: ['palpitations', 'racing heart', 'heart fluttering', 'skipped beats', 'irregular heartbeat'],
        syndrome: ['dyspnea', 'chest pain', 'dizziness / vertigo', 'generalized weakness / fatigue', 'loss of consciousness / coma', 'syncope / presyncope', 'anxiety', 'panic attacks'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "character", label: "Character",           type: "toggle", options: ["Regular/Fast", "Irregular", "Skipped beats", "Fluttering"] },
            { id: "trigger",   label: "Triggered by",        type: "chips",  options: ["Exertion", "Caffeine/Stimulants", "Stress/Anxiety", "At rest", "Posture change"] },
            { id: "assoc_sx",  label: "Associated Symptoms", type: "chips",  options: ["Chest pain", "Dyspnea", "Syncope", "Diaphoresis"] }
        ],
        associations: [
            'Atrial Fibrillation', 'IHD', 'Heart Failure', 'Thyroid Disease', 'Hypertension', 'Anxiety Disorder',
            'CABG',
            'Salbutamol Inhaler', 'Thyroid Medications (Levothyroxine/Carbimazole)', 'Antidepressants (SSRIs/TCAs)', 'Beta Blockers',
            'Sudden cardiac death', 'Premature CAD',
            'Smoking', 'Alcohol', 'Illicit Drugs',
            'ECG', 'Holter Monitor', 'Troponin I', 'TSH', 'Free T4 (fT4)', 'Hemoglobin (Hb)', 'Potassium (K)', 'Magnesium',
            'Echocardiogram', 'Chest X-Ray',
            'cvs_pulse', 'cvs_ausc', 'endo_thyroid', 'gen_appearance'
        ]
    },

    '😵‍💫 syncope / presyncope': {
        systems: ['CNS', 'CVS', 'GEN'],
        keywords: ['syncope', 'faint', 'fainting', 'blackout', 'collapse', 'presyncope', 'near faint', 'loss of consciousness'],
        syndrome: ['palpitations', 'dizziness / vertigo', 'loss of consciousness / coma', 'chest pain', 'dyspnea', 'seizures', 'altered mental status', 'hematemesis', 'melena'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "prodrome",   label: "Prodrome",                    type: "chips",  options: ["None", "Nausea", "Diaphoresis", "Visual changes", "Palpitations", "Lightheadedness"] },
            { id: "posture",    label: "Posture at onset",            type: "toggle", options: ["Prolonged standing", "Exertion", "Sitting/Lying", "No clear trigger"] },
            { id: "recovery",   label: "Recovery",                    type: "toggle", options: ["Immediate (< 1 min)", "Prolonged (> 1 min)"] },
            { id: "seizure_sx", label: "Tongue bite / Incontinence?", type: "toggle" }
        ],
        associations: [
            'IHD', 'Atrial Fibrillation', 'Heart Failure', 'Hypertension', 'Diabetes Mellitus', 'Epilepsy', 'Anemia',
            'Amlodipine', 'Beta Blockers', 'Diuretics', 'Nitrates', 'Antidepressants (SSRIs/TCAs)',
            'Sudden cardiac death',
            'Alcohol',
            'ECG', 'Holter Monitor', 'Hemoglobin (Hb)', 'Glucose (Random)', 'Sodium (Na)', 'Potassium (K)',
            'Echocardiogram', 'CT Brain', 'Carotid Doppler US',
            'cvs_pulse', 'cvs_ausc', 'cns_consciousness', 'cns_cranial', 'gen_appearance'
        ]
    },

    '🦵 ll swelling': {
        systems: ['CVS', 'NEPH', 'GI', 'GEN'],
        keywords: ['leg swelling', 'ankle swelling', 'lower limb swelling', 'lower limb edema', 'pedal edema', 'll swelling', 'bilateral leg swelling'],
        syndrome: ['dyspnea', 'orthopnea', 'paroxysmal nocturnal dyspnea', 'chest pain', 'oliguria', 'polyuria', 'weight loss', 'generalized weakness / fatigue', 'abdominal distension'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "laterality", label: "Laterality",        type: "toggle", options: ["Bilateral", "Right only", "Left only"] },
            { id: "pitting",    label: "Pitting?",          type: "toggle" },
            { id: "pain",       label: "Associated Pain?",  type: "toggle" },
            { id: "skin_chng",  label: "Skin Changes",      type: "chips",  options: ["None", "Erythema/Warmth", "Skin thickening", "Ulceration", "Varicosities"] }
        ],
        associations: [
            'Heart Failure', 'CKD', 'DVT/PE', 'Liver Cirrhosis', 'Hypertension', 'Malignancy',
            'Joint Replacement',
            'Amlodipine', 'Calcium Channel Blockers', 'Steroids', 'Oral Contraceptives',
            'IHD',
            'Smoking', 'Occupational Exposure',
            'BNP', 'Albumin', 'Creatinine', 'eGFR', 'D-Dimer', 'Urinalysis', 'Urine Protein/Cr Ratio', 'WBC', 'CRP',
            'Echocardiogram', 'Doppler US Lower Limbs', 'Chest X-Ray',
            'cvs_periph', 'gen_signs', 'neph_fluid_access', 'gen_hydration'
        ]
    },

    '😮‍💨 cough': {
        systems: ['RESP', 'CVS', 'ENT', 'GI'],
        keywords: ['cough', 'coughing', 'dry cough', 'productive cough', 'chronic cough'],
        syndrome: ['dyspnea', 'hemoptysis', 'wheezing', 'chest pain', 'fever', 'weight loss', 'sore throat', 'night sweats'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "type",       label: "Type",          type: "toggle", options: ["Dry", "Productive"] },
            { id: "sputum",     label: "Sputum Color",  type: "toggle", options: ["N/A", "White/Clear", "Yellow/Green", "Rusty", "Pink/Frothy"] },
            { id: "timing",     label: "Timing",        type: "chips",  options: ["Nocturnal", "Morning", "Postural", "Continuous", "Seasonal"] },
            { id: "hemoptysis", label: "Hemoptysis?",   type: "toggle" }
        ],
        associations: [
            'Asthma', 'COPD', 'Heart Failure', 'GERD', 'Malignancy',
            'Recent intubation',
            'ACE Inhibitors / ARBs', 'Beta Blockers', 'Aspirin', 'Salbutamol Inhaler',
            'Smoking', 'Occupational Exposure', 'Pets/Animal Contact',
            'WBC', 'CRP', 'Procalcitonin', 'Sputum Culture', 'AFB Smear/Culture',
            'Chest X-Ray', 'CT Chest', 'Bronchoscopy',
            'resp_ausc', 'resp_insp', 'resp_palp', 'gen_signs'
        ]
    },

    '🩸 hemoptysis': {
        systems: ['RESP', 'CVS'],
        keywords: ['hemoptysis', 'haemoptysis', 'coughing blood', 'blood in sputum', 'bloody sputum', 'blood-streaked sputum'],
        syndrome: ['cough', 'dyspnea', 'chest pain', 'weight loss', 'night sweats', 'fever'],
        phenotype: 'BLEEDING',
        customFields: [
            { id: "mixed",     label: "Mixed with sputum?",  type: "toggle" },
            { id: "recurrent", label: "Recurrent episodes?", type: "toggle" },
            { id: "dyspnea",   label: "Associated Dyspnea?", type: "toggle" }
        ],
        associations: [
            'Malignancy', 'COPD', 'DVT/PE', 'Heart Failure',
            'Warfarin/DOACs', 'Aspirin', 'NSAIDs',
            'Bleeding disorders',
            'Smoking', 'Occupational Exposure',
            'Hemoglobin (Hb)', 'WBC', 'CRP', 'PT', 'PTT', 'INR', 'D-Dimer', 'Sputum Culture', 'AFB Smear/Culture', 'Blood Group & Crossmatch',
            'Chest X-Ray', 'CT Chest', 'CT Pulmonary Angiography (CTPA)', 'Bronchoscopy',
            'resp_ausc', 'resp_insp', 'resp_palp', 'gen_signs', 'gen_appearance'
        ]
    },

    '😮‍💨 wheezing': {
        systems: ['RESP', 'CVS', 'ENT'],
        keywords: ['wheeze', 'wheezing', 'chest tightness', 'noisy breathing'],
        syndrome: ['dyspnea', 'cough', 'chest pain', 'fever'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "timing",   label: "Timing",               type: "chips",  options: ["Nocturnal", "Exercise-induced", "Continuous", "Seasonal/Allergic"] },
            { id: "phase",    label: "Phase",                type: "toggle", options: ["Expiratory", "Inspiratory (stridor)", "Both"] },
            { id: "triggers", label: "Identifiable Trigger", type: "chips",  options: ["None", "Allergens", "Cold air", "NSAIDs/Beta-blockers", "Smoke/Fumes"] }
        ],
        associations: [
            'Asthma', 'COPD', 'Heart Failure', 'GERD',
            'Recent intubation',
            'Salbutamol Inhaler', 'Steroids', 'Beta Blockers', 'Aspirin', 'NSAIDs',
            'Smoking', 'Occupational Exposure', 'Pets/Animal Contact',
            'WBC', 'CRP', 'pO2', 'pCO2', 'O2 Saturation (SpO2)',
            'Chest X-Ray', 'CT Chest',
            'resp_ausc', 'resp_insp', 'resp_palp', 'gen_signs'
        ]
    },

    '😩 orthopnea': {
        systems: ['CVS', 'RESP'],
        keywords: ['orthopnea', 'orthopnoea', 'breathless lying flat', 'cannot lie flat', 'pillow orthopnea'],
        syndrome: ['dyspnea', 'paroxysmal nocturnal dyspnea', 'll swelling', 'cough', 'palpitations'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "pillows", label: "Pillows needed",            type: "toggle", options: ["1 (baseline)", "2", "3", "Sleeps upright"] },
            { id: "relief",  label: "Relieved by sitting up?",   type: "toggle" }
        ],
        associations: [
            'Heart Failure', 'IHD', 'COPD', 'Asthma', 'Liver Cirrhosis',
            'CABG',
            'Beta Blockers', 'Diuretics', 'Aspirin', 'Statins',
            'Premature CAD', 'Sudden cardiac death',
            'Smoking',
            'BNP', 'Troponin I', 'Hemoglobin (Hb)', 'Creatinine', 'O2 Saturation (SpO2)',
            'Chest X-Ray', 'Echocardiogram',
            'cvs_ausc', 'cvs_insp', 'cvs_periph', 'resp_ausc', 'gen_signs'
        ]
    },

    '😪 paroxysmal nocturnal dyspnea': {
        systems: ['CVS', 'RESP'],
        keywords: ['pnd', 'paroxysmal nocturnal dyspnea', 'paroxysmal nocturnal dyspnoea', 'waking up breathless', 'nocturnal dyspnea'],
        syndrome: ['orthopnea', 'dyspnea', 'cough', 'll swelling'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "time",     label: "Time after lying down",  type: "toggle", options: ["1–2 hours", "2–4 hours", "Variable"] },
            { id: "relief",   label: "Relieved by",            type: "toggle", options: ["Sitting up", "Opening window", "Both"] },
            { id: "assoc_sx", label: "Associated Symptoms",    type: "chips",  options: ["Cough", "Wheeze", "Diaphoresis"] }
        ],
        associations: [
            'Heart Failure', 'IHD', 'COPD', 'Asthma',
            'CABG',
            'Beta Blockers', 'Diuretics', 'Aspirin', 'Statins',
            'Premature CAD', 'Sudden cardiac death',
            'Smoking',
            'BNP', 'Troponin I', 'Hemoglobin (Hb)', 'Creatinine', 'O2 Saturation (SpO2)',
            'Chest X-Ray', 'Echocardiogram',
            'cvs_ausc', 'cvs_insp', 'cvs_periph', 'resp_ausc', 'gen_signs'
        ]
    },

    '🤢 nausea / vomiting': {
        systems: ['GI', 'GEN', 'CNS', 'NEPH', 'ENDO', 'OBS'],
        keywords: ['nausea', 'vomiting', 'emesis', 'feeling sick', 'nausea and vomiting'],
        syndrome: ['abdominal pain', 'diarrhea', 'headache', 'dizziness / vertigo', 'fever', 'hematemesis', 'flank pain', 'altered mental status', 'jaundice', 'dysphagia', 'constipation', 'chest pain'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "vomiting",  label: "Vomiting present?",  type: "toggle" },
            { id: "blood",     label: "Blood in vomit?",    type: "toggle" },
            { id: "relation",  label: "Relation to food",   type: "toggle", options: ["Unrelated", "Shortly after eating", "Hours after eating", "Relieved by eating"] },
            { id: "frequency", label: "Frequency",          type: "toggle", options: ["Once", "2–3×/day", "> 3×/day"] }
        ],
        associations: [
            'GERD', 'Peptic Ulcer Disease', 'Gallstones', 'Pancreatitis', 'Liver Cirrhosis', 'Anemia', 'Malignancy',
            'Previous abdominal surgery',
            'NSAIDs', 'Opioids', 'Steroids', 'Chemotherapy', 'Metformin', 'Iron Supplements', 'Recent Antibiotics',
            'Alcohol',
            'WBC', 'CRP', 'Lipase', 'ALT (SGPT)', 'Total Bilirubin', 'Sodium (Na)', 'Potassium (K)', 'Creatinine', 'Glucose (Random)', 'β-hCG (serum)', 'Urinalysis',
            'Abdominal US', 'CT Abdomen & Pelvis', 'Erect Chest X-Ray',
            'gi_palp', 'gi_perc_ausc', 'gen_signs', 'gen_hydration'
        ]
    },

    '🩸 hematemesis': {
        systems: ['GI'],
        keywords: ['hematemesis', 'haematemesis', 'vomiting blood', 'bloody vomit', 'coffee ground vomiting', 'coffee ground emesis'],
        syndrome: ['nausea / vomiting', 'melena', 'abdominal pain', 'dizziness / vertigo', 'syncope / presyncope', 'jaundice', 'dysphagia', 'easy bruising / bleeding'],
        phenotype: 'BLEEDING',
        customFields: [
            { id: "melena",   label: "Associated Melena?",     type: "toggle" },
            { id: "prior",    label: "Prior episodes?",        type: "toggle" },
            { id: "syncope",  label: "Syncope/Dizziness?",     type: "toggle" }
        ],
        associations: [
            'Peptic Ulcer Disease', 'Liver Cirrhosis', 'GERD', 'Malignancy',
            'Previous abdominal surgery',
            'NSAIDs', 'Aspirin', 'Warfarin/DOACs', 'Steroids',
            'Bleeding disorders',
            'Alcohol',
            'Hemoglobin (Hb)', 'Blood Group & Crossmatch', 'PT', 'PTT', 'INR', 'WBC', 'Platelets', 'CRP', 'ALT (SGPT)', 'Creatinine', 'BUN', 'Urea',
            'Upper Endoscopy (OGD)', 'CT Angiography', 'Erect Chest X-Ray',
            'gi_insp', 'gi_palp', 'gi_perc_ausc', 'gen_signs', 'gen_appearance', 'cvs_pulse'
        ]
    },

    '🩸 melena': {
        systems: ['GI'],
        keywords: ['melena', 'melaena', 'black stool', 'tarry stool', 'black tarry stools', 'dark stool'],
        syndrome: ['hematemesis', 'hematochezia', 'abdominal pain', 'dizziness / vertigo', 'syncope / presyncope', 'fatigue', 'generalized weakness / fatigue'],
        phenotype: 'BLEEDING',
        customFields: [
            { id: "hematemesis", label: "Associated Hematemesis?", type: "toggle" },
            { id: "prior",       label: "Prior episodes?",         type: "toggle" },
            { id: "dizziness",   label: "Dizziness / Syncope?",    type: "toggle" }
        ],
        associations: [
            'Peptic Ulcer Disease', 'Liver Cirrhosis', 'Malignancy', 'GERD', 'Anemia',
            'Previous abdominal surgery',
            'NSAIDs', 'Aspirin', 'Warfarin/DOACs', 'Steroids',
            'Bleeding disorders',
            'Alcohol',
            'Hemoglobin (Hb)', 'Blood Group & Crossmatch', 'PT', 'PTT', 'INR', 'WBC', 'Platelets', 'CRP', 'BUN', 'Urea', 'Creatinine', 'ALT (SGPT)',
            'Upper Endoscopy (OGD)', 'CT Angiography', 'Erect Chest X-Ray',
            'gi_insp', 'gi_palp', 'gi_dre', 'gen_signs', 'gen_appearance', 'cvs_pulse'
        ]
    },

    '🩸 hematochezia': {
        systems: ['GI'],
        keywords: ['hematochezia', 'haematochezia', 'rectal bleeding', 'blood per rectum', 'bright red blood per rectum', 'fresh blood in stool', 'BRBPR'],
        syndrome: ['melena', 'diarrhea', 'abdominal pain', 'weight loss', 'generalized weakness / fatigue', 'constipation'],
        phenotype: 'BLEEDING',
        customFields: [
            { id: "mixed",  label: "Mixed with stool?",       type: "toggle" },
            { id: "pain",   label: "Associated Rectal Pain?", type: "toggle" },
            { id: "prior",  label: "Prior episodes?",         type: "toggle" }
        ],
        associations: [
            'Hemorrhoids', 'Inflammatory Bowel Disease', 'Malignancy', 'Peptic Ulcer Disease', 'Anemia',
            'Appendectomy', 'Previous abdominal surgery',
            'NSAIDs', 'Aspirin', 'Warfarin/DOACs',
            'Malignancy', 'Bleeding disorders',
            'Alcohol',
            'Hemoglobin (Hb)', 'Blood Group & Crossmatch', 'PT', 'PTT', 'INR', 'WBC', 'Platelets', 'CRP',
            'Colonoscopy', 'Flexible Sigmoidoscopy', 'CT Abdomen & Pelvis', 'CT Angiography',
            'gi_insp', 'gi_palp', 'gi_perc_ausc', 'gi_dre', 'gen_signs', 'gen_appearance'
        ]
    },

    '🚽 diarrhea': {
        systems: ['GI', 'GEN', 'ENDO'],
        keywords: ['diarrhea', 'diarrhoea', 'loose stools', 'watery stool', 'frequent stools', 'loose motions'],
        syndrome: ['abdominal pain', 'nausea / vomiting', 'fever', 'weight loss', 'hematochezia'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "consistency", label: "Consistency",           type: "toggle", options: ["Watery", "Loose", "Semi-formed"] },
            { id: "frequency",   label: "Frequency",             type: "toggle", options: ["2–3×/day", "4–6×/day", "> 6×/day"] },
            { id: "contents",    label: "Blood / Mucus",         type: "chips",  options: ["None", "Blood", "Mucus", "Both"] },
            { id: "nocturnal",   label: "Nocturnal Diarrhea?",   type: "toggle" }
        ],
        associations: [
            'Inflammatory Bowel Disease', 'Malignancy', 'Thyroid Disease', 'Diabetes Mellitus', 'Liver Cirrhosis',
            'Cholecystectomy', 'Previous abdominal surgery',
            'Recent Antibiotics', 'NSAIDs', 'Metformin', 'Laxatives', 'Chemotherapy', 'Immunosuppressants',
            'Travel History', 'Pets/Animal Contact',
            'WBC', 'CRP', 'ESR', 'Hemoglobin (Hb)', 'Albumin', 'Sodium (Na)', 'Potassium (K)', 'TSH', 'Stool Analysis', 'Stool Culture', 'Blood Culture',
            'Colonoscopy', 'CT Abdomen & Pelvis', 'Abdominal US',
            'gi_palp', 'gi_perc_ausc', 'gen_signs', 'gen_hydration'
        ]
    },

    '😖 constipation': {
        systems: ['GI', 'GEN', 'ENDO'],
        keywords: ['constipation', 'hard stools', 'difficulty passing stool', 'infrequent bowel movements', 'straining', 'no bowel movement'],
        syndrome: ['abdominal pain', 'nausea / vomiting', 'abdominal distension', 'weight loss', 'hematochezia'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "frequency",  label: "Bowel Movements/Week",   type: "toggle", options: ["3–6 (normal)", "1–2", "< 1"] },
            { id: "straining",  label: "Straining?",             type: "toggle" },
            { id: "blood",      label: "Blood on Stool?",        type: "toggle" },
            { id: "complete",   label: "Incomplete Evacuation?", type: "toggle" }
        ],
        associations: [
            'Malignancy', 'Thyroid Disease', 'CKD', 'Diabetes Mellitus', 'Hemorrhoids',
            'Previous abdominal surgery', 'Hernia Repair',
            'Opioids', 'Iron Supplements', 'Calcium Channel Blockers', 'Antidepressants (SSRIs/TCAs)', 'Antipsychotics',
            'Alcohol', 'Occupational Exposure',
            'TSH', 'Calcium', 'Potassium (K)', 'Hemoglobin (Hb)', 'Glucose (Random)', 'WBC', 'CRP',
            'Abdominal X-Ray', 'Colonoscopy', 'CT Abdomen & Pelvis',
            'gi_insp', 'gi_palp', 'gi_perc_ausc', 'gi_dre', 'gen_signs'
        ]
    },

    '🟡 jaundice': {
        systems: ['GI', 'GEN'],
        keywords: ['jaundice', 'icterus', 'yellow skin', 'yellow eyes', 'yellowing', 'scleral icterus'],
        syndrome: ['abdominal pain', 'nausea / vomiting', 'fever', 'weight loss', 'generalized weakness / fatigue', 'hematemesis', 'abdominal distension', 'altered mental status', 'generalized pruritus'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "urine",    label: "Dark Urine?",      type: "toggle" },
            { id: "stool",    label: "Pale / Clay Stool?", type: "toggle" },
            { id: "pruritus", label: "Pruritus?",         type: "toggle" },
            { id: "pain",     label: "Associated Pain?",  type: "toggle" }
        ],
        associations: [
            'Liver Cirrhosis', 'Gallstones', 'Malignancy', 'Pancreatitis', 'Anemia',
            'Cholecystectomy', 'Previous abdominal surgery',
            'NSAIDs', 'Statins', 'Antidepressants (SSRIs/TCAs)', 'Chemotherapy', 'Recent Antibiotics',
            'Malignancy',
            'Alcohol', 'Travel History', 'Sexual History',
            'Total Bilirubin', 'Direct Bilirubin', 'ALT (SGPT)', 'AST (SGOT)', 'Alkaline Phosphatase (ALP)', 'GGT', 'Albumin', 'PT', 'INR', 'WBC', 'CRP', 'Hemoglobin (Hb)', 'Blood Film', 'LDH', 'Haptoglobin', 'Reticulocyte Count', 'HBsAg', 'Anti-HCV',
            'Abdominal US', 'MRCP', 'CT Abdomen & Pelvis', 'Triple-Phase CT Liver', 'ERCP',
            'gi_insp', 'gi_palp', 'gen_signs', 'skin_lesion'
        ]
    },

    '🍽️ dysphagia': {
        systems: ['GI', 'ENT', 'CNS'],
        keywords: ['dysphagia', 'difficulty swallowing', 'food sticking', 'trouble swallowing', 'odynophagia'],
        syndrome: ['weight loss', 'nausea / vomiting', 'hematemesis', 'cough', 'sore throat', 'heartburn', 'dyspepsia'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "type",        label: "Affects",                  type: "toggle", options: ["Solids only", "Liquids only", "Both solids & liquids"] },
            { id: "odynophagia", label: "Painful Swallowing?",      type: "toggle" },
            { id: "regurg",      label: "Regurgitation?",           type: "toggle" }
        ],
        associations: [
            'Malignancy', 'GERD', 'Stroke/TIA', 'Thyroid Disease',
            'Previous abdominal surgery', 'Neurosurgery',
            'NSAIDs', 'Steroids', 'Immunosuppressants',
            'Malignancy',
            'Smoking', 'Alcohol',
            'Hemoglobin (Hb)', 'Albumin', 'WBC', 'CRP',
            'Barium Swallow', 'Upper Endoscopy (OGD)', 'CT Chest', 'CT Head & Neck', 'Thyroid US',
            'ent_throat', 'cns_cranial', 'gi_palp', 'gen_appearance', 'gen_signs'
        ]
    },

    '❤️‍🔥 heartburn': {
        systems: ['GI'],
        keywords: ['heartburn', 'acid reflux', 'pyrosis', 'retrosternal burning', 'burning chest', 'acid indigestion'],
        syndrome: ['dyspepsia', 'chest pain', 'dysphagia', 'nausea / vomiting', 'cough'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "triggers",  label: "Triggered by",        type: "chips",  options: ["Large meals", "Lying flat", "Spicy food", "Caffeine/Alcohol", "Bending forward"] },
            { id: "relieved",  label: "Relieved by",         type: "chips",  options: ["Antacids", "PPIs", "Sitting upright", "Nothing"] },
            { id: "regurg",    label: "Regurgitation?",      type: "toggle" },
            { id: "nocturnal", label: "Nocturnal symptoms?", type: "toggle" }
        ],
        associations: [
            'GERD', 'Peptic Ulcer Disease', 'Malignancy', 'Hiatus hernia',
            'NSAIDs', 'Aspirin', 'Steroids', 'Calcium Channel Blockers', 'Proton Pump Inhibitors (PPIs)',
            'Smoking', 'Alcohol',
            'H. pylori Test (Stool Antigen)', 'Hemoglobin (Hb)',
            'Upper Endoscopy (OGD)', 'Barium Meal',
            'gi_insp', 'gi_palp'
        ]
    },

    '😖 dyspepsia': {
        systems: ['GI'],
        keywords: ['dyspepsia', 'indigestion', 'epigastric discomfort', 'upset stomach', 'bloating', 'fullness', 'early satiety'],
        syndrome: ['heartburn', 'abdominal pain', 'nausea / vomiting', 'weight loss', 'melena'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "relation",  label: "Relation to food",    type: "toggle", options: ["Unrelated", "Worse after eating", "Worse before eating", "Relieved by eating"] },
            { id: "bloating",  label: "Postprandial Bloating?", type: "toggle" },
            { id: "satiety",   label: "Early Satiety?",      type: "toggle" },
            { id: "belching",  label: "Belching / Flatulence?", type: "toggle" }
        ],
        associations: [
            'Peptic Ulcer Disease', 'GERD', 'Gallstones', 'Pancreatitis', 'Malignancy',
            'Cholecystectomy', 'Previous abdominal surgery',
            'NSAIDs', 'Aspirin', 'Steroids', 'Metformin', 'Iron Supplements',
            'Smoking', 'Alcohol',
            'H. pylori Test (Stool Antigen)', 'Hemoglobin (Hb)', 'WBC', 'CRP', 'ALT (SGPT)', 'Lipase', 'Amylase',
            'Upper Endoscopy (OGD)', 'Abdominal US', 'Barium Meal',
            'gi_insp', 'gi_palp', 'gi_perc_ausc'
        ]
    },

    '🤕 headache': {
        systems: ['CNS', 'GEN'],
        keywords: ['headache', 'head pain', 'cephalgia', 'migraine', 'head ache'],
        syndrome: ['fever', 'altered mental status', 'nausea / vomiting', 'dizziness / vertigo', 'seizures', 'syncope / presyncope', 'neck pain'],
        phenotype: 'PAIN',
        customFields: [
            { id: "aggravating", label: "Aggravated by",      type: "chips",  options: ["Valsalva/Coughing", "Bending forward", "Light (photophobia)", "Sound (phonophobia)", "Movement"] },
            { id: "relieving",   label: "Relieved by",        type: "chips",  options: ["Analgesia", "Darkness/Rest", "Sleep", "Nothing"] },
            { id: "assoc_sx",    label: "Associated Symptoms",type: "chips",  options: ["Nausea/Vomiting", "Visual aura", "Neck stiffness", "Fever", "Focal weakness"] },
            { id: "thunderclap", label: "Thunderclap onset (worst of life)?", type: "toggle" }
        ],
        associations: [
            'Migraine', 'Hypertension', 'Stroke/TIA', 'Malignancy', 'Epilepsy',
            'Neurosurgery',
            'NSAIDs', 'Opioids', 'Oral Contraceptives', 'Antiepileptics', 'Antidepressants (SSRIs/TCAs)',
            'Migraine', 'Malignancy', 'Epilepsy', 'Stroke',
            'Alcohol', 'Smoking',
            'WBC', 'CRP', 'ESR', 'Lumbar Puncture (CSF Analysis)',
            'CT Brain', 'MRI Brain', 'CT Brain with Contrast',
            'cns_consciousness', 'cns_cranial', 'cns_motor', 'cns_coord', 'gen_appearance', 'gen_signs'
        ]
    },

    '😵‍💫 altered mental status': {
        systems: ['CNS', 'PSYCH', 'GEN', 'NEPH'],
        keywords: ['altered mental status', 'AMS', 'confusion', 'acute confusion', 'delirium', 'encephalopathy', 'disorientation'],
        syndrome: ['fever', 'headache', 'seizures', 'syncope / presyncope', 'oliguria', 'jaundice', 'nausea / vomiting', 'loss of consciousness / coma', 'poisoning / toxin ingestion'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "agitation",   label: "Agitation?",        type: "toggle" },
            { id: "halluc",      label: "Hallucinations?",   type: "toggle" },
            { id: "focal",       label: "Focal Neurology?",  type: "toggle" }
        ],
        associations: [
            'Stroke/TIA', 'Epilepsy', 'Liver Cirrhosis', 'CKD', 'Diabetes Mellitus', 'Hypertension', 'Malignancy', 'Depression', 'Schizophrenia',
            'Neurosurgery',
            'Opioids', 'Benzodiazepines', 'Antipsychotics', 'Antiepileptics', 'Steroids', 'Antidepressants (SSRIs/TCAs)',
            'Mental Illness', 'Epilepsy',
            'Alcohol', 'Illicit Drugs',
            'WBC', 'CRP', 'Sodium (Na)', 'Potassium (K)', 'Glucose (Random)', 'Creatinine', 'BUN', 'Ammonia', 'Lactate', 'Calcium', 'pH', 'pCO2', 'HCO3', 'TSH', 'Hemoglobin (Hb)', 'Blood Culture', 'Urinalysis', 'Lumbar Puncture (CSF Analysis)',
            'CT Brain', 'CT Brain with Contrast', 'MRI Brain', 'Chest X-Ray', 'Abdominal US',
            'cns_consciousness', 'cns_cranial', 'cns_motor', 'gen_appearance', 'gen_hydration', 'psych_cognition'
        ]
    },

    '🫨 dizziness / vertigo': {
        systems: ['CNS', 'ENT', 'CVS', 'GEN'],
        keywords: ['dizziness', 'vertigo', 'spinning', 'room spinning', 'lightheadedness', 'unsteadiness', 'imbalance', 'giddiness'],
        syndrome: ['syncope / presyncope', 'palpitations', 'nausea / vomiting', 'headache', 'chest pain', 'dyspnea', 'hematemesis', 'melena', 'earache'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "timing",    label: "Timing",            type: "toggle", options: ["Episodic", "Constant"] },
            { id: "trigger",   label: "Triggered by",      type: "chips",  options: ["Head movement", "Position change", "Loud noises", "Stress", "None"] },
            { id: "assoc_sx",  label: "Associated Symptoms",type: "chips",  options: ["Nausea/Vomiting", "Tinnitus", "Hearing loss", "Focal weakness", "Diplopia"] }
        ],
        associations: [
            'Migraine', 'Stroke/TIA', 'Hypertension', 'Atrial Fibrillation', 'Diabetes Mellitus', 'Anemia',
            'Neurosurgery',
            'Amlodipine', 'Beta Blockers', 'Diuretics', 'Antiepileptics', 'Recent Antibiotics', 'Aspirin',
            'Stroke', 'Epilepsy',
            'Alcohol',
            'Hemoglobin (Hb)', 'Glucose (Random)', 'TSH', 'ECG', 'Holter Monitor',
            'CT Brain', 'MRI Brain', 'Carotid Doppler US', 'ent_ear',
            'cns_cranial', 'cns_coord', 'cvs_pulse', 'gen_signs'
        ]
    },

    '✊ focal weakness': {
        systems: ['CNS', 'MSK'],
        keywords: ['weakness', 'focal weakness', 'limb weakness', 'dropping things', 'heavy limb', 'stumbling'],
        syndrome: ['hemiparesis', 'altered mental status', 'headache', 'dizziness / vertigo', 'numbness / paresthesia'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "location",  label: "Location",          type: "chips",  options: ["Face", "Right Arm", "Left Arm", "Right Leg", "Left Leg"] },
            { id: "severity",  label: "Severity",          type: "toggle", options: ["Mild", "Moderate", "Severe (no movement)"] }
        ],
        associations: [
            'Stroke/TIA', 'Malignancy', 'Diabetes Mellitus', 'Hypertension', 'Atrial Fibrillation',
            'Neurosurgery',
            'Warfarin/DOACs', 'Aspirin', 'Statins',
            'Stroke', 'Hypertension',
            'CT Brain', 'MRI Brain', 'MRI Spine', 'CT Spine', 'Echocardiogram', 'Carotid Doppler US',
            'Glucose (Random)', 'Sodium (Na)', 'Potassium (K)', 'PT', 'PTT', 'INR',
            'cns_motor', 'cns_cranial', 'cns_consciousness', 'cns_sensory', 'gen_appearance'
        ]
    },

    '🙋 hemiparesis': {
        systems: ['CNS'],
        keywords: ['hemiparesis', 'hemiplegia', 'one-sided weakness', 'right sided weakness', 'left sided weakness'],
        syndrome: ['focal weakness', 'altered mental status', 'headache', 'dizziness / vertigo', 'numbness / paresthesia'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "side",      label: "Affected Side",     type: "toggle", options: ["Right", "Left"] },
            { id: "duration",  label: "Duration",          type: "toggle", options: ["Minutes", "Hours", "Persistent"] },
            { id: "face",      label: "Facial Droop?",      type: "toggle" }
        ],
        associations: [
            'Stroke/TIA', 'Atrial Fibrillation', 'Hypertension', 'Diabetes Mellitus', 'IHD',
            'Neurosurgery', 'CABG',
            'Warfarin/DOACs', 'Aspirin', 'Statins', 'Amlodipine',
            'Stroke', 'Hypertension',
            'CT Brain', 'MRI Brain', 'Carotid Doppler US', 'Echocardiogram',
            'Glucose (Random)', 'PT', 'PTT', 'INR', 'Hemoglobin (Hb)', 'LDL',
            'cns_motor', 'cns_cranial', 'cns_consciousness', 'cvs_pulse', 'gen_signs'
        ]
    },

    '🫨 seizures': {
        systems: ['CNS', 'GEN', 'PSYCH'],
        keywords: ['seizure', 'fit', 'convulsion', 'epilepsy', 'shaking', 'jerking', 'aura', 'post-ictal'],
        syndrome: ['altered mental status', 'headache', 'fever', 'syncope / presyncope', 'loss of consciousness / coma'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "type",       label: "Seizure Type",      type: "toggle", options: ["Generalized (Tonic-Clonic)", "Focal", "Absence"] },
            { id: "aura",       label: "Aura present?",     type: "toggle" },
            { id: "tongue_bite",label: "Tongue Bite?",      type: "toggle" },
            { id: "incont",     label: "Incontinence?",     type: "toggle" }
        ],
        associations: [
            'Epilepsy', 'Stroke/TIA', 'Malignancy', 'Diabetes Mellitus', 'Liver Cirrhosis', 'CKD',
            'Neurosurgery',
            'Antiepileptics', 'Antipsychotics', 'Recent Antibiotics',
            'Epilepsy',
            'Alcohol', 'Illicit Drugs',
            'Glucose (Random)', 'Sodium (Na)', 'Calcium', 'Magnesium', 'Antiepileptic Drug Levels', 'Toxicology Screen', 'pH', 'Lactate',
            'CT Brain', 'MRI Brain', 'Chest X-Ray', 'ECG',
            'cns_consciousness', 'cns_motor', 'cns_cranial', 'gen_appearance', 'gen_hydration'
        ]
    },

    '🫥 numbness / paresthesia': {
        systems: ['CNS', 'MSK', 'ENDO'],
        keywords: ['numbness', 'tingling', 'pins and needles', 'paresthesia', 'loss of sensation'],
        syndrome: ['focal weakness', 'hemiparesis', 'back pain', 'lower back pain', 'neck pain'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "dist",      label: "Distribution",      type: "chips",  options: ["Glove & Stocking", "Dermatomal", "Hemisensory", "Perioral"] },
        ],
        associations: [
            'Diabetes Mellitus', 'Stroke/TIA', 'CKD', 'Thyroid Disease', 'Malignancy', 'Anemia',
            'Neurosurgery', 'Joint Replacement',
            'Chemotherapy', 'Metformin', 'Statins',
            'Vitamin B12', 'Folate', 'HbA1c', 'Glucose (Random)', 'Hemoglobin (Hb)',
            'MRI Spine', 'CT Spine', 'MRI Brain',
            'cns_sensory', 'cns_motor', 'endo_diabetic', 'cvs_periph'
        ]
    },

    '😵 loss of consciousness / coma': {
        systems: ['CNS', 'CVS', 'GEN', 'ENDO', 'PSYCH'],
        keywords: ['loss of consciousness', 'coma', 'unresponsive', 'collapsed', 'passed out', 'unconscious'],
        syndrome: ['syncope / presyncope', 'seizures', 'altered mental status', 'poisoning / toxin ingestion'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "preceded",  label: "Preceding Symptoms", type: "chips",  options: ["Chest pain", "Palpitations", "Headache", "Aura", "None"] },
            { id: "duration",  label: "Duration",           type: "toggle", options: ["Seconds", "Minutes", "Hours/Persistent"] },
            { id: "pupils",    label: "Pupils",             type: "toggle", options: ["Reactive", "Fixed/Dilated", "Pinpoint"] }
        ],
        associations: [
            'Diabetes Mellitus', 'Epilepsy', 'Stroke/TIA', 'IHD', 'Heart Failure', 'Liver Cirrhosis', 'CKD',
            'Neurosurgery',
            'Opioids', 'Benzodiazepines', 'Warfarin/DOACs', 'Antiepileptics', 'Metformin',
            'Sudden cardiac death',
            'Alcohol', 'Illicit Drugs',
            'Glucose (Random)', 'Sodium (Na)', 'Potassium (K)', 'pH', 'pCO2', 'pO2', 'Toxicology Screen', 'Ammonia', 'Creatinine', 'Troponin I',
            'CT Brain', 'MRI Brain', 'Chest X-Ray', 'ECG',
            'cns_consciousness', 'cns_cranial', 'cns_motor', 'gen_appearance', 'gen_hydration', 'cvs_pulse'
        ]
    },

    '😖 dysuria': {
        systems: ['GU', 'NEPH', 'OBS'],
        keywords: ['dysuria', 'painful urination', 'burning urination', 'stinging', 'difficulty passing urine'],
        syndrome: ['fever', 'flank pain', 'hematuria', 'polyuria', 'urinary urgency', 'abdominal pain', 'scrotal pain'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "timing",    label: "Timing",            type: "toggle", options: ["Initial", "Terminal", "Throughout"] },
            { id: "assoc_sx",  label: "Associated Symptoms",type: "chips",  options: ["Frequency", "Urgency", "Suprapubic pain", "Discharge"] }
        ],
        associations: [
            'Renal Stones / Nephrolithiasis', 'BPH (Benign Prostatic Hyperplasia)', 'Diabetes Mellitus', 'Malignancy',
            'Urinary catheterization',
            'Recent Antibiotics', 'Immunosuppressants',
            'Sexual History',
            'Urinalysis', 'Urine Culture', 'WBC', 'CRP', 'PSA (Prostate Specific Antigen)',
            'CT KUB', 'Abdominal US', 'KUB X-Ray',
            'gu_palp', 'gu_ext', 'gi_dre', 'neph_palp', 'gen_signs'
        ]
    },

    '🩸 hematuria': {
        systems: ['GU', 'NEPH', 'GI'],
        keywords: ['hematuria', 'blood in urine', 'red urine', 'smoky urine', 'tea-colored urine'],
        syndrome: ['flank pain', 'dysuria', 'oliguria', 'fever', 'abdominal pain', 'lower back pain'],
        phenotype: 'BLEEDING',
        customFields: [
            { id: "timing",    label: "Timing",            type: "toggle", options: ["Initial", "Terminal", "Total"] },
            { id: "pain",      label: "Painful?",          type: "toggle" },
            { id: "clots",     label: "Clots present?",    type: "toggle" }
        ],
        associations: [
            'Renal Stones / Nephrolithiasis', 'BPH (Benign Prostatic Hyperplasia)', 'Malignancy', 'CKD', 'Hypertension', 'SLE (Systemic Lupus Erythematosus)',
            'Urinary catheterization', 'Previous abdominal surgery',
            'Warfarin/DOACs', 'Aspirin', 'NSAIDs', 'Chemotherapy',
            'Bleeding disorders', 'Malignancy',
            'Urinalysis', 'Urine Cytology', 'Creatinine', 'eGFR', 'PT', 'PTT', 'INR', 'Hemoglobin (Hb)', 'PSA (Prostate Specific Antigen)',
            'CT KUB', 'Abdominal US', 'KUB X-Ray', 'Cystoscopy',
            'gu_palp', 'gu_ext', 'gi_dre', 'neph_palp', 'gen_signs'
        ]
    },

    '😖 flank pain': {
        systems: ['GU', 'NEPH', 'MSK', 'GI'],
        keywords: ['flank pain', 'loin pain', 'renal colic', 'back pain', 'side pain'],
        syndrome: ['hematuria', 'dysuria', 'fever', 'nausea / vomiting', 'oliguria', 'abdominal pain', 'lower back pain', 'scrotal pain'],
        phenotype: 'PAIN',
        customFields: [
            { id: "radiation", label: "Radiation to groin?", type: "toggle" },
            { id: "assoc_sx",  label: "Associated Symptoms",  type: "chips",  options: ["Dysuria", "Hematuria", "Fever", "Nausea/Vomiting"] }
        ],
        associations: [
            'Renal Stones / Nephrolithiasis', 'CKD', 'Gout', 'Malignancy',
            'Previous abdominal surgery',
            'NSAIDs', 'Diuretics',
            'Urinalysis', 'Urine Culture', 'Creatinine', 'WBC', 'CRP', 'Uric Acid',
            'CT KUB', 'KUB X-Ray', 'Abdominal US',
            'neph_palp', 'gu_palp', 'msk_spine', 'gen_signs', 'gen_hydration'
        ]
    },

    '😓 oliguria': {
        systems: ['GU', 'NEPH', 'CVS', 'GEN'],
        keywords: ['oliguria', 'low urine output', 'decreased urination', 'not passing much urine', 'reduced urine'],
        syndrome: ['ll swelling', 'dyspnea', 'altered mental status', 'nausea / vomiting', 'flank pain', 'hematuria', 'frothy urine', 'abdominal distension'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "fluid_in",    label: "Fluid Intake",      type: "toggle", options: ["Normal", "Reduced", "Increased"] },
            { id: "color",       label: "Urine Color",       type: "toggle", options: ["Normal", "Dark/Amber", "Bloody"] },
            { id: "pain",        label: "Painful Urination?", type: "toggle" }
        ],
        associations: [
            'CKD', 'Heart Failure', 'Diabetes Mellitus', 'Renal Stones / Nephrolithiasis', 'Liver Cirrhosis', 'Hypertension',
            'Urinary catheterization',
            'Diuretics', 'NSAIDs', 'ACE Inhibitors / ARBs', 'Recent Antibiotics', 'Amlodipine',
            'Diabetes Mellitus',
            'Alcohol',
            'Creatinine', 'BUN', 'Urea', 'eGFR', 'Sodium (Na)', 'Potassium (K)', 'Urinalysis', 'Urine Sodium', 'Urine Osmolality', 'Serum Osmolality', 'Urine Specific Gravity', 'BNP',
            'Renal Doppler US', 'Abdominal US', 'Bladder Scan (Bedside US)', 'CT KUB', 'Echocardiogram',
            'gen_hydration', 'neph_fluid_access', 'gu_palp', 'cvs_periph', 'cvs_ausc'
        ]
    },

    '💦 polyuria': {
        systems: ['GU', 'ENDO', 'NEPH', 'GEN'],
        keywords: ['polyuria', 'excessive urination', 'frequent large amounts of urine', 'passing a lot of water'],
        syndrome: ['dysuria', 'weight loss', 'generalized weakness / fatigue', 'polydipsia', 'urinary urgency'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "nocturia",    label: "Nocturia?",         type: "toggle" },
            { id: "thirst",      label: "Associated Thirst?", type: "toggle" },
            { id: "volume",      label: "Volume",            type: "toggle", options: ["Large amounts", "Frequent small amounts"] }
        ],
        associations: [
            'Diabetes Mellitus', 'CKD', 'Hypertension', 'Thyroid Disease',
            'Diuretics', 'Lithium (Mood Stabilizers)', 'Metformin',
            'Diabetes Mellitus', 'Hypertension',
            'Alcohol',
            'Glucose (Random)', 'HbA1c', 'Calcium', 'Sodium (Na)', 'Potassium (K)', 'Creatinine', 'Urine Specific Gravity', 'Urine Osmolality', 'Serum Osmolality', 'TSH',
            'Abdominal US', 'Bladder Scan (Bedside US)',
            'gen_hydration', 'endo_diabetic', 'gu_palp', 'gen_signs'
        ]
    },

    '😣 urinary urgency': {
        systems: ['GU', 'CNS'],
        keywords: ['urinary urgency', 'urgency', 'rushing to toilet', 'cannot hold urine', 'bladder urgency'],
        syndrome: ['dysuria', 'polyuria', 'hematuria', 'flank pain'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "incontinence", label: "Incontinence?",     type: "toggle" },
            { id: "dysuria",      label: "Pain (Dysuria)?",   type: "toggle" },
            { id: "hematuria",    label: "Blood (Hematuria)?", type: "toggle" },
            { id: "frequency",    label: "Frequency",         type: "toggle", options: ["Normal", "Increased"] }
        ],
        associations: [
            'BPH (Benign Prostatic Hyperplasia)', 'Diabetes Mellitus', 'Stroke/TIA', 'Renal Stones / Nephrolithiasis',
            'Urinary catheterization',
            'Diuretics', 'Antihistamines',
            'Diabetes Mellitus',
            'Alcohol',
            'Urinalysis', 'Urine Culture', 'Glucose (Random)', 'PSA (Prostate Specific Antigen)', 'Creatinine',
            'Bladder Scan (Bedside US)', 'Scrotal US', 'CT KUB', 'Cystoscopy',
            'gu_palp', 'gu_ext', 'gi_dre', 'cns_motor', 'gen_hydration'
        ]
    },

    '😞 generalized weakness / fatigue': {
        systems: ['GEN', 'ENDO', 'CVS', 'RESP', 'PSYCH', 'NEPH', 'GI'],
        keywords: ['fatigue', 'weakness', 'tired', 'tiredness', 'lethargy', 'malaise', 'exhaustion', 'generalized weakness'],
        syndrome: ['weight loss', 'fever', 'dyspnea', 'palpitations', 'll swelling', 'jaundice', 'polyuria', 'melena', 'hematochezia', 'joint pain', 'depressed mood'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "variation",   label: "Diurnal Variation",  type: "toggle", options: ["Worse in morning", "Worse in evening", "Constant"] },
            { id: "sleep",       label: "Restorative Sleep?", type: "toggle" },
            { id: "exertion",    label: "Exercise Tolerance", type: "toggle", options: ["Normal", "Reduced"] }
        ],
        associations: [
            'Anemia', 'Thyroid Disease', 'Depression', 'Heart Failure', 'COPD', 'CKD', 'Malignancy', 'Diabetes Mellitus', 'Liver Cirrhosis', 'Anxiety Disorder',
            'Recent Antibiotics', 'Beta Blockers', 'Statins', 'Antidepressants (SSRIs/TCAs)', 'Benzodiazepines', 'Chemotherapy', 'Steroids',
            'Anemia', 'Diabetes Mellitus', 'Malignancy', 'Depression',
            'Smoking', 'Alcohol', 'Illicit Drugs',
            'Hemoglobin (Hb)', 'TSH', 'Glucose (Random)', 'Sodium (Na)', 'Potassium (K)', 'Creatinine', 'Albumin', 'Ferritin', 'Vitamin B12', 'Folate', 'ESR', 'CRP', 'WBC', 'ALT (SGPT)', 'BNP',
            'Chest X-Ray', 'Echocardiogram',
            'gen_appearance', 'gen_signs', 'psych_mood_thought', 'cvs_ausc', 'resp_ausc', 'endo_thyroid'
        ]
    },

    '🍽️ weight loss': {
        systems: ['GEN', 'GI', 'ENDO', 'RESP', 'PSYCH'],
        keywords: ['weight loss', 'losing weight', 'unintentional weight loss', 'decreased weight'],
        syndrome: ['generalized weakness / fatigue', 'fever', 'cough', 'hemoptysis', 'diarrhea', 'abdominal pain', 'dysphagia', 'jaundice', 'hematochezia', 'polyuria', 'constipation', 'night sweats'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "amount",      label: "Amount (kg/lbs)",    type: "text" },
            { id: "timeframe",   label: "Timeframe",          type: "text" },
            { id: "appetite",    label: "Appetite",           type: "toggle", options: ["Increased", "Decreased", "Normal"] },
            { id: "intentional", label: "Intentional?",       type: "toggle" }
        ],
        associations: [
            'Malignancy', 'Diabetes Mellitus', 'Thyroid Disease', 'Inflammatory Bowel Disease', 'COPD', 'Liver Cirrhosis', 'Depression', 'CKD', 'Anemia',
            'Previous abdominal surgery', 'Cholecystectomy',
            'Metformin', 'Chemotherapy', 'Laxatives', 'Thyroid Medications (Levothyroxine/Carbimazole)',
            'Malignancy', 'Diabetes Mellitus',
            'Smoking', 'Alcohol', 'Illicit Drugs',
            'Hemoglobin (Hb)', 'Albumin', 'TSH', 'Glucose (Random)', 'HbA1c', 'ESR', 'CRP', 'HIV Ag/Ab', 'Total Protein', 'ALT (SGPT)', 'Creatinine', 'Fecal Occult Blood', 'WBC',
            'Chest X-Ray', 'CT Abdomen & Pelvis', 'CT Chest', 'Upper Endoscopy (OGD)', 'Colonoscopy', 'Abdominal US',
            'gen_appearance', 'gen_signs', 'gi_palp', 'endo_thyroid', 'psych_mood_thought'
        ]
    },

    '🥵 night sweats': {
        systems: ['GEN', 'RESP', 'GI', 'ENDO'],
        keywords: ['night sweats', 'sweating at night', 'nocturnal hyperhidrosis', 'waking up sweaty'],
        syndrome: ['fever', 'weight loss', 'cough', 'hemoptysis', 'generalized weakness / fatigue'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "severity",    label: "Severity",           type: "toggle", options: ["Mild", "Moderate", "Drenching (need to change clothes)"] },
            { id: "frequency",   label: "Frequency",          type: "toggle", options: ["Occasional", "Every night"] },
            { id: "fever",       label: "Associated Fever?",  type: "toggle" }
        ],
        associations: [
            'Malignancy', 'Thyroid Disease', 'Anemia', 'GERD', 'Inflammatory Bowel Disease',
            'Recent Antibiotics', 'Antidepressants (SSRIs/TCAs)', 'Steroids', 'Thyroid Medications (Levothyroxine/Carbimazole)',
            'Malignancy', 'Sudden cardiac death',
            'Alcohol', 'Travel History', 'Smoking',
            'WBC', 'Hemoglobin (Hb)', 'ESR', 'CRP', 'Blood Culture', 'AFB Smear/Culture', 'HIV Ag/Ab', 'TSH', 'LDH', 'Blood Film',
            'Chest X-Ray', 'CT Chest', 'CT Abdomen & Pelvis',
            'gen_appearance', 'gen_signs', 'resp_ausc', 'ent_throat', 'gi_palp'
        ]
    },

    '🥶 chills / rigors': {
        systems: ['GEN', 'RESP', 'GU', 'GI'],
        keywords: ['chills', 'rigors', 'shaking', 'shivering', 'feeling cold', 'cold spells'],
        syndrome: ['fever', 'night sweats', 'cough', 'dysuria', 'flank pain', 'abdominal pain'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "shaking",     label: "Uncontrollable Shaking?", type: "toggle" },
            { id: "fever",       label: "Associated Fever?",       type: "toggle" },
            { id: "duration",    label: "Duration of episode",     type: "text" }
        ],
        associations: [
            'CKD', 'Diabetes Mellitus', 'Liver Cirrhosis', 'Malignancy', 'Gallstones', 'Appendectomy',
            'Urinary catheterization',
            'Recent Antibiotics', 'Immunosuppressants', 'Steroids', 'Chemotherapy',
            'Malignancy',
            'Travel History',
            'WBC', 'CRP', 'Procalcitonin', 'Blood Culture', 'Urine Culture', 'Lactate', 'Hemoglobin (Hb)', 'Malaria Film', 'Urinalysis', 'Sputum Culture',
            'Chest X-Ray', 'Abdominal US', 'CT Abdomen & Pelvis',
            'gen_appearance', 'gen_hydration', 'resp_ausc', 'cvs_pulse', 'gen_signs'
        ]
    },

    '😩 lower back pain': {
        systems: ['MSK', 'CNS', 'GU'],
        keywords: ['lower back pain', 'low back pain', 'LBP', 'back ache', 'lumbar pain'],
        syndrome: ['flank pain', 'hematuria', 'dysuria', 'll swelling', 'numbness / paresthesia'],
        phenotype: 'PAIN',
        customFields: [
            { id: "stiffness",   label: "Morning Stiffness?",        type: "toggle" },
            { id: "sciatica",    label: "Radiation to Legs?",        type: "toggle" },
            { id: "red_flags",   label: "Saddle Anesthesia/Incont.?", type: "toggle" },
            { id: "trauma",      label: "Recent Trauma?",            type: "toggle" }
        ],
        associations: [
            'Osteoporosis', 'Rheumatoid Arthritis', 'Malignancy', 'Renal Stones / Nephrolithiasis', 'Ankylosing Spondylitis',
            'Neurosurgery', 'Previous abdominal surgery',
            'NSAIDs', 'Opioids', 'Steroids',
            'Malignancy', 'Rheumatoid Arthritis',
            'Occupational Exposure', 'Smoking',
            'WBC', 'CRP', 'ESR', 'Calcium', 'PSA (Prostate Specific Antigen)', 'Urinalysis', 'Alkaline Phosphatase (ALP)', 'SPEP (Serum Protein Electrophoresis)',
            'X-Ray Spine', 'MRI Spine', 'CT Spine', 'CT KUB', 'Bone Scan (SPECT)',
            'msk_spine', 'cns_motor', 'cns_sensory', 'gi_dre', 'gu_palp', 'gen_appearance'
        ]
    },

    '🦴 joint pain': {
        systems: ['MSK', 'DERM', 'GEN'],
        keywords: ['joint pain', 'arthralgia', 'aching joints', 'stiff joints', 'swollen joints'],
        syndrome: ['fever', 'lower back pain', 'generalized weakness / fatigue', 'myalgia', 'skin rash'],
        phenotype: 'PAIN',
        customFields: [
            { id: "count",       label: "Number of Joints",    type: "toggle", options: ["Mono (1)", "Oligo (2-4)", "Poly (≥5)"] },
            { id: "stiffness",   label: "Morning Stiffness",   type: "toggle", options: ["None", "< 30 mins", "> 30 mins"] },
            { id: "swelling",    label: "Joint Swelling?",     type: "toggle" },
            { id: "symmetry",    label: "Symmetrical?",        type: "toggle" }
        ],
        associations: [
            'Rheumatoid Arthritis', 'Gout', 'Osteoporosis', 'SLE (Systemic Lupus Erythematosus)', 'Inflammatory Bowel Disease', 'Psoriasis',
            'Joint Replacement',
            'NSAIDs', 'Steroids', 'Immunosuppressants', 'Diuretics', 'Aspirin',
            'Rheumatoid Arthritis', 'Gout',
            'Smoking', 'Alcohol',
            'Rheumatoid Factor (RF)', 'Anti-CCP', 'ANA', 'Uric Acid', 'ESR', 'CRP', 'WBC', 'Anti-dsDNA', 'C3', 'C4', 'ASO Titer',
            'X-Ray Extremities', 'X-Ray Hand & Wrist', 'MRI Joint', 'Abdominal US', 'Bone Scan (SPECT)',
            'msk_joints', 'skin_lesion', 'gen_signs', 'gen_appearance'
        ]
    },

    '💪 myalgia': {
        systems: ['MSK', 'GEN', 'ENDO', 'CNS'],
        keywords: ['myalgia', 'muscle pain', 'muscle ache', 'sore muscles', 'body aches'],
        syndrome: ['fever', 'joint pain', 'generalized weakness / fatigue', 'chills / rigors'],
        phenotype: 'PAIN',
        customFields: [
            { id: "distribution", label: "Distribution",        type: "toggle", options: ["Localized", "Generalized"] },
            { id: "weakness",     label: "Associated Weakness?", type: "toggle" },
            { id: "fever",        label: "Associated Fever?",    type: "toggle" }
        ],
        associations: [
            'Thyroid Disease', 'Rheumatoid Arthritis', 'SLE (Systemic Lupus Erythematosus)', 'Depression', 'Anemia', 'Fibromyalgia',
            'Statins', 'Steroids', 'Recent Antibiotics', 'Chemotherapy', 'Antidepressants (SSRIs/TCAs)',
            'Rheumatoid Arthritis',
            'Alcohol', 'Illicit Drugs',
            'CK (Creatine Kinase)', 'ESR', 'CRP', 'TSH', 'Potassium (K)', 'Vitamin B12', 'WBC', 'LDH', 'ANA',
            'MRI Joint', 'Electromyography (EMG)',
            'cns_motor', 'msk_joints', 'gen_signs', 'gen_appearance'
        ]
    },

    '😖 neck pain': {
        systems: ['MSK', 'CNS', 'ENT'],
        keywords: ['neck pain', 'stiff neck', 'cervical pain', 'neck ache'],
        syndrome: ['headache', 'focal weakness', 'numbness / paresthesia', 'fever'],
        phenotype: 'PAIN',
        customFields: [
            { id: "stiffness",   label: "Morning Stiffness?",   type: "toggle" },
            { id: "radiculopathy", label: "Radiation to Arms?",  type: "toggle" },
            { id: "injury",      label: "Recent Trauma?",       type: "toggle" },
            { id: "headache",    label: "Associated Headache?", type: "toggle" }
        ],
        associations: [
            'Osteoporosis', 'Rheumatoid Arthritis', 'Malignancy', 'Migraine', 'Ankylosing Spondylitis',
            'Neurosurgery', 'Tonsillectomy',
            'NSAIDs', 'Opioids', 'Steroids',
            'Rheumatoid Arthritis', 'Malignancy',
            'Occupational Exposure',
            'WBC', 'CRP', 'ESR', 'Calcium',
            'X-Ray Spine', 'MRI Spine', 'CT Spine', 'CT Head & Neck',
            'msk_spine', 'cns_motor', 'cns_sensory', 'ent_throat', 'gen_appearance'
        ]
    },

    '🥤 polydipsia': {
        systems: ['ENDO', 'GU', 'NEPH', 'PSYCH'],
        keywords: ['polydipsia', 'excessive thirst', 'constant thirst', 'drinking a lot of water'],
        syndrome: ['polyuria', 'weight loss', 'generalized weakness / fatigue', 'altered mental status'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "amount",      label: "Amount (Liters/day)", type: "text" },
            { id: "polyuria",    label: "Associated Polyuria?", type: "toggle" },
            { id: "dry_mouth",   label: "Dry Mouth?",          type: "toggle" }
        ],
        associations: [
            'Diabetes Mellitus', 'CKD', 'Hypertension', 'Schizophrenia', 'Thyroid Disease', 'Anxiety Disorder',
            'Diuretics', 'Lithium (Mood Stabilizers)', 'Antidepressants (SSRIs/TCAs)', 'Antipsychotics', 'Steroids',
            'Diabetes Mellitus', 'Hypertension',
            'Alcohol',
            'Glucose (Random)', 'HbA1c', 'Sodium (Na)', 'Calcium', 'Serum Osmolality', 'Urine Osmolality', 'Urine Specific Gravity', 'Creatinine', 'Potassium (K)', 'TSH',
            'Abdominal US', 'Bladder Scan (Bedside US)',
            'gen_hydration', 'endo_diabetic', 'psych_cognition', 'gen_signs'
        ]
    }, 

    '🩸 easy bruising / bleeding': {
        systems: ['DERM', 'GEN'],
        keywords: ['bruising', 'easy bruising', 'bleeding', 'petechiae', 'purpura', 'ecchymosis'],
        syndrome: ['hematemesis', 'melena', 'hematochezia', 'epistaxis', 'jaundice', 'generalized weakness / fatigue'],
        phenotype: 'BLEEDING',
        customFields: [
            { id: "onset",       label: "Spontaneous or Trauma?", type: "toggle", options: ["Spontaneous", "Minimal Trauma", "Major Trauma"] },
            { id: "locations",   label: "Locations",              type: "chips",  options: ["Limbs", "Trunk", "Mucosal/Gums", "Epistaxis"] },
            { id: "systemic",    label: "Associated Symptoms",    type: "chips",  options: ["Fever", "Fatigue", "Bone pain", "Jaundice"] }
        ],
        associations: [
            'Liver Cirrhosis', 'Malignancy', 'CKD', 'SLE (Systemic Lupus Erythematosus)',
            'Aspirin', 'Warfarin/DOACs', 'NSAIDs', 'Steroids', 'Chemotherapy',
            'Bleeding disorders', 'Malignancy',
            'Alcohol',
            'Hemoglobin (Hb)', 'Platelets', 'WBC', 'PT', 'PTT', 'INR', 'Blood Film', 'ALT (SGPT)', 'Total Bilirubin', 'Creatinine',
            'Abdominal US',
            'gen_signs', 'skin_lesion', 'gi_palp'
        ]
    },

    '🫱 generalized pruritus': {
        systems: ['DERM', 'GEN', 'GI', 'NEPH', 'ENDO'],
        keywords: ['pruritus', 'itchy', 'itching', 'itchiness', 'scratching'],
        syndrome: ['jaundice', 'll swelling', 'fatigue', 'skin rash'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "timing",    label: "Worse at night?",    type: "toggle" },
            { id: "rash",      label: "Visible Rash?",      type: "toggle" },
            { id: "relieved",  label: "Relieved by",        type: "chips",  options: ["Antihistamines", "Emollients", "Cold water", "Nothing"] },
            { id: "jaundice",  label: "Jaundice present?",  type: "toggle" }
        ],
        associations: [
            'Liver Cirrhosis', 'CKD', 'Thyroid Disease', 'Diabetes Mellitus', 'Malignancy',
            'Opioids', 'Recent Antibiotics', 'Statins',
            'Pets/Animal Contact', 'Travel History', 'Occupational Exposure',
            'Total Bilirubin', 'Alkaline Phosphatase (ALP)', 'ALT (SGPT)', 'Creatinine', 'BUN', 'TSH', 'Fasting Glucose', 'WBC', 'Hemoglobin (Hb)',
            'Abdominal US',
            'skin_lesion', 'skin_distribution', 'gen_signs', 'gi_palp'
        ]
    },

    '🧪 poisoning / toxin ingestion': {
        systems: ['GEN', 'GI', 'CNS', 'PSYCH', 'CVS', 'RESP'],
        keywords: ['poisoning', 'overdose', 'ingestion', 'toxin', 'suicide attempt', 'took too many pills'],
        syndrome: ['altered mental status', 'loss of consciousness / coma', 'nausea / vomiting', 'seizures', 'suicidal ideation'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "intent",    label: "Intent",               type: "toggle", options: ["Accidental", "Intentional self-harm", "Unknown"] },
            { id: "time",      label: "Time since ingestion", type: "toggle", options: ["< 1 hour", "1-4 hours", "> 4 hours", "Unknown"] },
            { id: "vomited",   label: "Vomited since?",       type: "toggle" }
        ],
        associations: [
            'Depression', 'Anxiety Disorder', 'Bipolar Disorder', 'Schizophrenia',
            'Opioids', 'Benzodiazepines', 'Antidepressants (SSRIs/TCAs)', 'Antipsychotics', 'Aspirin', 'Iron Supplements',
            'Mental Illness',
            'Alcohol', 'Illicit Drugs',
            'Toxicology Screen', 'Serum Acetaminophen Level', 'Serum Salicylate Level', 'ALT (SGPT)', 'AST (SGOT)', 'Creatinine', 'pH', 'pCO2', 'Lactate', 'Glucose (Random)',
            'ECG',
            'gen_appearance', 'cns_consciousness', 'cns_cranial', 'gi_palp', 'psych_behav'
        ]
    },

    '😞 depressed mood': {
        systems: ['PSYCH', 'GEN', 'ENDO'],
        keywords: ['depressed', 'sad', 'low mood', 'crying', 'hopeless', 'loss of interest', 'anhedonia'],
        syndrome: ['suicidal ideation', 'weight loss', 'generalized weakness / fatigue', 'anxiety', 'panic attacks'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "sleep",       label: "Sleep changes",       type: "toggle", options: ["Normal", "Insomnia", "Hypersomnia"] },
            { id: "appetite",    label: "Appetite changes",    type: "toggle", options: ["Normal", "Decreased", "Increased"] },
            { id: "psychosis",   label: "Psychotic symptoms?", type: "toggle" }
        ],
        associations: [
            'Depression', 'Bipolar Disorder', 'Anxiety Disorder', 'Schizophrenia', 'Thyroid Disease',
            'Antidepressants (SSRIs/TCAs)', 'Benzodiazepines', 'Antipsychotics', 'Steroids', 'Oral Contraceptives',
            'Mental Illness',
            'Alcohol', 'Illicit Drugs',
            'TSH', 'Free T4 (fT4)', 'Vitamin B12', 'Folate', 'Toxicology Screen',
            'psych_behav', 'psych_mood_thought', 'psych_cognition', 'gen_appearance'
        ]
    },

    '💔 suicidal ideation': {
        systems: ['PSYCH', 'GEN'],
        keywords: ['suicide', 'suicidal', 'want to die', 'end it all', 'better off dead', 'self-harm'],
        syndrome: ['depressed mood', 'poisoning / toxin ingestion', 'anxiety'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "plan",        label: "Established Plan?",     type: "toggle" },
            { id: "intent",      label: "Intent to act?",        type: "toggle" },
            { id: "preparations",label: "Preparations made?",    type: "toggle" },
            { id: "prior",       label: "Prior attempts?",       type: "toggle" }
        ],
        associations: [
            'Depression', 'Bipolar Disorder', 'Schizophrenia', 'Anxiety Disorder',
            'Antidepressants (SSRIs/TCAs)', 'Antipsychotics', 'Benzodiazepines', 'Opioids',
            'Mental Illness',
            'Alcohol', 'Illicit Drugs',
            'Toxicology Screen', 'Serum Acetaminophen Level',
            'psych_behav', 'psych_mood_thought', 'psych_cognition', 'gen_appearance'
        ]
    },

    '😰 anxiety': {
        systems: ['PSYCH', 'CVS', 'ENDO', 'GEN'],
        keywords: ['anxiety', 'anxious', 'worried', 'nervous', 'stress', 'fear'],
        syndrome: ['panic attacks', 'palpitations', 'dyspnea', 'chest pain', 'depressed mood', 'dizziness / vertigo'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "nature",     label: "Nature",             type: "toggle", options: ["Constant/Generalized", "Episodic", "Situational"] },
            { id: "triggers",   label: "Triggers",           type: "chips",  options: ["None", "Social situations", "Specific phobia", "Trauma reminders"] },
            { id: "somatic",    label: "Somatic Symptoms",   type: "chips",  options: ["Palpitations", "Tremor", "Sweating", "GI Upset"] }
        ],
        associations: [
            'Anxiety Disorder', 'Depression', 'Thyroid Disease', 'Asthma', 'Atrial Fibrillation',
            'Salbutamol Inhaler', 'Thyroid Medications (Levothyroxine/Carbimazole)', 'Antidepressants (SSRIs/TCAs)', 'Benzodiazepines', 'Steroids',
            'Mental Illness',
            'Illicit Drugs', 'Alcohol', 'Smoking',
            'TSH', 'Free T4 (fT4)', 'Glucose (Random)', 'Toxicology Screen',
            'ECG',
            'psych_behav', 'psych_mood_thought', 'cvs_pulse', 'endo_thyroid'
        ]
    },

    '😱 panic attacks': {
        systems: ['PSYCH', 'CVS', 'RESP', 'GEN'],
        keywords: ['panic', 'panic attack', 'sudden fear', 'doom', 'hyperventilation'],
        syndrome: ['anxiety', 'palpitations', 'dyspnea', 'chest pain', 'dizziness / vertigo', 'syncope / presyncope'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "frequency",  label: "Frequency",             type: "toggle", options: ["Daily", "Weekly", "Monthly"] },
            { id: "duration",   label: "Duration of attack",    type: "toggle", options: ["< 10 mins", "10-30 mins", "> 30 mins"] },
            { id: "avoidance",  label: "Avoidance/Agoraphobia?",type: "toggle" },
            { id: "chest_pain", label: "Chest Pain / SOB?",     type: "toggle" }
        ],
        associations: [
            'Anxiety Disorder', 'Depression', 'Asthma', 'IHD', 'Thyroid Disease',
            'Salbutamol Inhaler', 'Benzodiazepines', 'Antidepressants (SSRIs/TCAs)',
            'Mental Illness',
            'Illicit Drugs', 'Alcohol',
            'TSH', 'Troponin I', 'Glucose (Random)', 'Toxicology Screen',
            'ECG', 'Holter Monitor',
            'psych_behav', 'psych_mood_thought', 'cvs_pulse', 'resp_insp'
        ]
    },

    '🗣️ sore throat': {
        systems: ['ENT', 'RESP', 'GEN'],
        keywords: ['sore throat', 'throat pain', 'pharyngitis', 'tonsillitis', 'painful swallowing'],
        syndrome: ['fever', 'cough', 'dysphagia', 'earache'],
        phenotype: 'PAIN',
        customFields: [
            { id: "fever",      label: "Fever?",            type: "toggle" },
            { id: "cough",      label: "Cough present?",    type: "toggle" },
            { id: "exudate",    label: "Pus/Exudate noticed?", type: "toggle" }
        ],
        associations: [
            'GERD',
            'Tonsillectomy',
            'Recent Antibiotics', 'Immunosuppressants',
            'Smoking',
            'Throat Swab / Culture', 'Monospot Test', 'WBC', 'CRP',
            'Neck Soft Tissue US',
            'ent_throat', 'gen_signs', 'resp_ausc'
        ]
    },

    '👂 earache': {
        systems: ['ENT', 'GEN'],
        keywords: ['earache', 'ear pain', 'otalgia', 'ear infection', 'hearing loss'],
        syndrome: ['sore throat', 'fever', 'dizziness / vertigo'],
        phenotype: 'PAIN',
        customFields: [
            { id: "laterality",  label: "Laterality",       type: "toggle", options: ["Right", "Left", "Bilateral"] },
            { id: "discharge",   label: "Discharge?",       type: "toggle" },
            { id: "hearing",     label: "Hearing loss?",    type: "toggle" },
            { id: "tinnitus",    label: "Tinnitus?",        type: "toggle" }
        ],
        associations: [
            'Recent Antibiotics',
            'Travel History',
            'WBC', 'CRP',
            'ent_ear', 'ent_throat', 'gen_appearance'
        ]
    },

    '👁️ red eye': {
        systems: ['EYE', 'GEN'],
        keywords: ['red eye', 'bloodshot eye', 'conjunctivitis', 'eye pain', 'pink eye'],
        syndrome: ['joint pain', 'skin rash', 'headache'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "laterality",  label: "Laterality",       type: "toggle", options: ["Right", "Left", "Bilateral"] },
            { id: "discharge",   label: "Discharge type",   type: "toggle", options: ["None", "Watery", "Purulent/Thick", "Mucous"] },
            { id: "vision",      label: "Vision changed?",  type: "toggle" },
            { id: "photophobia", label: "Photophobia?",     type: "toggle" }
        ],
        associations: [
            'Rheumatoid Arthritis', 'SLE (Systemic Lupus Erythematosus)', 'Inflammatory Bowel Disease', 'Hypertension',
            'Steroids', 'Recent Antibiotics',
            'Occupational Exposure', 'Pets/Animal Contact',
            'eye_anterior', 'eye_visual', 'eye_posterior', 'gen_signs'
        ]
    },

    '🔴 skin rash': {
        systems: ['DERM', 'GEN'],
        keywords: ['rash', 'skin rash', 'spots', 'hives', 'urticaria', 'erythema', 'lesion'],
        syndrome: ['generalized pruritus', 'joint pain', 'fever', 'easy bruising / bleeding'],
        phenotype: 'GENERIC',
        customFields: [
            { id: "itchy",       label: "Itchy?",               type: "toggle" },
            { id: "painful",     label: "Painful?",             type: "toggle" },
            { id: "spread",      label: "Spread pattern",       type: "toggle", options: ["Localized", "Spreading rapidly", "Generalized"] },
            { id: "new_exposure",label: "New exposures?",       type: "chips",  options: ["None", "New soap/cosmetics", "New medications", "Food"] }
        ],
        associations: [
            'SLE (Systemic Lupus Erythematosus)', 'Asthma', 'Inflammatory Bowel Disease',
            'Recent Antibiotics', 'NSAIDs', 'Antiepileptics', 'ACE Inhibitors / ARBs',
            'Asthma',
            'Pets/Animal Contact', 'Travel History', 'Occupational Exposure', 'Sexual History',
            'WBC', 'CRP', 'ANA', 'Anti-dsDNA',
            'skin_lesion', 'skin_distribution', 'gen_signs'
        ]
    }
};

// ── 5. EXCLUSIONS & EXAM RULES ──────────────
const HX_EXCLUSIONS = {
    AGE_PEDIATRIC: [
        // Social
        'Smoking', 'Alcohol', 'Illicit Drugs', 'Occupational Exposure', 'Sexual History',
        // PMH
        'IHD', 'Heart Failure', 'COPD', 'Atrial Fibrillation', 'Stroke/TIA', 'Liver Cirrhosis', 
        'DVT/PE', 'Gallstones', 'Osteoporosis', 'Hemorrhoids', 'BPH (Benign Prostatic Hyperplasia)',
        // PSH
        'C-Section', 'Joint Replacement', 'CABG', 'Cholecystectomy',
        // Drugs
        'Metformin', 'Amlodipine', 'Statins', 'Warfarin/DOACs', 'Nitrates', 
        'Oral Contraceptives', 'ACE Inhibitors / ARBs', 'Calcium Channel Blockers', 'Antidepressants (SSRIs/TCAs)',
        // Family
        'Premature CAD', 'Sudden cardiac death'
    ],
    AGE_NEONATE: [
        // Social
        'Smoking', 'Alcohol', 'Illicit Drugs', 'Occupational Exposure', 'Sexual History', 'Pets/Animal Contact', 'Travel History',
        // PMH
        'IHD', 'Heart Failure', 'COPD', 'Atrial Fibrillation', 'Stroke/TIA', 'Liver Cirrhosis', 
        'DVT/PE', 'Gallstones', 'Osteoporosis', 'Hemorrhoids', 'BPH (Benign Prostatic Hyperplasia)',
        'Hypertension', 'Diabetes Mellitus', 'CKD', 'Asthma', 'Thyroid Disease', 'Epilepsy', 
        'Peptic Ulcer Disease', 'Migraine', 'Inflammatory Bowel Disease', 'GERD', 'Pericarditis', 
        'Renal Stones / Nephrolithiasis', 'Gout', 'Rheumatoid Arthritis', 'SLE (Systemic Lupus Erythematosus)', 
        'Pancreatitis', 'Malignancy', 'Depression', 'Anxiety Disorder', 'Bipolar Disorder', 'Schizophrenia',
        // PSH
        'C-Section', 'Joint Replacement', 'CABG', 'Cholecystectomy', 'Appendectomy', 'Hernia Repair', 
        'Tonsillectomy', 'Previous abdominal surgery', 'Neurosurgery',
        // Drugs
        'Metformin', 'Amlodipine', 'Statins', 'Warfarin/DOACs', 'Nitrates', 
        'Oral Contraceptives', 'ACE Inhibitors / ARBs', 'Calcium Channel Blockers', 'Antidepressants (SSRIs/TCAs)',
        'Aspirin', 'Steroids', 'Immunosuppressants', 'NSAIDs', 'Beta Blockers', 'Salbutamol Inhaler', 
        'Chemotherapy', 'Diuretics', 'Opioids', 'Benzodiazepines', 'Antipsychotics', 'Antiepileptics', 
        'Proton Pump Inhibitors (PPIs)', 'Iron Supplements', 'Thyroid Medications (Levothyroxine/Carbimazole)', 
        'Antihistamines', 'Laxatives',
        // Family
        'Premature CAD', 'Sudden cardiac death', 'Malignancy', 'Stroke', 'Bleeding disorders', 'Mental Illness'
    ],
    SEX_MALE: [
        // Past Medical/Surgical & Drugs
        'C-Section', 
        'Oral Contraceptives',
        // Radiology
        'Breast US', 'Pelvic US', 'Transvaginal US (TVUS)', 'Mammography',
        // Labs
        'β-hCG (serum)',
        // Exams
        'obs_antenatal', 'obs_gynaec'
    ],
    SEX_FEMALE: [
        // Past Medical
        'BPH (Benign Prostatic Hyperplasia)', 
        // Radiology
        'Scrotal US',
        // Labs
        'PSA (Prostate Specific Antigen)'
    ]
};

const EXAM_SYSTEM_RULES = {
    OBS: { requireSex: 'Female' }
};

// ── 6. EXAMS, LABS, RADS ──────────────
const HX_SYSTEMS = {
    GEN:   { name: "General Look",      icon: "🧍",  color: "#10b981" },
    GI:    { name: "Gastrointestinal",  icon: "🍏",  color: "#f59e0b" },
    CVS:   { name: "Cardiovascular",    icon: "❤️",  color: "#ef4444" },
    RESP:  { name: "Respiratory",       icon: "🫁",  color: "#3b82f6" },
    CNS:   { name: "Neurological",      icon: "🧠",  color: "#8b5cf6" },
    GU:    { name: "Genitourinary",     icon: "💧",  color: "#06b6d4" },
    OBS:   { name: "OBS/GYN",           icon: "🤰",  color: "#ec4899" },
    MSK:   { name: "Musculoskeletal",   icon: "🦴",  color: "#d97706" },
    NEPH:  { name: "Nephrology",        icon: "🫘",  color: "#a855f7" },
    ENDO:  { name: "Endocrine",         icon: "🦋",  color: "#f97316" },
    ENT:   { name: "ENT",               icon: "👂",  color: "#0d9488" },
    DERM:  { name: "Dermatology",       icon: "🫱",  color: "#f43f5e" },
    EYE:   { name: "Ophthalmology",     icon: "👁️",  color: "#64748b" },
    PSYCH: { name: "Psychiatry",        icon: "🧩",  color: "#7c3aed" }
};

const HX_EXAMS = [

    // ── GENERAL ──────────────────────────────────────────────────────────────
    {
        id: "gen_appearance", system: "GEN", section: "Appearance", rank: 1,
        desc: "Consciousness, distress, habitus",
        template: [
            { id: "loc",      label: "Consciousness", type: "toggle", options: ["Alert", "Confused", "Lethargic", "Comatose"] },
            { id: "distress", label: "Distress",      type: "toggle", options: ["None", "Mild", "Severe"] },
            { id: "habitus",  label: "Habitus",       type: "toggle", options: ["Average", "Cachectic", "Obese"] }
        ]
    },
    {
        id: "gen_signs", system: "GEN", section: "Stigmata", rank: 2,
        desc: "Pallor, jaundice, cyanosis & more",
        template: [
            { id: "pallor",   label: "Pallor",         type: "toggle", options: ["Absent", "Present"] },
            { id: "jaundice", label: "Jaundice",       type: "toggle", options: ["Absent", "Present"] },
            { id: "cyanosis", label: "Cyanosis",       type: "toggle", options: ["None", "Central", "Peripheral"] },
            { id: "findings", label: "Other Findings", type: "chips",  options: ["Clubbing", "Koilonychia", "Leukonychia", "Lymphadenopathy", "Peripheral edema", "Spider naevi"] }
        ]
    },
    {
        id: "gen_hydration", system: "GEN", section: "Hydration", rank: 3,
        desc: "Volume status",
        template: [
            { id: "mucosa",     label: "Mucosa",      type: "toggle", options: ["Moist", "Dry"] },
            { id: "turgor",     label: "Skin Turgor", type: "toggle", options: ["Normal", "Decreased", "Tenting"] },
            { id: "cap_refill", label: "Cap Refill",  type: "toggle", options: ["< 2s", "≥ 2s"] }
        ]
    },

    // ── RESPIRATORY ──────────────────────────────────────────────────────────
    {
        id: "resp_insp", system: "RESP", section: "Inspection", rank: 1,
        desc: "Chest shape, breathing effort, symmetry",
        template: [
            { id: "effort",   label: "Breathing Effort", type: "toggle", options: ["Normal", "Accessory muscles", "Retractions"] },
            { id: "shape",    label: "Chest Shape",      type: "toggle", options: ["Normal", "Barrel", "Pectus excavatum", "Pectus carinatum"] },
            { id: "symmetry", label: "Symmetry",         type: "toggle", options: ["Symmetrical", "Asymmetrical"] }
        ]
    },
    {
        id: "resp_palp", system: "RESP", section: "Palpation", rank: 2,
        desc: "Trachea, expansion, tactile vocal fremitus",
        template: [
            { id: "trachea",   label: "Trachea",                 type: "toggle", options: ["Central", "Deviated L", "Deviated R"] },
            { id: "expansion", label: "Chest Expansion",         type: "toggle", options: ["Equal", "Reduced L", "Reduced R"] },
            { id: "tvf",       label: "Tactile Vocal Fremitus",  type: "toggle", options: ["Normal", "↑ Increased", "↓ Decreased"] }
        ]
    },
    {
        id: "resp_perc", system: "RESP", section: "Percussion", rank: 3,
        desc: "Percussion note right and left",
        template: [
            { id: "perc_r", label: "Percussion — Right", type: "toggle", options: ["Resonant", "Dull", "Stony dull", "Hyper-resonant"] },
            { id: "perc_l", label: "Percussion — Left",  type: "toggle", options: ["Resonant", "Dull", "Stony dull", "Hyper-resonant"] }
        ]
    },
    {
        id: "resp_ausc", system: "RESP", section: "Auscultation", rank: 4,
        desc: "Air entry, breath sounds, added sounds",
        template: [
            { id: "air_entry",     label: "Air Entry",     type: "toggle", options: ["Equal", "↓ Left", "↓ Right", "↓ Bilateral"] },
            { id: "breath_sounds", label: "Breath Sounds", type: "toggle", options: ["Vesicular", "Bronchial"] },
            { id: "added",         label: "Added Sounds",  type: "chips",  options: ["None", "Wheeze", "Crackles", "Pleural rub"] }
        ]
    },

    // ── CARDIOVASCULAR ───────────────────────────────────────────────────────
    {
        id: "cvs_pulse", system: "CVS", section: "Pulse", rank: 1,
        desc: "Rhythm, character, equality",
        template: [
            { id: "rhythm",    label: "Rhythm",          type: "toggle", options: ["Regular", "Irregularly irregular", "Regularly irregular"] },
            { id: "character", label: "Pulse Character", type: "toggle", options: ["Normal", "Weak/Thready", "Bounding", "Collapsing"] },
            { id: "equality",  label: "Equality",        type: "toggle", options: ["Equal bilaterally", "Radio-radial delay", "Radio-femoral delay"] }
        ]
    },
    {
        id: "cvs_insp", system: "CVS", section: "Inspection", rank: 2,
        desc: "JVP, precordial scars, visible pulsations",
        template: [
            { id: "jvp",       label: "JVP",                type: "toggle", options: ["Normal", "Elevated", "Not visible"] },
            { id: "scars",     label: "Precordial Scars",   type: "toggle", options: ["None", "Midline sternotomy", "Left thoracotomy", "Pacemaker pocket"] },
            { id: "pulsation", label: "Visible Pulsations", type: "toggle", options: ["None", "Apex visible", "Parasternal"] }
        ]
    },
    {
        id: "cvs_palp", system: "CVS", section: "Palpation", rank: 3,
        desc: "Apex beat, character, thrills, heaves",
        template: [
            { id: "apex",    label: "Apex Beat",          type: "toggle", options: ["Normal position", "Displaced laterally", "Not palpable"] },
            { id: "apex_ch", label: "Apex Character",     type: "toggle", options: ["Normal", "Heaving", "Tapping", "Thrusting"] },
            { id: "thrills", label: "Thrills",            type: "toggle", options: ["Absent", "Present"] },
            { id: "heaves",  label: "Parasternal Heave",  type: "toggle", options: ["Absent", "Present"] }
        ]
    },
    {
        id: "cvs_ausc", system: "CVS", section: "Auscultation", rank: 4,
        desc: "Heart sounds, murmurs, added sounds",
        template: [
            { id: "s1s2",         label: "S1 & S2",            type: "toggle", options: ["Normal", "Muffled", "Split S2"] },
            { id: "murmur",       label: "Murmur",             type: "toggle", options: ["None", "Systolic", "Diastolic", "Continuous"] },
            { id: "murmur_grade", label: "Murmur Grade (1–6)", type: "number", placeholder: "value..." },
            { id: "murmur_rad",   label: "Murmur Radiation",   type: "text",   placeholder: "e.g. axilla, carotids, back" },
            { id: "added",        label: "Added Sounds",       type: "chips",  options: ["None", "S3 gallop", "S4 gallop", "Friction rub"] }
        ]
    },
    {
        id: "cvs_periph", system: "CVS", section: "Peripheral Circulation", rank: 5,
        desc: "Peripheral pulses, cap refill, edema",
        template: [
            { id: "radial",     label: "Radial Pulses",    type: "toggle", options: ["Present bilaterally", "Absent R", "Absent L", "Absent bilaterally"] },
            { id: "femoral",    label: "Femoral Pulses",   type: "toggle", options: ["Present bilaterally", "Absent R", "Absent L", "Absent bilaterally"] },
            { id: "pedal",      label: "Pedal Pulses",     type: "toggle", options: ["Present bilaterally", "Absent R", "Absent L", "Absent bilaterally"] },
            { id: "cap_refill", label: "Cap Refill",       type: "toggle", options: ["< 2s", "≥ 2s"] },
            { id: "edema",      label: "Peripheral Edema", type: "toggle", options: ["None", "Pitting +", "Pitting ++", "Pitting +++", "Non-pitting"] }
        ]
    },

    // ── GASTROINTESTINAL ─────────────────────────────────────────────────────
    {
        id: "gi_insp", system: "GI", section: "Inspection", rank: 1,
        desc: "Contour, scars, visible signs",
        template: [
            { id: "contour", label: "Contour",        type: "toggle", options: ["Flat", "Scaphoid", "Distended"] },
            { id: "scars",   label: "Scars/Striae",   type: "toggle", options: ["None", "Present"] },
            { id: "other",   label: "Other Findings", type: "chips",  options: ["None", "Caput medusae", "Visible pulsation", "Hernia", "Everted umbilicus"] }
        ]
    },
    {
        id: "gi_palp", system: "GI", section: "Palpation", rank: 2,
        desc: "Tenderness, organomegaly, masses",
        template: [
            { id: "softness",     label: "Abdomen",       type: "toggle", options: ["Soft/Lax", "Guarding", "Rigidity"] },
            { id: "tenderness",   label: "Tenderness",    type: "chips",  options: ["None", "Epigastric", "RUQ", "RLQ", "LUQ", "LLQ", "Suprapubic", "Generalized"] },
            { id: "rebound",      label: "Rebound",       type: "toggle", options: ["Absent", "Present"] },
            { id: "organomegaly", label: "Organomegaly",  type: "toggle", options: ["None", "Hepatomegaly", "Splenomegaly", "Both"] },
            { id: "liver_span",   label: "Liver Span",    type: "number", placeholder: "e.g. 10 cm" },
            { id: "mass",         label: "Palpable Mass", type: "toggle", options: ["None", "Present"] }
        ]
    },
    {
        id: "gi_perc_ausc", system: "GI", section: "Percussion & Auscultation", rank: 3,
        desc: "Bowel sounds, ascites, bruits",
        template: [
            { id: "bowel_sounds", label: "Bowel Sounds", type: "toggle", options: ["Normal", "Hyperactive", "Sluggish", "Absent"] },
            { id: "ascites",      label: "Ascites",      type: "toggle", options: ["None", "Shifting dullness", "Fluid thrill"] },
            { id: "bruits",       label: "Bruits",       type: "toggle", options: ["Absent", "Present"] }
        ]
    },
    {
        id: "gi_dre", system: "GI", section: "Digital Rectal Exam", rank: 4,
        desc: "Tone, stool, prostate, mass",
        template: [
            { id: "tone",     label: "Sphincter Tone", type: "toggle", options: ["Normal", "Decreased", "Increased"] },
            { id: "stool",    label: "Stool",          type: "toggle", options: ["Brown", "Melena", "Fresh blood", "Pale/Clay"] },
            { id: "prostate", label: "Prostate",       type: "toggle", options: ["Normal", "Enlarged", "Nodular/Hard", "Tender"] },
            { id: "mass",     label: "Rectal Mass",    type: "toggle", options: ["None", "Present"] }
        ]
    },

    // ── NEUROLOGICAL ─────────────────────────────────────────────────────────
    {
        id: "cns_consciousness", system: "CNS", section: "Consciousness & Orientation", rank: 1,
        desc: "GCS, orientation",
        template: [
            { id: "gcs",         label: "GCS (3–15)",  type: "number", placeholder: "value..." },
            { id: "orientation", label: "Orientation", type: "toggle", options: ["Fully oriented", "Disoriented to time", "Disoriented to place", "Disoriented to person"] }
        ]
    },
    {
        id: "cns_cranial", system: "CNS", section: "Cranial Nerves", rank: 2,
        desc: "Pupils, facial symmetry, eye movements",
        template: [
            { id: "pupils", label: "Pupils",           type: "toggle", options: ["PEARL", "Anisocoria", "Sluggish", "Fixed/Dilated", "Pinpoint"] },
            { id: "face",   label: "Facial Symmetry",  type: "toggle", options: ["Symmetrical", "UMN pattern", "LMN pattern"] },
            { id: "eyes",   label: "Eye Movements",    type: "toggle", options: ["Intact", "Ophthalmoplegia", "Nystagmus"] }
        ]
    },
    {
        id: "cns_motor", system: "CNS", section: "Motor System", rank: 3,
        desc: "Tone, power, reflexes, plantar response",
        template: [
            { id: "tone",     label: "Tone",     type: "toggle", options: ["Normal", "Hypertonia", "Hypotonia", "Spasticity", "Rigidity"] },
            { id: "power",    label: "Power",    type: "toggle", options: ["5/5 Normal", "4/5 Mild weak", "≤3/5 Severe", "Hemiparesis", "Paraparesis"] },
            { id: "reflexes", label: "Reflexes", type: "toggle", options: ["Normal", "Hyperreflexia", "Hyporeflexia", "Areflexia"] },
            { id: "plantar",  label: "Plantar",  type: "toggle", options: ["Flexor (normal)", "Extensor (Babinski +ve)", "Equivocal"] }
        ]
    },
    {
        id: "cns_sensory", system: "CNS", section: "Sensory System", rank: 4,
        desc: "Light touch, proprioception, vibration",
        template: [
            { id: "light_touch",    label: "Light Touch",     type: "toggle", options: ["Intact", "Glove & stocking", "Sensory level", "Hemisensory"] },
            { id: "proprioception", label: "Proprioception",  type: "toggle", options: ["Intact", "Impaired"] },
            { id: "vibration",      label: "Vibration Sense", type: "toggle", options: ["Intact", "Impaired"] }
        ]
    },
    {
        id: "cns_coord", system: "CNS", section: "Coordination & Meningeal", rank: 5,
        desc: "Cerebellar signs, gait, meningeal signs",
        template: [
            { id: "coordination", label: "Coordination",    type: "chips",  options: ["Intact", "Dysmetria", "Dysdiadochokinesia", "Intention tremor"] },
            { id: "gait",         label: "Gait",            type: "toggle", options: ["Normal", "Ataxic", "Hemiplegic", "Steppage", "Antalgic"] },
            { id: "meningeal",    label: "Meningeal Signs", type: "chips",  options: ["None", "Neck stiffness", "Kernig +ve", "Brudzinski +ve"] }
        ]
    },

    // ── GENITOURINARY ────────────────────────────────────────────────────────
    {
        id: "gu_palp", system: "GU", section: "Palpation", rank: 1,
        desc: "CVA tenderness, suprapubic, bladder",
        template: [
            { id: "cva",      label: "CVA Tenderness",        type: "toggle", options: ["None", "Right", "Left", "Bilateral"] },
            { id: "suprapub", label: "Suprapubic Tenderness", type: "toggle", options: ["Absent", "Present"] },
            { id: "bladder",  label: "Palpable Bladder",      type: "toggle", options: ["Absent", "Present"] }
        ]
    },
    {
        id: "gu_ext", system: "GU", section: "External Genitalia", rank: 2,
        desc: "External genitalia and scrotal exam",
        template: [
            { id: "genitalia", label: "External Genitalia", type: "chips",  options: ["Normal", "Ulcers", "Discharge", "Rash", "Swelling"] },
            { id: "scrotal",   label: "Scrotal Exam",       type: "chips",  options: ["N/A", "Normal", "Swelling", "Tenderness", "Transilluminates"] }
        ]
    },

    // ── NEPHROLOGY ───────────────────────────────────────────────────────────
    {
        id: "neph_palp", system: "NEPH", section: "Renal Palpation", rank: 1,
        desc: "Kidney palpation and ballotment",
        template: [
            { id: "kidneys", label: "Kidneys",                type: "toggle", options: ["Not palpable", "Palpable R", "Palpable L", "Bilateral ballotable"] },
            { id: "renal_t", label: "Renal Angle Tenderness", type: "toggle", options: ["Absent", "Right", "Left", "Bilateral"] }
        ]
    },
    {
        id: "neph_fluid_access", system: "NEPH", section: "Fluid Status & Dialysis Access", rank: 2,
        desc: "Fluid balance, AV fistula, catheter",
        template: [
            { id: "fluid",    label: "Fluid Status",      type: "toggle", options: ["Euvolemic", "Overloaded", "Depleted"] },
            { id: "fistula",  label: "AV Fistula",        type: "toggle", options: ["N/A", "Present & functioning", "Failed/Thrombosed"] },
            { id: "catheter", label: "Dialysis Catheter", type: "toggle", options: ["N/A", "Present (tunnelled)", "Present (temporary)"] }
        ]
    },

    // ── MUSCULOSKELETAL ──────────────────────────────────────────────────────
    {
        id: "msk_joints", system: "MSK", section: "Joint Examination", rank: 1,
        desc: "Site, inspection, palpation, ROM",
        template: [
            { id: "site",       label: "Joint(s) Examined", type: "text",   placeholder: "e.g. Right knee, bilateral wrists" },
            { id: "inspection", label: "Inspection",        type: "chips",  options: ["Normal", "Swelling", "Erythema", "Deformity", "Muscle wasting"] },
            { id: "palpation",  label: "Palpation",         type: "chips",  options: ["Non-tender", "Warmth", "Tenderness", "Effusion", "Crepitus"] },
            { id: "rom",        label: "ROM",               type: "toggle", options: ["Full", "↓ Active only", "↓ Active & passive", "Painful arc"] }
        ]
    },
    {
        id: "msk_spine", system: "MSK", section: "Spine Examination", rank: 2,
        desc: "Spinal inspection, tenderness, level, SLR",
        template: [
            { id: "spine_insp", label: "Alignment",          type: "toggle", options: ["Normal", "Scoliosis", "Kyphosis", "Exaggerated lordosis"] },
            { id: "spine_palp", label: "Tenderness",         type: "toggle", options: ["None", "Midline", "Paraspinal", "Sacroiliac"] },
            { id: "spine_lvl",  label: "Level",              type: "text",   placeholder: "e.g. L4–L5, C5–C6" },
            { id: "slr",        label: "Straight Leg Raise", type: "toggle", options: ["Negative", "Positive R", "Positive L", "Positive bilateral"] }
        ]
    },

    // ── OBS / GYN ────────────────────────────────────────────────────────────
    {
        id: "obs_antenatal", system: "OBS", section: "Obstetric Examination", rank: 1,
        desc: "Fundal height, lie/presentation, FHR",
        template: [
            { id: "ga",     label: "Gestational Age",  type: "number", placeholder: "e.g. 32 weeks" },
            { id: "fundus", label: "Fundal Height",    type: "toggle", options: ["Consistent with dates", "Large for dates", "Small for dates"] },
            { id: "lie",    label: "Lie/Presentation", type: "toggle", options: ["Longitudinal/Cephalic", "Breech", "Transverse/Oblique"] },
            { id: "fhr",    label: "FHR Pattern",      type: "toggle", options: ["Normal 110–160", "Tachy >160", "Brady <110", "Absent"] }
        ]
    },
    {
        id: "obs_gynaec", system: "OBS", section: "Gynaecological Exam", rank: 2,
        desc: "Bleeding, discharge, cervix, adnexa",
        template: [
            { id: "pv_bleeding", label: "Vaginal Bleeding",    type: "toggle", options: ["None", "Spotting", "Active bleeding"] },
            { id: "discharge",   label: "Discharge",           type: "toggle", options: ["None", "Physiological", "Pathological"] },
            { id: "cervix",      label: "Cervical Os",         type: "toggle", options: ["Closed", "Open", "Not examined"] },
            { id: "cmt",         label: "CMT (Chandelier)",    type: "toggle", options: ["Absent", "Present"] },
            { id: "adnexa",      label: "Adnexal Tenderness",  type: "toggle", options: ["None", "Right", "Left", "Bilateral"] }
        ]
    },

    // ── ENDOCRINE ────────────────────────────────────────────────────────────
    {
        id: "endo_thyroid", system: "ENDO", section: "Thyroid Exam", rank: 1,
        desc: "Size, bruit, eye signs, tremor",
        template: [
            { id: "size",      label: "Thyroid Size",  type: "toggle", options: ["Normal", "Goiter (diffuse)", "Nodular"] },
            { id: "bruit",     label: "Thyroid Bruit", type: "toggle", options: ["Absent", "Present"] },
            { id: "eye_signs", label: "Eye Signs",     type: "chips",  options: ["None", "Exophthalmos", "Lid lag", "Lid retraction", "Ophthalmoplegia"] },
            { id: "tremor",    label: "Fine Tremor",   type: "toggle", options: ["Absent", "Present"] }
        ]
    },
    {
        id: "endo_diabetic", system: "ENDO", section: "Diabetic Foot & Signs", rank: 2,
        desc: "Ulcers, neuropathy, vascular, acanthosis",
        template: [
            { id: "ulcers",     label: "Foot Ulcers",     type: "toggle", options: ["None", "Present"] },
            { id: "pulses",     label: "Pedal Pulses",    type: "toggle", options: ["Intact", "Diminished", "Absent"] },
            { id: "neuropathy", label: "Sensory Loss",    type: "toggle", options: ["Absent", "Present"] },
            { id: "acanthosis", label: "Acanthosis Nig.", type: "toggle", options: ["Absent", "Present"] }
        ]
    },

    // ── ENT ──────────────────────────────────────────────────────────────────
    {
        id: "ent_ear", system: "ENT", section: "Ear Examination", rank: 1,
        desc: "Otoscopy bilateral, hearing, nystagmus",
        template: [
            { id: "ear_r",    label: "Right TM (Otoscopy)", type: "toggle", options: ["Normal", "Erythematous", "Bulging", "Perforation", "Effusion"] },
            { id: "ear_l",    label: "Left TM (Otoscopy)",  type: "toggle", options: ["Normal", "Erythematous", "Bulging", "Perforation", "Effusion"] },
            { id: "hearing",  label: "Hearing",             type: "toggle", options: ["Intact bilaterally", "Reduced R", "Reduced L", "Reduced bilateral"] },
            { id: "nystagmus",label: "Nystagmus",           type: "toggle", options: ["Absent", "Present"] }
        ]
    },
    {
        id: "ent_nose", system: "ENT", section: "Nose Examination", rank: 2,
        desc: "Nasal mucosa, septum, discharge, polyps",
        template: [
            { id: "nasal",    label: "Nasal Mucosa", type: "toggle", options: ["Normal", "Congested", "Pale/Boggy", "Ulcerated"] },
            { id: "septum",   label: "Nasal Septum", type: "toggle", options: ["Midline", "Deviated", "Perforation"] },
            { id: "discharge",label: "Discharge",    type: "toggle", options: ["None", "Clear/Watery", "Mucopurulent", "Bloody"] },
            { id: "polyps",   label: "Nasal Polyps", type: "toggle", options: ["Absent", "Present"] }
        ]
    },
    {
        id: "ent_throat", system: "ENT", section: "Throat & Neck", rank: 3,
        desc: "Oropharynx, tonsils, cervical lymph nodes",
        template: [
            { id: "throat",  label: "Oropharynx",           type: "toggle", options: ["Normal", "Erythematous", "Exudate/Pus", "Ulcers"] },
            { id: "tonsils", label: "Tonsils",              type: "toggle", options: ["Normal", "Enlarged (T1–T2)", "Enlarged (T3–T4)", "Exudate", "Absent"] },
            { id: "lymph",   label: "Cervical Lymph Nodes", type: "toggle", options: ["Non-enlarged", "Tender/Enlarged", "Hard/Fixed"] }
        ]
    },

    // ── OPHTHALMOLOGY ────────────────────────────────────────────────────────
    {
        id: "eye_visual", system: "EYE", section: "Visual Assessment", rank: 1,
        desc: "Visual acuity and visual fields",
        template: [
            { id: "acuity", label: "Visual Acuity", type: "toggle", options: ["Normal", "Reduced R", "Reduced L", "Reduced bilateral"] },
            { id: "fields", label: "Visual Fields", type: "toggle", options: ["Full to confrontation", "Hemianopia", "Quadrantanopia", "Tunnel vision"] }
        ]
    },
    {
        id: "eye_anterior", system: "EYE", section: "Anterior Segment", rank: 2,
        desc: "Eyelids, conjunctiva, cornea",
        template: [
            { id: "eyelids",     label: "Eyelids",     type: "chips",  options: ["Normal", "Ptosis", "Swelling", "Entropion/Ectropion"] },
            { id: "conjunctiva", label: "Conjunctiva", type: "toggle", options: ["Clear", "Injected/Red", "Chemosis", "Discharge", "Subconj. hemorrhage"] },
            { id: "cornea",      label: "Cornea",      type: "toggle", options: ["Clear", "Hazy/Cloudy", "Ulcer", "Foreign body"] }
        ]
    },
    {
        id: "eye_posterior", system: "EYE", section: "Pupils & Fundus", rank: 3,
        desc: "Pupil reactions, fundoscopy, IOP",
        template: [
            { id: "pupil_react", label: "Pupil Reaction",    type: "toggle", options: ["PEARL", "Sluggish", "Fixed/Dilated", "Irregular", "RAPD"] },
            { id: "iop",         label: "IOP (if measured)", type: "toggle", options: ["N/A", "Normal", "Elevated"] },
            { id: "fundoscopy",  label: "Fundoscopy",        type: "chips",  options: ["Not performed", "Normal", "Papilloedema", "AV nicking", "Diabetic changes", "Hypertensive changes"] }
        ]
    },

    // ── DERMATOLOGY ──────────────────────────────────────────────────────────
    {
        id: "skin_lesion", system: "DERM", section: "Lesion Morphology", rank: 1,
        desc: "Primary lesion type, color, surface, blanching",
        template: [
            { id: "morphology", label: "Primary Lesion", type: "toggle", options: ["Macule/Patch", "Papule/Plaque", "Vesicle/Bulla", "Pustule", "Nodule", "Urticaria/Wheal"] },
            { id: "color",      label: "Color",          type: "toggle", options: ["Erythematous", "Hyperpigmented", "Hypopigmented", "Purpuric/Petechial", "Skin-colored"] },
            { id: "surface",    label: "Surface",        type: "chips",  options: ["Smooth", "Scaly", "Crusted", "Weeping", "Lichenified"] },
            { id: "blanching",  label: "Blanching",      type: "toggle", options: ["Blanches", "Non-blanching"] }
        ]
    },
    {
        id: "skin_distribution", system: "DERM", section: "Distribution & Extent", rank: 2,
        desc: "Distribution, extent, mucosal involvement",
        template: [
            { id: "distribution", label: "Distribution",        type: "chips",  options: ["Face", "Trunk", "Upper limbs", "Lower limbs", "Palms/Soles", "Flexures", "Generalized"] },
            { id: "extent",       label: "Extent",              type: "toggle", options: ["Localized", "Regional", "Widespread"] },
            { id: "mucosal",      label: "Mucosal Involvement", type: "toggle", options: ["None", "Oral", "Ocular", "Genital"] }
        ]
    },

    // ── PSYCHIATRY ───────────────────────────────────────────────────────────
    {
        id: "psych_behav", system: "PSYCH", section: "Behaviour & Speech", rank: 1,
        desc: "Appearance, behaviour, eye contact, speech",
        template: [
            { id: "appearance",  label: "Appearance",  type: "toggle", options: ["Well-kempt", "Dishevelled", "Bizarrely dressed"] },
            { id: "behaviour",   label: "Behaviour",   type: "toggle", options: ["Cooperative", "Agitated", "Withdrawn", "Guarded"] },
            { id: "eye_contact", label: "Eye Contact", type: "toggle", options: ["Normal", "Reduced", "Avoids"] },
            { id: "speech",      label: "Speech",      type: "toggle", options: ["Normal rate & tone", "Pressured", "Slow/Quiet", "Disorganized/Tangential"] }
        ]
    },
    {
        id: "psych_mood_thought", system: "PSYCH", section: "Mood, Affect & Thought", rank: 2,
        desc: "Mood, affect, thought form & content, perception",
        template: [
            { id: "mood",       label: "Mood (Subjective)",  type: "toggle", options: ["Euthymic", "Depressed", "Elevated/Euphoric", "Anxious", "Irritable"] },
            { id: "affect",     label: "Affect (Objective)", type: "toggle", options: ["Appropriate", "Blunted/Flat", "Labile", "Incongruent"] },
            { id: "thought_f",  label: "Thought Form",       type: "toggle", options: ["Logical", "Tangential", "Circumstantial", "Flight of ideas", "Thought block"] },
            { id: "thought_c",  label: "Thought Content",    type: "chips",  options: ["Normal", "Suicidal ideation", "Homicidal ideation", "Delusions", "Obsessions", "Phobias"] },
            { id: "perception", label: "Perception",         type: "chips",  options: ["Normal", "Auditory hallucinations", "Visual hallucinations", "Illusions"] }
        ]
    },
    {
        id: "psych_cognition", system: "PSYCH", section: "Cognition & Insight", rank: 3,
        desc: "Orientation, memory, higher functions, insight",
        template: [
            { id: "orientation", label: "Orientation",      type: "toggle", options: ["Fully oriented", "Disoriented to time", "Disoriented to place", "Disoriented to person"] },
            { id: "memory",      label: "Memory",           type: "toggle", options: ["Intact", "Short-term impaired", "Long-term impaired", "Both impaired"] },
            { id: "cognition",   label: "Higher Functions", type: "toggle", options: ["Intact", "Mildly impaired", "Severely impaired"] },
            { id: "insight",     label: "Insight",          type: "toggle", options: ["Full", "Partial", "None"] }
        ]
    }
];


const HX_RADIOLOGY = [
    // ── PLAIN X-RAYS ─────────────────────────────────────────────────────────
    { name: "Chest X-Ray",                      modalities: ["CXR", "X-Ray", "chest", "plain film", "PA", "AP"] },
    { name: "Erect Chest X-Ray",                modalities: ["erect CXR", "X-Ray", "chest", "pneumoperitoneum", "free air", "erect"] },
    { name: "Abdominal X-Ray",                  modalities: ["AXR", "X-Ray", "abdomen", "plain film", "KUB", "obstruction"] },
    { name: "Erect Abdominal X-Ray",            modalities: ["erect AXR", "X-Ray", "abdomen", "obstruction", "fluid levels", "erect"] },
    { name: "KUB X-Ray",                        modalities: ["KUB", "X-Ray", "kidney ureter bladder", "stone", "calculus", "urological"] },
    { name: "Pelvis X-Ray",                     modalities: ["pelvis", "X-Ray", "hip", "pelvic", "fracture", "plain film"] },
    { name: "X-Ray Spine",                      modalities: ["spine", "X-Ray", "vertebra", "cervical", "lumbar", "thoracic", "back"] },
    { name: "X-Ray Extremities",                modalities: ["X-Ray", "limb", "extremity", "bone", "fracture", "joint", "hand", "foot", "wrist", "ankle"] },
    { name: "X-Ray Hand & Wrist",               modalities: ["X-Ray", "hand", "wrist", "rheumatoid", "fracture", "scaphoid", "carpal"] },
    { name: "Barium Swallow",                   modalities: ["barium swallow", "barium", "fluoroscopy", "oesophagus", "dysphagia", "contrast"] },
    { name: "Barium Meal",                      modalities: ["barium meal", "barium", "fluoroscopy", "stomach", "gastric", "duodenal", "contrast"] },
    { name: "Barium Enema",                     modalities: ["barium enema", "barium", "fluoroscopy", "colon", "colorectal", "lower GI", "contrast"] },

    // ── ULTRASOUND ───────────────────────────────────────────────────────────
    { name: "Abdominal US",                     modalities: ["ultrasound", "US", "sonography", "abdomen", "liver", "gallbladder", "bile duct", "abdominal"] },
    { name: "Pelvic US",                        modalities: ["ultrasound", "US", "sonography", "pelvis", "uterus", "ovary", "pelvic", "gynaecology"] },
    { name: "Transvaginal US (TVUS)",           modalities: ["ultrasound", "transvaginal", "TVUS", "US", "sonography", "uterus", "ovary", "endometrium", "ectopic"] },
    { name: "Renal Doppler US",                 modalities: ["ultrasound", "US", "doppler", "renal", "kidney", "renal artery", "stenosis"] },
    { name: "Doppler US Lower Limbs",           modalities: ["ultrasound", "US", "doppler", "DVT", "deep vein", "thrombosis", "lower limb", "leg", "veins"] },
    { name: "Carotid Doppler US",               modalities: ["ultrasound", "US", "doppler", "carotid", "stroke", "TIA", "cerebrovascular"] },
    { name: "Thyroid US",                       modalities: ["ultrasound", "US", "sonography", "thyroid", "goitre", "nodule", "neck"] },
    { name: "Neck Soft Tissue US",              modalities: ["ultrasound", "US", "sonography", "neck", "lymph node", "mass", "soft tissue", "salivary"] },
    { name: "Breast US",                        modalities: ["ultrasound", "US", "sonography", "breast", "lump", "mammary"] },
    { name: "Scrotal US",                       modalities: ["ultrasound", "US", "sonography", "scrotal", "testis", "testicle", "epididymis"] },
    { name: "Echocardiogram",                   modalities: ["echo", "echocardiogram", "cardiac US", "ultrasound", "heart", "TTE", "valve", "ejection fraction", "LV function"] },
    { name: "Transoesophageal Echo (TOE)",      modalities: ["TOE", "TEE", "echocardiogram", "transoesophageal", "echo", "endocarditis", "valvular", "aorta"] },
    { name: "FAST Scan (Bedside US)",           modalities: ["FAST", "ultrasound", "bedside US", "trauma", "free fluid", "haemoperitoneum", "haemopericardium"] },
    { name: "Bladder Scan (Bedside US)",        modalities: ["bladder scan", "ultrasound", "bladder", "retention", "residual volume", "bedside", "US"] },
    { name: "Point-of-care US (POCUS)",         modalities: ["POCUS", "point of care", "ultrasound", "bedside US", "lung sliding", "B-lines", "cardiac"] },

    // ── CT SCANS ─────────────────────────────────────────────────────────────
    { name: "CT Brain",                         modalities: ["CT", "computed tomography", "brain", "head", "stroke", "bleed", "haemorrhage", "trauma", "cranial"] },
    { name: "CT Brain with Contrast",           modalities: ["CT", "computed tomography", "brain", "head", "contrast", "abscess", "tumour", "ring enhancing"] },
    { name: "CT Chest",                         modalities: ["CT", "computed tomography", "chest", "lung", "thorax", "mass", "PE", "pulmonary"] },
    { name: "CT Pulmonary Angiography (CTPA)",  modalities: ["CTPA", "CT", "computed tomography", "pulmonary embolism", "PE", "pulmonary angiography"] },
    { name: "CT Abdomen & Pelvis",              modalities: ["CT", "computed tomography", "abdomen", "pelvis", "abdominal", "staging", "mass"] },
    { name: "CT KUB",                           modalities: ["CT KUB", "CT", "computed tomography", "kidney", "ureter", "bladder", "renal stone", "ureteric stone", "colic"] },
    { name: "CT Angiography",                   modalities: ["CT angiography", "CTA", "CT", "computed tomography", "angiography", "vascular", "aorta", "dissection", "aneurysm"] },
    { name: "CT Spine",                         modalities: ["CT", "computed tomography", "spine", "vertebra", "cord", "cervical", "lumbar", "fracture"] },
    { name: "CT Head & Neck",                   modalities: ["CT", "computed tomography", "head", "neck", "mass", "lymph node", "sinuses", "parotid"] },
    { name: "Triple-Phase CT Liver",            modalities: ["CT", "computed tomography", "liver", "hepatic", "HCC", "hepatocellular", "arterial phase", "portal phase"] },

    // ── MRI ──────────────────────────────────────────────────────────────────
    { name: "MRI Brain",                        modalities: ["MRI", "magnetic resonance", "brain", "head", "stroke", "DWI", "diffusion", "posterior fossa", "tumour"] },
    { name: "MRI Spine",                        modalities: ["MRI", "magnetic resonance", "spine", "cord", "disc", "prolapse", "cervical", "lumbar", "myelopathy"] },
    { name: "MRI Brain & Spine",                modalities: ["MRI", "magnetic resonance", "brain", "spine", "MS", "multiple sclerosis", "cord", "demyelination"] },
    { name: "MRCP",                             modalities: ["MRCP", "MRI", "magnetic resonance", "cholangiopancreatography", "bile duct", "gallstone", "choledocholithiasis", "pancreas"] },
    { name: "MRI Abdomen",                      modalities: ["MRI", "magnetic resonance", "abdomen", "liver", "pancreas", "adrenal", "renal", "soft tissue"] },
    { name: "MRI Pelvis",                       modalities: ["MRI", "magnetic resonance", "pelvis", "uterus", "ovary", "prostate", "rectal", "bladder"] },
    { name: "MRI Joint",                        modalities: ["MRI", "magnetic resonance", "joint", "knee", "shoulder", "hip", "meniscus", "ligament", "cartilage", "tendon"] },
    { name: "MRI Cardiac",                      modalities: ["MRI", "magnetic resonance", "cardiac", "CMR", "heart", "myocarditis", "cardiomyopathy", "sarcoid"] },
    { name: "MRI Breast",                       modalities: ["MRI", "magnetic resonance", "breast", "mammary", "implant", "staging"] },

    // ── NUCLEAR MEDICINE ─────────────────────────────────────────────────────
    { name: "V/Q Scan",                         modalities: ["VQ", "V/Q scan", "ventilation perfusion", "nuclear", "pulmonary embolism", "PE", "scintigraphy"] },
    { name: "Bone Scan (SPECT)",                modalities: ["bone scan", "nuclear", "scintigraphy", "SPECT", "metastasis", "osteomyelitis", "fracture", "Paget's"] },
    { name: "Thyroid Scan (Tc-99m)",            modalities: ["thyroid scan", "nuclear", "scintigraphy", "thyroid", "goitre", "nodule", "hot nodule", "cold nodule", "Graves"] },
    { name: "MIBI Stress Test (Nuclear)",       modalities: ["MIBI", "nuclear stress", "myocardial perfusion", "nuclear cardiology", "ischaemia", "coronary", "angina"] },
    { name: "DEXA Scan (Bone Density)",         modalities: ["DEXA", "bone density", "osteoporosis", "osteopenia", "dual energy", "DXA"] },
    { name: "PET-CT Scan",                      modalities: ["PET", "PET-CT", "positron emission", "nuclear", "staging", "lymphoma", "malignancy", "FDG"] },

    // ── MAMMOGRAPHY ──────────────────────────────────────────────────────────
    { name: "Mammography",                      modalities: ["mammogram", "mammography", "breast", "screening", "BIRADS", "microcalcifications"] },

    // ── FLUOROSCOPY / INTERVENTIONAL ────────────────────────────────────────
    { name: "Micturating Cystourethrogram (MCU)", modalities: ["MCU", "VCUG", "cystourethrogram", "fluoroscopy", "bladder", "urethra", "reflux", "VUR"] },
    { name: "ERCP",                             modalities: ["ERCP", "endoscopic retrograde", "cholangiopancreatography", "bile duct", "stone", "stent", "pancreas"] },

    // ── ENDOSCOPY ────────────────────────────────────────────────────────────
    { name: "Upper Endoscopy (OGD)",            modalities: ["OGD", "endoscopy", "gastroscopy", "upper GI", "oesophagus", "stomach", "duodenum", "biopsy"] },
    { name: "Colonoscopy",                      modalities: ["colonoscopy", "endoscopy", "colon", "colorectal", "polyp", "biopsy", "lower GI", "IBD"] },
    { name: "Flexible Sigmoidoscopy",           modalities: ["sigmoidoscopy", "endoscopy", "sigmoid", "rectum", "lower GI", "polyp"] },
    { name: "Bronchoscopy",                     modalities: ["bronchoscopy", "endoscopy", "airway", "bronchus", "lung", "BAL", "biopsy", "haemoptysis", "mass"] },
    { name: "Cystoscopy",                       modalities: ["cystoscopy", "endoscopy", "bladder", "urethra", "haematuria", "tumour", "urological"] }
];

const HX_LABS = [
    // ── HAEMATOLOGY ──────────────────────────────────────────────────────────
    { name: "Hemoglobin (Hb)",                min: 12.0, max: 16.0,  unit: "g/dL" },
    { name: "WBC",                            min: 4.0,  max: 11.0,  unit: "x10⁹/L" },
    { name: "Platelets",                      min: 150,  max: 400,   unit: "x10⁹/L" },
    { name: "MCV",                            min: 80,   max: 100,   unit: "fL" },
    { name: "MCH",                            min: 27,   max: 33,    unit: "pg" },
    { name: "Reticulocyte Count",             min: 0.5,  max: 2.5,   unit: "%" },
    { name: "Blood Film",                     min: 0,    max: 0,     unit: "qualitative" },
    { name: "Malaria Film",                   min: 0,    max: 0,     unit: "qualitative" },

    // ── ELECTROLYTES & RENAL ─────────────────────────────────────────────────
    { name: "Sodium (Na)",                    min: 135,  max: 145,   unit: "mEq/L" },
    { name: "Potassium (K)",                  min: 3.5,  max: 5.1,   unit: "mEq/L" },
    { name: "Calcium",                        min: 8.5,  max: 10.5,  unit: "mg/dL" },
    { name: "Magnesium",                      min: 1.7,  max: 2.2,   unit: "mg/dL" },
    { name: "Phosphorus",                     min: 2.5,  max: 4.5,   unit: "mg/dL" },
    { name: "Chloride (Cl)",                  min: 98,   max: 106,   unit: "mEq/L" },
    { name: "Creatinine",                     min: 0.6,  max: 1.2,   unit: "mg/dL" },
    { name: "BUN",                            min: 7,    max: 20,    unit: "mg/dL" },
    { name: "Urea",                           min: 10,   max: 50,    unit: "mg/dL" },
    { name: "eGFR",                           min: 90,   max: 120,   unit: "mL/min/1.73m²" },
    { name: "Uric Acid",                      min: 3.5,  max: 7.2,   unit: "mg/dL" },
    { name: "Urine Sodium",                   min: 40,   max: 220,   unit: "mEq/L" },
    { name: "Urine Osmolality",               min: 300,  max: 900,   unit: "mOsm/kg" },
    { name: "Serum Osmolality",               min: 275,  max: 295,   unit: "mOsm/kg" },
    { name: "Urine Specific Gravity",         min: 1.005,max: 1.030, unit: "" },
    { name: "Urine Protein",                  min: 0,    max: 14,    unit: "mg/dL" },
    { name: "Urine Protein/Cr Ratio",         min: 0,    max: 30,    unit: "mg/g" },

    // ── LIVER FUNCTION ───────────────────────────────────────────────────────
    { name: "ALT (SGPT)",                     min: 7,    max: 56,    unit: "U/L" },
    { name: "AST (SGOT)",                     min: 10,   max: 40,    unit: "U/L" },
    { name: "Alkaline Phosphatase (ALP)",     min: 44,   max: 147,   unit: "U/L" },
    { name: "GGT",                            min: 9,    max: 48,    unit: "U/L" },
    { name: "Total Bilirubin",                min: 0.1,  max: 1.2,   unit: "mg/dL" },
    { name: "Direct Bilirubin",               min: 0.0,  max: 0.3,   unit: "mg/dL" },
    { name: "Total Protein",                  min: 6.0,  max: 8.3,   unit: "g/dL" },
    { name: "Albumin",                        min: 3.5,  max: 5.0,   unit: "g/dL" },
    { name: "Ammonia",                        min: 15,   max: 45,    unit: "µg/dL" },

    // ── PANCREATIC / GI ──────────────────────────────────────────────────────
    { name: "LDH",                            min: 140,  max: 280,   unit: "U/L" },
    { name: "Haptoglobin",                    min: 30,   max: 200,   unit: "mg/dL" },
    { name: "Amylase",                        min: 30,   max: 110,   unit: "U/L" },
    { name: "Lipase",                         min: 0,    max: 160,   unit: "U/L" },
    { name: "H. pylori Test (Stool Antigen)", min: 0,    max: 0,     unit: "qualitative" },

    // ── INFLAMMATORY / INFECTION ─────────────────────────────────────────────
    { name: "CRP",                            min: 0,    max: 10,    unit: "mg/L" },
    { name: "ESR",                            min: 0,    max: 20,    unit: "mm/hr" },
    { name: "Procalcitonin",                  min: 0,    max: 0.15,  unit: "ng/mL" },
    { name: "Throat Swab / Culture",          min: 0,    max: 0,     unit: "qualitative" },

    // ── CARDIAC ──────────────────────────────────────────────────────────────
    { name: "Troponin I",                     min: 0,    max: 0.04,  unit: "ng/mL" },
    { name: "BNP",                            min: 0,    max: 100,   unit: "pg/mL" },

    // ── COAGULATION ──────────────────────────────────────────────────────────
    { name: "PT",                             min: 11,   max: 13.5,  unit: "sec" },
    { name: "PTT",                            min: 25,   max: 35,    unit: "sec" },
    { name: "INR",                            min: 0.8,  max: 1.1,   unit: "" },
    { name: "D-Dimer",                        min: 0,    max: 0.50,  unit: "mg/L" },
    { name: "Fibrinogen",                     min: 200,  max: 400,   unit: "mg/dL" },

    // ── BLOOD GAS ────────────────────────────────────────────────────────────
    { name: "pH",                             min: 7.35, max: 7.45,  unit: "" },
    { name: "pCO2",                           min: 35,   max: 45,    unit: "mmHg" },
    { name: "pO2",                            min: 80,   max: 100,   unit: "mmHg" },
    { name: "HCO3",                           min: 22,   max: 26,    unit: "mEq/L" },
    { name: "Base Excess (BE)",               min: -2,   max: 2,     unit: "mEq/L" },
    { name: "Lactate",                        min: 0.5,  max: 1.0,   unit: "mmol/L" },
    { name: "O2 Saturation (SpO2)",           min: 95,   max: 100,   unit: "%" },

    // ── ENDOCRINE ────────────────────────────────────────────────────────────
    { name: "TSH",                            min: 0.4,  max: 4.0,   unit: "mIU/L" },
    { name: "Free T4 (fT4)",                 min: 0.8,  max: 1.8,   unit: "ng/dL" },
    { name: "Free T3 (fT3)",                 min: 2.3,  max: 4.2,   unit: "pg/mL" },
    { name: "HbA1c",                          min: 0,    max: 5.7,   unit: "%" },
    { name: "Glucose (Random)",               min: 70,   max: 140,   unit: "mg/dL" },
    { name: "Fasting Glucose",                min: 70,   max: 100,   unit: "mg/dL" },
    { name: "C-Peptide",                      min: 0.5,  max: 2.0,   unit: "ng/mL" },
    { name: "Cortisol (AM)",                  min: 6,    max: 23,    unit: "µg/dL" },
    { name: "PTH",                            min: 15,   max: 65,    unit: "pg/mL" },

    // ── LIPIDS ───────────────────────────────────────────────────────────────
    { name: "Total Cholesterol",              min: 0,    max: 200,   unit: "mg/dL" },
    { name: "LDL",                            min: 0,    max: 100,   unit: "mg/dL" },
    { name: "HDL",                            min: 40,   max: 60,    unit: "mg/dL" },
    { name: "Triglycerides",                 min: 0,    max: 150,   unit: "mg/dL" },

    // ── RHEUMATOLOGY / IMMUNOLOGY ────────────────────────────────────────────
    { name: "Rheumatoid Factor (RF)",         min: 0,    max: 14,    unit: "IU/mL" },
    { name: "Anti-CCP",                       min: 0,    max: 17,    unit: "U/mL" },
    { name: "ANA",                            min: 0,    max: 1,     unit: "titer (1:40)" },
    { name: "Anti-dsDNA",                     min: 0,    max: 10,    unit: "IU/mL" },
    { name: "C3",                             min: 90,   max: 180,   unit: "mg/dL" },
    { name: "C4",                             min: 16,   max: 47,    unit: "mg/dL" },
    { name: "ASO Titer",                      min: 0,    max: 200,   unit: "IU/mL" },

    // ── HAEMATINICS ──────────────────────────────────────────────────────────
    { name: "Ferritin",                       min: 12,   max: 300,   unit: "ng/mL" },
    { name: "Serum Iron",                     min: 60,   max: 170,   unit: "µg/dL" },
    { name: "TIBC",                           min: 250,  max: 370,   unit: "µg/dL" },
    { name: "Vitamin B12",                    min: 200,  max: 900,   unit: "pg/mL" },
    { name: "Folate",                         min: 2.7,  max: 17.0,  unit: "ng/mL" },

    // ── MUSCLE ───────────────────────────────────────────────────────────────
    { name: "CK (Creatine Kinase)",           min: 30,   max: 200,   unit: "U/L" },

    // ── TUMOUR MARKERS / ONCOLOGY ────────────────────────────────────────────
    { name: "PSA (Prostate Specific Antigen)",min: 0,    max: 4.0,   unit: "ng/mL" },
    { name: "SPEP (Serum Protein Electrophoresis)", min: 0, max: 0,  unit: "qualitative" },

    // ── TOXICOLOGY ───────────────────────────────────────────────────────────
    { name: "Serum Acetaminophen Level",      min: 0,    max: 20,    unit: "µg/mL" },
    { name: "Serum Salicylate Level",         min: 0,    max: 30,    unit: "mg/dL" },
    { name: "Toxicology Screen",              min: 0,    max: 0,     unit: "qualitative" },

    // ── OBSTETRIC ────────────────────────────────────────────────────────────
    { name: "β-hCG (serum)",                 min: 0,    max: 5,     unit: "mIU/mL" },

    // ── MICROBIOLOGY ─────────────────────────────────────────────────────────
    { name: "Blood Culture",                  min: 0,    max: 0,     unit: "qualitative" },
    { name: "Urine Culture",                  min: 0,    max: 0,     unit: "qualitative" },
    { name: "Sputum Culture",                 min: 0,    max: 0,     unit: "qualitative" },
    { name: "Stool Analysis",                 min: 0,    max: 0,     unit: "qualitative" },
    { name: "Stool Culture",                  min: 0,    max: 0,     unit: "qualitative" },
    { name: "AFB Smear/Culture",              min: 0,    max: 0,     unit: "qualitative" },
    { name: "HBsAg",                          min: 0,    max: 0,     unit: "qualitative" },
    { name: "Anti-HCV",                       min: 0,    max: 0,     unit: "qualitative" },
    { name: "HIV Ag/Ab",                      min: 0,    max: 0,     unit: "qualitative" },
    { name: "Monospot Test",                  min: 0,    max: 0,     unit: "qualitative" },

    // ── URINALYSIS ───────────────────────────────────────────────────────────
    { name: "Urinalysis",                     min: 0,    max: 0,     unit: "qualitative" },
    { name: "Urine Cytology",                 min: 0,    max: 0,     unit: "qualitative" },

    // ── NEURO / OTHER ────────────────────────────────────────────────────────
    { name: "Lumbar Puncture (CSF Analysis)", min: 0,    max: 0,     unit: "qualitative" },
    { name: "Antiepileptic Drug Levels",      min: 0,    max: 0,     unit: "qualitative" },
    { name: "ECG",                            min: 0,    max: 0,     unit: "qualitative" },
    { name: "Holter Monitor",                 min: 0,    max: 0,     unit: "qualitative" },
    { name: "Blood Group & Crossmatch",       min: 0,    max: 0,     unit: "qualitative" }
];