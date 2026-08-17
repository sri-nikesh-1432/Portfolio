import React from 'react';
import { ExternalLink, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { COMPLETED_SYSTEMS, PERSONAL } from '../data/portfolioData';

export const Contact: React.FC = () => {
  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Contact"
        title={<>Let's build something intelligent.</>}
        description="Open to internships, collaborations, research opportunities and building real AI systems. Reach out through any channel below."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Direct contact */}
        <Reveal>
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: PERSONAL.email,
                href: `mailto:${PERSONAL.email}`,
                ariaLabel: 'Email Datta Srinikesh Chinta',
                color: 'from-accent-blue to-accent-lavender',
              },
              {
                icon: Phone,
                label: 'Phone',
                value: PERSONAL.phone,
                href: `tel:${PERSONAL.phone.replace(/\s/g, '')}`,
                ariaLabel: 'Call Datta Srinikesh Chinta',
                color: 'from-accent-teal to-accent-blue',
              },
              {
                icon: MapPin,
                label: 'Location',
                value: PERSONAL.location,
                href: 'https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20Telangana%2C%20India',
                ariaLabel: "View Datta Srinikesh Chinta's location in Google Maps",
                external: true,
                color: 'from-accent-gold to-accent-red',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="glass glass-hover flex items-center gap-4 rounded-2xl p-5"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-card`}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    aria-label={item.ariaLabel}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-0.5 block truncate text-[14.5px] font-medium text-ink transition-colors hover:text-accent-blue"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Social links */}
        <Reveal delay={120}>
          <div className="glass holo-border rounded-3xl p-7">
            <p className="eyebrow text-accent-blue">Find me online</p>
            <div className="mt-5 space-y-3">
              {[
                { icon: Github, label: 'GitHub', value: '@sri-nikesh-1432', href: PERSONAL.links.github },
                { icon: Linkedin, label: 'LinkedIn', value: 'Datta Srinikesh Chinta', href: PERSONAL.links.linkedin },
                { icon: ExternalLink, label: 'Portfolio', value: 'dattasrinikeshchinta.netlify.app', href: PERSONAL.links.portfolio },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-blue/40"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-muted transition-colors group-hover:text-accent-blue">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-[13.5px] font-medium text-ink">{s.label}</p>
                    <p className="text-[12px] text-muted">{s.value}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-faint transition-colors group-hover:text-accent-blue" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Completed projects links */}
      <Reveal>
        <div className="glass rounded-3xl p-7">
          <p className="eyebrow text-accent-teal">Try my completed projects</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {COMPLETED_SYSTEMS.map((sys) => (
              <a
                key={sys.id}
                href={sys.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-teal/50"
              >
                <div>
                  <p className="text-[14px] font-medium text-ink">{sys.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-status-green">
                    {sys.badge}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-transform group-hover:translate-x-0.5">
                  <Send className="h-4 w-4 text-accent-teal" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};
