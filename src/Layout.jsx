// Layout.jsx — Nav, Ticker, Footer

const Icon = {
  Search: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  User: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  Cart: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M3 5h2l3 12h11l2-9H6"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>,
  Arrow: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  Plus: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Check: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="m5 12 5 5L20 7"/></svg>,
  Download: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M12 4v12m0 0-5-5m5 5 5-5M4 20h16"/></svg>,
  Inbox: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 12h5l1.5 2h5L16 12h5"/></svg>,
  Star: (p) => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 3.1 6.6 7.2.7-5.4 4.9 1.7 7-6.6-3.8-6.6 3.8 1.7-7L1.7 9.3l7.2-.7z"/></svg>,
  Play: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M6 4l14 8-14 8z"/></svg>,
  X: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 5l14 14M19 5L5 19"/></svg>,
  Sparkle: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z"/></svg>,
  Bag: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M5 8h14l-1.2 11.5a2 2 0 0 1-2 1.5H8.2a2 2 0 0 1-2-1.5L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>,
  Frame: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="4" y="3" width="16" height="18" rx="1"/><rect x="7" y="6" width="10" height="12"/></svg>,
  Menu: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
  Close: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M5 5l14 14M19 5L5 19"/></svg>,
};
window.Icon = Icon;

const Logo = ({ size = 40 }) => (
  <div className="nav-logo" style={{ gap: 0 }}>
    <span style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: Math.round(size * 0.48),
      letterSpacing: "-0.04em",
      color: "var(--text)",
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "baseline",
    }}>
      Drop<span style={{ color: "var(--accent)" }}>Print</span>
      <span style={{
        fontWeight: 500,
        fontSize: Math.round(size * 0.28),
        color: "var(--muted)",
        marginLeft: 5,
        letterSpacing: "0.06em",
      }}>STORE</span>
    </span>
  </div>
);
window.Logo = Logo;

const Ticker = ({ items }) => {
  const list = [...items, ...items, ...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {list.map((it, i) => <span key={i} className="ticker-item">{it}</span>)}
      </div>
    </div>
  );
};
window.Ticker = Ticker;

