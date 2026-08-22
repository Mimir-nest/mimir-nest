import { useState, useEffect } from 'react';

// In-memory cache for parsed CSV questions across company / timeframe
const csvCache = new Map();

const timeFrameToFileName = (companySlug, timeFrame) => {
    switch (timeFrame) {
        case '6 Months':
            return `${companySlug}_6months.csv`;
        case '1 Year':
            return `${companySlug}_1year.csv`;
        case '2 Years':
            return `${companySlug}_2year.csv`;
        case 'All Time':
        default:
            return `${companySlug}_alltime.csv`;
    }
};
const parseCSVData = (csvText, company, timeRange) => {
    if (!csvText || csvText.trim() === '')
        return [];
    const lines = csvText.split('\n');
    if (lines.length <= 1)
        return [];
    // Skip header line
    const dataLines = lines.slice(1).filter(line => line.trim() !== '');
    return dataLines.map(line => {
        // Handle CSV parsing properly by considering quoted values
        const processedLine = processCSVLine(line);
        try {
            // Extended to capture Topics if present (7th column)
            const [id, title, acceptance, difficulty, frequency, link, rawTopics] = processedLine;
            let topics = [];
            if (rawTopics && rawTopics.trim()) {
                // Topics are often comma-separated within quotes, e.g. "Array, Hash Table"
                // The processCSVLine handles the outer quotes, so rawTopics should be the inner string
                topics = rawTopics.split(',').map(t => t.trim());
            }
            else {
                // Generate topics from title (fallback)
                topics = title?.toLowerCase().includes('array') ? ['Array'] :
                    title?.toLowerCase().includes('tree') ? ['Tree'] :
                        title?.toLowerCase().includes('graph') ? ['Graph'] :
                            title?.toLowerCase().includes('string') ? ['String'] :
                                title?.toLowerCase().includes('dynamic') ? ['Dynamic Programming'] :
                                    ['General'];
            }
            return {
                id: id?.trim() || '',
                title: title?.trim() || '',
                acceptance: acceptance?.trim() || '',
                difficulty: (difficulty?.trim() || 'Medium'),
                frequency: parseFloat(frequency) || 0,
                link: link?.trim() || '',
                company: company || 'Unknown',
                timeRange: timeRange || 'alltime',
                topics: topics,
            };
        }
        catch (error) {
            console.error('Error parsing CSV line:', line);
            return {
                id: '',
                title: '',
                acceptance: '',
                difficulty: 'Medium',
                frequency: 0,
                link: '',
                company: company || 'Unknown',
                timeRange: timeRange || 'alltime',
                topics: ['General'],
            };
        }
    }).filter(q => q.id && q.title);
};
// Function to properly process CSV line with quoted fields
const processCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
            inQuotes = !inQuotes;
        }
        else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        }
        else {
            current += char;
        }
    }
    // Don't forget the last field
    result.push(current);
    return result;
};
// Get list of available companies from CSV files
const getAvailableCompanies = () => {
    return [
        'accenture', 'accolite', 'adobe', 'affirm', 'agoda', 'airbnb', 'airtel', 'akamai', 'akuna-capital', 'alibaba',
        'altimetrik', 'amazon', 'amdocs', 'american-express', 'anduril', 'apple', 'arcesium', 'arista-networks', 'atlassian',
        'attentive', 'autodesk', 'avito', 'baidu', 'barclays', 'bitgo', 'blackrock', 'blizzard', 'block', 'bloomberg',
        'bny-mellon', 'bolt', 'booking.com', 'box', 'bp', 'bytedance', 'cadence', 'capgemini', 'capital-one', 'cars24',
        'cashfree', 'chewy', 'cisco', 'citadel', 'citrix', 'cloudera', 'cloudflare', 'cognizant', 'coinbase', 'commvault',
        'confluent', 'consultadd', 'coupang', 'coursera', 'crowdstrike', 'cruise', 'curefit', 'darwinbox', 'databricks',
        'datadog', 'de-shaw', 'deliveroo', 'dell', 'deloitte', 'deutsche-bank', 'devrev', 'directi', 'disney', 'docusign',
        'doordash', 'dp-world', 'dream11', 'dropbox', 'drw', 'dunzo', 'ebay', 'epam-systems', 'epic-systems', 'expedia',
        'factset', 'flexport', 'flipkart', 'freshworks', 'ge-healthcare', 'geico', 'gojek', 'goldman-sachs', 'google',
        'grab', 'grammarly', 'graviton', 'groww', 'gsn-games', 'hashedin', 'hcl', 'hpe', 'huawei', 'hubspot',
        'hudson-river-trading', 'hulu', 'ibm', 'imc', 'indeed', 'infosys', 'inmobi', 'instacart', 'intel', 'intuit',
        'ixl', 'j.p.-morgan', 'jane-street', 'jio', 'josh-technology', 'jump-trading', 'juspay', 'karat', 'kla', 'linkedin',
        'liveramp', 'lowe\'s', 'lucid', 'lyft', 'makemytrip', 'mastercard', 'mathworks', 'media.net', 'meesho', 'mercari',
        'meta', 'microsoft', 'millennium', 'mitsogo', 'moloco', 'mongodb', 'morgan-stanley', 'moveworks', 'myntra',
        'nagarro', 'netapp', 'netease', 'netflix', 'nextdoor', 'niantic', 'nielsen', 'nike', 'nordstrom', 'nutanix',
        'nvidia', 'okta', 'okx', 'openai', 'opentext', 'oracle', 'otter.ai', 'oyo', 'ozon', 'palantir-technologies',
        'palo-alto-networks', 'paypal', 'paytm', 'persistent-systems', 'phonepe', 'pinterest', 'pocket-gems', 'point72',
        'pornhub', 'pure-storage', 'qualcomm', 'quora', 'rakuten', 'razorpay', 'rbc', 'reddit', 'revolut', 'ripple',
        'rippling', 'robinhood', 'roblox', 'roku', 'rubrik', 'salesforce', 'samsara', 'samsung', 'sap', 'servicenow',
        'shopee', 'shopify', 'siemens', 'sigmoid', 'snap', 'snowflake', 'sofi', 'splunk', 'spotify', 'sprinklr',
        'squarepoint-capital', 'stripe', 'swiggy', 'tcs', 'tekion', 'tencent', 'tesla', 'thoughtspot', 'thoughtworks',
        'tiktok', 'tinkoff', 'trilogy', 'turing', 'turo', 'twilio', 'twitch', 'two-sigma', 'uber', 'uipath', 'ukg',
        'valve', 'veeva-systems', 'verily', 'verkada', 'virtu-financial', 'visa', 'vk', 'vmware', 'walmart-labs',
        'warnermedia', 'wayfair', 'wells-fargo', 'wipro', 'wix', 'workday', 'x', 'yahoo', 'yandex', 'yelp', 'zalando',
        'zenefits', 'zepto', 'zeta', 'zillow', 'zoho', 'zomato', 'zopsmart', 'zscaler', 'zs-associates'
    ];
};
const getAvailableTimeRanges = () => {
    return ['6months', '1year', '2year', 'alltime'];
};
export const useCSVQuestions = (selectedCompany, timeFrame) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [companies] = useState(getAvailableCompanies());
    const [timeRanges] = useState(getAvailableTimeRanges());
    useEffect(() => {
        const fetchCSVData = async () => {
            if (!selectedCompany) {
                setQuestions([]);
                setIsLoading(false);
                setError('');
                return;
            }

            const fileName = timeFrame ? timeFrameToFileName(selectedCompany, timeFrame) : `${selectedCompany}_alltime.csv`;
            const cacheKey = `${selectedCompany}::${timeFrame || 'alltime'}`;

            // Fast hit from in-memory cache
            if (csvCache.has(cacheKey)) {
                setQuestions(csvCache.get(cacheKey));
                setError('');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError('');
            try {
                const response = await fetch(`/csv/${fileName}`);
                if (response.ok) {
                    const csvText = await response.text();
                    const parsedQuestions = parseCSVData(csvText, selectedCompany, timeFrame || 'alltime');
                    csvCache.set(cacheKey, parsedQuestions);
                    setQuestions(parsedQuestions);
                }
                else {
                    throw new Error(`No data available for ${selectedCompany}`);
                }
            }
            catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load questions';
                setError(errorMessage);
                setQuestions([]);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchCSVData();
    }, [selectedCompany, timeFrame]);
    return {
        questions,
        isLoading,
        error,
        companies,
        timeRanges
    };
};
