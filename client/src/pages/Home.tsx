import { useState } from "react";
import { Link } from "wouter";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard, Product } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { BlogCard, BlogPost } from "@/components/BlogCard";
import { ArtistSection } from "@/components/ArtistSection";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import amigurumiImg from "@assets/generated_images/amigurumi_bear_product.png";
import blanketImg from "@assets/generated_images/crochet_blanket_product.png";
import toteImg from "@assets/generated_images/crochet_tote_bag.png";
import beanieImg from "@assets/generated_images/crochet_beanie_hat.png";
import coastersImg from "@assets/generated_images/crochet_coasters_set.png";
import tutorialImg from "@assets/generated_images/crochet_tutorial_blog.png";
import suppliesImg from "@assets/generated_images/crochet_supplies_flatlay.png";

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

// todo: remove mock functionality
const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Cute Bear Amigurumi",
    price: 35.00,
    originalPrice: 45.00,
    image: amigurumiImg,
    category: "Amigurumi",
    isNew: true,
  },
  {
    id: "2",
    name: "Cozy Baby Blanket",
    price: 89.00,
    image: blanketImg,
    category: "Blankets",
    madeToOrder: true,
  },
  {
    id: "3",
    name: "Market Tote Bag",
    price: 45.00,
    image: toteImg,
    category: "Accessories",
    isNew: true,
  },
  {
    id: "4",
    name: "Dusty Rose Beanie",
    price: 32.00,
    image: beanieImg,
    category: "Wearables",
  },
  {
    id: "5",
    name: "Boho Coaster Set",
    price: 24.00,
    originalPrice: 30.00,
    image: coastersImg,
    category: "Home Decor",
  },
  {
    id: "6",
    name: "Mini Bunny Amigurumi",
    price: 28.00,
    image: amigurumiImg,
    category: "Amigurumi",
    madeToOrder: true,
  },
];

// todo: remove mock functionality
const categories = [
  { name: "Amigurumi", image: amigurumiImg, href: "/shop?category=amigurumi", count: 12 },
  { name: "Blankets", image: blanketImg, href: "/shop?category=blankets", count: 8 },
  { name: "Accessories", image: toteImg, href: "/shop?category=accessories", count: 15 },
  { name: "Home Decor", image: coastersImg, href: "/shop?category=home-decor", count: 10 },
  { name: "Wearables", image: beanieImg, href: "/shop?category=wearables", count: 7 },
];

// todo: remove mock functionality
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Amigurumi: A Beginner's Guide",
    excerpt: "Learn the basics of creating adorable stuffed animals with this comprehensive guide for beginners. We'll cover essential stitches, materials, and tips.",
    image: tutorialImg,
    category: "Tutorial",
    author: "Sarah Miller",
    readTime: "8 min read",
    date: "Dec 15, 2024",
  },
  {
    id: "2",
    title: "Essential Crochet Supplies for Your Craft Room",
    excerpt: "A curated list of must-have tools and materials for every crocheter, from beginners to advanced makers.",
    image: suppliesImg,
    category: "Tips & Tricks",
    author: "Sarah Miller",
    readTime: "5 min read",
    date: "Dec 10, 2024",
  },
  {
    id: "3",
    title: "How to Choose the Right Yarn for Your Project",
    excerpt: "Understanding yarn weights, fibers, and textures to make the perfect choice for your next creation.",
    image: blanketImg,
    category: "Guide",
    author: "Sarah Miller",
    readTime: "6 min read",
    date: "Dec 5, 2024",
  },
];

export default function Home({ onAddToCart }: HomeProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover handcrafted crochet creations, each made with love and premium materials
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                image={category.image}
                href={category.href}
                productCount={category.count}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                Featured Creations
              </h2>
              <p className="text-muted-foreground">
                Our most loved handmade pieces
              </p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="gap-2" data-testid="button-view-all">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Artist Section */}
      <ArtistSection />

      {/* Blog Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                From the Blog
              </h2>
              <p className="text-muted-foreground">
                Tips, tutorials, and crochet inspiration
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="gap-2" data-testid="button-view-blog">
                Read More Articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Featured Blog Post */}
          <div className="mb-8">
            <BlogCard post={blogPosts[0]} featured />
          </div>
          
          {/* Other Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.slice(1).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Join Our Creative Community
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Get exclusive patterns, early access to new products, and crochet tips delivered to your inbox.
          </p>
          <form 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => { e.preventDefault(); console.log("Newsletter signup"); }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground"
              data-testid="input-newsletter-email"
            />
            <Button 
              type="submit" 
              variant="secondary"
              size="lg"
              data-testid="button-newsletter-signup"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
        onAddToCart={(product, quantity) => {
          for (let i = 0; i < quantity; i++) {
            onAddToCart(product);
          }
        }}
      />
    </div>
  );
}
