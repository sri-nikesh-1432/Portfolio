import { jsPDF } from 'jspdf';
import {
  BUILDING_PROJECTS,
  CERTIFICATIONS,
  COMPLETED_SYSTEMS,
  EXPERIENCE,
  MINI_PROJECTS,
  MUSIC,
  PERSONAL,
  RESEARCH,
  SKILLS,
} from '../data/portfolioData';

/* ------------------------------------------------------------------ */
/*  Real, selectable-text PDF resume (ATS-friendly, standard fonts)    */
/* ------------------------------------------------------------------ */

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 17;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FOOTER_Y = PAGE_HEIGHT - 10;

const INK: [number, number, number] = [14, 21, 38];
const SOFT: [number, number, number] = [42, 53, 80];
const MUTED: [number, number, number] = [90, 107, 133];
const BLUE: [number, number, number] = [59, 111, 224];

const CATEGORY_ORDER = ['Programming Languages', 'AI & Machine Learning', 'Data & Analytics', 'Professional & Tools'];
const CATEGORY_LABELS: Record<string, string> = {
  'Programming Languages': 'Programming',
  'AI & Machine Learning': 'AI / ML',
  'Data & Analytics': 'Data & Analytics',
  'Professional & Tools': 'Professional & Tools',
};

const skillLineFor = (category: string): string =>
  SKILLS.filter((s) => s.category === category).map((s) => s.name).join(', ');

const shortUrl = (url: string): string => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/*
 * Standard WinAnsi fonts only support a limited glyph set. Em/en dashes,
 * bullets and middle dots are safe, but arrows (→/←) are not — normalize
 * them so jsPDF renders clean text instead of garbage.
 */
const clean = (s: string): string => s.replace(/→/g, '>').replace(/←/g, '<');

