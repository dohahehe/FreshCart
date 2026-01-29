import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bottom-0 left-0 z-20 w-full p-4 bg-gray-100 shadow-sm flex items-center justify-center md:p-6">
      <span className="text-sm text-body text-center">© 2026 <Link href="/" className="hover:underline">Fresh Cart™</Link>. All Rights Reserved.
      </span>
    </footer>


  )
}
