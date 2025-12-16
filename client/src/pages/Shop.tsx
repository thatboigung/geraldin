import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ProductCard, Product } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product as DBProduct, Category } from "@shared/schema";

import amigurumiImg from "@assets/generated_images/amigurumi_bear_product.png";
import blanketImg from "@assets/generated_images/crochet_blanket_product.png";
import toteImg from "@assets/generated_images/crochet_tote_bag.png";
import beanieImg from "@assets/generated_images/crochet_beanie_hat.png";
import coastersImg from "@assets/generated_images/crochet_coasters_set.png";

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

const categoryImages: Record<string, string> = {
  "amigurumi": amigurumiImg,
  "blankets": blanketImg,
  "accessories": toteImg,
  "home-decor": coastersImg,
  "wearables": beanieImg,
};

function mapDBProductToProduct(dbProduct: DBProduct, categories: Category[]): Product {
  const category = categories.find(c => c.id === dbProduct.categoryId);
  const categorySlug = category?.slug || "accessories";
  
  return {
    id: String(dbProduct.id),
    name: dbProduct.name,
    price: parseFloat(dbProduct.price),
    originalPrice: dbProduct.originalPrice ? parseFloat(dbProduct.originalPrice) : undefined,
    image: categoryImages[categorySlug] || amigurumiImg,
    category: category?.name || "Accessories",
    isNew: dbProduct.isNew || false,
    isSoldOut: dbProduct.isSoldOut || false,
    madeToOrder: dbProduct.madeToOrder || false,
  };
}

export default function Shop({ onAddToCart }: ShopProps) {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] || "");
  const initialCategory = params.get("category") || "all";
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: dbProducts = [], isLoading: productsLoading } = useQuery<DBProduct[]>({
    queryKey: ['/api/products'],
  });

  const allCategories = ["all", ...categories.map(c => c.slug)];

  const products = dbProducts.map(p => mapDBProductToProduct(p, categories));

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      );
    }
    
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }
    
    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const formatCategoryName = (cat: string) => {
    if (cat === "all") return "All Products";
    return cat.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  const isLoading = categoriesLoading || productsLoading;

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground">
            Discover unique handcrafted crochet creations
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-shop-search"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]" data-testid="select-sort">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
            {allCategories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4"
                data-testid={`tab-${cat}`}
              >
                {formatCategoryName(cat)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredProducts.length} products
        </p>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No products found matching your criteria
            </p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}

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
    </div>
  );
}
