import Link from "next/link";
import { BrainIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container-max px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BrainIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">MedLearn</span>
            </Link>
            <p className="text-sm leading-relaxed">
              The complete medical education platform powered by AI for adaptive learning and exam preparation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/questions" className="hover:text-white transition-colors">Question Bank</Link></li>
              <li><Link href="/exams" className="hover:text-white transition-colors">Exams</Link></li>
              <li><Link href="/trails" className="hover:text-white transition-colors">Study Trails</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm">
          <p>&copy; 2026 MedLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
