// Main app — header, group sections, book cards.

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function Header({ dark, onToggleDark }) {
  const groupCount = window.BOOK_GROUPS.length;

  return (
    <header className="site-header">
      <div className="site-header-row">
        <div className="brand">
          <div className="brand-mark" aria-hidden>
            <span className="brand-mark-glyph">∗</span>
          </div>
          <div className="brand-text">
            <div className="brand-name">성장하는 개발자를 위한 가이드북</div>
            <div className="brand-sub">A Reading List for Software Developers</div>
          </div>
        </div>
        <div className="site-header-actions">
          <span className="site-meta">2026.05 Edition</span>
          <button className="theme-btn" onClick={onToggleDark} aria-label="Toggle theme">
            {dark ? <SunIcon /> : <MoonIcon />}
            <span>{dark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
      <div className="site-header-intro">
        <p>
          지난 1년간 수고 많았어요.<br></br>좋은 책을 만나 앞으로 더 성장하는 개발자가 되길 바랍니다.
        </p>
        <div className="site-header-nav">
          {window.BOOK_GROUPS.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="nav-pill">
              <span className="nav-pill-num">{g.number}</span>
              <span>{g.name}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function BookCard({ book, idx }) {
  return (
    <article className="card">
      <BookCover book={book} idx={idx} />
      <div className="card-body">
        <div className="card-publisher">{book.publisher}</div>
        <h3 className="card-title">{book.title}</h3>
        {book.desc ? <p className="card-desc">{book.desc}</p> : null}
        <a className="card-link" href={book.url} target="_blank" rel="noreferrer">
          <span>알라딘에서 보기</span>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 9L9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function GroupSection({ group }) {
  return (
    <section className="group" id={group.id}>
      <div className="group-head">
        <div className="group-num">{group.number}</div>
        <div className="group-titles">
          <h2 className="group-name">{group.name}</h2>
          <div className="group-meta">
            <span className="group-count">{group.books.length}권</span>
            <span className="group-dot">·</span>
            <span className="group-tag">Recommended Reading</span>
          </div>
        </div>
        <p className="group-desc">{group.description}</p>
      </div>
      <div className="group-rule" />
      <div className="cards">
        {group.books.map((b, i) => (
          <BookCard key={b.title} book={b} idx={i} />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const totalBooks = window.BOOK_GROUPS.reduce((acc, g) => acc + g.books.length, 0);
  return (
    <footer className="site-footer">
      <div className="footer-row">
        <div className="footer-cell">
          <div className="footer-label">Colophon</div>
          <div className="footer-text">
            books.csv의 실제 목록을 기준으로 구성했고, 로컬 images 폴더의 표지를 우선 사용합니다.
            카드 링크는 각 도서의 알라딘 상세 페이지로 연결됩니다.
          </div>
        </div>
        <div className="footer-cell">
          <div className="footer-label">Volume</div>
          <div className="footer-text">
            <span className="footer-big">{totalBooks}</span>
            <span className="footer-small">권 · {window.BOOK_GROUPS.length}개 그룹</span>
          </div>
        </div>
        <div className="footer-cell">
          <div className="footer-label">Edition</div>
          <div className="footer-text footer-mono">
            2026 / SPRING<br />
            VOL. 01 · NO. 01
          </div>
        </div>
      </div>
    </footer>
  );
}

const ACCENT_OPTIONS = {
  terracotta: { name: "Terracotta", light: "#c05621", dark: "#e07a3e" },
  forest: { name: "Forest", light: "#3a6b3e", dark: "#6fa672" },
  navy: { name: "Indigo", light: "#2a4a8a", dark: "#7a96d4" },
  ink: { name: "Ink", light: "#1a1814", dark: "#e8e0cc" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "accent": "terracotta",
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.dataset.theme = t.dark ? "dark" : "light";
    document.documentElement.dataset.density = t.density;
    const acc = ACCENT_OPTIONS[t.accent] || ACCENT_OPTIONS.terracotta;
    document.documentElement.style.setProperty("--accent", t.dark ? acc.dark : acc.light);
  }, [t.dark, t.accent, t.density]);

  return (
    <>
      <div className="page">
        <Header dark={t.dark} onToggleDark={() => setTweak("dark", !t.dark)} />
        <main className="groups">
          {window.BOOK_GROUPS.map((g) => (
            <GroupSection key={g.id} group={g} />
          ))}
        </main>
      </div>
      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakToggle
          label="Dark mode"
          value={t.dark}
          onChange={(v) => setTweak("dark", v)}
        />
        <TweakColor
          label="Accent"
          value={ACCENT_OPTIONS[t.accent] ? (t.dark ? ACCENT_OPTIONS[t.accent].dark : ACCENT_OPTIONS[t.accent].light) : "#c05621"}
          options={Object.keys(ACCENT_OPTIONS).map(k => t.dark ? ACCENT_OPTIONS[k].dark : ACCENT_OPTIONS[k].light)}
          onChange={(v) => {
            const found = Object.entries(ACCENT_OPTIONS).find(([k, a]) => (t.dark ? a.dark : a.light) === v);
            if (found) setTweak("accent", found[0]);
          }}
        />
        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
