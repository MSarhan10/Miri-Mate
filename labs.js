const LAB_DATA = [
    {
        icon: "🩺", category: "Vital Signs", subtitle: "Baseline Assessment",
        catNote: "Blood pressure classifications follow 2023 AHA/ACC guidelines. Always interpret vitals in clinical context.",
        tests: [
            { name: "Blood Pressure (Systolic)", range: "90–119 mmHg", note: "< 90: Hypotension → assess for shock\n120–129: Elevated\n130–139: Stage 1 Hypertension\n≥ 140: Stage 2 Hypertension\n≥ 180: Hypertensive Crisis — check for end-organ damage" },
            { name: "Blood Pressure (Diastolic)", range: "60–79 mmHg", note: "< 60: Hypotension\n80–89: Stage 1 Hypertension\n≥ 90: Stage 2 Hypertension" },
            { name: "Heart Rate", range: "60–100 BPM", note: "< 60: Bradycardia (can be normal in athletes)\n> 100: Tachycardia\n> 150: May compromise cardiac output\nIrregular rhythm → think A-Fib" },
            { name: "Respiratory Rate", range: "12–20 breaths/min", note: "< 12: Bradypnea (opioids, severe hypothyroidism)\n> 20: Tachypnea\n> 30: Severe respiratory distress — escalate\nEarly sepsis often raises RR before other vitals change" },
            { name: "Oxygen Saturation (SpO2)", range: "95%–100%", note: "94%: Monitor closely, may need supplemental O2\n90–93%: Supplemental O2 indicated\n< 90%: Hypoxemia — clinical emergency\nNote: SpO2 unreliable in poor perfusion, CO poisoning, methemoglobinemia" },
            { name: "Temperature", range: "36.5°C–37.3°C / 97.7°F–99.1°F", note: "< 35°C: Hypothermia (rectal is most accurate)\n37.5–38.0°C: Low-grade fever\n≥ 38.3°C: Fever — investigate source\n≥ 40°C: Hyperpyrexia — CNS damage risk\nImmunocompromised patients may not mount a fever despite serious infection" },
            { name: "MAP (Mean Arterial Pressure)", range: "70–100 mmHg", note: "Formula: (SBP + 2×DBP) ÷ 3\n< 65 mmHg: Organ perfusion at risk (septic shock target ≥ 65 mmHg)\n> 110 mmHg: Hypertensive urgency" },
            { name: "Pain Scale (NRS)", range: "0 = No pain / 10 = Worst", note: "1–3: Mild\n4–6: Moderate — reassess analgesic plan\n7–10: Severe — prompt intervention needed\nDocument quality, location, radiation, and aggravating/relieving factors" }
        ]
    },
    {
        icon: "🩸", category: "Complete Blood Count", subtitle: "CBC — Hematology",
        catNote: "CBC with differential is the most commonly ordered lab. Always interpret together with clinical picture.",
        tests: [
            { name: "WBC (White Blood Cells)", range: "4,500–11,000 cells/mcL", note: "< 4,000: Leukopenia → infection risk, marrow suppression\n> 11,000: Leukocytosis → infection, inflammation, stress, steroids\n> 30,000: Consider leukemia\nA 'left shift' (↑ bands) indicates acute bacterial infection even with normal WBC" },
            { name: "Neutrophils (ANC)", range: "1,500–8,000 cells/mcL (50–70%)", note: "< 1,500: Neutropenia\n< 500: Severe — infection risk dramatically elevated\nANC < 500 + fever = Febrile Neutropenia — medical emergency\n> 8,000: Neutrophilia (bacterial infection, steroids, stress)" },
            { name: "Lymphocytes", range: "1,000–4,800 cells/mcL (20–40%)", note: "↑ Lymphocytosis: Viral infections (EBV, CMV), CLL, pertussis\n↓ Lymphopenia: HIV/AIDS, sepsis, steroids, radiation\nAtypical lymphocytes on smear: Suggest EBV/mono" },
            { name: "Monocytes", range: "200–800 cells/mcL (2–8%)", note: "↑ Monocytosis: Chronic infections (TB, endocarditis), autoimmune disease, malignancy" },
            { name: "Eosinophils", range: "100–400 cells/mcL (1–4%)", note: "↑ Eosinophilia mnemonic: NAACP\n• Neoplasm\n• Allergy/Asthma\n• Addison's disease\n• Collagen vascular disease\n• Parasites\n> 1,500: Hypereosinophilia — organ damage risk" },
            { name: "RBC (Red Blood Cells)", male: "4.3–5.9 × 10⁶/mcL", female: "3.8–5.2 × 10⁶/mcL", note: "Reflects oxygen-carrying capacity. Always pair with Hgb and HCT for full picture." },
            { name: "Hemoglobin (Hgb)", male: "13.5–17.5 g/dL", female: "12.0–16.0 g/dL", note: "< 8 g/dL: Transfusion often considered (symptomatic or hemodynamically unstable)\n< 7 g/dL: Transfusion typically indicated\n> 18 g/dL: Polycythemia\nIn dehydration, Hgb appears falsely elevated (hemoconcentration)" },
            { name: "Hematocrit (HCT)", male: "41%–53%", female: "36%–46%", note: "Approximately 3× the Hemoglobin value (quick estimate: Hgb × 3)\n< 30%: Significant anemia\nIn acute blood loss, HCT may be normal initially — takes 24–72h to equilibrate" },
            { name: "MCV (Mean Corpuscular Volume)", range: "80–100 fL", note: "< 80 (Microcytic): Iron deficiency, thalassemia, anemia of chronic disease\n80–100 (Normocytic): Acute blood loss, hemolysis, mixed anemia, CKD\n> 100 (Macrocytic): B12/folate deficiency, hypothyroidism, liver disease, alcohol, medications (MTX, hydroxyurea)" },
            { name: "MCHC (Mean Cell Hgb Conc.)", range: "32–36 g/dL", note: "< 32: Hypochromic (iron deficiency)\n> 36: Hyperchromic (hereditary spherocytosis)\nAlways lower in iron-deficient states before MCV falls" },
            { name: "RDW (Red Cell Distribution Width)", range: "11.5%–14.5%", note: "Measures variation in RBC size (anisocytosis).\n↑ RDW: Mixed anemia, early iron/B12 deficiency, hemolysis\nNormal MCV + High RDW: Think early nutritional deficiency" },
            { name: "Platelets (PLT)", range: "150,000–400,000 /mcL", note: "< 150,000: Thrombocytopenia\n< 50,000: Significant bleeding risk — avoid invasive procedures\n< 20,000: Spontaneous bleeding risk — consider transfusion\n> 450,000: Thrombocytosis (reactive or essential)\nCritical: HIT drops PLT > 50% within 5–10 days of heparin exposure" },
            { name: "Reticulocyte Count", range: "0.5%–2.5%", note: "↑ Reticulocytes: Hemolysis recovery, blood loss response, treatment response (Fe/B12)\n↓ Reticulocytes: Hypoproliferative anemia (aplastic, marrow failure, chronic disease)\nKey: Low reticulocytes + anemia = bone marrow problem" }
        ]
    },
    {
        icon: "🧪", category: "Basic Metabolic Panel", subtitle: "BMP/CMP — Electrolytes & Chemistry",
        catNote: "Electrolytes must be interpreted together. Anion Gap = Na − (Cl + HCO3). Normal: 8–12 mEq/L. Elevated AG + metabolic acidosis = AGMA (think MUDPILES: Methanol, Uremia, DKA, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates).",
        tests: [
            { name: "Sodium (Na⁺)", range: "135–145 mEq/L", note: "< 135: Hyponatremia → confusion, seizures if severe/rapid\n> 145: Hypernatremia → thirst, confusion, lethargy\nCorrection must be SLOW (≤ 8–10 mEq/L per 24h) to prevent osmotic demyelination (hypoNa) or cerebral edema (hyperNa)" },
            { name: "Potassium (K⁺)", range: "3.5–5.0 mEq/L", note: "< 3.5: Hypokalemia → weakness, U-waves on ECG, dysrhythmias\n< 3.0: Dangerous — IV repletion needed\n> 5.0: Hyperkalemia → peaked T-waves, wide QRS, sine wave\n> 6.5: Life-threatening — treat immediately\nAlways check Mg²⁺ when K⁺ is low — hypomagnesemia prevents K⁺ repletion" },
            { name: "Chloride (Cl⁻)", range: "96–106 mEq/L", note: "Follows Na⁺ changes.\nLow Cl: Vomiting, contraction alkalosis, Bartter syndrome\nHigh Cl: Normal saline infusion, diarrhea, RTA (non-AG acidosis)" },
            { name: "Bicarbonate (HCO₃⁻)", range: "22–28 mEq/L", note: "< 22: Metabolic acidosis → calculate Anion Gap\n> 28: Metabolic alkalosis (vomiting, diuretics, excess alkali)\nWinter's Formula (expected compensation): PaCO2 = (1.5 × HCO3) + 8 ± 2" },
            { name: "Calcium (Ca²⁺) — Total", range: "8.5–10.5 mg/dL", note: "Correct for albumin: Corrected Ca = Measured Ca + 0.8 × (4 − albumin)\n< 8.5: Hypocalcemia → tetany, Chvostek/Trousseau signs, prolonged QT\n> 10.5: Hypercalcemia → 'Bones, Stones, Groans, Psychic Moans' (PTH, malignancy, Vit D toxicity)" },
            { name: "Ionized Calcium", range: "4.5–5.3 mg/dL (1.12–1.32 mmol/L)", note: "Physiologically active form. More accurate than total Ca in critical care.\n< 4.4 mg/dL: Treat hypocalcemia regardless of total Ca²⁺" },
            { name: "Magnesium (Mg²⁺)", range: "1.7–2.2 mg/dL", note: "< 1.7: Hypomagnesemia → cramps, seizures, arrhythmias, refractory hypokalemia\n> 2.5: Hypermagnesemia (renal failure, excess supplements) → loss of DTRs, respiratory depression\nReplete Mg²⁺ before/alongside K⁺ — required for K⁺ to enter cells" },
            { name: "Phosphorus (PO₄³⁻)", range: "2.5–4.5 mg/dL", note: "Inverse relationship with Ca²⁺\n< 1.0 mg/dL: Severe hypophosphatemia → respiratory failure, hemolysis, rhabdomyolysis (refeeding syndrome)\n> 5.0 mg/dL: Hyperphosphatemia (CKD, hypoparathyroidism, rhabdomyolysis)" },
            { name: "Albumin", range: "3.5–5.0 g/dL", note: "< 3.5: Malnutrition, liver disease, nephrotic syndrome, inflammation\nAlways correct Ca²⁺ when albumin is low\nNegative acute-phase reactant: Drops in inflammation even without true protein deficiency" },
            { name: "Total Protein", range: "6.0–8.3 g/dL", note: "= Albumin + Globulins\n↑: Dehydration, multiple myeloma, chronic infections\n↓: Malnutrition, liver disease, protein-losing nephropathy/enteropathy\nGlobulin gap (TP − Albumin > 4.0): Consider gammopathy" }
        ]
    },
    {
        icon: "💧", category: "Renal Function", subtitle: "Kidneys & Fluid Balance",
        catNote: "CKD staging by GFR: G1 ≥90 (normal), G2 60–89, G3 30–59, G4 15–29, G5 <15 (kidney failure).",
        tests: [
            { name: "BUN (Blood Urea Nitrogen)", range: "7–20 mg/dL", note: "↑ BUN: Dehydration, pre-renal AKI, high protein intake, GI bleed\n↓ BUN: Liver failure, malnutrition, overhydration\nBUN:Creatinine > 20: Pre-renal\nBUN:Creatinine < 10: Liver disease, low protein intake, overhydration" },
            { name: "Creatinine (Cr)", male: "0.7–1.3 mg/dL", female: "0.5–1.1 mg/dL", note: "Most specific marker of kidney filtration.\nDoubling Cr ≈ 50% loss of GFR\nNote: Cr increases are DELAYED — even severe AKI may show only mild Cr elevation early\nLow Cr in elderly/malnourished masks true GFR loss" },
            { name: "eGFR", range: "> 90 mL/min/1.73m²", note: "CKD staging:\nG1: ≥ 90 (normal)\nG2: 60–89 (mildly decreased)\nG3a/b: 30–59 (moderately decreased)\nG4: 15–29 (severely decreased — plan for RRT)\nG5: < 15 (kidney failure)\nDose-adjust medications starting at GFR < 60" },
            { name: "Urine Specific Gravity", range: "1.005–1.030", note: "1.001–1.010: Dilute (overhydration, DI, CKD)\n1.010–1.020: Isosthenuria (fixed in advanced CKD)\n1.020–1.030: Concentrated (dehydration, SIADH)\n> 1.030: Severe dehydration, contrast media, glucose" },
            { name: "Urine Output", range: "0.5–1.0 mL/kg/hr", note: "< 0.5 mL/kg/hr for > 6h: Oliguria → investigate for AKI\n< 100 mL/day: Anuria (obstruction, bilateral cortical necrosis)\nAim > 30 mL/hr in adults as ICU target" }
        ]
    },
    {
        icon: "🛡️", category: "Liver Function Tests", subtitle: "LFTs — Hepatic Function",
        catNote: "Pattern matters: Hepatocellular = ↑↑ AST/ALT. Cholestatic = ↑↑ ALP/GGT/Bilirubin. PT/INR reflects synthetic function (hepatic reserve).",
        tests: [
            { name: "ALT (Alanine Aminotransferase)", male: "10–40 U/L", female: "7–35 U/L", note: "Most liver-specific enzyme.\n> 1,000 U/L: Acute hepatitis (viral, ischemic, drug-induced)\nAST:ALT > 2:1: Alcoholic hepatitis (AST rarely > 300 in alcoholic liver disease)\nAST:ALT > 1 in cirrhosis" },
            { name: "AST (Aspartate Aminotransferase)", range: "8–48 U/L", note: "Less liver-specific — also found in heart, muscle, kidney, brain.\nElevated in: MI, rhabdomyolysis, hemolysis + liver disease\nAST:ALT ratio helps distinguish cause" },
            { name: "ALP (Alkaline Phosphatase)", range: "40–120 U/L", note: "↑ in: Biliary obstruction, bone disease (Paget's), pregnancy, liver mets\nIf ALP elevated: Check GGT — if also ↑, confirms hepatobiliary origin\nPhysiologically elevated in growing children and 3rd trimester pregnancy" },
            { name: "GGT (Gamma-Glutamyl Transferase)", range: "8–61 U/L", note: "Confirms hepatobiliary source of elevated ALP.\nHighly sensitive for alcohol use (elevated even in early alcohol liver disease)\nAlso elevated: Cholestasis, medications (phenytoin, rifampicin)" },
            { name: "Total Bilirubin", range: "0.1–1.2 mg/dL", note: "≥ 2.0 mg/dL: Clinically visible jaundice\nDirect (conjugated) > 50%: Cholestatic/obstructive (stones, cholangitis)\nIndirect (unconjugated) predominant: Hemolysis, Gilbert's, Crigler-Najjar" },
            { name: "Direct (Conjugated) Bilirubin", range: "0.0–0.3 mg/dL", note: "↑ Direct: Hepatocellular dysfunction, biliary obstruction, cholestasis\nWater-soluble → spills into urine (dark urine = obstructive jaundice)" },
            { name: "Indirect (Unconjugated) Bilirubin", range: "0.1–1.0 mg/dL", note: "↑ Indirect: Hemolytic anemia, ineffective erythropoiesis, Gilbert syndrome\nGilbert's: Mild benign ↑ triggered by fasting/illness/stress — no treatment needed" }
        ]
    },
    {
        icon: "🍽️", category: "Pancreatic Enzymes", subtitle: "Digestive Enzymes",
        catNote: "In acute pancreatitis, lipase is more specific and stays elevated longer than amylase.",
        tests: [
            { name: "Amylase", range: "30–110 U/L", note: "↑ in: Acute pancreatitis (3× ULN is diagnostic), parotitis, bowel ischemia\nPeaks at 12–24h, returns to normal in 3–5 days\nNot organ-specific: Also elevated in salivary disease, perforated bowel, ectopic pregnancy" },
            { name: "Lipase", range: "0–160 U/L", note: "More specific than amylase for acute pancreatitis.\nRemains elevated longer (7–10 days vs 3–5 days)\n3× ULN + clinical symptoms = diagnosis of acute pancreatitis\nNormal lipase nearly excludes acute pancreatitis" }
        ]
    },
    {
        icon: "🍬", category: "Glucose & Diabetes", subtitle: "Endocrine / Blood Sugar",
        catNote: "Values reflect 2024 American Diabetes Association (ADA) Standards of Care.",
        tests: [
            { name: "Fasting Plasma Glucose", range: "70–99 mg/dL", note: "100–125 mg/dL: Impaired fasting glucose = Pre-diabetes\n≥ 126 mg/dL (confirmed twice): Diagnostic for Diabetes Mellitus\n< 70 mg/dL: Hypoglycemia (tremor, sweating, confusion)\n< 55 mg/dL: Severe hypoglycemia → altered consciousness" },
            { name: "Random (Casual) Glucose", range: "< 140 mg/dL", note: "140–199 mg/dL: Impaired glucose tolerance\n≥ 200 mg/dL + symptoms (polyuria, polydipsia): Diagnostic for Diabetes\nPostprandial target at 2h: < 140 mg/dL (non-diabetic); < 180 mg/dL (diabetic)" },
            { name: "HbA1C — Non-Diabetic", range: "< 5.7%", note: "Reflects average blood glucose over ~3 months (RBC lifespan).\nFalsely LOW: Hemolytic anemia, blood transfusions, sickle cell\nFalsely HIGH: Iron deficiency anemia, CKD\n5.7–6.4%: Pre-diabetes / ≥ 6.5%: Diabetes" },
            { name: "HbA1C — Pre-Diabetic", range: "5.7%–6.4%", note: "Increased risk of progressing to T2DM.\nIntervention: Lifestyle modification, weight loss, metformin (in high-risk patients)" },
            { name: "HbA1C — Diabetic", range: "≥ 6.5% (diagnostic)", note: "ADA treatment target: < 7% (general)\n< 6.5% for: Young, newly diagnosed patients without hypoglycemia risk\n< 8% acceptable: Elderly, severe hypoglycemia risk, limited life expectancy\nEach 1% ↓ in HbA1C reduces microvascular complications by ~35%" }
        ]
    },
    {
        icon: "🫀", category: "Cardiac Markers", subtitle: "Ischemia, Heart Failure & Clots",
        catNote: "Serial troponins are mandatory for ACS evaluation. A rise-and-fall pattern is diagnostic of MI.",
        tests: [
            { name: "High-Sensitivity Troponin I or T", range: "< 14–34 ng/L (lab-specific)", note: "RULE IN: > 52 ng/L at 0h OR rise ≥ 6 ng/L at 1h = ACS\nRULE OUT: < threshold at 0h + 1h AND stable symptoms = ACS excluded\nElevated in: MI, myocarditis, PE, HF, sepsis, renal failure, cardiac contusion\nDetectable within 2–3h of ischemia, peaks 12–24h" },
            { name: "CK-MB (Creatine Kinase — MB)", range: "< 5 ng/mL (< 5% of total CK)", note: "Useful for re-infarction after STEMI (new CK-MB rise after initial fall)\nPeaks 12–24h, normalizes in 48–72h (earlier than troponin — useful for timing)\nLargely replaced by hsTn for initial ACS diagnosis" },
            { name: "Total CK (Creatine Kinase)", range: "24–204 U/L", note: "↑ CK: MI, rhabdomyolysis, strenuous exercise, IM injection, myositis\nCK > 1,000 U/L: Significant muscle injury\nCK > 5,000 U/L: Rhabdomyolysis → risk of AKI — aggressive IV fluids" },
            { name: "BNP (B-type Natriuretic Peptide)", range: "< 100 pg/mL", note: "Released from ventricles in response to wall stress/volume overload.\n< 100 pg/mL: Heart failure unlikely\n100–400 pg/mL: Intermediate — evaluate clinically\n> 400 pg/mL: Heart failure likely\nAlso elevated in: PE, renal failure, sepsis, elderly patients" },
            { name: "NT-proBNP", range: "< 300 pg/mL", note: "Age-adjusted thresholds for HF diagnosis:\n< 50 yrs: ≥ 450 pg/mL\n50–75 yrs: ≥ 900 pg/mL\n> 75 yrs: ≥ 1,800 pg/mL\nStronger prognostic marker than BNP in chronic HF" },
            { name: "D-Dimer", range: "< 500 ng/mL (< 0.5 mg/L)", note: "High SENSITIVITY, low SPECIFICITY for VTE (PE/DVT).\nNegative D-dimer + low pre-test probability = safely RULES OUT PE/DVT\nPositive D-dimer: Cannot confirm PE/DVT — proceed to imaging\nAge-adjusted cutoff (> 50 yrs): age × 10 ng/mL\nElevated in: Sepsis, cancer, surgery, pregnancy, DIC, liver disease" },
            { name: "Lactate", range: "0.5–2.0 mmol/L", note: "Reflects anaerobic glycolysis / tissue hypoperfusion.\n2–4 mmol/L: Elevated — optimize perfusion\n> 4 mmol/L: Severe tissue ischemia / lactic acidosis — look for shock\nType A: Inadequate O2 delivery (sepsis, shock)\nType B: Normal perfusion (liver failure, metformin, cyanide, thiamine def., malignancy)\nSerial lactate clearance > 10%/hr indicates response to resuscitation" }
        ]
    },
    {
        icon: "🩹", category: "Coagulation Studies", subtitle: "COAGs — Bleeding & Clotting",
        catNote: "⚠️ Higher values = longer clotting time = ↑ bleeding risk!\nExtrinsic pathway (PT): Factors VII, X, V, II, I\nIntrinsic pathway (aPTT): Factors XII, XI, IX, VIII, X, V, II, I",
        tests: [
            { name: "PT (Prothrombin Time)", range: "11–13.5 seconds", note: "Evaluates extrinsic + common pathway.\n↑ PT: Warfarin, liver disease, Vitamin K deficiency, DIC\nPT > 20s (not on anticoagulation): Significant hepatic dysfunction" },
            { name: "INR (International Normalized Ratio)", range: "0.8–1.1 (non-anticoagulated)", note: "Standardized PT ratio.\nWarfarin for DVT/PE/A-Fib: Target 2.0–3.0\nMechanical heart valves (mitral): Target 2.5–3.5\nINR > 4.0: High bleeding risk\nINR > 5.0 + active bleeding: Reverse with Vitamin K ± 4-Factor PCC" },
            { name: "aPTT (Activated Partial Thromboplastin Time)", range: "25–35 seconds", note: "Evaluates intrinsic + common pathway.\nTherapeutic on Unfractionated Heparin: 60–100 seconds (1.5–2.5× normal)\n↑ aPTT without anticoagulation: Hemophilia (VIII, IX), vWD, DIC, liver failure\nIsolated ↑ aPTT + no bleeding: Think lupus anticoagulant" },
            { name: "Fibrinogen", range: "200–400 mg/dL", note: "Final clotting substrate and acute phase reactant.\n↓ Fibrinogen: DIC, severe liver disease, massive transfusion\n< 150 mg/dL: Significant bleeding risk — consider cryoprecipitate\n↑ Fibrinogen: Inflammation, pregnancy (protective)" }
        ]
    },
    {
        icon: "❤️‍🩹", category: "Lipid Panel", subtitle: "Cardiovascular Risk Assessment",
        catNote: "Fasting lipids preferred (9–12h fast). Non-fasting LDL acceptable for screening.",
        tests: [
            { name: "Total Cholesterol", range: "< 200 mg/dL (desirable)", note: "200–239 mg/dL: Borderline high\n≥ 240 mg/dL: High\nMust be interpreted with LDL, HDL, and overall risk profile" },
            { name: "LDL (\"Bad\" Cholesterol)", range: "< 100 mg/dL (general)", note: "Known CVD, DM + risk factors: < 70 mg/dL\nVery high risk (recurrent events): < 55 mg/dL (ESC guideline)\nPost-ACS: < 40–55 mg/dL with high-intensity statin + ezetimibe ± PCSK9i\nHigher LDL → accelerated atherogenesis" },
            { name: "HDL (\"Good\" Cholesterol)", male: "> 40 mg/dL", female: "> 50 mg/dL", note: "Optimal: > 60 mg/dL (protective for both sexes)\n< 40 mg/dL: Major CVD risk factor\nHDL is a negative risk factor in the Framingham score" },
            { name: "Triglycerides (TG)", range: "< 150 mg/dL", note: "150–199: Borderline high\n200–499: High → lifestyle changes + consider fibrates/omega-3\n≥ 500: Very high → risk of acute pancreatitis\n> 1,000: Emergency — may need plasmapheresis\nHighly affected by recent diet, alcohol, uncontrolled DM" },
            { name: "Non-HDL Cholesterol", range: "< 130 mg/dL", note: "= Total Cholesterol − HDL\nBetter predictor than LDL alone — includes all atherogenic lipoproteins (LDL + VLDL + IDL)" }
        ]
    },
    {
        icon: "🔥", category: "Inflammatory Markers", subtitle: "Acute Phase Reactants & Infection",
        catNote: "CRP, ESR, and PCT are useful for detecting inflammation/infection but are not organ-specific.",
        tests: [
            { name: "CRP (C-Reactive Protein)", range: "< 1.0 mg/dL (< 10 mg/L)", note: "Rises within hours of infection/inflammation, peaks at 48h, falls rapidly with resolution.\n1–3 mg/dL: Low-grade inflammation\n3–10 mg/dL: Moderate (viral infection, minor injury)\n> 10 mg/dL: Significant bacterial infection or major tissue injury\n> 20 mg/dL: Severe systemic infection" },
            { name: "ESR (Erythrocyte Sedimentation Rate)", range: "Men: < 20 mm/hr / Women: < 30 mm/hr", note: "Approximate upper limit = age/2 (men) or (age+10)/2 (women)\n↑ ESR: Infection, inflammation, malignancy, autoimmune disease, anemia, pregnancy\nSpecifically useful for: Giant cell arteritis, polymyalgia rheumatica, multiple myeloma\nSlow to rise and fall — less useful for acute assessment" },
            { name: "Procalcitonin (PCT)", range: "< 0.1 ng/mL", note: "Most specific for BACTERIAL sepsis (viral infections minimally elevate PCT)\n0.1–0.25 ng/mL: Low risk\n0.25–0.5 ng/mL: Possible bacterial infection\n0.5–2.0 ng/mL: Probable bacterial infection\n> 2.0 ng/mL: Likely sepsis\n> 10 ng/mL: Severe sepsis/septic shock\nKey use: Antibiotic stewardship (guide discontinuation in pneumonia/sepsis)" },
            { name: "Ferritin", range: "Men: 30–300 ng/mL / Women: 12–150 ng/mL", note: "Iron storage protein + acute phase reactant (falsely elevated in inflammation).\n< 12 ng/mL: Iron deficiency anemia (most specific)\n12–30 ng/mL: Possible iron depletion\n> 500: Significant inflammation, liver disease, malignancy, MAS/HLH" }
        ]
    },
    {
        icon: "🧲", category: "Iron Studies", subtitle: "Anemia Evaluation",
        catNote: "Interpret as a panel. Ferritin alone misleads in inflammatory states — check TIBC and transferrin saturation.",
        tests: [
            { name: "Serum Iron", range: "60–170 mcg/dL", note: "↓ Serum Iron: Iron deficiency, anemia of chronic disease, acute inflammation\n↑ Serum Iron: Iron overload, hemochromatosis, hemolysis\nDiurnal variation: Highest in AM — draw fasting morning sample" },
            { name: "TIBC (Total Iron Binding Capacity)", range: "250–370 mcg/dL", note: "Reflects transferrin capacity to bind iron.\n↑ TIBC: Iron deficiency (body makes more transferrin)\n↓ TIBC: Iron overload, malnutrition, liver disease, anemia of chronic disease" },
            { name: "Transferrin Saturation (TSAT)", range: "20%–50%", note: "TSAT = (Serum Iron ÷ TIBC) × 100\n< 15%: Iron deficiency (absolute or functional)\n< 20% in CKD/HD: Functional iron deficiency\n> 50%: Iron overload (hemochromatosis), liver disease" }
        ]
    },
    {
        icon: "🦋", category: "Thyroid Function", subtitle: "Endocrine — Thyroid Axis",
        catNote: "TSH is the best initial test. Check free T4 and T3 only after an abnormal TSH or to assess severity.",
        tests: [
            { name: "TSH (Thyroid-Stimulating Hormone)", range: "0.4–4.0 mIU/L", note: "Most sensitive test for thyroid dysfunction.\n↓ TSH: Hyperthyroidism (Graves', toxic adenoma), central hypothyroidism (rare), steroids, dopamine\n↑ TSH: Hypothyroidism (Hashimoto's), subclinical hypothyroidism\nPregnancy: Target TSH 0.1–2.5 in 1st trimester" },
            { name: "Free T4 (Thyroxine)", range: "0.8–1.8 ng/dL", note: "Confirms thyroid status after abnormal TSH.\n↓ fT4 + ↑ TSH: Primary hypothyroidism\n↓ fT4 + ↓ TSH: Central (secondary) hypothyroidism\n↑ fT4 + ↓ TSH: Hyperthyroidism" },
            { name: "Free T3 (Triiodothyronine)", range: "2.3–4.1 pg/mL", note: "Active form (T4 → T3 in periphery).\nUseful when fT4 normal but hyperthyroidism suspected (T3 toxicosis)\nT3 drops in critical illness (sick euthyroid) — do NOT treat" },
            { name: "Anti-TPO Antibodies", range: "< 35 IU/mL", note: "Elevated in: Hashimoto's thyroiditis (most common cause of hypothyroidism)\nAlso in: Graves' disease, postpartum thyroiditis\n> 1,000 IU/mL: Strongly suggests Hashimoto's autoimmune thyroiditis" }
        ]
    },
    {
        icon: "🌞", category: "Vitamins & Nutritional", subtitle: "Micronutrient Deficiencies",
        catNote: "Test when clinically suspected or in at-risk groups (elderly, malabsorption, post-bariatric, vegans).",
        tests: [
            { name: "Vitamin B12 (Cobalamin)", range: "200–900 pg/mL", note: "< 200 pg/mL: Deficiency → megaloblastic anemia, subacute combined degeneration of spinal cord\nSymptoms: Peripheral neuropathy, ataxia, cognitive decline\n200–300 pg/mL: Borderline — check methylmalonic acid & homocysteine\nAt-risk: Vegans, elderly, metformin users, H2-blocker/PPI users, pernicious anemia" },
            { name: "Folate (Vitamin B9)", range: "2.7–17 ng/mL", note: "< 2.7 ng/mL: Folate deficiency → megaloblastic anemia (without neurological findings unlike B12)\nAt-risk: Pregnancy, hemolytic anemia, malabsorption (celiac), alcohol use, methotrexate\nSupplementary folate required 3 months BEFORE conception (neural tube defect prevention)" },
            { name: "25-OH Vitamin D", range: "30–100 ng/mL", note: "< 12 ng/mL: Deficiency (bone disease, myopathy, immune dysfunction)\n12–20 ng/mL: Insufficiency — supplement recommended\n20–30 ng/mL: Sub-optimal\n> 150 ng/mL: Toxicity — hypercalcemia risk" },
            { name: "Thiamine (Vitamin B1)", range: "70–180 nmol/L", note: "Deficiency causes:\n• Wet beriberi: High-output cardiac failure\n• Dry beriberi: Peripheral neuropathy\n• Wernicke-Korsakoff: Ophthalmoplegia, ataxia, confusion (alcoholism)\nGive IV thiamine BEFORE glucose in any altered/malnourished patient (prevents precipitating Wernicke's)" }
        ]
    },
    {
        icon: "🫧", category: "Urinalysis (UA)", subtitle: "Urine Microscopy & Chemistry",
        catNote: "Dipstick is a screening tool. Urine microscopy needed for definitive evaluation of casts and cells.",
        tests: [
            { name: "Urine pH", range: "4.5–8.0", note: "< 5.5: Acid urine (ketosis, high protein intake)\n> 7.5: Alkaline urine (UTI with urease-producing organisms — Proteus; vegetarian diet; RTA)" },
            { name: "Protein (Dipstick)", range: "Negative or Trace", note: "1+ (30 mg/dL): Mild proteinuria — check spot UPCR\n2+ (100 mg/dL): Moderate — nephropathy likely\n3–4+: Heavy proteinuria → nephrotic syndrome\nSpot UPCR > 3.5 mg/mg = nephrotic range" },
            { name: "Glucose (Dipstick)", range: "Negative", note: "Appears when serum glucose > 180 mg/dL (renal threshold)\nGlucosuria without hyperglycemia: Fanconi syndrome, SGLT2 inhibitor use, pregnancy" },
            { name: "Ketones (Dipstick)", range: "Negative", note: "Positive: DKA, starvation, alcoholic ketoacidosis, low-carb diet\nDetects acetoacetate, NOT beta-hydroxybutyrate (predominant in DKA)\nIn early DKA, dipstick may underestimate severity — use serum beta-HB" },
            { name: "Blood / Hematuria (Dipstick)", range: "Negative", note: "Positive: Hematuria, hemoglobinuria, myoglobinuria\nMicroscopic hematuria confirmed: > 3 RBC/HPF on 2 of 3 collections\nNew microscopic hematuria > 50 yrs: Urgent urology workup to exclude urothelial malignancy" },
            { name: "Nitrites & Leukocyte Esterase", range: "Negative", note: "Positive nitrites: Gram-negative bacteria (E. coli, Klebsiella convert nitrate → nitrite)\nPositive LE: WBCs present (pyuria > 5 WBC/HPF)\nBoth positive: High specificity for UTI\nFalse negative nitrites: Gram-positive organisms (Enterococcus, Staph saprophyticus)" },
            { name: "Urine Casts (Microscopy)", range: "Occasional hyaline casts (normal)", note: "RBC casts: Glomerulonephritis (IgA, post-strep, lupus nephritis)\nWBC casts: Pyelonephritis, interstitial nephritis\nGranular/Muddy brown casts: ATN (acute tubular necrosis — ischemia or toxins)\nFatty casts: Nephrotic syndrome\nHyaline casts: Normal in concentrated urine" }
        ]
    },
    {
        icon: "📊", category: "Other Key Parameters", subtitle: "Neuro, Systemic & Physical Assessment",
        catNote: null,
        tests: [
            { name: "Serum Osmolality", range: "275–295 mOsm/kg", note: "Formula: 2(Na) + BUN/2.8 + Glucose/18\nOsmol gap = Measured − Calculated (normal < 10 mOsm/kg)\n↑ Osmol gap > 10: Methanol, ethanol, ethylene glycol, mannitol, severe DKA\n↑ Osmolality: Dehydration, hyperglycemia, hypernatremia\n↓ Osmolality: Hyponatremia" },
            { name: "ICP (Intracranial Pressure)", range: "5–15 mmHg", note: "> 20 mmHg: Elevated ICP — requires immediate intervention\n> 25 mmHg: Herniation risk — Mannitol, 3% NaCl, hyperventilation, head elevation\nCPP (Cerebral Perfusion Pressure) = MAP − ICP; target CPP > 60 mmHg" },
            { name: "Glasgow Coma Scale (GCS)", range: "15 (Normal) — 3 (Deepest Coma)", note: "Eyes (4): Spontaneous, Voice, Pain, None\nVerbal (5): Oriented, Confused, Words, Sounds, None\nMotor (6): Commands, Localizes, Withdraws, Flexion, Extension, None\nGCS 13–15: Mild TBI / GCS 9–12: Moderate / GCS ≤ 8: Severe\nGCS ≤ 8 = Intubate (cannot protect airway)" },
            { name: "BMI (Body Mass Index)", range: "18.5–24.9 kg/m²", note: "< 18.5: Underweight\n18.5–24.9: Normal weight\n25–29.9: Overweight\n30–34.9: Obesity Class I\n35–39.9: Obesity Class II\n≥ 40: Obesity Class III (morbid obesity)" },
            { name: "Urine βhCG (Pregnancy Test)", range: "Negative (non-pregnant)", note: "Positive ~10 days post-conception.\n↑ Rapidly (doubles q48–72h): Normal intrauterine pregnancy\nPlateau or slow rise: Ectopic pregnancy, miscarriage — urgent workup\nAny reproductive-age female with abdominal/pelvic pain → βhCG first, always" }
        ]
    }
];