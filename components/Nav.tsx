const navLinks = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function NavBar() {
  return (
    <div className="border border-white/10 rounded-3xl">
      <nav className="flex items-center space-x-10 mx-6 my-2">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="text-white hover:text-white/70 duration-700">
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  )
}