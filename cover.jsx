// Stripe-pattern placeholder cover.
// Each cover is deterministic from the book's title — same title always gets the
// same stripe pattern, so the page feels designed rather than random.

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickFrom(arr, n) {
  return arr[n % arr.length];
}

// Two palettes — paper/ink hues for light, kept consistent across modes.
// We pull tones from the page theme so covers feel like part of the editorial system.
const STRIPE_PALETTES = [
  { paper: "#e8dfc9", ink: "#1a1814", accent: "#c05621" },
  { paper: "#d6cdb6", ink: "#26221b", accent: "#7a5a2e" },
  { paper: "#c9b8a0", ink: "#1f1c16", accent: "#3a2e22" },
  { paper: "#e3d6b5", ink: "#22201a", accent: "#8a3a1a" },
  { paper: "#cdc0a4", ink: "#1a1814", accent: "#5a4a2a" },
  { paper: "#dccdb0", ink: "#2a251c", accent: "#a04a1e" },
  { paper: "#bfb098", ink: "#1c1a14", accent: "#3a2e1c" },
  { paper: "#e6dac0", ink: "#1f1c16", accent: "#6a3e1e" },
];

const STRIPE_ANGLES = [0, 90, 22, -22, 45, -45, 0, 90];
const STRIPE_WIDTHS = [4, 6, 8, 10, 14, 20, 3, 12];

function StripeCover({ title, idx }) {
  const h = hashStr(title);
  const pal = pickFrom(STRIPE_PALETTES, h);
  const angle = pickFrom(STRIPE_ANGLES, h >>> 3);
  const width = pickFrom(STRIPE_WIDTHS, h >>> 7);
  const variant = (h >>> 11) % 4; // 4 layout variants

  // Stripe pattern via repeating-linear-gradient
  const stripeBg = `repeating-linear-gradient(${angle}deg, ${pal.paper} 0 ${width}px, ${pal.ink} ${width}px ${width + 1.2}px)`;

  // Book "id" string for monospace label — e.g. BK-014
  const code = `BK-${String((h % 900) + 100)}`;

  return (
    <div className="cover" data-variant={variant}>
      <div className="cover-paper" style={{ background: stripeBg }} />
      <div className="cover-overlay">
        {variant === 0 && (
          <div className="cover-band cover-band-mid" style={{ background: pal.ink, color: pal.paper }}>
            <span className="cover-code" style={{ color: pal.accent }}>{code}</span>
            <span className="cover-title">{title}</span>
          </div>
        )}
        {variant === 1 && (
          <>
            <div className="cover-band cover-band-top" style={{ background: pal.ink, color: pal.paper }}>
              <span className="cover-code" style={{ color: pal.accent }}>{code}</span>
            </div>
            <div className="cover-band cover-band-bot" style={{ background: pal.paper, color: pal.ink, borderTop: `1px solid ${pal.ink}` }}>
              <span className="cover-title">{title}</span>
            </div>
          </>
        )}
        {variant === 2 && (
          <div className="cover-band cover-band-left" style={{ background: pal.ink, color: pal.paper }}>
            <span className="cover-title cover-title-vert">{title}</span>
            <span className="cover-code cover-code-vert" style={{ color: pal.accent }}>{code}</span>
          </div>
        )}
        {variant === 3 && (
          <>
            <div className="cover-dot" style={{ background: pal.accent }} />
            <div className="cover-band cover-band-bot" style={{ background: pal.ink, color: pal.paper }}>
              <span className="cover-code" style={{ color: pal.accent }}>{code}</span>
              <span className="cover-title">{title}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BookCover({ book, idx }) {
  const [failed, setFailed] = React.useState(false);

  if (book.image && !failed) {
    return (
      <div className="cover">
        <img
          className="cover-image"
          src={encodeURI(book.image)}
          alt={`${book.title} 표지`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return <StripeCover title={book.title} idx={idx} />;
}

Object.assign(window, { StripeCover, BookCover });
