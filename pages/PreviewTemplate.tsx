
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWebsiteById } from '../services/storageService';
import { Website, Product } from '../types';
// Added User to imports from lucide-react
import { Phone, Mail, MapPin, MessageCircle, Loader2, AlertTriangle, ArrowUp, Star, ChevronDown, Check, X, Send, Plus, Minus, User, Facebook, Instagram, Twitter, Linkedin, Youtube, Link as LinkIcon } from 'lucide-react';

export const PreviewTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [website, setWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    location: '',
    quantity: 1,
    message: ''
  });

  useEffect(() => {
    const fetchWebsite = async () => {
      // Logic for Previewing unsaved drafts
      if (id === 'draft') {
        try {
          const draftData = localStorage.getItem('webgen_draft');
          if (draftData) {
            setWebsite(JSON.parse(draftData));
            setLoading(false);
            return;
          } else {
            setError("No draft data found. Please return to the editor.");
            setLoading(false);
            return;
          }
        } catch (e) {
          setError("Failed to load draft preview.");
          setLoading(false);
          return;
        }
      }

      // Logic for existing persisted websites
      if (id) {
        try {
          const data = await getWebsiteById(id);
          if (data) {
            setWebsite(data);
          } else {
            setError("Website not found. It may have been deleted or the link is incorrect.");
          }
        } catch (e) {
          setError("Failed to load website configuration.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Invalid preview URL.");
        setLoading(false);
      }
    };
    fetchWebsite();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOrderModal = (product: Product) => {
    setSelectedProduct(product);
    setOrderForm({
      name: '',
      location: '',
      quantity: 1,
      message: `I would like to order ${product.name}.`
    });
  };

  const closeOrderModal = () => {
    setSelectedProduct(null);
  };

  const handleSendOrder = () => {
    if (!website?.messenger.pageId || !selectedProduct) return;

    const fullMessage = `New Order Request
------------------
Product: ${selectedProduct.name}
Price: ${selectedProduct.price || 'N/A'}
Quantity: ${orderForm.quantity}
------------------
Customer: ${orderForm.name}
Location: ${orderForm.location}
Note: ${orderForm.message}`;

    const encodedMessage = encodeURIComponent(fullMessage);
    // Using standard m.me link format. Note: On some devices/browsers this may just open the chat without pre-filling text.
    // Facebook frequently changes this API.
    const url = `https://m.me/${website.messenger.pageId}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
    closeOrderModal();
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      default: return <LinkIcon className="w-5 h-5" />;
    }
  };

  // Image Fallback Handlers
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // Prevent infinite loops
    e.currentTarget.src = 'https://placehold.co/800x600?text=Image+Unavailable';
  };

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://placehold.co/150x150?text=User';
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center gap-2 text-slate-500 bg-slate-50">
        <Loader2 className="animate-spin w-6 h-6 text-indigo-600" />
        <span className="font-medium">Loading website preview...</span>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4 text-slate-500 bg-slate-50 p-4 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full flex flex-col items-center">
          <div className="bg-red-50 p-4 rounded-full mb-4">
             <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Preview Unavailable</h2>
          <p className="text-slate-500 mb-6">{error || "Website data could not be retrieved."}</p>
          <button 
            onClick={() => window.close()}
            className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
          >
            Close Tab
          </button>
        </div>
      </div>
    );
  }

  const { theme, content, messenger, enabledSections } = website;
  const isDark = theme.background === 'dark';

  // Styles derived from theme configuration
  const bgMain = isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900';
  const bgSecondary = isDark ? 'bg-slate-800' : 'bg-slate-50';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className={`min-h-screen font-sans ${bgMain}`}>
      
      {/* Navigation */}
      <nav className={`${isDark ? 'bg-slate-900/90' : 'bg-white/90'} fixed w-full z-50 backdrop-blur-md border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
             <div className="text-2xl font-bold" style={{ color: theme.primary }}>
               {website.title}
             </div>
             <div className="hidden md:flex space-x-8">
                {enabledSections.hero && <a href="#hero" className="hover:text-opacity-80 transition-opacity">Home</a>}
                {enabledSections.about && <a href="#about" className="hover:text-opacity-80 transition-opacity">About</a>}
                {enabledSections.products && <a href="#products" className="hover:text-opacity-80 transition-opacity">Services</a>}
                {enabledSections.contact && <a href="#contact" className="hover:text-opacity-80 transition-opacity">Contact</a>}
             </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {enabledSections.hero && (
        <section id="hero" className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                {content.hero.title}
              </h1>
              <p className={`text-lg mb-8 ${textMuted}`}>
                {content.hero.subtext}
              </p>
              <button 
                className="px-8 py-3 rounded-lg font-bold text-white shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                style={{ backgroundColor: theme.button }}
              >
                Get Started
              </button>
            </div>
            <div className="lg:w-1/2">
               <img 
                 src={content.hero.image} 
                 alt="Hero" 
                 onError={handleImageError}
                 className="rounded-2xl shadow-2xl object-cover w-full h-[400px]" 
               />
            </div>
          </div>
          <div className="absolute top-0 right-0 -z-10 opacity-10" style={{ color: theme.secondary }}>
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[600px] h-[600px] fill-current">
              <path d="M42.7,-72.3C55.3,-66.6,65.3,-55.9,74.1,-43.8C82.9,-31.7,90.5,-18.2,91.3,-4.2C92.1,9.8,86.1,24.3,77.2,36.9C68.3,49.5,56.5,60.2,43.2,67.6C29.9,75,15,79.1,0.6,78.1C-13.8,77.1,-27.6,71,-40.1,62.8C-52.6,54.6,-63.8,44.3,-71.4,32.1C-79,19.9,-83,5.8,-79.9,-6.8C-76.8,-19.4,-66.6,-30.5,-56.3,-40.4C-46,-50.3,-35.6,-59,-24.1,-65.7C-12.6,-72.4,0,-77.1,13.2,-78.3C26.4,-79.5,52.8,-77.2,42.7,-72.3Z" transform="translate(100 100)" />
            </svg>
          </div>
        </section>
      )}

      {/* About Section */}
      {enabledSections.about && (
        <section id="about" className={`py-16 ${bgSecondary}`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ color: theme.primary }}>About Us</h2>
            <p className={`text-lg leading-relaxed ${textMuted}`}>
              {content.about}
            </p>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {enabledSections.benefits && content.benefits.length > 0 && (
        <section id="benefits" className="py-20">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
               <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>Why Choose Us</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.benefits.map(b => (
                   <div key={b.id} className={`p-6 rounded-xl border ${isDark ? 'border-slate-800' : 'border-slate-100'} hover:shadow-lg transition-shadow`}>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white" style={{ backgroundColor: theme.primary }}>
                         <Star className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                      <p className={textMuted}>{b.description}</p>
                   </div>
                ))}
             </div>
           </div>
        </section>
      )}

      {/* Products Section */}
      {enabledSections.products && (
        <section id="products" className={`py-20 ${bgSecondary}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>Our Offerings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.products.map((product) => (
                <div key={product.id} className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    onError={handleImageError}
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-bold">{product.name}</h3>
                       {product.price && (
                         <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-2 py-1 rounded" style={{color: theme.primary, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}}>
                           {product.price}
                         </span>
                       )}
                    </div>
                    <p className={`text-sm mb-4 ${textMuted}`}>{product.description}</p>
                    
                    {messenger.enabled ? (
                      <button 
                         className="w-full py-2 rounded text-white font-medium text-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                         style={{ backgroundColor: theme.button }}
                         onClick={() => openOrderModal(product)}
                      >
                         <MessageCircle className="w-4 h-4" />
                         Order via Messenger
                      </button>
                    ) : (
                      <button 
                         className="w-full py-2 rounded border border-current font-medium text-sm transition-colors hover:opacity-80"
                         style={{ color: theme.button, borderColor: theme.button }}
                         onClick={() => {}}
                      >
                         View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {enabledSections.testimonials && content.testimonials.length > 0 && (
         <section id="testimonials" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>What People Say</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {content.testimonials.map(t => (
                     <div key={t.id} className={`p-8 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'} relative`}>
                        <div className="text-4xl absolute top-4 left-6 opacity-20" style={{ color: theme.primary }}>"</div>
                        <p className={`text-lg italic mb-6 relative z-10 ${textMuted}`}>{t.content}</p>
                        <div className="flex items-center gap-4">
                           <img 
                              src={t.avatar} 
                              alt={t.name} 
                              onError={handleAvatarError}
                              className="w-12 h-12 rounded-full object-cover" 
                           />
                           <div>
                              <p className="font-bold">{t.name}</p>
                              <p className={`text-sm ${textMuted}`}>{t.role}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      )}

      {/* FAQ Section */}
      {enabledSections.faq && content.faq.length > 0 && (
        <section id="faq" className={`py-20 ${bgSecondary}`}>
           <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-12">
                 <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                 {content.faq.map(f => (
                    <details key={f.id} className={`rounded-lg p-4 group ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                       <summary className="flex justify-between items-center cursor-pointer font-medium list-none">
                          <span>{f.question}</span>
                          <span className="transition group-open:rotate-180">
                             <ChevronDown className="w-5 h-5" />
                          </span>
                       </summary>
                       <div className={`mt-3 text-sm leading-relaxed ${textMuted}`}>
                          {f.answer}
                       </div>
                    </details>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Contact Section */}
      {enabledSections.contact && (
        <section id="contact" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: theme.primary }}>Get In Touch</h2>
                <div className="space-y-6">
                  {content.contact.phone && (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full" style={{ backgroundColor: theme.secondary }}>
                        <Phone className="w-6 h-6" style={{ color: theme.primary }} />
                      </div>
                      <span className="text-lg">{content.contact.phone}</span>
                    </div>
                  )}
                  {content.contact.email && (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full" style={{ backgroundColor: theme.secondary }}>
                        <Mail className="w-6 h-6" style={{ color: theme.primary }} />
                      </div>
                      <span className="text-lg">{content.contact.email}</span>
                    </div>
                  )}
                  {content.contact.address && (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full" style={{ backgroundColor: theme.secondary }}>
                        <MapPin className="w-6 h-6" style={{ color: theme.primary }} />
                      </div>
                      <span className="text-lg">{content.contact.address}</span>
                    </div>
                  )}
                </div>
              </div>
              <form className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-slate-900' : 'bg-white'}`} onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea className={`w-full px-4 py-2 rounded-lg border h-32 resize-none ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}></textarea>
                  </div>
                  <button 
                    className="w-full py-3 rounded-lg font-bold text-white mt-2"
                    style={{ backgroundColor: theme.button }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={`py-8 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className={`text-sm ${textMuted}`}>{content.footerText}</p>
           {content.socialLinks && (
             <div className="flex items-center gap-4">
               {content.socialLinks.filter(l => l.enabled).map(link => (
                 <a 
                   key={link.platform} 
                   href={link.url} 
                   target="_blank" 
                   rel="noreferrer"
                   className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'}`}
                 >
                   {getSocialIcon(link.platform)}
                 </a>
               ))}
             </div>
           )}
        </div>
      </footer>

      {/* Messenger Widget */}
      {messenger.enabled && (
        <div className="fixed bottom-6 right-6 z-40 animate-bounce-slow">
          <div className="relative group">
            {messenger.welcomeMessage && (
               <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-white text-slate-800 text-sm shadow-xl rounded-2xl rounded-br-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 {messenger.welcomeMessage}
               </div>
            )}
            <button 
              className="p-4 rounded-full shadow-lg text-white transition-colors hover:bg-blue-600"
              style={{ backgroundColor: '#0084FF' }} 
              onClick={() => {
                window.open(`https://m.me/${messenger.pageId}`, '_blank');
              }}
            >
              <MessageCircle className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Scroll To Top */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 p-3 bg-slate-800 text-white rounded-full shadow-lg hover:bg-slate-700 transition-all z-40 opacity-90"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Order Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] border border-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in text-white relative">
            <button 
              onClick={closeOrderModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                 <MessageCircle className="w-6 h-6 text-[#A3E635]" />
                 <h3 className="text-xl font-bold">Order via Messenger</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">Send us a message on Facebook Messenger and we'll help you complete your order!</p>

              {/* Product Card */}
              <div className="flex gap-4 p-4 bg-[#1E1E1E] rounded-lg border border-gray-800 mb-6">
                 {selectedProduct.image && (
                   <img 
                      src={selectedProduct.image} 
                      alt="" 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/100x100?text=Product';
                      }}
                      className="w-16 h-16 rounded object-cover bg-gray-800" 
                    />
                 )}
                 <div className="flex-1">
                   <h4 className="font-bold">{selectedProduct.name}</h4>
                   <p className="text-sm text-gray-400">{selectedProduct.description.substring(0, 40)}...</p>
                 </div>
                 {selectedProduct.price && (
                   <div className="font-bold text-[#A3E635]">{selectedProduct.price}</div>
                 )}
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                     <User className="w-4 h-4" /> Your Name <span className="text-red-500">*</span>
                   </label>
                   <input 
                    type="text"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-[#1E1E1E] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#A3E635] text-white placeholder-gray-500"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                     <MapPin className="w-4 h-4" /> Location <span className="text-red-500">*</span>
                   </label>
                   <input 
                    type="text"
                    value={orderForm.location}
                    onChange={(e) => setOrderForm({...orderForm, location: e.target.value})}
                    placeholder="Enter your location"
                    className="w-full bg-[#1E1E1E] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#A3E635] text-white placeholder-gray-500"
                   />
                </div>
                
                <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                     <Plus className="w-4 h-4" /> Quantity
                   </label>
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setOrderForm(prev => ({...prev, quantity: Math.max(1, prev.quantity - 1)}))}
                        className="w-10 h-10 rounded-lg bg-[#1E1E1E] border border-gray-700 flex items-center justify-center hover:bg-gray-800"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 bg-[#1E1E1E] border border-gray-700 rounded-lg h-10 flex items-center justify-center font-bold">
                        {orderForm.quantity}
                      </div>
                      <button 
                        onClick={() => setOrderForm(prev => ({...prev, quantity: prev.quantity + 1}))}
                        className="w-10 h-10 rounded-lg bg-[#1E1E1E] border border-gray-700 flex items-center justify-center hover:bg-gray-800"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                     <MessageCircle className="w-4 h-4" /> Your Message (editable) <span className="text-red-500">*</span>
                   </label>
                   <textarea 
                    value={orderForm.message}
                    onChange={(e) => setOrderForm({...orderForm, message: e.target.value})}
                    className="w-full bg-[#1E1E1E] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#A3E635] text-white placeholder-gray-500 h-24 resize-none"
                   />
                </div>

                <button 
                  onClick={handleSendOrder}
                  disabled={!orderForm.name || !orderForm.location}
                  className="w-full py-4 rounded-lg font-bold text-black flex items-center justify-center gap-2 mt-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: theme.button || '#A3E635', color: isDark ? '#000' : '#fff' }}
                >
                  <Send className="w-5 h-5" />
                  Send via Messenger
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">This will open Facebook Messenger in a new tab</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
