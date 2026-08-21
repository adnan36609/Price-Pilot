import Image from "next/image";
import { Bell, Rabbit, Shield } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/ui/AuthButton";
import { createClient } from "@/lib/server";
import { TrendingDown } from "lucide-react";
import { getProducts } from "./actions";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Price Pilot extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-linear-to-br from-orange-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/pricepilot.png"
              alt="Price Pilot Logo"
              height={100}
              width={300}
              className="h-15 w-auto"
            />
          </div>

          {/* Authentication Button */}
          <AuthButton user={user} />
        </div>
      </header>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Never Miss a Price Drop
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Track prices from any e-commerce site. Get instant alerts when prices drop. Save money effortlessly.
          </p>

          {/* Add product form */}
          <AddProductForm user={user} />

          {/* Features */}
          {products.length == 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-orange-500"></Icon>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your tracked products
            </h3>
            <span className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}

      <footer className="mt-auto border-t border-gray-200/60 pt-16 pb-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                PricePilot
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Track real-time prices across your favorite e-commerce stores
                and get notified the instant deals drop.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Support
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Project
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    View Source
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/adnan36609/Price-Pilot"
                    className="text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    API Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Connect
              </h4>
              <div className="flex gap-4 items-center">
                <a
                  href="https://github.com/adnan36609"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohd-adnan-124965284/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/adnan36609/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 pb-2 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} PricePilot • All Rights Reserved.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200/60 my-6"></div>

        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-medium">
            Made with ❤️ by Adnan
          </div>
        </div>
      </footer>
    </main>
  );
}
