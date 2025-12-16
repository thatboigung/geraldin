import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { ProductCard, Product } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal } from "lucide-react";

import amigurumiImg from "@assets/generated_images/amigurumi_bear_product.png";
import blanketImg from "@assets/generated_images/crochet_blanket_product.png";
import toteImg from "@assets/generated_images/crochet_tote_bag.png";
import beanieImg from "@assets/generated_images/crochet_beanie_hat.png";
import coastersImg from "@assets/generated_images/crochet_coasters_set.png";

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

const categories = ["all", "amigurumi", "blankets", "accessories", "home-decor", "wearables"];

// todo: remove mock functionality
const allProducts: Product[] = [
  { id: "1", name: "Cute Bear Amigurumi", price: 35.00, originalPrice: 45.00, image: amigurumiImg, category: "Amigurumi", isNew: true },
  { id: "2", name: "Cozy Baby Blanket", price: 89.00, image: blanketImg, category: "Blankets", madeToOrder: true },
  { id: "3", name: "Market Tote Bag", price: 45.00, image: toteImg, category: "Accessories", isNew: true },
  { id: "4", name: "Dusty Rose Beanie", price: 32.00, image: beanieImg, category: "Wearables" },
  { id: "5", name: "Boho Coaster Set", price: 24.00, originalPrice: 30.00, image: coastersImg, category: "Home Decor" },
  { id: "6", name: "Mini Bunny Amigurumi", price: 28.00, image: amigurumiImg, category: "Amigurumi", madeToOrder: true },
  { id: "7", name: "Chunky Throw Blanket", price: 120.00, image: blanketImg, category: "Blankets", isNew: true },
  { id: "8", name: "Crochet Plant Hanger", price: 35.00, image: toteImg, category: "Home Decor" },
  { id: "9", name: "Winter Scarf", price: 48.00, image: beanieImg, category: "Wearables", madeToOrder: true },
  { id: "10", name: "Elephant Amigurumi", price: 42.00, image: amigurumiImg, category: "Amigurumi" },
  { id: "11", name: "Table Runner", price: 55.00, image: coastersImg, category: "Home Decor", isNew: true },
  { id: "12", name: "Beach Bag", price: 58.00, image: toteImg, category: "Accessories", isSoldOut: true },
];

export default function Shop({ onAddToCart }: ShopProps) {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] || "");
  const initialCategory = params.get("category") || "all";
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];
    
    if (selectedCategory !== "all") {
      products = products.filter(
        (p) => p.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      );
    }
    
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }
    
    return products;
  }, [selectedCategory, searchQuery, sortBy]);

  const formatCategoryName = (cat: string) => {
    if (cat === "all") return "All Products";
    return cat.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

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
            {categories.map((cat) => (
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
        {filteredProducts.length > 0 ? (
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
