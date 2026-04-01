import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pricingPlans, testimonials, platformStats } from "@/data/mockData";
import {
  BrainIcon,
  BookIcon,
  ExamIcon,
  TrailIcon,
  ChartIcon,
  ShieldIcon,
  StarIcon,
  CheckIcon,
  ArrowRightIcon,
  LightningIcon,
  HeartIcon,
} from "@/components/Icons";

const features = [
  {
    icon: BrainIcon,
    title: "AI-Adaptive Learning",
    description:
      "Personalized study paths that adapt in real time based on your performance, strengths, and weak areas.",
  },
  {
    icon: BookIcon,
    title: "Question Bank",
    description:
      "15,000+ questions with detailed explanations, references, and high-yield annotations across all subjects.",
  },
  {
    icon: ExamIcon,
    title: "Exam Simulations",
    description:
      "Realistic exam environment with a countdown timer, question flagging, and performance breakdowns.",
  },
  {
    icon: TrailIcon,
    title: "Study Trails",
    description:
      "Structured learning paths organized by specialty, guiding you from foundational concepts to clinical mastery.",
  },
  {
    icon: ChartIcon,
    title: "Analytics Dashboard",
    description:
      "Track your performance across subjects with detailed charts, trend analysis, and percentile rankings.",
  },
  {
    icon: ShieldIcon,
    title: "Secure Platform",
    description:
      "HIPAA-compliant data security ensuring your personal information and study data remain fully protected.",
  },
];

const steps = [
  {
    number: 1,
    title: "Create Your Profile",
    description:
      "Sign up and tell us your exam goals, target date, and current preparation level so we can tailor your experience.",
  },
  {
    number: 2,
    title: "Follow AI-Guided Study Plans",
    description:
      "Our adaptive engine builds a custom study schedule that evolves with you, prioritizing the topics that matter most.",
  },
  {
    number: 3,
    title: "Track Progress & Excel",
    description:
      "Monitor your improvement with detailed analytics, celebrate milestones, and walk into exam day with confidence.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen font-poppins">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="pt-24 bg-gradient-hero relative overflow-hidden">
        {/* Decorative blur circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-accent-300/10 rounded-full blur-3xl" />

        <div className="container-max px-4 md:px-8 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - text */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-primary-100 rounded-full px-4 py-1.5 mb-6">
                <LightningIcon className="w-4 h-4 text-primary-500" />
                <span className="text-xs font-semibold text-primary-600">
                  The Future of Medical Education
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Master Medicine with{" "}
                <span className="gradient-text">AI-Powered</span> Learning
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                MedLearn combines an extensive question bank, adaptive study
                trails, and real-time analytics to help medical students and
                professionals achieve board exam success on their first attempt.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="gradient-btn">
                  Start Free Trial
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link href="#features" className="gradient-btn-outline">
                  Explore Features
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 mt-10">
                <div className="flex -space-x-2">
                  {["AP", "CE", "LM", "DR"].map((initials) => (
                    <div
                      key={initials}
                      className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-accent-500"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Trusted by 12,450+ medical students
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - image with floating stat cards */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop"
                  alt="Medical professional studying with digital tools"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Floating stat card - top right */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <ChartIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pass Rate</p>
                    <p className="text-lg font-bold text-gray-900">94.2%</p>
                  </div>
                </div>
              </div>

              {/* Floating stat card - bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <BrainIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AI Accuracy</p>
                    <p className="text-lg font-bold text-gray-900">97.8%</p>
                  </div>
                </div>
              </div>

              {/* Floating stat card - middle right */}
              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white rounded-xl shadow-lg p-3 border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                    <HeartIcon className="w-4 h-4 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Satisfaction</p>
                    <p className="text-sm font-bold text-gray-900">4.9/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLATFORM STATS BAR ===== */}
      <section className="bg-gradient-dark">
        <div className="container-max px-4 md:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-primary-200">
                  {stat.label}
                </p>
                <p className="text-xs text-primary-300/70 mt-0.5">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Why <span className="gradient-text">MedLearn</span>?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Everything you need to succeed in medical education, all in one
              powerful platform designed by physicians for physicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="card p-6 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
              Getting Started
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Three simple steps to transform your medical education experience
              and achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 shadow-lg shadow-primary-500/25">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="pricing" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
              Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Flexible pricing options to fit every stage of your medical
              education journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card p-8 relative flex flex-col ${
                  plan.highlighted
                    ? "border-primary-500 border-2 shadow-lg shadow-primary-500/10"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 text-sm">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`w-full text-center justify-center ${
                    plan.highlighted ? "gradient-btn" : "gradient-btn-outline"
                  }`}
                >
                  Get Started
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Hear from medical students and institutions who have transformed
              their learning with MedLearn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card p-6">
                {/* Quote icon */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary-200 mb-4"
                >
                  <path
                    d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.079 0-2.113-.441-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.079 0-2.113-.441-2.917-1.179z"
                    fill="currentColor"
                  />
                </svg>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-gradient-dark">
        <div className="container-max px-4 md:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to Transform Your Medical Education?
            </h2>
            <p className="text-primary-200 text-lg leading-relaxed mb-10">
              Join thousands of medical students and professionals who trust
              MedLearn to guide them toward board exam success. Start your
              journey today with a free trial&apos;s worth of premium features.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="gradient-btn">
                Get Started
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
