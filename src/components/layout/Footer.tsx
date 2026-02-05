import Link from 'next/link'
import { Instagram, Twitter, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-8" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="heading-serif text-2xl mb-4">Hilton the Artist</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Exploring the boundless beauty of art 🎨🌟
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs uppercase tracking-wider text-background/50 mb-4">Quick Links</p>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery" className="text-background/70 hover:text-background transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/commission" className="text-background/70 hover:text-background transition-colors text-sm">
                  Commission
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-background/70 hover:text-background transition-colors text-sm">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-wider text-background/50 mb-4">Connect</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
                data-testid="social-instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Twitter"
                data-testid="social-twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:hello@hiltonart.com"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Email"
                data-testid="social-email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8">
          <p className="text-center text-background/50 text-xs">
            © {new Date().getFullYear()} Hilton the Artist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
