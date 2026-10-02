import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Search,
  Star,
  MapPin,
  Clock,
  Tag,
  Phone,
  MessageCircle,
  Navigation,
  PlusCircle,
  ShoppingBag,
  CheckCircle,
  X,
  Plus
} from 'lucide-react';

export default function Marketplace() {
  const { merchants, addMerchant, addCatalogItem, t } = useContext(AppContext);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected merchant for digital menu modal view
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  // Self-Onboarding Modal State
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [newStore, setNewStore] = useState({
    business_name: '',
    category: 'Kirana/Groceries',
    address: '',
    phone: '',
    whatsapp_number: '',
    special_offer: '',
    google_maps_url: 'https://maps.google.com/?q=Moshi+Pune'
  });

  // Modal state for merchant adding a menu item
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    item_name: '',
    description: '',
    price: '',
    category: 'Main Menu',
    is_special: false
  });

  const categories = [
    'All',
    'Restaurants',
    'Kirana/Groceries',
    'Dairy & Bakery',
    'Clothing & Boutique',
    'Electronics & Hardware',
    'Medical & Health'
  ];

  const filteredMerchants = merchants.filter(m => {
    const matchCat = activeCategory === 'All' || m.category === activeCategory;
    const matchSearch = m.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        m.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        m.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCreateStore = (e) => {
    e.preventDefault();
    const created = addMerchant(newStore);
    setShowOnboardingModal(false);
    setSelectedMerchant(created);
    setNewStore({
      business_name: '',
      category: 'Kirana/Groceries',
      address: '',
      phone: '',
      whatsapp_number: '',
      special_offer: '',
      google_maps_url: 'https://maps.google.com/?q=Moshi+Pune'
    });
  };

  const handleAddItemToCatalog = (e) => {
    e.preventDefault();
    if (!selectedMerchant) return;
    addCatalogItem(selectedMerchant.id, {
      ...newItem,
      price: parseFloat(newItem.price) || 0
    });
    // Refresh selectedMerchant local reference
    const updated = merchants.find(m => m.id === selectedMerchant.id);
    if (updated) setSelectedMerchant(updated);
    setShowAddItemModal(false);
    setNewItem({ item_name: '', description: '', price: '', category: 'Main Menu', is_special: false });
  };

  const getWhatsAppLink = (merchant, itemName = null) => {
    const phone = merchant.whatsapp_number || merchant.phone.replace(/[^0-9]/g, '');
    const cleanPhone = phone.startsWith('91') ? phone : `91${phone}`;
    let text = `Hi ${merchant.business_name}, I saw your store listing on Aaple Moshi Super App.`;
    if (itemName) text += ` I would like to order: *${itemName}*. Please share delivery details.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      
      {/* Page Title & Merchant Onboarding CTA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
            🏪 Moshi Local Commerce & Digital Menus
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Order directly from Moshi shopkeepers via WhatsApp with zero commission markups
          </p>
        </div>

        <button
          className="btn btn-primary"
          style={{ gap: '0.5rem', boxShadow: '0 2px 4px rgba(30,64,175,0.2)' }}
          onClick={() => setShowOnboardingModal(true)}
        >
          <PlusCircle size={18} /> List Your Moshi Shop
        </button>
      </div>

      {/* Special Deals Banner */}
      <div style={{
        backgroundColor: '#fffbeb',
        border: '1.5px dashed #f59e0b',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#fef3c7', color: '#b45309', borderRadius: '50%' }}>
            <Tag size={22} />
          </div>
          <div>
            <div style={{ fontWeight: '800', color: '#92400e', fontSize: '0.95rem' }}>
              Moshi Hyper-Local Deals & Zero Commission Direct Orders
            </div>
            <div style={{ fontSize: '0.8rem', color: '#b45309' }}>
              Support Moshi merchants! Click WhatsApp Order to talk directly with store owners.
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ whiteSpace: 'nowrap', padding: '0.4rem 0.85rem', fontSize: '0.85rem', borderRadius: '99px' }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} size={18} />
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Merchant Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredMerchants.map(mch => (
          <div key={mch.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className="badge badge-assigned">{mch.category}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontWeight: '700', fontSize: '0.85rem' }}>
                  <Star size={14} fill="currentColor" /> {mch.rating || 4.8}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>
                {mch.business_name}
              </h3>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.6rem' }}>
                <MapPin size={14} /> {mch.address}
              </div>

              {mch.special_offer && (
                <div style={{
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  border: '1px solid #fcd34d',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '0.75rem'
                }}>
                  🎁 {mch.special_offer}
                </div>
              )}

              {/* Digital Menu Catalog Sneak-peek */}
              {mch.catalog && mch.catalog.length > 0 && (
                <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', uppercase: true, letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                    DIGITAL MENU SAMPLES ({mch.catalog.length} ITEMS)
                  </div>
                  {mch.catalog.slice(0, 2).map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.item_name}</span>
                      <span style={{ fontWeight: '700', color: 'var(--primary)' }}>₹{item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Vendor Action Buttons Specification B */}
            <div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem', fontSize: '0.85rem' }}
                onClick={() => setSelectedMerchant(mch)}
              >
                <ShoppingBag size={16} /> View Full Digital Menu / Catalog
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
                <a
                  href={getWhatsAppLink(mch)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{ backgroundColor: '#25d366', color: 'white', fontSize: '0.75rem', padding: '0.4rem', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>

                <a
                  href={`tel:${mch.phone}`}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.4rem', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <Phone size={14} /> Call
                </a>

                <a
                  href={mch.google_maps_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.4rem', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <Navigation size={14} /> Maps
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Digital Menu Full View Modal */}
      {selectedMerchant && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button
              onClick={() => setSelectedMerchant(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={22} />
            </button>

            <div style={{ marginBottom: '1rem', paddingRight: '2rem' }}>
              <span className="badge badge-assigned">{selectedMerchant.category}</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-dark)', margin: '0.2rem 0' }}>
                {selectedMerchant.business_name}
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                📍 {selectedMerchant.address} · 📞 {selectedMerchant.phone}
              </div>
            </div>

            {selectedMerchant.special_offer && (
              <div style={{ backgroundColor: '#fffbeb', border: '1px dashed #f59e0b', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#92400e', fontWeight: '700' }}>
                🔥 Daily Offer: {selectedMerchant.special_offer}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--primary-dark)', margin: 0 }}>
                Digital Menu & Product Catalog
              </h3>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                onClick={() => setShowAddItemModal(true)}
              >
                <Plus size={14} /> Add Item to Menu
              </button>
            </div>

            {/* Catalog list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {selectedMerchant.catalog && selectedMerchant.catalog.length > 0 ? selectedMerchant.catalog.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {item.item_name}
                      {item.is_special && <span className="badge badge-medium">SPECIAL</span>}
                    </div>
                    {item.description && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{item.description}</div>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--primary)' }}>
                      ₹{item.price}
                    </span>
                    <a
                      href={getWhatsAppLink(selectedMerchant, item.item_name)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn"
                      style={{ backgroundColor: '#25d366', color: 'white', padding: '0.35rem 0.65rem', fontSize: '0.75rem', textDecoration: 'none' }}
                    >
                      <MessageCircle size={14} /> Order
                    </a>
                  </div>
                </div>
              )) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No digital menu items listed yet.</p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={getWhatsAppLink(selectedMerchant)}
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{ backgroundColor: '#25d366', color: 'white', flex: 1, justifyContent: 'center', textDecoration: 'none' }}
              >
                <MessageCircle size={16} /> Direct WhatsApp Chat
              </a>
              <button className="btn btn-secondary" onClick={() => setSelectedMerchant(null)} style={{ flex: 1, justifyContent: 'center' }}>
                Close Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Merchant Self-Onboarding Portal Modal */}
      {showOnboardingModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button
              onClick={() => setShowOnboardingModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>
              🏪 Merchant Self-Onboarding Portal
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              List your Moshi shop or restaurant for free. Receive customer orders directly on WhatsApp!
            </p>

            <form onSubmit={handleCreateStore}>
              <div className="form-group">
                <label className="form-label">Business / Shop Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Swad Maharashtrian Hotel / Spine City Bakery"
                  value={newStore.business_name}
                  onChange={e => setNewStore({ ...newStore, business_name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={newStore.category}
                  onChange={e => setNewStore({ ...newStore, category: e.target.value })}
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Shop Address in Moshi</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Shop 4, Moshi Chowk, Dehu-Alandi Road"
                  value={newStore.address}
                  onChange={e => setNewStore({ ...newStore, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+91 98XXXXXXXX"
                  value={newStore.phone}
                  onChange={e => setNewStore({ ...newStore, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp Number for Direct Orders</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="9198XXXXXXXX"
                  value={newStore.whatsapp_number}
                  onChange={e => setNewStore({ ...newStore, whatsapp_number: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Special Discount / Offer Banner (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Free Sweet Lassi on orders above ₹250"
                  value={newStore.special_offer}
                  onChange={e => setNewStore({ ...newStore, special_offer: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <CheckCircle size={18} /> Publish Shop Listing
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowOnboardingModal(false)} style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 1100,
          padding: '1rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '420px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
              Add Dish or Item to Digital Menu
            </h3>
            <form onSubmit={handleAddItemToCatalog}>
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Special Veg Thali / Fresh Paneer 500g"
                  value={newItem.item_name}
                  onChange={e => setNewItem({ ...newItem, item_name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 180"
                  value={newItem.price}
                  onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Served with 2 Chapati, Rice & Solkadhi"
                  value={newItem.description}
                  onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Save Item
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddItemModal(false)} style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