/* ─── Search Overlay ─────────────────────────────────────── */
const SearchOverlay = ({ onClose, navigate }) => {
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef(null);
  const posters = window.HM_DATA.posters;

  // Auto-focus al abrir
  React.useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 60);
    // Cerrar con Escape
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = q.trim().length === 0 ? [] :
    posters.filter(p =>
      [p.title, p.artist, p.genre].some(f =>
        f.toLowerCase().includes(q.toLowerCase())
      )
    );

  const handleSelect = (p) => {
    navigate("product", p.id);
    onClose();
  };

  // Artistas sugeridos cuando no hay query
  const suggested = posters.slice(0, 6);

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        {/* Input */}
        <div className="search-input-wrap">
          <Icon.Search style={{ color: "var(--muted)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Buscar artista, álbum, género…"
            value={q}
            onChange={e => setQ(e.target.value)}
            autoComplete="off"
          />
          {q && (
            <button className="search-clear" onClick={() => { setQ(""); inputRef.current?.focus(); }}>
              <Icon.X />
            </button>
          )}
          <button className="search-esc-btn" onClick={onClose}>ESC</button>
        </div>

        {/* Resultados */}
        <div className="search-body">
          {q.trim() === "" ? (
            <>
              <div className="search-section-label">Populares</div>
              <div className="search-suggestions">
                {["Bad Bunny", "Rosalía", "Karol G", "The Weeknd", "Quevedo", "Anuel AA"].map(a => (
                  <button key={a} className="search-tag"
                    onClick={() => setQ(a)}>
                    <Icon.Search style={{ width: 12, height: 12 }} /> {a}
                  </button>
                ))}
              </div>
              <div className="search-section-label" style={{ marginTop: 24 }}>Destacados</div>
              <div className="search-results">
                {suggested.map(p => (
                  <button key={p.id} className="search-result-item" onClick={() => handleSelect(p)}>
                    <div className="search-result-thumb">
                      <Poster poster={p} size={48} />
                    </div>
                    <div className="search-result-info">
                      <div className="search-result-title">{p.title}</div>
                      <div className="search-result-sub">{p.artist} · {p.genre}</div>
                    </div>
                    <div className="search-result-price">${p.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </>
          ) : results.length > 0 ? (
            <>
              <div className="search-section-label">{results.length} resultado{results.length !== 1 ? "s" : ""} para "{q}"</div>
              <div className="search-results">
                {results.map(p => (
                  <button key={p.id} className="search-result-item" onClick={() => handleSelect(p)}>
                    <div className="search-result-thumb">
                      <Poster poster={p} size={48} />
                    </div>
                    <div className="search-result-info">
                      <div className="search-result-title">{p.title}</div>
                      <div className="search-result-sub">{p.artist} · {p.genre} · {p.year}</div>
                    </div>
                    <div className="search-result-price">${p.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="search-empty">
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Sin resultados para "{q}"</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>Prueba con otro artista o álbum</div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="search-footer">
          <span><kbd>↵</kbd> seleccionar</span>
          <span><kbd>ESC</kbd> cerrar</span>
        </div>
      </div>
    </div>
  );
};
window.SearchOverlay = SearchOverlay;

const Nav = ({ route, navigate, lang, setLang, cartCount, t, onSearchOpen }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  React.useEffect(() => { setMenuOpen(false); }, [route]);

  // Bloquear scroll cuando el menú está abierto
  React.useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);

  const links = [
    { id: "home", label: t.nav.home, route: "home" },
    { id: "catalog", label: t.nav.catalog, route: "catalog" },
    { id: "artists", label: t.nav.artists, route: "artists" },
    { id: "how", label: t.nav.how, route: "home", hash: "#how" },
    { id: "faq", label: t.nav.faq, route: "home", hash: "#faq" },
  ];

  const handleLink = (l) => {
    navigate(l.route);
    if (l.hash) setTimeout(() => document.querySelector(l.hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    setMenuOpen(false);
  };

  return (
    <>
      <div style={{
        background: "repeating-linear-gradient(90deg,#0e0e0e 0,#0e0e0e 24px,#161616 24px,#161616 48px)",
        borderBottom: "1px solid rgba(245,158,11,0.45)",
        color: "#f59e0b",
        textAlign: "center",
        padding: "5px 16px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.22em",
        fontFamily: "'JetBrains Mono', monospace",
        position: "sticky",
        top: 0,
        zIndex: 101,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
      }}>
        <span style={{ opacity: 0.7 }}>▲</span>
        DEMO — PLANTILLA DE EJEMPLO — NO ES UNA TIENDA REAL
        <span style={{ opacity: 0.7 }}>▲</span>
      </div>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-row">
          {/* Logo */}
          <div onClick={() => navigate("home")} style={{ cursor: "pointer" }}>
            <Logo />
          </div>

          {/* Desktop links */}
          <div className="nav-links">
            {links.map((l) => (
              <span
                key={l.id}
                className={`nav-link ${route === l.route && !l.hash ? "active" : ""}`}
                onClick={() => handleLink(l)}
              >{l.label}</span>
            ))}
          </div>

          {/* Desktop tools */}
          <div className="nav-tools">
            <div className="lang-toggle">
              <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            </div>
            <button className="icon-btn nav-search-btn" aria-label="Search" onClick={onSearchOpen}><Icon.Search /></button>
            <button className="icon-btn nav-account-btn" aria-label="Account"><Icon.User /></button>
            <button className="icon-btn" aria-label="Cart" onClick={() => navigate("cart")}>
              <Icon.Bag />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className="btn btn-primary nav-cta-btn" onClick={() => navigate("catalog")} style={{ padding: "10px 18px", fontSize: 13 }}>
              {t.nav.cta} <Icon.Arrow />
            </button>
            {/* Hamburger — solo mobile */}
            <button
              className="icon-btn hamburger-btn"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <Icon.Close /> : <Icon.Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div className={`mobile-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <Logo />
          <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Cerrar">
            <Icon.Close />
          </button>
        </div>

        <nav className="mobile-nav-links">
          {links.map((l) => (
            <button
              key={l.id}
              className={`mobile-nav-link ${route === l.route && !l.hash ? "active" : ""}`}
              onClick={() => handleLink(l)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="mobile-drawer-footer">
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 22px" }}
            onClick={() => { navigate("catalog"); setMenuOpen(false); }}>
            {t.nav.cta} <Icon.Arrow />
          </button>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <div className="lang-toggle">
              <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            </div>
          </div>
          <button className="icon-btn" aria-label="Cart" onClick={() => { navigate("cart"); setMenuOpen(false); }}
            style={{ width: "100%", borderRadius: 12, height: 48, marginTop: 8, border: "1px solid var(--border)" }}>
            <Icon.Bag />
            <span style={{ marginLeft: 8, fontSize: 14 }}>Carrito {cartCount > 0 && `(${cartCount})`}</span>
            {cartCount > 0 && <span className="cart-count" style={{ position: "static", marginLeft: "auto" }}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </>
  );
};
window.Nav = Nav;

const Footer = ({ t }) => (
  <footer className="foot">
    <div className="container">
      <div className="foot-grid">
        <div>
          <Logo />
          <p className="foot-tag">{t.foot.tagline}</p>
        </div>
        <div className="foot-col">
          <h4>{t.foot.shop}</h4>
          {t.foot.shopLinks.map((l, i) => <a key={i} href="#">{l}</a>)}
        </div>
        <div className="foot-col">
          <h4>{t.foot.help}</h4>
          {t.foot.helpLinks.map((l, i) => <a key={i} href="#">{l}</a>)}
        </div>
        <div className="foot-col">
          <h4>{t.foot.legal}</h4>
          {t.foot.legalLinks.map((l, i) => <a key={i} href="#">{l}</a>)}
        </div>
      </div>
      <div className="foot-bottom">
        <span>{t.foot.copy}</span>
        <div className="foot-socials">
          {["IG", "TT", "X", "YT"].map((s) => (
            <button key={s} className="icon-btn" style={{ width: 36, height: 36, fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
window.Footer = Footer;
