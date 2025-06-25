import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const { mode } = useTheme();
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const saveOrderToJSON = async (orderData: {
    orderId: string;
    customerDetails: CustomerDetails;
    items: CartItem[];
    total: number;
    date: string;
  }) => {
    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving order:', error);
      
      // Fallback: Save to localStorage if backend is unavailable
      const orders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
      orders.push(orderData);
      localStorage.setItem('pendingOrders', JSON.stringify(orders));
      
      return { success: true, message: 'Order saved locally' };
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderId = `DO${Date.now()}`;
      
      // Save order to database or fallback to localStorage
      await saveOrderToJSON({
        orderId,
        customerDetails,
        items: cartItems,
        total: getTotalPrice(),
        date: new Date().toISOString()
      });

      setIsOrderPlaced(true);
      clearCart();
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsOrderPlaced(false);
        setShowCheckout(false);
        setCustomerDetails({
          name: '',
          email: '',
          phone: '',
          address: '',
          notes: ''
        });
        toggleCart();
      }, 3000);
      
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Failed to submit order. Please try again or call us directly at +91 98765 43210');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleCart}
      />
      
      {/* Cart Sidebar */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md transform transition-transform duration-300 ${
        mode === 'lovable'
          ? 'bg-gradient-to-b from-pink-50 to-purple-50'
          : 'bg-gradient-to-b from-orange-50 to-red-50'
      } shadow-2xl overflow-hidden`}>
        
        
        {!showCheckout ? (
          // Cart Items View
          <>
            {/* Header */}
            <div className={`p-4 border-b ${
              mode === 'lovable' ? 'border-pink-200' : 'border-orange-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className={`w-6 h-6 ${
                    mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                  }`} />
                  <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    mode === 'lovable'
                      ? 'bg-pink-100 text-pink-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {cartItems.length} items
                  </span>
                </div>
                <button
                  onClick={toggleCart}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add some delicious items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              mode === 'lovable'
                                ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                                : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                            } transition-colors`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <span className="font-medium text-gray-800 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              mode === 'lovable'
                                ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                                : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                            } transition-colors`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <span className={`font-bold ${
                          mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                        }`}>
                          ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className={`p-4 border-t ${
                mode === 'lovable' ? 'border-pink-200' : 'border-orange-200'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className={`text-2xl font-bold ${
                    mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                  }`}>
                    ₹{getTotalPrice().toFixed(0)}
                  </span>
                </div>
                
                <button
                  onClick={() => setShowCheckout(true)}
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    mode === 'lovable'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                      : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                  } text-white shadow-lg hover:shadow-xl`}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        ) : (
          // Checkout Form View
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className={`p-4 border-b ${
              mode === 'lovable' ? 'border-pink-200' : 'border-orange-200'
            }`}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {isOrderPlaced ? (
              // Order Success View
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <CheckCircle className={`w-20 h-20 mx-auto mb-6 ${
                    mode === 'lovable' ? 'text-pink-500' : 'text-orange-500'
                  }`} />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your order. We'll contact you shortly to confirm the details.
                  </p>
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                    mode === 'lovable'
                      ? 'bg-pink-100 text-pink-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    <span className="text-sm font-medium">Order Total: ₹{getTotalPrice().toFixed(0)}</span>
                  </div>
                </div>
              </div>
            ) : (
              // Checkout Form
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    {/* Customer Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Customer Details</h3>
                      
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={customerDetails.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Full Name"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={customerDetails.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Email Address"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={customerDetails.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Phone Number"
                        />
                      </div>

                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="address"
                          value={customerDetails.address}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Delivery Address"
                        />
                      </div>

                      <textarea
                        name="notes"
                        value={customerDetails.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        placeholder="Special instructions (optional)"
                      />
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(0)}</span>
                          </div>
                        ))}
                        <div className={`flex justify-between font-semibold pt-2 border-t ${
                          mode === 'lovable' ? 'border-pink-200' : 'border-orange-200'
                        }`}>
                          <span>Total:</span>
                          <span className={mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'}>
                            ₹{getTotalPrice().toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Submit Button */}
                <div className={`p-4 border-t ${
                  mode === 'lovable' ? 'border-pink-200' : 'border-orange-200'
                }`}>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      mode === 'lovable'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                        : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                    } text-white shadow-lg hover:shadow-xl`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Placing Order...</span>
                      </div>
                    ) : (
                      <span>Place Order</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      
      </div>
    </div>
  );
};

export default Cart;