"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, Search, Sparkles, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchFilters from '@/components/placement-dsa/SearchFilters';
import QuestionsTable from '@/components/placement-dsa/QuestionsTable';
import FeaturesSection from '@/components/placement-dsa/FeaturesSection';
import CompanyGrid from '@/components/placement-dsa/CompanyGrid';
import CompanyLogo from '@/components/placement-dsa/CompanyLogo';
import { useCSVQuestions } from '@/hooks/use-csv-questions';
const PlacementDSA = () => {
    const [selectedCompany, setSelectedCompany] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('All');
    const [topicFilter, setTopicFilter] = useState('All');
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [copiedQuestionId, setCopiedQuestionId] = useState(null);
    const [companySearchTerm, setCompanySearchTerm] = useState('');
    // Use the CSV questions hook
    const { questions, isLoading, error, companies } = useCSVQuestions(selectedCompany);
    const cardVariants = {
        hidden: {
            y: 30,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.4
            }
        }
    };
    // Filter companies based on search term
    const filteredCompanies = companies.filter(company => company.toLowerCase().includes(companySearchTerm.toLowerCase()));
    // Function to handle copying question title
    const handleCopyQuestion = (questionId, questionTitle) => {
        navigator.clipboard.writeText(questionTitle)
            .then(() => {
            setCopiedQuestionId(questionId);
            toast.success("Question title copied to clipboard!", {
                duration: 2000,
            });
            setTimeout(() => {
                setCopiedQuestionId(null);
            }, 3000);
        })
            .catch(err => {
            console.error("Failed to copy question: ", err);
            toast.error("Failed to copy question.", {
                duration: 2000,
            });
        });
    };
    // Function to filter questions
    const filterQuestions = useCallback(() => {
        let results = questions;
        // Filter by search term
        if (searchTerm) {
            results = results.filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // Filter by difficulty
        if (difficultyFilter !== 'All') {
            results = results.filter(q => q.difficulty === difficultyFilter);
        }
        // Filter by topic
        if (topicFilter !== 'All') {
            results = results.filter(q => q.topics.includes(topicFilter));
        }
        setFilteredQuestions(results);
    }, [questions, searchTerm, difficultyFilter, topicFilter]);
    useEffect(() => {
        filterQuestions();
    }, [filterQuestions]);
    // Extract unique difficulties and topics for filter options
    const difficulties = ['All', ...new Set(questions.map(q => q.difficulty))];
    const allTopics = questions.flatMap(q => q.topics);
    const topics = ['All', ...new Set(allTopics)];
    // Function to handle company selection
    const handleCompanySelect = (company) => {
        setSelectedCompany(company);
        setSearchTerm('');
        setDifficultyFilter('All');
        setTopicFilter('All');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    // Function to go back to company selection
    const handleBackToCompanies = () => {
        setSelectedCompany('');
        setSearchTerm('');
        setDifficultyFilter('All');
        setTopicFilter('All');
        setCompanySearchTerm('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    // Format company name for display
    const formatCompanyName = (company) => {
        return company
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    // Scroll to main content
    const scrollToContent = () => {
        const element = document.getElementById('company-archives');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    // Render loading state
    if (isLoading && selectedCompany) {
        return (<div className="min-h-screen bg-mn-primary text-on-primary flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col justify-center items-center py-40">
          <div className="w-16 h-16 rounded-full border-4 border-surface-tint border-t-transparent animate-spin mb-6"/>
          <h2 className="font-headline-md text-xl text-on-primary mb-2">
            Loading {formatCompanyName(selectedCompany)} Question Set...
          </h2>
          <p className="text-on-primary/60 text-sm font-body-md">
            Analyzing company archives and frequency weighting
          </p>
        </div>
        <Footer />
      </div>);
    }
    // Render error state
    if (error && selectedCompany) {
        return (<div className="min-h-screen bg-mn-primary text-on-primary flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col justify-center items-center py-40 px-6 text-center max-w-md mx-auto">
          <div className="p-4 bg-error-container text-error rounded-full mb-4">
            <XCircle className="h-10 w-10"/>
          </div>
          <h2 className="font-headline-md text-xl text-on-primary mb-2">Unable to Load Questions</h2>
          <p className="text-on-primary/70 text-sm font-body-md mb-6">{error}</p>
          <Button onClick={handleBackToCompanies} className="bg-surface-container-lowest text-mn-primary rounded-full px-6 py-2 font-label-caps text-xs tracking-wider">
            Back to All Companies
          </Button>
        </div>
        <Footer />
      </div>);
    }
    return (<div className="min-h-screen bg-mn-background text-on-background relative selection:bg-surface-tint/30">
      <Navbar />

      {/* ── Crazy Deep Emerald Hero Section ── */}
      <section className="relative bg-mn-primary pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="flex flex-col items-center text-center max-w-3xl mx-auto" variants={cardVariants} initial="hidden" animate="visible">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 w-fit">
              <Sparkles className="w-4 h-4 text-surface-tint"/>
              <span className="font-label-caps text-label-caps text-surface-tint tracking-widest uppercase">
                {selectedCompany ? `${formatCompanyName(selectedCompany)} Archive` : "Technical Interview Vault"}
              </span>
            </div>

            {selectedCompany ? (
        /* Selected Company Hero Banner */
        <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-5 p-6 rounded-[32px] glass-panel border border-white/20 shadow-2xl">
                  <div className="w-20 h-20 rounded-2xl bg-white p-3 flex items-center justify-center shadow-xl border border-white/40 shrink-0">
                    <CompanyLogo company={selectedCompany} className="w-full h-full object-contain"/>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <h1 className="font-display-lg text-display-lg-mobile md:text-headline-lg text-on-primary font-bold">
                        {formatCompanyName(selectedCompany)}
                      </h1>
                    </div>
                    <p className="font-body-md text-on-primary/80 text-sm max-w-md">
                      Verified problem archives asked in actual technical rounds and screening assessments.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={handleBackToCompanies} className="flex items-center gap-2 px-6 py-2.5 rounded-full glass-panel text-on-primary hover:bg-white/15 transition-all text-xs font-label-caps tracking-widest">
                    <ArrowLeft className="w-4 h-4"/>
                    <span>Back to All Companies</span>
                  </button>
                  <span className="px-5 py-2.5 rounded-full bg-surface-container-lowest text-mn-primary text-xs font-label-caps tracking-widest font-bold shadow-md">
                    {questions.length} Questions
                  </span>
                </div>
              </div>) : (
        /* All Companies Directory Hero */
        <>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary leading-tight mb-6">
                  Master Company-Wise <br />
                  <span className="text-surface-tint">Placement DSA.</span>
                </h1>

                <p className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mx-auto leading-relaxed mb-8">
                  Crush technical interviews at <span className="text-on-primary font-semibold">190+ top tech giants</span>, 
                  investment banks, and high-growth unicorns with curated and frequency-ranked problem sets.
                </p>

                {/* Quick Stats Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl pt-2 mb-8">
                  {[
                { label: "Companies", val: "190+" },
                { label: "DSA Problems", val: "15,000+" },
                { label: "Ranked By", val: "Frequency" },
                { label: "Cost", val: "100% Free" },
            ].map((stat, i) => (<div key={i} className="p-3 rounded-2xl glass-panel text-center">
                      <div className="font-headline-md text-xl text-on-primary font-bold">{stat.val}</div>
                      <div className="text-[10px] font-label-caps text-on-primary/60 uppercase tracking-widest mt-0.5">{stat.label}</div>
                    </div>))}
                </div>

                {/* Instant Company Search in Hero */}
                <div className="w-full max-w-lg relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-primary/60 group-focus-within:text-surface-tint transition-colors pointer-events-none">
                    <Search className="h-5 w-5"/>
                  </div>
                  <Input type="text" placeholder="Search 190+ companies (e.g. Google, Amazon, Uber)..." value={companySearchTerm} onChange={(e) => setCompanySearchTerm(e.target.value)} className="pl-12 pr-10 bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-on-primary/50 focus-visible:ring-2 focus-visible:ring-surface-tint focus-visible:border-transparent h-14 rounded-full shadow-2xl transition-all font-body-md text-base"/>
                  {companySearchTerm && (<button onClick={() => setCompanySearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-primary/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                      <X className="h-4 w-4"/>
                    </button>)}
                </div>

                {/* ── Scroll Down Pop Up Indicator ── */}
                <motion.button onClick={scrollToContent} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} whileHover={{ scale: 1.05, y: 2 }} whileTap={{ scale: 0.96 }} className="mt-6 group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-surface-tint/60 text-on-primary text-xs font-label-caps tracking-widest uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface-tint opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-surface-tint"></span>
                  </span>
                  <span className="font-semibold text-on-primary group-hover:text-surface-tint transition-colors">
                    Scroll Down To Explore
                  </span>
                  <div className="w-5 h-5 rounded-full bg-surface-tint/30 flex items-center justify-center group-hover:bg-surface-tint group-hover:text-mn-primary transition-all">
                    <ChevronDown className="w-3.5 h-3.5 animate-bounce"/>
                  </div>
                </motion.button>
              </>)}
          </motion.div>
        </div>
      </section>

      {/* ── Main Interactive Content Area ── */}
      <main id="company-archives" className="max-w-7xl mx-auto px-6 md:px-16 py-12 relative z-10 scroll-mt-24">
        {!selectedCompany ? (
        /* Company Selection Grid */
        <>
            <CompanyGrid companies={filteredCompanies} onCompanySelect={handleCompanySelect}/>

            {/* Why Practice Bento Features */}
            <FeaturesSection />
          </>) : (
        /* Selected Company Questions View */
        <>
            {/* Search and Filters */}
            <SearchFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} difficultyFilter={difficultyFilter} setDifficultyFilter={setDifficultyFilter} topicFilter={topicFilter} setTopicFilter={setTopicFilter} difficulties={difficulties} topics={topics}/>

            {/* Questions Table with Interactive Mastery Hub */}
            <QuestionsTable filteredQuestions={filteredQuestions} copiedQuestionId={copiedQuestionId} handleCopyQuestion={handleCopyQuestion}/>
          </>)}
      </main>

      <Footer />
    </div>);
};
export default PlacementDSA;
