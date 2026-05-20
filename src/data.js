// DropPrint Store — mock catalog data (plantilla)
// Posters are rendered as styled SVG/div compositions, not external images.

window.HM_DATA = (function () {
  const posters = [
    { id: "un-verano-sin-ti", title: "Un Verano Sin Ti", artist: "Bad Bunny", year: 2022, price: 9.99, was: 14.99, rating: 5.0, reviews: 412, genre: "Reggaetón", style: "tropical", palette: ["#ffd166", "#ef476f", "#06d6a0", "#1d3557"], badge: "TOP" },
    { id: "easy-money-baby", title: "Easy Money Baby", artist: "Myke Towers", year: 2020, price: 9.99, was: 14.99, rating: 4.9, reviews: 220, genre: "Rap Latino", style: "noir", palette: ["#0b132b", "#1c2541", "#3a506b", "#5bc0be"], badge: "BEST" },
    { id: "real-hasta-la-muerte", title: "Real Hasta La Muerte", artist: "Anuel AA", year: 2018, price: 9.99, was: 14.99, rating: 4.8, reviews: 187, genre: "Trap", style: "shadow", palette: ["#0a0a0a", "#222", "#d90d2b", "#edf2f4"], badge: null },
    { id: "ameri", title: "Ameri", artist: "Duki", year: 2024, price: 9.99, was: 14.99, rating: 5.0, reviews: 96, genre: "Trap", style: "abstract", palette: ["#2d3047", "#93b7be", "#e0ca3c", "#a799b7"], badge: null },
    { id: "buenas-noches", title: "Buenas Noches", artist: "Quevedo", year: 2024, price: 9.99, was: 14.99, rating: 5.0, reviews: 142, genre: "Reggaetón", style: "portrait", palette: ["#1a1a1a", "#3d348b", "#7678ed", "#f7b801"], badge: "NEW" },
    { id: "lux", title: "LUX", artist: "Rosalía", year: 2025, price: 9.99, was: 14.99, rating: 4.9, reviews: 311, genre: "Pop Latino", style: "minimal", palette: ["#edf2f4", "#8d99ae", "#2b2d42", "#ef233c"], badge: null },
    { id: "starboy", title: "Starboy", artist: "The Weeknd", year: 2016, price: 9.99, was: 14.99, rating: 4.9, reviews: 530, genre: "R&B", style: "neon", palette: ["#0a0a0a", "#d90d2b", "#edf2f4", "#1a1a1a"], badge: null },
    { id: "anti", title: "ANTI", artist: "Rihanna", year: 2016, price: 9.99, was: 14.99, rating: 5.0, reviews: 401, genre: "R&B", style: "redblock", palette: ["#a4161a", "#660708", "#0b090a", "#f5f3f4"], badge: "NEW" },
    { id: "donde-quiero-estar", title: "Donde Quiero Estar", artist: "Quevedo", year: 2023, price: 9.99, was: 14.99, rating: 5.0, reviews: 198, genre: "Reggaetón", style: "sky", palette: ["#a8dadc", "#457b9d", "#1d3557", "#f1faee"], badge: null },
    { id: "turr4zo", title: "TURR4ZO", artist: "Trueno", year: 2024, price: 9.99, was: 14.99, rating: 4.8, reviews: 87, genre: "Rap Latino", style: "industrial", palette: ["#0a0a0a", "#444", "#d90d2b", "#edf2f4"], badge: null },
    { id: "cosa-nuestra", title: "Cosa Nuestra", artist: "Rauw Alejandro", year: 2024, price: 9.99, was: 14.99, rating: 4.9, reviews: 154, genre: "Pop Latino", style: "vintage", palette: ["#7c5e3c", "#d4a373", "#e9edc9", "#1a1a1a"], badge: null },
    { id: "3men2-kbrn", title: "3MEN2 KBRN", artist: "Eladio Carrión", year: 2023, price: 9.99, was: 14.99, rating: 4.7, reviews: 71, genre: "Trap", style: "shadow", palette: ["#0a0a0a", "#1a1a1a", "#d90d2b", "#8d99ae"], badge: null },
    { id: "mañana-sera-bonito", title: "Mañana Será Bonito", artist: "Karol G", year: 2023, price: 9.99, was: 14.99, rating: 5.0, reviews: 289, genre: "Reggaetón", style: "scrapbook", palette: ["#ff7aa2", "#ffd166", "#06aed5", "#edf2f4"], badge: null },
    { id: "love-on", title: "Lover", artist: "Taylor Swift", year: 2019, price: 9.99, was: 14.99, rating: 4.9, reviews: 612, genre: "Pop", style: "pastel", palette: ["#ffafcc", "#bde0fe", "#cdb4db", "#edf2f4"], badge: null },
    { id: "el-baifo", title: "EL BAIFO", artist: "Quevedo", year: 2024, price: 9.99, was: 14.99, rating: 4.8, reviews: 110, genre: "Reggaetón", style: "geometric", palette: ["#1a1a3e", "#e63946", "#f4a261", "#2a9d8f"], badge: null },
    { id: "el-mal-querer", title: "El Mal Querer", artist: "Rosalía", year: 2018, price: 9.99, was: 14.99, rating: 5.0, reviews: 256, genre: "Pop Latino", style: "minimal", palette: ["#edf2f4", "#1a1a1a", "#d90d2b", "#8d99ae"], badge: null },
  ];

  const artists = [
    { name: "Bad Bunny", country: "Puerto Rico", posters: 8, slug: "bad-bunny", hue: 18 },
    { name: "Anuel AA", country: "Puerto Rico", posters: 5, slug: "anuel-aa", hue: 0 },
    { name: "Rosalía", country: "España", posters: 4, slug: "rosalia", hue: 350 },
    { name: "Myke Towers", country: "Puerto Rico", posters: 14, slug: "myke-towers", hue: 220 },
    { name: "Quevedo", country: "España", posters: 3, slug: "quevedo", hue: 270 },
    { name: "Karol G", country: "Colombia", posters: 6, slug: "karol-g", hue: 320 },
    { name: "Taylor Swift", country: "Estados Unidos", posters: 8, slug: "taylor-swift", hue: 200 },
    { name: "The Weeknd", country: "Canadá", posters: 11, slug: "the-weeknd", hue: 0 },
  ];

  const genres = [
    { name: "Reggaetón", count: 80, hue: 14 },
    { name: "Trap / Rap Latino", count: 132, hue: 280 },
    { name: "Rap US / UK", count: 145, hue: 45 },
    { name: "Pop Latino", count: 124, hue: 150 },
    { name: "Pop / R&B", count: 121, hue: 320 },
    { name: "Regional Mexicano", count: 110, hue: 25 },
    { name: "Electrónica", count: 13, hue: 210 },
    { name: "Rock / Alternativo", count: 34, hue: 250 },
    { name: "K-Pop", count: 21, hue: 300 },
  ];

  const testimonials = [
    { name: "Aldo Domínguez", handle: "@aldobass", body: "Pedí 4 cuadros, llegaron las descargas en menos de un minuto y la calidad de impresión es absurda. Mi habitación pasó de cero a museo.", rating: 5, role: "DJ · Madrid" },
    { name: "Noelia Peralta", handle: "@noeliasounds", body: "Lo regalé a mi pareja y casi llora. El detalle del tracklist y el código en la parte de abajo lo hacen sentir oficial.", rating: 5, role: "Productora · CDMX" },
    { name: "Juan Carlos R.", handle: "@jcr", body: "Tengo 6 colgados ya. El que más me gusta es el de Anuel — el rojo glow se ve real bajo luz cálida.", rating: 5, role: "Coleccionista · Bogotá" },
    { name: "Carla Méndez", handle: "@carlamz", body: "El custom poster que pedí lo terminaron en 24h. Comunicación 10/10 y el resultado superó lo que tenía en la cabeza.", rating: 5, role: "Artista visual · BCN" },
  ];

  const faqs_es = [
    { q: "¿Qué recibo exactamente después de la compra?", a: "Cuatro archivos JPG en alta resolución (300 DPI) con los tamaños A2, A3, A4 y A5 listos para imprimir. Llegan a tu correo segundos después del pago." },
    { q: "¿Cómo imprimo el poster?", a: "Recomendamos llevar el archivo a una imprenta local y pedir impresión en papel fotográfico mate o brillante. También funciona bien en una impresora de inyección de tinta de buena calidad." },
    { q: "¿En qué papel recomendáis imprimir?", a: "Papel fotográfico de 200–250 g/m² mate. Da un acabado premium sin reflejos. Si quieres más vida, prueba con un papel texturizado tipo Hahnemühle." },
    { q: "¿Puedo descargar los archivos más de una vez?", a: "Sí. Tu cuenta guarda todas tus compras y puedes volver a descargar las veces que quieras, en cualquier dispositivo." },
    { q: "¿Hacéis diseños personalizados?", a: "Sí. Si tu álbum o artista no está en el catálogo, podemos diseñarlo. El proceso suele tardar 24–48h y cuesta lo mismo que un poster regular." },
    { q: "¿Cuál es la política de reembolsos?", a: "Como son productos digitales, no aceptamos devoluciones una vez descargados. Pero si hay un problema con la calidad o el archivo, lo solucionamos al instante." },
  ];

  const faqs_en = [
    { q: "What exactly do I get after buying?", a: "Four high-res JPG files (300 DPI) in A2, A3, A4 and A5 — ready to print. Delivered to your inbox seconds after checkout." },
    { q: "How do I print the poster?", a: "Take the file to a local print shop and ask for matte or glossy photo paper. A good inkjet at home works too." },
    { q: "What paper do you recommend?", a: "200–250 g/m² matte photo paper. Premium finish, no glare. For an extra-luxe feel, try a textured fine-art paper." },
    { q: "Can I download the files more than once?", a: "Yes — your account keeps every purchase forever, downloadable on any device." },
    { q: "Do you make custom designs?", a: "Yes. If your album or artist isn’t in the catalog, we’ll design it. Usually 24–48h turnaround, same price as a regular poster." },
    { q: "What’s the refund policy?", a: "Digital products are non-refundable once downloaded — but if anything’s wrong with the file, we fix it instantly." },
  ];

  return { posters, artists, genres, testimonials, faqs_es, faqs_en };
})();
