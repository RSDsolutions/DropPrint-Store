// App.jsx — root: routing, tweaks, state
const { useState, useEffect, useMemo } = React;

/* ─── Splash Screen ─────────────────────────────────────── */
const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = React.useState("in"); // "in" | "hold" | "out"

  React.useEffect(() => {
    // Entrada rápida → hold → fade out
    const t1 = setTimeout(() => setPhase("out"), 1500);
    const t2 = setTimeout(() => onDone(), 1900); // llama onDone cuando termina fade
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className={`splash ${phase === "out" ? "splash-out" : ""}`}>
      {/* Glows de fondo */}
      <div className="splash-glow splash-glow-1" />
      <div className="splash-glow splash-glow-2" />

      {/* Contenido central */}
      <div className="splash-content">
        <div className="splash-logo">
          <img src="assets/hype-logo.png" alt="Hype Music Prints" />
        </div>
        <div className="splash-bar-wrap">
          <div className="splash-bar" />
        </div>
        <div className="splash-label">Cargando experiencia…</div>
      </div>

      {/* Partículas flotantes decorativas */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`splash-dot splash-dot-${i + 1}`} />
      ))}
    </div>
  );
};


const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "collage",
  "lang": "es",
  "compact": false,
  "accent": "#d90d2b"
}/*EDITMODE-END*/;

function useHashRoute() {
  const parse = () => {
    const h = window.location.hash.replace(/^#\/?/, "");
    if (!h) return { route: "home", arg: null };
    const [route, arg] = h.split("/");
    return { route: route || "home", arg: arg || null };
  };
  const [r, setR] = useState(parse());
  useEffect(() => {
    const onHash = () => { setR(parse()); window.scrollTo({ top: 0, behavior: "instant" }); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (route, arg) => {
    if (route === "home") window.location.hash = "/";
    else if (arg) window.location.hash = `/${route}/${arg}`;
    else window.location.hash = `/${route}`;
  };
  return [r, navigate];
}

const Landing = ({ t, navigate, onAdd, heroVariant }) => (
  <>
    <Hero variant={heroVariant} t={t} navigate={navigate} />
    <LandingSections.Stats t={t} />
    <LandingSections.BestSellers t={t} navigate={navigate} onAdd={onAdd} />
    <LandingSections.Artists t={t} navigate={navigate} />
    <LandingSections.HowItWorks t={t} />
    <LandingSections.CustomCTA t={t} navigate={navigate} />
    <LandingSections.NewArrivals t={t} navigate={navigate} onAdd={onAdd} />
    <LandingSections.Testimonials t={t} />
    <LandingSections.FAQ t={t} lang={t === window.HM_I18N.es ? "es" : "en"} />
    <LandingSections.Newsletter t={t} />
  </>
);

const ArtistsPage = ({ t, navigate }) => {
  const list = window.HM_DATA.artists;
  return (
    <section style={{ padding: "60px 0 100px" }}>
      <div className="container">
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <span className="eyebrow center" style={{ justifyContent: "center" }}><span className="dot"></span>{t.artists.eyebrow}</span>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-0.04em", margin: "16px 0 14px", fontWeight: 600, lineHeight: 1 }}>
            {t.artists.title}
          </h1>
          <p style={{ color: "var(--text-2)", maxWidth: 480, margin: "0 auto" }}>{t.artists.sub}</p>
        </div>
        <div className="artist-grid">
          {[...list, ...list].map((a, i) => <ArtistCard key={i} a={a} />)}
        </div>
      </div>
    </section>
  );
};

const AddedToast = ({ poster }) => poster ? (
  <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 100, padding: 14, paddingRight: 22, borderRadius: 14, background: "rgba(20,20,22,0.95)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", display: "flex", gap: 14, alignItems: "center", animation: "toastIn .35s cubic-bezier(.19,1,.22,1)" }}>
    <div style={{ width: 50, aspectRatio: "5/7" }}><Poster poster={poster} size={50} /></div>
    <div>
      <div style={{ fontSize: 11, color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>AÑADIDO AL CARRITO</div>
      <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{poster.title}</div>
    </div>
  </div>
) : null;

const App = () => {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [{ route, arg }, navigate] = useHashRoute();
  const [splash, setSplash] = React.useState(true);
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hype-cart") || "[]"); } catch { return []; }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => { localStorage.setItem("hype-cart", JSON.stringify(cart)); }, [cart]);

  // Sync language tweak with state
  const lang = tweaks.lang || "es";
  const setLang = (l) => setTweak("lang", l);
  const t = window.HM_I18N[lang];

  const addToCart = (poster, qty = 1) => {
    setCart((c) => {
      const existing = c.find((x) => x.id === poster.id);
      if (existing) return c.map((x) => x.id === poster.id ? { ...x, qty: x.qty + qty } : x);
      return [...c, { id: poster.id, qty }];
    });
    setToast(poster);
    setTimeout(() => setToast(null), 2400);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("in"));
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [route]);

  // Apply accent override
  useEffect(() => {
    if (tweaks.accent) document.documentElement.style.setProperty("--accent", tweaks.accent);
  }, [tweaks.accent]);

  let page;
  switch (route) {
    case "catalog": page = <Pages.CatalogPage t={t} navigate={navigate} onAdd={addToCart} />; break;
    case "product": page = <Pages.ProductPage id={arg} t={t} navigate={navigate} onAdd={addToCart} />; break;
    case "cart": page = <Pages.CartPage t={t} navigate={navigate} cart={cart} setCart={setCart} />; break;
    case "checkout": page = <Pages.CheckoutPage t={t} navigate={navigate} cart={cart} setCart={setCart} />; break;
    case "artists": page = <ArtistsPage t={t} navigate={navigate} />; break;
    case "home":
    default:
      page = <Landing t={t} navigate={navigate} onAdd={addToCart} heroVariant={tweaks.heroVariant} />;
  }

  return (
    <>
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <Ticker items={t.ticker} />
      <Nav route={route} navigate={navigate} lang={lang} setLang={setLang} cartCount={cartCount} t={t} />
      <main>{page}</main>
      <Footer t={t} />
      <AddedToast poster={toast} />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Hero">
          <window.TweakSelect label="Variant" value={tweaks.heroVariant} onChange={(v) => setTweak("heroVariant", v)}
            options={[
              { value: "collage", label: "Floating collage" },
              { value: "editorial", label: "Editorial single" },
              { value: "marquee", label: "Marquee ticker" },
              { value: "search", label: "Search-first" },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="Brand">
          <window.TweakColor label="Accent" value={tweaks.accent} onChange={(v) => setTweak("accent", v)}
            options={["#d90d2b", "#e62a3f", "#ff5c1f", "#22c55e", "#3b82f6", "#a855f7"]}
          />
          <window.TweakRadio label="Language" value={tweaks.lang} onChange={(v) => setTweak("lang", v)}
            options={[{ value: "es", label: "ES" }, { value: "en", label: "EN" }]}
          />
        </window.TweakSection>
        <window.TweakSection title="Navigate">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            <window.TweakButton onClick={() => navigate("home")}>Home</window.TweakButton>
            <window.TweakButton onClick={() => navigate("catalog")}>Catalog</window.TweakButton>
            <window.TweakButton onClick={() => navigate("product", "un-verano-sin-ti")}>Product</window.TweakButton>
            <window.TweakButton onClick={() => navigate("cart")}>Cart</window.TweakButton>
          </div>
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
