const LATEST_NEWS_INDEX = 7;

const NEWS_HTML = `
<div style="font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column; gap: 24px; padding: 5px;">

    <div style="border-left: 2px solid #10b981; padding-left: 12px; position: relative;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="font-size: 0.7rem; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.05em;">22 March 2026</span>
            <span style="background: #ecfdf5; color: #059669; font-size: 0.6rem; padding: 1px 6px; border-radius: 12px; font-weight: 800; border: 1px solid #10b981;">NEW</span>
        </div>
        <h3 style="margin: 0 0 8px 0; font-size: 1.1rem; color: var(--primary-dark); font-weight: 800;">AI DDx Search & Quiz Mode 馃</h3>
        <p style="margin: 0 0 12px 0; font-size: 0.95rem; color: var(--text-main); line-height: 1.4;">
            Get instant AI-generated differentials or challenge yourself with <strong>Incremental Mode</strong> board scenarios 馃敟. 
        </p>
        <div style="font-size: 0.8rem; background: #f0fdf4; padding: 8px 12px; border-radius: 10px; border: 1px dashed #10b981; color: #065f46; font-weight: 600; display: inline-block;">
            馃攽 Add your free <strong>Groq API key</strong> to activate.
        </div>
    </div>

    <div style="border-left: 2px solid var(--divider); padding-left: 12px;">
        <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">16 March 2026</div>
        <h3 style="margin: 0 0 6px 0; font-size: 1.05rem; color: var(--text-main); font-weight: 700;">Smart Filters & Global Search 馃攳</h3>
        <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted); line-height: 1.4;">
            Isolate abnormal vitals with <strong>Filter Chips</strong> or find patients instantly by name. Tucked behind the 馃攷 button.
        </p>
    </div>

    <div style="border-left: 2px solid var(--divider); padding-left: 12px;">
        <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">15 March 2026</div>
        <h3 style="margin: 0 0 6px 0; font-size: 1.05rem; color: var(--text-main); font-weight: 700;">Tutorials & Quick Actions 鉁�</h3>
        <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted); line-height: 1.4;">
            Navigate easily with our <strong>Starter Tutorial</strong> and the floating 鉁忥笍 button for essential actions.
        </p>
    </div>

    <div style="border-left: 2px solid var(--divider); padding-left: 12px;">
        <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">14 March 2026</div>
        <h3 style="margin: 0 0 6px 0; font-size: 1.05rem; color: var(--text-main); font-weight: 700;">New Tools Toolbar 馃洜锔�</h3>
        <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted); line-height: 1.4;">
            Access Medscape and Labs in a <strong>Scrollable Toolbar</strong> 馃殌. Customize layout or hide text in <strong>Settings 鈿欙笍</strong>.
        </p>
    </div>

    <div style="border-left: 2px solid var(--divider); padding-left: 12px;">
        <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">12 March 2026</div>
        <h3 style="margin: 0 0 6px 0; font-size: 1.05rem; color: var(--text-main); font-weight: 700;">Trends & Fixes 馃搱</h3>
        <p style="margin: 0 0 14px 0; font-size: 0.95rem; color: var(--text-muted); line-height: 1.4;">
            Vitals Trend lines in the numpad 猬嗭笍猬囷笍. Smoother BP inputs with bug fixes 馃悰.
        </p>
        <div style="font-size: 0.8rem; background: #ecfdf5; padding: 8px 12px; border-radius: 8px; border: 1px solid #10b981; color: #065f46; font-weight: 700; text-align: center; box-shadow: 0 2px 4px rgba(16,185,129,0.1);">
            馃檹 Special thanks to Dada, Bolbol & Doola!
        </div>
    </div>

</div>
`;
