import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, User, Heart, Search, Star, Leaf, MapPin, Clock, Eye, Play, Pause, Volume2, VolumeX, ArrowRight, Shield, Truck, RotateCcw, Award, Zap, Camera, Sparkles, Gift, Crown, ChevronDown, X, Plus, Minus, Check } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('shop');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) setShowExitIntent(true);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const products = [
    {
      id: 1,
      name: "Ethereal Cashmere Collection",
      price: 289,
      originalPrice: 399,
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
      gallery: [
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      rating: 4.9,
      reviews: 847,
      stock: 3,
      colors: ['black', 'navy', 'cream'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      ecoFacts: "Carbon-neutral production • 100% traceable cashmere",
      impact: "15 trees planted • Ocean plastic removed",
      recentPurchase: "Isabella from NYC bought this 47 seconds ago",
      features: ["Premium Mongolian Cashmere", "Hand-finished seams", "Lifetime warranty"],
      ugc: [
        { user: "Sarah M.", image: "https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5 },
        { user: "Emma K.", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5 },
        { user: "Olivia R.", image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5 }
      ]
    },
    {
      id: 2,
      name: "Avant-Garde Silk Ensemble",
      price: 449,
      originalPrice: 599,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
      gallery: [
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      rating: 4.8,
      reviews: 623,
      stock: 7,
      colors: ['emerald', 'burgundy', 'midnight'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      ecoFacts: "Peace silk • Zero-waste pattern cutting",
      impact: "25 trees planted • 500L water saved",
      recentPurchase: "Victoria from London bought this 2 minutes ago",
      features: ["Mulberry Silk", "Architectural draping", "Limited edition"],
      ugc: [
        { user: "Grace L.", image: "https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5 },
        { user: "Sophia T.", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5 }
      ]
    },
    {
      id: 3,
      name: "Transcendent Wool Masterpiece",
      price: 649,
      originalPrice: 899,
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
      gallery: [
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      rating: 5.0,
      reviews: 234,
      stock: 1,
      colors: ['charcoal', 'camel', 'ivory'],
      sizes: ['S', 'M', 'L', 'XL'],
      ecoFacts: "Regenerative wool • Biodegradable packaging",
      impact: "50 trees planted • Carbon negative",
      recentPurchase: "Charlotte from Paris bought this 5 minutes ago",
      features: ["Merino Wool", "Artisan crafted", "Museum quality"],
      ugc: [
        { user: "Amelia F.", image: "https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5 }
      ]
    }
  ];

  const addToCart = (productId) => {
    setCartItems(prev => prev + quantity);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const ProductCard = ({ product, index }) => (
    <div 
      className="group relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-4xl transition-all duration-700 hover:scale-[1.02] transform-gpu"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transform: 'perspective(1000px) rotateY(2deg)',
        animationDelay: `${index * 150}ms`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(2deg) scale(1)';
      }}
    >
      {/* Holographic Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
        <div className="w-full h-full bg-white rounded-3xl"></div>
      </div>

      {/* Premium Badges */}
      <div className="absolute top-6 left-6 z-20 flex flex-col space-y-2">
        {product.stock < 5 && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold animate-pulse flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Only {product.stock} left</span>
          </div>
        )}
        {product.rating === 5.0 && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1">
            <Crown className="w-3 h-3" />
            <span>Editor's Choice</span>
          </div>
        )}
      </div>

      <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-full text-sm font-bold z-20">
        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
      </div>

      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-1000"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex space-x-4">
            <button className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all duration-300 hover:scale-110">
              <Heart className="w-6 h-6 text-gray-700" />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all duration-300 hover:scale-110">
              <Eye className="w-6 h-6 text-gray-700" />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all duration-300 hover:scale-110">
              <Camera className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative p-8 bg-white">
        {/* Rating & Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">({product.reviews})</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            <span>{Math.floor(Math.random() * 50) + 10} viewing</span>
          </div>
        </div>

        <h3 className="font-bold text-xl mb-3 text-gray-900 font-playfair">{product.name}</h3>
        
        {/* Pricing */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-3xl font-bold text-blue-800">${product.price}</span>
          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
            Save ${product.originalPrice - product.price}
          </span>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {product.features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Eco Impact */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-4 border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Sustainability Impact</span>
          </div>
          <p className="text-xs text-green-700 mb-1">{product.ecoFacts}</p>
          <p className="text-xs text-green-700 font-semibold">{product.impact}</p>
        </div>

        {/* Social Proof */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>{product.recentPurchase}</span>
        </div>

        {/* UGC Preview */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-xs font-semibold text-gray-700">Customer Photos:</span>
          <div className="flex -space-x-2">
            {product.ugc.slice(0, 3).map((photo, idx) => (
              <img 
                key={idx}
                src={photo.image} 
                alt={`Customer ${photo.user}`}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-xs text-blue-600 font-medium">+{product.ugc.length} more</span>
        </div>

        <button 
          onClick={() => addToCart(product.id)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
        >
          Add to Cart • ${product.price}
        </button>

        {/* Trust Badges */}
        <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Shield className="w-3 h-3" />
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Truck className="w-3 h-3" />
            <span>Free Ship</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <RotateCcw className="w-3 h-3" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      {/* Glassmorphism Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: 'blur(12px)',
          background: scrollY > 50 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
          borderBottom: scrollY > 50 ? '1px solid rgba(0,0,0,0.1)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-playfair">LUXE</span>
                <div className="text-xs text-gray-500 font-medium">ATELIER</div>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['Collections', 'Atelier', 'Sustainability', 'Journal'].map((item) => (
                <a key={item} href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <Heart className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <User className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {cartItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cinematic Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"
            style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.6) 0%, rgba(30,58,148,0.4) 50%, rgba(10,10,10,0.8) 100%)' }}
          ></div>
        </div>

        {/* Video Controls */}
        <div className="absolute top-24 right-8 flex space-x-3 z-20">
          <button
            onClick={toggleVideo}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleMute}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-playfair leading-tight">
              <span className="block opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                Transcendent
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                Luxury
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
              Where artisanal craftsmanship meets sustainable innovation. 
              Each piece tells a story of conscious luxury.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl">
                Explore Collection
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
              <button className="border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 active:scale-95">
                Watch Our Story
                <Play className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* Trust Wall */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-12 text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span className="font-medium">Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span className="font-medium">2,500+ 5-Star Reviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-5 h-5" />
              <span className="font-medium">30-Day Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 font-playfair">Our Collective Impact</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every purchase contributes to a more sustainable future. 
              Together, we're redefining luxury through conscious choices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, value: "247,891", label: "Trees Planted", color: "green", bg: "from-green-400 to-emerald-600" },
              { icon: MapPin, value: "3.2M", label: "Ocean Bottles Recycled", color: "blue", bg: "from-blue-400 to-cyan-600" },
              { icon: Star, value: "89,432", label: "Happy Customers", color: "yellow", bg: "from-yellow-400 to-orange-500" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-10 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100">
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-3 font-playfair">{stat.value}</h3>
                <p className="text-gray-600 font-medium text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 font-playfair">Curated Excellence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked pieces that embody our commitment to sustainable luxury and timeless design.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold text-gray-900 font-playfair leading-tight">
                  Crafted with
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Conscious Intent
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  From the first sketch to the final stitch, every piece in our atelier 
                  represents a commitment to artisanal excellence and environmental stewardship.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    title: "Artisanal Heritage", 
                    desc: "Master craftspeople with generations of expertise",
                    icon: "🎨"
                  },
                  { 
                    title: "Sustainable Materials", 
                    desc: "Ethically sourced, traceable, and regenerative fibers",
                    icon: "🌱"
                  },
                  { 
                    title: "Timeless Design", 
                    desc: "Created to transcend seasons and trends",
                    icon: "✨"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Artisan at work"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 font-playfair">100%</p>
                  <p className="text-sm font-medium text-gray-600">Carbon Neutral</p>
                </div>
              </div>
              
              <div className="absolute -top-8 -left-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-2xl">
                <div className="text-center">
                  <p className="text-2xl font-bold">Award</p>
                  <p className="text-xs">Winning Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">Wait! Don't Leave Yet</h3>
              <p className="text-gray-600 mb-6">Get free worldwide shipping on your first order</p>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl mb-6">
                <p className="font-bold text-lg">FREE SHIPPING</p>
                <p className="text-sm">If ordered in the next 2:00 minutes</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowExitIntent(false)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Claim Offer
                </button>
                <button 
                  onClick={() => setShowExitIntent(false)}
                  className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Cart Bar */}
      {scrollY > 1000 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 z-40 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={products[0].image} alt="" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-semibold text-sm">{products[0].name}</p>
                <p className="text-blue-600 font-bold">${products[0].price}</p>
              </div>
            </div>
            <button 
              onClick={() => addToCart(products[0].id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex justify-around items-center">
          {[
            { icon: ShoppingBag, label: 'Shop', active: true },
            { icon: Search, label: 'Search' },
            { icon: Heart, label: 'Wishlist' },
            { icon: ShoppingBag, label: 'Cart', badge: cartItems },
            { icon: User, label: 'Profile' }
          ].map((item, idx) => (
            <button key={idx} className="flex flex-col items-center space-y-1 p-2 relative">
              <item.icon className={`w-6 h-6 ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-xs ${item.active ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                {item.label}
              </span>
              {item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold font-playfair">LUXE</span>
                  <div className="text-xs text-gray-400">ATELIER</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Redefining luxury through conscious craftsmanship and sustainable innovation. 
                Join our community of conscious consumers.
              </p>
              <div className="flex space-x-4">
                {['Instagram', 'Twitter', 'Pinterest'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {[
              { title: 'Collections', items: ['New Arrivals', 'Bestsellers', 'Limited Edition', 'Gift Cards'] },
              { title: 'Atelier', items: ['Our Story', 'Craftsmanship', 'Sustainability', 'Impact Report'] },
              { title: 'Support', items: ['Size Guide', 'Care Instructions', 'Returns', 'Contact'] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-lg mb-6 font-playfair">{section.title}</h4>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Luxe Atelier. All rights reserved. Crafted with 🤍 for conscious luxury.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;