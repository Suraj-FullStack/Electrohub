import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#101828] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d9f85a] text-base font-black text-slate-950">E</span><span className="brand-name text-lg font-bold text-white">Electrohub</span></div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">Better devices, clearer choices, and tech that earns its place on your desk.</p>
          </div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Explore</h3><ul className="mt-4 space-y-3 text-sm"><li><Link to="/" className="transition hover:text-cyan-300">Home</Link></li><li><Link to="/category/smartphones" className="transition hover:text-cyan-300">Shop tech</Link></li><li><Link to="/add" className="transition hover:text-cyan-300">Sell with us</Link></li></ul></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Customer care</h3><ul className="mt-4 space-y-3 text-sm"><li><a href="#" className="transition hover:text-cyan-300">Contact us</a></li><li><a href="#" className="transition hover:text-cyan-300">FAQ</a></li><li><a href="#" className="transition hover:text-cyan-300">Shipping & returns</a></li></ul></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Stay connected</h3><p className="mt-4 text-sm text-slate-400">Fresh drops and useful deals, delivered occasionally.</p><form className="mt-4 flex gap-2"><input type="email" placeholder="Your email" className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm outline-none transition focus:border-cyan-500" /><button type="submit" className="shrink-0 rounded-lg bg-[#d9f85a] px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-[#e7ff86]">Join</button></form></div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">&copy; 2026 Electrohub. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
