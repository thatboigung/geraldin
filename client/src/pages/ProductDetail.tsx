import { useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard, Product } from "@/components/ProductCard";
import { Heart, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft } from "lucide-react";

import amigurumiImg from "@assets/generated_images/amigurumi_bear_product.png";
import blanketImg from "@assets/generated_images/crochet_blanket_product.png";
import toteImg from "@assets/generated_images/crochet_tote_bag.png";
import beanieImg from "@assets/generated_images/crochet_beanie_hat.png";

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

// todo: remove mock functionality
const allProducts: Product[] = [
  { id: "1", name: "Cute Bear Amigurumi", price: 35.00, originalPrice: 45.00, image: amigurumiImg, category: "Amigurumi", isNew: true },
  { id: "2", name: "Cozy Baby Blanket", price: 89.00, image: blanketImg, category: "Blankets", madeToOrder: true },
  { id: "3", name: "Market Tote Bag", price: 45.00, image: toteImg, category: "Accessories", isNew: true },
  { id: "4", name: "Dusty Rose Beanie", price: 32.00, image: beanieImg, category: "Wearables" },
];

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // todo: remove mock functionality
  const product = allProducts.find((p) => p.id === id) || allProducts[0];
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id);
  
  const images = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    console.log("Added to cart:", product.name, "x", quantity);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <Link href="/shop">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-card">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.isNew && <Badge>New Arrival</Badge>}
              {product.madeToOrder && <Badge variant="secondary">Made to Order (2-3 weeks)</Badge>}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              This adorable handmade piece is lovingly crafted with premium yarn and attention 
              to every detail. Perfect for gifting or adding a cozy, handcrafted touch to your 
              home. Each piece is unique and may have slight variations, which adds to its 
              handmade charm.
            </p>

            <div className="space-y-4 border-t border-b py-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="button-decrease-qty"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-qty"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart} data-testid="button-add-to-cart">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  data-testid="button-wishlist"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>Quality guarantee on all items</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <span>Easy returns within 30 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                data-testid="tab-details"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                data-testid="tab-materials"
              >
                Materials & Care
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                data-testid="tab-shipping"
              >
                Shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Each piece is handcrafted with love in my home studio. This item features 
                  intricate stitchwork and premium materials that ensure durability and a 
                  beautiful finish.
                </p>
                <ul>
                  <li>Handmade with attention to every detail</li>
                  <li>Approximately 8 inches tall</li>
                  <li>Soft, huggable design</li>
                  <li>Safety eyes securely attached</li>
                  <li>Stuffed with premium polyester fiberfill</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="materials" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Materials</h3>
                <ul>
                  <li>100% premium acrylic yarn</li>
                  <li>Polyester fiberfill stuffing</li>
                  <li>Safety eyes and nose</li>
                </ul>
                <h3>Care Instructions</h3>
                <ul>
                  <li>Spot clean with mild soap and water</li>
                  <li>Air dry completely before use</li>
                  <li>Do not machine wash or tumble dry</li>
                  <li>Keep away from direct heat sources</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Processing Time</h3>
                <p>
                  Ready-made items ship within 1-3 business days. Made-to-order items 
                  require 2-3 weeks for creation before shipping.
                </p>
                <h3>Shipping Options</h3>
                <ul>
                  <li>Standard Shipping: 5-7 business days</li>
                  <li>Express Shipping: 2-3 business days</li>
                  <li>Free shipping on orders over $75</li>
                </ul>
                <h3>International Shipping</h3>
                <p>
                  We ship worldwide! International orders typically take 2-4 weeks 
                  depending on destination.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
