"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Calculator, Building2, RefreshCw, ChevronUp, ChevronDown, BarChart as ChartIcon, SlidersHorizontal } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);
// Company data with tier categorization
const companyTiers = {
    'S+': { minCGPA: 8.0, companies: [], ctc: '₹30+ LPA', color: '#FF5A36' },
    'A+': { minCGPA: 7.5, companies: [], ctc: '₹20-30 LPA', color: '#FF6A3D' },
    'A': { minCGPA: 7.5, companies: [], ctc: '₹10-20 LPA', color: '#F4512C' },
    'B': { minCGPA: 7.0, companies: [], ctc: '₹5-10 LPA', color: '#D6D2C9' },
    'C': { minCGPA: 6.0, companies: [], ctc: 'Below ₹5 LPA', color: '#9B9992' }
};
// Company data
const companyData = [
    // S+ Tier Companies (₹30+ LPA)
    { name: 'McKinsey & Company', tier: 'S+', cgpa: 8.0 },
    { name: 'Boston Consulting Group', tier: 'S+', cgpa: 8.0 },
    { name: 'Bain & Company', tier: 'S+', cgpa: 8.0 },
    { name: 'Goldman Sachs', tier: 'S+', cgpa: 8.0 },
    { name: 'Morgan Stanley', tier: 'S+', cgpa: 8.0 },
    { name: 'Tower Research Capital', tier: 'S+', cgpa: 8.0 },
    { name: 'Jane Street', tier: 'S+', cgpa: 8.0 },
    { name: 'Google', tier: 'S+', cgpa: 8.0 },
    { name: 'Facebook', tier: 'S+', cgpa: 8.0 },
    { name: 'Apple', tier: 'S+', cgpa: 8.0 },
    { name: 'Microsoft', tier: 'S+', cgpa: 7.5 },
    { name: 'Amazon (for select roles)', tier: 'S+', cgpa: 7.5 },
    { name: 'Uber (for select roles)', tier: 'S+', cgpa: 7.5 },
    { name: 'DE Shaw & Co.', tier: 'S+', cgpa: 8.0 },
    { name: 'WorldQuant', tier: 'S+', cgpa: 8.0 },
    { name: 'BlackRock', tier: 'S+', cgpa: 7.5 },
    // A+ Tier Companies (₹20-30 LPA)
    { name: 'Adobe', tier: 'A+', cgpa: 7.5 },
    { name: 'Oracle', tier: 'A+', cgpa: 7.5 },
    { name: 'SAP Labs', tier: 'A+', cgpa: 7.5 },
    { name: 'Cisco Systems', tier: 'A+', cgpa: 7.5 },
    { name: 'Qualcomm', tier: 'A+', cgpa: 7.5 },
    { name: 'Intel', tier: 'A+', cgpa: 7.5 },
    { name: 'Samsung R&D', tier: 'A+', cgpa: 7.5 },
    { name: 'Flipkart', tier: 'A+', cgpa: 7.5 },
    { name: 'Myntra', tier: 'A+', cgpa: 7.5 },
    { name: 'Ola Cabs', tier: 'A+', cgpa: 7.5 },
    { name: 'Paytm', tier: 'A+', cgpa: 7.5 },
    { name: 'Zomato', tier: 'A+', cgpa: 7.5 },
    { name: 'Swiggy', tier: 'A+', cgpa: 7.5 },
    { name: 'Infosys (for select roles)', tier: 'A+', cgpa: 7.5 },
    { name: 'Wipro (for select roles)', tier: 'A+', cgpa: 7.5 },
    { name: 'Tata Consultancy Services (for select roles)', tier: 'A+', cgpa: 7.5 },
    { name: 'Reliance Industries (for select roles)', tier: 'A+', cgpa: 7.5 },
    // A Tier Companies (₹10-20 LPA)
    { name: 'IBM India', tier: 'A', cgpa: 7.5 },
    { name: 'HCL Technologies', tier: 'A', cgpa: 7.5 },
    { name: 'Tech Mahindra', tier: 'A', cgpa: 7.5 },
    { name: 'Cognizant', tier: 'A', cgpa: 7.5 },
    { name: 'Capgemini', tier: 'A', cgpa: 7.5 },
    { name: 'Mindtree', tier: 'A', cgpa: 7.0 },
    { name: 'Mphasis', tier: 'A', cgpa: 7.0 },
    { name: 'Hexaware Technologies', tier: 'A', cgpa: 7.0 },
    { name: 'Birlasoft', tier: 'A', cgpa: 7.0 },
    { name: 'Cyient', tier: 'A', cgpa: 7.0 },
    { name: 'KPIT Technologies', tier: 'A', cgpa: 7.0 },
    { name: 'L&T Infotech', tier: 'A', cgpa: 7.5 },
    { name: 'Sonata Software', tier: 'A', cgpa: 7.0 },
    { name: 'Sasken Technologies', tier: 'A', cgpa: 7.0 },
    // B Tier Companies (₹5-10 LPA)
    { name: 'Small startups or entry-level roles in various industries', tier: 'B', cgpa: 6.0 },
    { name: 'ABC Tech Solutions', tier: 'B', cgpa: 6.0 },
    { name: 'XYZ Innovations', tier: 'B', cgpa: 6.0 },
    { name: 'PQR Software', tier: 'B', cgpa: 6.0 },
    { name: 'Startup A', tier: 'B', cgpa: 6.0 },
    { name: 'Tech Co.', tier: 'B', cgpa: 6.0 },
    { name: 'Data Systems', tier: 'B', cgpa: 6.0 },
    { name: 'Future Tech', tier: 'B', cgpa: 6.0 },
    { name: 'Innovate Solutions', tier: 'B', cgpa: 6.0 },
    { name: 'Creative Labs', tier: 'B', cgpa: 6.0 },
    { name: 'WNS Global Services', tier: 'B', cgpa: 7.5 },
    { name: 'EXL Service', tier: 'B', cgpa: 7.5 },
    { name: 'Genpact', tier: 'B', cgpa: 7.5 },
    { name: 'Hinduja Global Solutions', tier: 'B', cgpa: 7.5 },
    // C Tier Companies (Below ₹5 LPA)
    { name: 'Firstsource Solutions', tier: 'C', cgpa: 6.0 },
    { name: 'Concentrix', tier: 'C', cgpa: 6.0 },
    { name: 'Sutherland Global Services', tier: 'C', cgpa: 6.0 },
    { name: 'Teleperformance', tier: 'C', cgpa: 6.0 },
    { name: 'Infosys BPM', tier: 'C', cgpa: 6.0 },
    { name: 'Wipro BPS', tier: 'C', cgpa: 6.0 },
    { name: 'TCS BPS', tier: 'C', cgpa: 6.0 },
    { name: 'HGS', tier: 'C', cgpa: 6.0 },
    { name: 'Tech Mahindra BPS', tier: 'C', cgpa: 6.0 },
    { name: 'Accenture Operations', tier: 'C', cgpa: 6.0 },
    { name: 'Capgemini BPO', tier: 'C', cgpa: 6.0 },
    { name: 'Genpact Headstrong', tier: 'C', cgpa: 6.0 },
    { name: 'IBM Global Process Services', tier: 'C', cgpa: 6.0 },
    { name: 'Cognizant BPS', tier: 'C', cgpa: 6.0 },
    { name: 'Dell International Services', tier: 'C', cgpa: 6.0 },
    { name: 'Wipro Technologies', tier: 'C', cgpa: 6.0 },
    { name: 'Tata Elxsi', tier: 'C', cgpa: 6.0 },
    { name: 'Sasken Communication Technologies', tier: 'C', cgpa: 6.0 },
    { name: 'Mphasis Limited', tier: 'C', cgpa: 6.0 },
    { name: 'Oracle Financial Services Software', tier: 'C', cgpa: 6.0 },
    { name: 'Siemens Information Systems', tier: 'C', cgpa: 6.0 },
    { name: 'Robert Bosch Engineering', tier: 'C', cgpa: 6.0 },
    { name: 'Honeywell Technology Solutions', tier: 'C', cgpa: 6.0 },
    { name: 'GE India Technology Centre', tier: 'C', cgpa: 6.0 }
];
// Process company data for display and filtering
const processCompanyData = () => {
    const tierData = { ...companyTiers };
    companyData.forEach(company => {
        if (tierData[company.tier]) {
            if (!tierData[company.tier].companies.includes(company.name)) {
                tierData[company.tier].companies.push(company.name);
            }
        }
    });
    return tierData;
};
const CGPA = () => {
    const processedCompanyTiers = processCompanyData();
    // User inputs
    const [currentCGPA, setCurrentCGPA] = useState("");
    const [targetCGPA, setTargetCGPA] = useState("");
    // Dynamic semester input values
    const defaultTotalSemesters = 8;
    const minTotalSemesters = 2;
    const maxTotalSemesters = 12;
    const [totalSemesters, setTotalSemesters] = useState(defaultTotalSemesters);
    const [completedSemesters, setCompletedSemesters] = useState(4);
    const [showSemesterSettings, setShowSemesterSettings] = useState(false);
    // Results
    const [requiredCGPA, setRequiredCGPA] = useState(null);
    const [isAchievable, setIsAchievable] = useState(null);
    const [showResults, setShowResults] = useState(false);
    // Chart data
    const [chartData, setChartData] = useState([]);
    const [semesterChartData, setSemesterChartData] = useState([]);
    const [eligibleCompanies, setEligibleCompanies] = useState({});
    const [tierDistribution, setTierDistribution] = useState([]);
    // New state for selected tier filtering
    const [selectedTier, setSelectedTier] = useState(null);
    const [filteredCompanies, setFilteredCompanies] = useState({});
    const [completedSemestersInput, setCompletedSemestersInput] = useState(completedSemesters.toString());
    const [totalSemestersInput, setTotalSemestersInput] = useState(totalSemesters.toString());
    // Sync string state with number state
    useEffect(() => {
        setCompletedSemestersInput(completedSemesters.toString());
    }, [completedSemesters]);
    useEffect(() => {
        setTotalSemestersInput(totalSemesters.toString());
    }, [totalSemesters]);
    // Validation for semester inputs
    useEffect(() => {
        if (completedSemesters >= totalSemesters) {
            setCompletedSemesters(totalSemesters - 1);
        }
    }, [totalSemesters, completedSemesters]);
    // Calculate required CGPA
    const calculateRequiredCGPA = () => {
        const currCGPA = parseFloat(currentCGPA);
        const targCGPA = parseFloat(targetCGPA);
        if (isNaN(currCGPA) || isNaN(targCGPA)) {
            toast.error("Please fill all fields with valid numbers");
            return;
        }
        if (currCGPA < 0 || currCGPA > 10) {
            toast.error("CGPA must be between 0 and 10");
            return;
        }
        if (targCGPA < 0 || targCGPA > 10) {
            toast.error("Target CGPA must be between 0 and 10");
            return;
        }
        if (completedSemesters <= 0) {
            toast.error("Completed semesters must be greater than 0");
            return;
        }
        if (completedSemesters >= totalSemesters) {
            toast.error("Completed semesters must be less than total semesters");
            return;
        }
        // Calculate required CGPA in remaining semesters
        const remainingSemesters = totalSemesters - completedSemesters;
        const currentCGPAWeight = currCGPA * completedSemesters;
        const targetCGPAWeight = targCGPA * totalSemesters;
        const remainingCGPAWeight = targetCGPAWeight - currentCGPAWeight;
        const requiredCGPAValue = remainingCGPAWeight / remainingSemesters;
        setRequiredCGPA(parseFloat(requiredCGPAValue.toFixed(2)));
        setIsAchievable(requiredCGPAValue <= 10);
        setShowResults(true);
        // Generate chart data
        generateChartData(currCGPA, targCGPA, requiredCGPAValue);
        // Generate semester-wise chart data
        generateSemesterChartData(currCGPA, requiredCGPAValue, completedSemesters, totalSemesters);
        // Find eligible companies
        findEligibleCompanies(currCGPA);
        toast.success("Calculation completed successfully");
    };
    // Generate chart data for visualization
    const generateChartData = (current, target, required) => {
        const data = [];
        data.push({
            name: `Current CGPA`,
            cgpa: current,
            status: 'Current'
        });
        data.push({
            name: `Required CGPA`,
            cgpa: required > 10 ? 10 : required,
            status: 'Required'
        });
        data.push({
            name: `Target CGPA`,
            cgpa: target,
            status: 'Target'
        });
        setChartData(data);
    };
    // Generate semester-wise chart data
    const generateSemesterChartData = (current, required, completed, total) => {
        const data = [];
        for (let i = 1; i <= completed; i++) {
            data.push({
                semester: `Sem ${i}`,
                cgpa: current,
                type: 'Completed'
            });
        }
        for (let i = completed + 1; i <= total; i++) {
            data.push({
                semester: `Sem ${i}`,
                cgpa: required > 10 ? 10 : required,
                type: 'Remaining'
            });
        }
        setSemesterChartData(data);
    };
    // Find companies that the student is eligible for
    const findEligibleCompanies = (currCGPA) => {
        const eligible = {};
        let distribution = [];
        Object.keys(processedCompanyTiers).forEach(tier => {
            if (currCGPA >= processedCompanyTiers[tier].minCGPA) {
                eligible[tier] = processedCompanyTiers[tier].companies;
                distribution.push({
                    name: tier,
                    value: processedCompanyTiers[tier].companies.length,
                    color: processedCompanyTiers[tier].color
                });
            }
        });
        setEligibleCompanies(eligible);
        setFilteredCompanies(eligible);
        setTierDistribution(distribution);
    };
    // Reset all inputs
    const resetInputs = () => {
        setCurrentCGPA("");
        setTargetCGPA("");
        setRequiredCGPA(null);
        setIsAchievable(null);
        setShowResults(false);
        setChartData([]);
        setSemesterChartData([]);
        setEligibleCompanies({});
        setTierDistribution([]);
        setTotalSemesters(defaultTotalSemesters);
        setCompletedSemesters(4);
    };
    // Get badge color by tier
    const getTierBadgeStyle = (tier) => {
        switch (tier) {
            case 'S+': return 'text-[#FF5A36] bg-[#FF5A36]/10 border-[#FF5A36]/20';
            case 'A+': return 'text-[#FF6A3D] bg-[#FF6A3D]/10 border-[#FF6A3D]/20';
            case 'A': return 'text-[#F4512C] bg-[#F4512C]/10 border-[#F4512C]/20';
            case 'B': return 'text-[#D6D2C9] bg-[#D6D2C9]/10 border-[#D6D2C9]/20';
            case 'C': return 'text-[#9B9992] bg-[#9B9992]/10 border-[#9B9992]/20';
            default: return 'text-on-surface-variant bg-surface-container border-outline-variant/30';
        }
    };
    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (<div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/40 shadow-lg">
          <p className="text-mn-primary font-bold text-xs">{label}</p>
          <p className="text-surface-tint font-semibold text-sm">CGPA: {payload[0].value.toFixed(2)}</p>
          {payload[0].payload.type && (<p className="text-on-surface-variant text-[11px]">{payload[0].payload.type}</p>)}
        </div>);
        }
        return null;
    };
    // Count total eligible companies
    const countTotalEligibleCompanies = () => {
        let count = 0;
        Object.keys(eligibleCompanies).forEach(tier => {
            count += eligibleCompanies[tier].length;
        });
        return count;
    };
    // Count total companies
    const countTotalCompanies = () => {
        let count = 0;
        Object.keys(processedCompanyTiers).forEach(tier => {
            count += processedCompanyTiers[tier].companies.length;
        });
        return count;
    };
    // Update semester settings
    const updateTotalSemesters = (value) => {
        const newValue = Math.min(Math.max(value, minTotalSemesters), maxTotalSemesters);
        setTotalSemesters(newValue);
        if (completedSemesters >= newValue) {
            setCompletedSemesters(newValue - 1);
        }
    };
    const updateCompletedSemesters = (value) => {
        setCompletedSemesters(Math.min(Math.max(value, 1), totalSemesters - 1));
    };
    // Handle tier click to filter companies
    const handleTierClick = (tier) => {
        if (selectedTier === tier) {
            setSelectedTier(null);
            setFilteredCompanies(eligibleCompanies);
        }
        else {
            setSelectedTier(tier);
            const filtered = { [tier]: eligibleCompanies[tier] || [] };
            setFilteredCompanies(filtered);
        }
    };
    return (<div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />
      
      {/* ── Deep Green Sanctuary Hero ── */}
      <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl">
        {/* Background Particle Wave */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
          <ParticleWave />
        </div>

        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto">
            <Calculator className="w-4 h-4 text-surface-tint"/>
            <span>Academic Performance Engine</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
            Precision CGPA <br />
            <span className="text-surface-tint">Eligibility Scan.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body-lg text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Calculate target semester requirements and discover verified company eligibility tiers across S+, A+, A, B, and C CTC bands.
          </motion.p>
        </div>
      </section>

      {/* ── Main Calculation Content ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Section Card */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-[32px] p-5 md:p-8 border border-outline-variant/40 shadow-[0_20px_50px_rgba(0,19,8,0.06)] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-surface-container text-surface-tint">
                    <Calculator className="h-5 w-5"/>
                  </div>
                  <h3 className="font-headline-md text-lg font-bold text-mn-primary">Calculator Parameters</h3>
                </div>
                
                <Dialog open={showSemesterSettings} onOpenChange={setShowSemesterSettings}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-on-surface-variant hover:text-mn-primary hover:bg-surface-container" title="Semester Settings">
                      <SlidersHorizontal className="h-4 w-4"/>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-surface-container-lowest border-outline-variant/40 rounded-[32px] max-w-md p-8">
                    <DialogHeader>
                      <DialogTitle className="font-headline-md text-xl text-mn-primary">Semester Configuration</DialogTitle>
                      <DialogDescription className="text-on-surface-variant font-body-md text-xs">
                        Adjust program length and completed terms
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4 font-body-md">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-mn-primary uppercase tracking-wider">Total Semesters ({minTotalSemesters}-{maxTotalSemesters})</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" className="bg-surface-container border-none text-mn-primary font-bold rounded-xl" value={totalSemestersInput} min={minTotalSemesters} max={maxTotalSemesters} onChange={e => setTotalSemestersInput(e.target.value)} onBlur={() => {
            let num = parseInt(totalSemestersInput, 10);
            if (isNaN(num))
                num = minTotalSemesters;
            num = Math.min(Math.max(num, minTotalSemesters), maxTotalSemesters);
            setTotalSemesters(num);
            setTotalSemestersInput(num.toString());
            if (completedSemesters >= num) {
                setCompletedSemesters(num - 1);
                setCompletedSemestersInput((num - 1).toString());
            }
        }}/>
                          <Button variant="outline" size="icon" className="border-outline-variant/40 rounded-xl" onClick={() => updateTotalSemesters(totalSemesters - 1)} disabled={totalSemesters <= minTotalSemesters}>
                            <ChevronDown className="h-4 w-4"/>
                          </Button>
                          <Button variant="outline" size="icon" className="border-outline-variant/40 rounded-xl" onClick={() => updateTotalSemesters(totalSemesters + 1)} disabled={totalSemesters >= maxTotalSemesters}>
                            <ChevronUp className="h-4 w-4"/>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button className="bg-primary text-primary-foreground rounded-lg text-xs font-label-caps tracking-wider px-6 font-semibold border-none" onClick={() => setShowSemesterSettings(false)}>
                        Done
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <Label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Current CGPA (0.00 - 10.00)</Label>
                  <Input type="number" placeholder="e.g. 7.85" className="bg-surface-container border-none text-mn-primary font-bold h-12 rounded-2xl focus-visible:ring-2 focus-visible:ring-surface-tint" min="0" max="10" step="0.01" value={currentCGPA} onChange={(e) => setCurrentCGPA(e.target.value)}/>
                </div>
                
                <div>
                  <Label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Target CGPA (0.00 - 10.00)</Label>
                  <Input type="number" placeholder="e.g. 8.50" className="bg-surface-container border-none text-mn-primary font-bold h-12 rounded-2xl focus-visible:ring-2 focus-visible:ring-surface-tint" min="0" max="10" step="0.01" value={targetCGPA} onChange={(e) => setTargetCGPA(e.target.value)}/>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Completed</Label>
                    <Input type="number" className="bg-surface-container border-none text-mn-primary font-bold h-12 rounded-2xl" min="1" max={totalSemesters - 1} value={completedSemestersInput} onChange={e => setCompletedSemestersInput(e.target.value)} onBlur={() => {
            let num = parseInt(completedSemestersInput, 10);
            if (isNaN(num))
                num = 1;
            num = Math.min(Math.max(num, 1), totalSemesters - 1);
            setCompletedSemesters(num);
            setCompletedSemestersInput(num.toString());
        }}/>
                  </div>
                  
                  <div>
                    <Label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Total Terms</Label>
                    <Input type="number" className="bg-surface-container border-none text-mn-primary font-bold h-12 rounded-2xl" min={minTotalSemesters} max={maxTotalSemesters} value={totalSemestersInput} onChange={e => setTotalSemestersInput(e.target.value)} onBlur={() => {
            let num = parseInt(totalSemestersInput, 10);
            if (isNaN(num))
                num = minTotalSemesters;
            num = Math.min(Math.max(num, minTotalSemesters), maxTotalSemesters);
            setTotalSemesters(num);
            setTotalSemestersInput(num.toString());
        }}/>
                  </div>
                </div>
                
                <div className="flex gap-2.5 pt-2">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:opacity-90 rounded-lg h-12 font-label-caps text-xs tracking-wider font-semibold border-none" onClick={calculateRequiredCGPA}>
                    Calculate Target
                  </Button>
                  <Button variant="outline" className="border-outline-variant/40 rounded-lg h-12 w-12 p-0 text-on-surface-variant hover:bg-surface-container" onClick={resetInputs} title="Reset fields">
                    <RefreshCw className="h-4 w-4"/>
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Callout */}
            {showResults && (<div className="mt-6 p-5 rounded-2xl bg-surface-container border border-outline-variant/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Required GPA / Sem:</span>
                  <div className="font-headline-md text-xl font-bold">
                    {isAchievable ? (<span className="text-emerald-700">{requiredCGPA}</span>) : (<span className="text-rose-600 text-sm">Not Achievable (&gt;10.0)</span>)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Eligible Companies:</span>
                  <span className="font-bold text-mn-primary text-base">
                    {countTotalEligibleCompanies()} / {countTotalCompanies()}
                  </span>
                </div>
              </div>)}
          </div>
          
          {/* Chart & Distribution Section */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-[32px] p-7 md:p-8 border border-outline-variant/40 shadow-[0_20px_50px_rgba(0,19,8,0.06)]">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2.5 rounded-xl bg-surface-container text-surface-tint">
                <ChartIcon className="h-5 w-5"/>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-mn-primary">Semester Trajectory Visualization</h3>
            </div>

            {semesterChartData.length > 0 ? (<div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={semesterChartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#242525"/>
                    <XAxis dataKey="semester" stroke="#727973" fontSize={12}/>
                    <YAxis domain={[0, 10]} stroke="#727973" fontSize={12}/>
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend />
                    <Line type="monotone" dataKey="cgpa" stroke="#FF5A36" strokeWidth={3} dot={{ r: 4, fill: "#FF5A36" }} activeDot={{ r: 6, fill: "#0F1010" }}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>) : (<div className="h-64 flex items-center justify-center text-on-surface-variant/60 bg-surface-container/40 rounded-xl border border-dashed border-outline-variant/40">
                <div className="text-center p-6">
                  <ChartIcon className="h-10 w-10 mx-auto mb-2 text-surface-tint/50"/>
                  <p className="font-body-md text-sm">Enter your current and target CGPA to project future semester milestones</p>
                </div>
              </div>)}
            
            {Object.keys(eligibleCompanies).length > 0 && (<div className="mt-8 pt-6 border-t border-outline-variant/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Company Distribution Chart */}
                  <div>
                    <h4 className="font-headline-md text-sm font-bold text-mn-primary mb-3">Tier Distribution Breakdown</h4>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={tierDistribution} cx="50%" cy="50%" labelLine={false} outerRadius={60} fill="#FF5A36" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {tierDistribution.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={entry.color}/>;
            })}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* CTC Tiers */}
                  <div>
                    <h4 className="font-headline-md text-sm font-bold text-mn-primary mb-3">CTC Bands</h4>
                    <div className="space-y-2">
                      {Object.entries(processedCompanyTiers)
                .sort((a, b) => {
                const tierOrder = { 'S+': 5, 'A+': 4, 'A': 3, 'B': 2, 'C': 1 };
                return (tierOrder[b[0]] || 0) - (tierOrder[a[0]] || 0);
            })
                .map(([tier, data]) => (<div key={tier} className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-between text-xs">
                          <Badge variant="outline" className={getTierBadgeStyle(tier)}>
                            {tier} Tier
                          </Badge>
                          <span className="text-mn-primary font-bold">{data.ctc}</span>
                        </div>))}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
          
          {/* Company Section */}
          {Object.keys(eligibleCompanies).length > 0 && (<div className="lg:col-span-12 bg-surface-container-lowest rounded-[32px] p-7 md:p-10 border border-outline-variant/40 shadow-[0_20px_50px_rgba(0,19,8,0.06)]" id="company-list-section">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-surface-container text-surface-tint">
                    <Building2 className="h-6 w-6"/>
                  </div>
                  <div>
                    <h3 className="font-headline-lg text-xl md:text-2xl font-bold text-mn-primary">
                      Eligible Placement Recruiters
                    </h3>
                    <p className="text-on-surface-variant font-body-md text-xs">
                      Companies with cutoff criteria matched by your current CGPA of <span className="font-bold text-surface-tint">{currentCGPA}</span>
                    </p>
                  </div>
                </div>

                {selectedTier && (<Button variant="outline" size="sm" onClick={() => handleTierClick(selectedTier)} className="border-outline-variant/40 text-foreground hover:bg-surface-container rounded-lg text-xs font-label-caps tracking-wider">
                    Show All Tiers
                  </Button>)}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Tiers List */}
                <div className="lg:col-span-5 space-y-3">
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Filter by Tier</h4>
                  {Object.keys(eligibleCompanies)
                .sort((a, b) => {
                const tierOrder = { 'S+': 5, 'A+': 4, 'A': 3, 'B': 2, 'C': 1 };
                return (tierOrder[b] || 0) - (tierOrder[a] || 0);
            })
                .map(tier => (<div key={tier} className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${selectedTier === tier
                    ? 'bg-primary/20 text-foreground border-surface-tint shadow-md scale-[1.02]'
                    : 'bg-surface-container border-outline-variant/30 hover:bg-surface-container-high'}`} onClick={() => handleTierClick(tier)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                           <Badge variant="outline" className={selectedTier === tier ? 'bg-white/20 text-white border-white/40' : getTierBadgeStyle(tier)}>
                            {tier}
                          </Badge>
                          <span className={selectedTier === tier ? 'text-white font-bold' : 'text-foreground font-bold'}>
                            {eligibleCompanies[tier].length} Companies
                          </span>
                        </div>
                        <span className={`text-xs ${selectedTier === tier ? 'text-muted-foreground' : 'text-on-surface-variant'}`}>
                          {processedCompanyTiers[tier].ctc}
                        </span>
                      </div>
                    </div>))}
                </div>
                
                {/* Companies Grid */}
                <div className="lg:col-span-7">
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                    Available Companies {selectedTier && `(${selectedTier} Tier)`}
                  </h4>
                  <ScrollArea className="h-[420px] rounded-2xl border border-outline-variant/30 bg-surface-container/40 p-4">
                    <div className="space-y-6">
                      {Object.keys(filteredCompanies)
                .sort((a, b) => {
                const tierOrder = { 'S+': 5, 'A+': 4, 'A': 3, 'B': 2, 'C': 1 };
                return (tierOrder[b] || 0) - (tierOrder[a] || 0);
            })
                .map(tier => (<div key={tier} className="space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                            <Badge variant="outline" className={getTierBadgeStyle(tier)}>
                              {tier} Tier ({filteredCompanies[tier].length})
                            </Badge>
                            <span className="text-xs font-bold text-surface-tint">
                              Min CGPA: {processedCompanyTiers[tier].minCGPA}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {filteredCompanies[tier].map(company => (<div key={company} className="flex items-center p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-xs font-semibold text-mn-primary shadow-2xl shadow-black/5">
                                <span className="w-2 h-2 rounded-full mr-2.5 shrink-0" style={{ backgroundColor: processedCompanyTiers[tier].color }}></span>
                                <span className="truncate">{company}</span>
                              </div>))}
                          </div>
                        </div>))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>)}
        </div>
      </main>
      
      <Footer />
    </div>);
};
export default CGPA;
