import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-lux-black">
      {/* Main Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-lux-green/40 via-lux-black to-lux-black"></div>
      
      {/* Radial Glow Top Left */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-lux-green/20 rounded-full blur-3xl"></div>
      
      {/* Radial Glow Bottom Right */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-lux-gold/10 rounded-full blur-3xl"></div>

      {/* Mesh Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>
    </div>
  );
};