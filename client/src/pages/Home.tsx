import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard, Product } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { BlogCard, BlogPost } from "@/components/BlogCard";
import { ArtistSection } from "@/components/ArtistSection";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import type { Product as DBProduct, Category, BlogPost as DBBlogPost } from "@shared/schema";

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

const categoryImages: Record<string, string> = {
  "fairy-puke": amigurumiImg,
  "bralettes": beanieImg,
  "femme": coastersImg,
  "bag-top-sets": toteImg,
  "shrugs-mesh-sleeves": blanketImg,
};

const productImages: Record<string, string> = {
  "fairy-puke": amigurumiImg,
  "bralettes": beanieImg,
  "femme": coastersImg,
  "bag-top-sets": toteImg,
  "shrugs-mesh-sleeves": blanketImg,
};

const blogImages: string[] = [tutorialImg, suppliesImg, blanketImg];

function mapDBProductToProduct(dbProduct: DBProduct, categories: Category[]): Product {
  const category = categories.find(c => c.id === dbProduct.categoryId);
  const categorySlug = category?.slug || "accessories";
  
  return {
    id: String(dbProduct.id),
    name: dbProduct.name,
    price: parseFloat(dbProduct.price),
    originalPrice: dbProduct.originalPrice ? parseFloat(dbProduct.originalPrice) : undefined,
    image: productImages[categorySlug] || amigurumiImg,
    category: category?.name || "Accessories",
    isNew: dbProduct.isNew || false,
    isSoldOut: dbProduct.isSoldOut || false,
    madeToOrder: dbProduct.madeToOrder || false,
  };
}

function mapDBBlogPostToBlogPost(dbPost: DBBlogPost, index: number): BlogPost {
  return {
    id: String(dbPost.id),
    title: dbPost.title,
    excerpt: dbPost.excerpt,
    image: blogImages[index % blogImages.length],
    category: dbPost.category,
    author: dbPost.author,
    readTime: dbPost.readTime,
    date: dbPost.publishedAt 
      ? new Date(dbPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Dec 16, 2024',
  };
}

export default function Home({ onAddToCart }: HomeProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: dbProducts = [], isLoading: productsLoading } = useQuery<DBProduct[]>({
    queryKey: ['/api/products'],
  });

  const { data: dbBlogPosts = [], isLoading: blogLoading } = useQuery<DBBlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const products = dbProducts.map(p => mapDBProductToProduct(p, categories));
  const blogPosts = dbBlogPosts.slice(0, 3).map((p, i) => mapDBBlogPostToBlogPost(p, i));

  const categoryCards = categories.map(cat => ({
    name: cat.name,
    image: categoryImages[cat.slug] || amigurumiImg,
    href: `/shop?category=${cat.slug}`,
    count: cat.productCount || 0,
  }));

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
          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categoryCards.map((category) => (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  image={category.image}
                  href={category.href}
                  productCount={category.count}
                />
              ))}
            </div>
          )}
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
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
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
          
          {blogLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-64 rounded-xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-48 rounded-xl" />
              </div>
            </div>
          ) : blogPosts.length > 0 ? (
            <>
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
            </>
          ) : null}
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
