
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black">C</div>
            <span className="text-xl font-bold text-white tracking-tight">CarbonSmart</span>
          </div>
          <p className="text-sm leading-relaxed">
            Empowering individuals to measure, understand, and reduce their personal carbon footprint through data and habit change.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Daily Tracker</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Impact Analytics</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Green Rewards</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Sustainability Blog</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Carbon Calculator API</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Eco-tips Guide</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Connect</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Newsletter</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Twitter / X</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest font-bold">
        <p>© 2025 CarbonSmart Inc. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;