export const downloadResumePdf = (filename = 'Datta_Srinikesh_Chinta_Resume.pdf'): void => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const font = 'helvetica';
  let y = MARGIN;

  const ensure = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - 20) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const write = (
    content: string,
    size: number,
    opts: { bold?: boolean; color?: [number, number, number]; gapAfter?: number; indent?: number } = {}
  ) => {
    const maxWidth = CONTENT_WIDTH - (opts.indent ?? 0);
    const lines = doc.splitTextToSize(clean(content), maxWidth) as string[];
    const lineHeight = size * 0.5;
    ensure(lines.length * lineHeight + (opts.gapAfter ?? 0));
    doc.setFont(font, opts.bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...(opts.color ?? INK));
    doc.text(lines, MARGIN + (opts.indent ?? 0), y);
    y += lines.length * lineHeight + (opts.gapAfter ?? 0);
  };

  const bullet = (content: string, size = 9.6, gapAfter = 1.4) => {
    write(`\u2022  ${content}`, size, { indent: 2.5, gapAfter });
  };

  const section = (title: string) => {
    ensure(12);
    y += 2.5;
    write(title.toUpperCase(), 11, { bold: true, gapAfter: 1 });
    doc.setDrawColor(...INK);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y - 0.8, PAGE_WIDTH - MARGIN, y - 0.8);
    y += 2.5;
  };

  const education = EXPERIENCE.find((e) => e.type === 'education');
  const workExperience = EXPERIENCE.filter((e) => e.type !== 'education');

  /* ---------- Header ---------- */
  write('DATTA SRINIKESH CHINTA', 19, { bold: true, gapAfter: 1.5 });
  write('AI / ML ENGINEER', 11, { color: BLUE, bold: true, gapAfter: 1.5 });
  write(`${PERSONAL.location}  \u00b7  ${PERSONAL.email}  \u00b7  ${PERSONAL.phone}`, 9.3, {
    color: SOFT,
    gapAfter: 1,
  });
  write(
    `GitHub: ${shortUrl(PERSONAL.links.github)}    \u00b7    LinkedIn: ${shortUrl(PERSONAL.links.linkedin)}    \u00b7    Portfolio: ${shortUrl(PERSONAL.links.portfolio)}`,
    9.3,
    { color: SOFT, gapAfter: 2 }
  );
  doc.setDrawColor(...INK);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 4;

  /* ---------- Summary ---------- */
  section('Summary');
  write(
    'AI / ML engineer focused on building production-oriented intelligent systems \u2014 voice AI, retrieval-augmented generation (RAG), AI agents and full-stack AI products. Experience across SaaS product development, conversational AI, multilingual voice systems and machine learning. Six completed projects across AI systems and data science; several projects in active development; pre-publication research in spectroscopic AI.',
    9.6,
    { gapAfter: 1 }
  );

  /* ---------- Experience ---------- */
  section('Experience');
  workExperience.forEach((exp) => {
    write(`${exp.role} \u2014 ${exp.company}`, 10.5, { bold: true, gapAfter: 0.8 });
    write(
      `${exp.period}  \u00b7  ${exp.location}${exp.orgUnit ? `  \u00b7  ${exp.orgUnit}` : ''}${
        exp.current ? '  \u00b7  Current' : ''
      }`,
      9,
      { color: SOFT, gapAfter: 1.6 }
    );
    exp.highlights.forEach((h) => bullet(h));
    write(`Tech: ${exp.technologies.join(', ')}`, 9, { color: MUTED, gapAfter: 2.6 });
  });

  /* ---------- Projects ---------- */
  section('Projects');
  COMPLETED_SYSTEMS.forEach((sys) => {
    write(`${sys.name}${sys.venue ? ` \u2014 ${sys.venue}` : ''}  [Completed]`, 10.5, { bold: true, gapAfter: 0.8 });
    write(sys.description, 9.6, { gapAfter: 0.8 });
    write(`Tech: ${sys.technology.join(', ')}`, 9, { color: MUTED, gapAfter: 2.6 });
  });
  write('DATA SCIENCE & ML PROJECTS', 9.6, { bold: true, gapAfter: 0.8 });
  write(
    MINI_PROJECTS.map((p) => `${p.title} (${p.date})`).join('  \u00b7  '),
    9.3,
    { color: SOFT, gapAfter: 1 }
  );
  write('PROJECTS IN DEVELOPMENT', 9.6, { bold: true, gapAfter: 0.8 });
  write(
    BUILDING_PROJECTS.map((p) => `${p.name} (${p.status.toLowerCase()})`).join('  \u00b7  '),
    9.3,
    { color: SOFT, gapAfter: 1 }
  );

  /* ---------- Education ---------- */
  section('Education');
  if (education) {
    write(education.role, 10.5, { bold: true, gapAfter: 0.8 });
    write(
      `${education.company}  \u00b7  ${education.location}  \u00b7  ${education.period}`,
      9.3,
      { color: SOFT, gapAfter: 0.8 }
    );
    write(`CGPA: ${PERSONAL.education.cgpa}`, 9.3, { color: SOFT, gapAfter: 1 });
  }

  /* ---------- Skills ---------- */
  section('Technical Skills');
  CATEGORY_ORDER.forEach((cat) => {
    write(`${CATEGORY_LABELS[cat] || cat}: ${skillLineFor(cat)}`, 9.6, { gapAfter: 1.6 });
  });

  /* ---------- Certifications ---------- */
  section('Certifications');
  CERTIFICATIONS.forEach((c) => {
    bullet(`${c.title} \u2014 ${c.issuer} (${c.date})`, 9.4, 1.2);
  });

  /* ---------- Research ---------- */
  section('Research');
  write(RESEARCH.title, 10, { bold: true, gapAfter: 1 });
  write('Status: Pre-Publication Research \u2014 Yet to be Published', 9.3, { color: SOFT, gapAfter: 1 });

  /* ---------- Achievements ---------- */
  section('Achievements');
  write(
    `${MUSIC.institution} \u2014 ${MUSIC.qualification} \u2014 ${MUSIC.instrument}: Grade 4 Practical & Grade 4 Theory (${MUSIC.totalCertifications} certifications)`,
    9.6,
    { gapAfter: 1 }
  );

  /* ---------- Footer page numbers ---------- */
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont(font, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(`Page ${i} of ${pages} \u2014 Datta Srinikesh Chinta`, PAGE_WIDTH / 2, FOOTER_Y, {
      align: 'center',
    });
  }

  doc.save(filename);
};
