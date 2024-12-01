'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { Button } from "../Tourist/Components/ui/button";
export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1 },
        { id: 2, name: "Smartphone Case", price: 19.99, quantity: 2 },
        { id: 3, name: "USB-C Cable", price: 9.99, quantity: 3 },
    ]);
    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item => item.id === id ? Object.assign(Object.assign({}, item), { quantity: Math.max(0, newQuantity) }) : item).filter(item => item.quantity > 0));
    };
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (_jsxs("div", { className: "container mx-auto p-4 max-w-2xl", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Your Shopping Cart" }), cartItems.length === 0 ? (_jsx("p", { children: "Your cart is empty." })) : (_jsxs(_Fragment, { children: [_jsx("ul", { className: "space-y-4", children: cartItems.map(item => (_jsxs("li", { className: "flex items-center justify-between border-b pb-2", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-semibold", children: item.name }), _jsxs("p", { className: "text-sm text-gray-500", children: ["$", item.price.toFixed(2), " each"] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => updateQuantity(item.id, item.quantity - 1), className: "text-gray-500 hover:text-gray-700", "aria-label": "Decrease quantity", children: _jsx(MinusCircle, { size: 20 }) }), _jsx("span", { className: "w-8 text-center", children: item.quantity }), _jsx("button", { onClick: () => updateQuantity(item.id, item.quantity + 1), className: "text-gray-500 hover:text-gray-700", "aria-label": "Increase quantity", children: _jsx(PlusCircle, { size: 20 }) }), _jsx("button", { onClick: () => removeItem(item.id), className: "text-red-500 hover:text-red-700 ml-2", "aria-label": "Remove item", children: _jsx(Trash2, { size: 20 }) })] })] }, item.id))) }), _jsxs("div", { className: "mt-4 flex justify-between items-center", children: [_jsxs("p", { className: "text-xl font-bold", children: ["Total: $", total.toFixed(2)] }), _jsx(Button, { children: "Proceed to Checkout" })] })] }))] }));
}
//# sourceMappingURL=shoppingCart.js.map