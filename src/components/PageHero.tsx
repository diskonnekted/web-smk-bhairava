import React from 'react';
import Image from 'next/image';

interface PageHeroProps {
  title: string;
  subtitle: string;
  bgImage: string;
  badge: string;
  priority?: boolean;
}

export default function PageHero({ title, subtitle, bgImage, badge, priority = false }: PageHeroProps) {
  return (
    <section className="pt-40 pb-20 px-6 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
        <Image src={bgImage} alt="Hero Background" fill className="object-cover" sizes="50vw" priority={priority} />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
          <span>{badge}</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            {title.split('<br />').map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    {i < title.split('<br />').length - 1 && <br />}
                </React.Fragment>
            ))}
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
