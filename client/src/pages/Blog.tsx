import { useState } from "react";
import { BlogCard, BlogPost } from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

import tutorialImg from "@assets/generated_images/crochet_tutorial_blog.png";
import suppliesImg from "@assets/generated_images/crochet_supplies_flatlay.png";
import blanketImg from "@assets/generated_images/crochet_blanket_product.png";

const categories = ["all", "tutorial", "tips & tricks", "guide", "inspiration"];

// todo: remove mock functionality
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Amigurumi: A Beginner's Guide",
    excerpt: "Learn the basics of creating adorable stuffed animals with this comprehensive guide for beginners. We'll cover essential stitches, materials, and tips to help you create your first amigurumi project.",
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
  {
    id: "4",
    title: "Creating Your First Granny Square Blanket",
    excerpt: "A step-by-step tutorial on making the classic granny square and joining them into a beautiful blanket.",
    image: tutorialImg,
    category: "Tutorial",
    author: "Sarah Miller",
    readTime: "12 min read",
    date: "Nov 28, 2024",
  },
  {
    id: "5",
    title: "Crochet Color Theory: Combining Colors Like a Pro",
    excerpt: "Learn how to choose color palettes that make your projects pop with these design principles.",
    image: suppliesImg,
    category: "Guide",
    author: "Sarah Miller",
    readTime: "7 min read",
    date: "Nov 20, 2024",
  },
  {
    id: "6",
    title: "10 Cozy Crochet Project Ideas for Winter",
    excerpt: "Get inspired with these warm and wonderful project ideas perfect for the cold months ahead.",
    image: blanketImg,
    category: "Inspiration",
    author: "Sarah Miller",
    readTime: "4 min read",
    date: "Nov 15, 2024",
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || 
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = selectedCategory === "all" && !searchQuery ? filteredPosts[0] : null;
  const regularPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground">
            Tips, tutorials, and crochet inspiration
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-blog-search"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 capitalize"
                data-testid={`tab-blog-${cat}`}
              >
                {cat === "all" ? "All Posts" : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-8">
            <BlogCard post={featuredPost} featured />
          </div>
        )}

        {/* Blog Grid */}
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No articles found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
