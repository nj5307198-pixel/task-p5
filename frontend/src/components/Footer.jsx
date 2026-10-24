// Simple inline brand icons (lucide-react no longer ships brand/social icons)
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.34C16.3 4.24 15.34 4.15 14.23 4.15c-2.32 0-3.9 1.42-3.9 4.02v2.33H7.9v3h2.43V21h3.17Z" />
    </svg>
  );
}
function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M18.9 3H21l-6.7 7.66L22.2 21h-6.2l-4.86-6.36L5.6 21H3.48l7.16-8.19L2.4 3h6.35l4.4 5.82L18.9 3Zm-1.08 16.17h1.16L7.75 4.75H6.5l11.32 14.42Z" />
    </svg>
  );
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Questions", href: "#" },
      { label: "Articles", href: "/#articles" },
      { label: "Tutorials", href: "/#tutorials" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "#" },
      { label: "Help", href: "#" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
];

const socials = [
  { id: "fb", Icon: FacebookIcon, label: "Facebook" },
  { id: "tw", Icon: TwitterIcon, label: "Twitter" },
  { id: "ig", Icon: InstagramIcon, label: "Instagram" },
];

const legalLinks = ["Privacy Policy", "Terms", "Code of Conduct"];

export default function Footer() {
  return (
    <footer id="contact" className="bg-teal-600 text-white mt-10">
      {/* Newsletter bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 px-6 py-4 border-b border-teal-500">
        <span className="font-bold tracking-wide">SIGN UP FOR OUR DAILY INSIDER</span>
        <input
          type="email"
          placeholder="Enter your email"
          className="rounded px-3 py-1.5 text-gray-800 w-56"
        />
        <button className="bg-white text-teal-700 font-semibold px-4 py-1.5 rounded hover:bg-gray-100 transition-colors">
          Subscribe
        </button>
      </div>

      {/* Columns */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 py-8 text-left">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-lg mb-3">{col.title}</h4>
            <ul className="space-y-1">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-bold text-lg mb-3">Stay connected</h4>
          <div className="flex gap-3">
            {socials.map(({ id, Icon, label }) => (
              <a
                key={id}
                href="#"
                aria-label={label}
                className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pb-6">
        <p className="font-semibold">DEV@Deakin 2026</p>
        <div className="flex justify-center gap-4 text-sm mt-2 text-teal-100">
          {legalLinks.map((item) => (
            <a key={item} href="#" className="hover:underline">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
