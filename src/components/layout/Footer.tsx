import Link from "next/link"
import { Activity, Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg shrink-0">
                <Activity className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
              </div>
              <span className="font-headline text-lg font-bold tracking-tight text-white leading-tight">
                Healthsync Medical
              </span>
            </Link>
            <p className="text-sm text-secondary-foreground/70 max-w-xs leading-relaxed">
              Where Faith Meets Excellence in Healthcare. Providing quality medical solutions across the Philippines.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-white mb-6">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-4">
              {['Home', 'About Us', 'Products', 'Offers', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-secondary-foreground/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-white mb-6">Our Solutions</h3>
            <ul className="space-y-4">
              {[
                'Medical Equipment',
                'Laboratory Equipment',
                'Medical Supplies',
                'Technical Support',
                'Packaging Solutions'
              ].map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-sm text-secondary-foreground/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-secondary-foreground/70 leading-relaxed">
                  Upper Kasinay St., Darangan, Binangonan, Rizal, Philippines
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-secondary-foreground/70">+63 915 392 5794</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-secondary-foreground/70 break-all">healthsync.med@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-[10px] md:text-xs text-secondary-foreground/50">
            &copy; {currentYear} Healthsync Medical Solutions Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
