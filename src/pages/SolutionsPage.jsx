import React from 'react';
import { solutionsData } from '../data/solutionsData';
import { BookOpen, User, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SolutionsPage = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8F0] border border-[#CBD5E1] text-[#3A8899] text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <BookOpen className="w-4 h-4" />
            <span>Technical Guides & Trade Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Engineering Solutions & Knowledge Base
          </h1>
          <p className="text-sm text-[#475569] font-medium max-w-xl mx-auto">
            Technical information on industrial machinery equipment, cosmetics import/export standards, and cross-border trade logistics between Turkey and Iraq.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-10 max-w-4xl mx-auto">
          {solutionsData.map((article) => (
            <article
              key={article.id}
              id={article.id}
              className="rounded-2xl bg-white border-2 border-[#CBD5E1] p-8 shadow-sharp space-y-6"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] font-medium">
                  <span className="px-3 py-1 rounded-md bg-[#3A8899] text-white font-extrabold uppercase">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#3A8899]" /> {article.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#3A8899]" /> {article.author}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-snug font-display">
                  {article.title}
                </h2>
              </div>

              {/* Full Article HTML Body */}
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="prose prose-slate max-w-none text-[#475569] leading-relaxed text-sm space-y-4"
              />

              <div className="pt-6 border-t border-[#CBD5E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs text-[#64748B] font-semibold">
                  Need official pro-forma RFQ or technical advice for your facility?
                </span>

                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-xl bg-[#3A8899] hover:bg-[#2B6F7E] text-white text-xs font-extrabold shadow-sm flex items-center gap-2 shrink-0 font-sans"
                >
                  <span>Talk to Sales Representative</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
