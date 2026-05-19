'use client';

import React, { useEffect, useRef, useState } from 'react';
import type * as L from 'leaflet';

export default function CartoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Load Leaflet dynamically
    import('leaflet').then((Leaflet) => {
      if (!mapRef.current) return;

      // Ensure CSS is loaded
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      const currentMap = Leaflet.map(mapRef.current, { 
        zoomControl: false, 
        scrollWheelZoom: false 
      }).setView([-6.2615, 106.8106], 14);
      
      setMapInstance(currentMap);

      Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(currentMap);

      const markerIcon = Leaflet.divIcon({
        className: 'bg-transparent border-none',
        html: `<div class="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center justify-center animate-bounce"><div class="w-2 h-2 bg-white rounded-full"></div></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      Leaflet.marker([-6.2615, 106.8106], { icon: markerIcon })
        .addTo(currentMap)
        .bindPopup('<div class="text-center p-1"><b class="text-slate-900 font-black text-sm uppercase tracking-widest">SMK Bhairava</b><br><span class="text-slate-500 text-xs font-bold mt-1 block">Pusat Inovasi Teknologi<br/>Jakarta Selatan</span></div>', {
            closeButton: false,
            className: 'custom-popup'
        })
        .openPopup();
        
      Leaflet.control.zoom({ position: 'bottomright' }).addTo(currentMap);
    });

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []); 

  return (
    <div className="w-full h-full relative z-0">
      <div ref={mapRef} className="w-full h-full z-0" style={{ zIndex: 0 }} />
      <style dangerouslySetInnerHTML={{
        __html: `
        .leaflet-popup-content-wrapper {
            border-radius: 1rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            border: 1px solid #f1f5f9;
        }
        .leaflet-popup-tip {
            box-shadow: none;
        }
        `
      }} />
    </div>
  );
}
