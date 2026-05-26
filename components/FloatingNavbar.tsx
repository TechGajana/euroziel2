// Floating Navbar component
import Link from 'next/link';

export default function FloatingNavbar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-full shadow-lg px-6 py-3 flex space-x-6 z-50">
      <Link href="/" className="text-gray-700 hover:text-gray-900">
        Home
      </Link>
      <Link href="/about" className="text-gray-700 hover:text-gray-900">
        About
      </Link>
      <Link href="/services" className="text-gray-700 hover:text-gray-900">
        Services
      </Link>
      <Link href="/contact" className="text-gray-700 hover:text-gray-900">
        Contact
      </Link>
    </nav>
  );
}