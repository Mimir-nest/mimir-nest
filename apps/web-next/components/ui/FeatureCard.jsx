import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
const FeatureCard = ({ title, description, icon: Icon, href, className, style }) => {
    return (<Link href={href} className={cn("group block relative rounded-2xl p-8 transition-all duration-500 overflow-hidden", "hover:shadow-2xl hover:scale-[1.02]", className)} style={style}>
      {/* Premium Icon Container */}
      <div className="relative mb-6">
        <div className="relative z-10 h-16 w-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Icon className="h-8 w-8 text-white group-hover:text-blue-300 transition-colors duration-300"/>
        </div>
        
        {/* Glow effect behind icon */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>

        {/* Premium CTA */}
        <div className="flex items-center text-blue-400 font-medium text-sm group-hover:text-blue-300 transition-colors duration-300">
          <span>Explore Feature</span>
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"/>
        </div>
      </div>

      {/* Subtle border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
    </Link>);
};
export default FeatureCard;
