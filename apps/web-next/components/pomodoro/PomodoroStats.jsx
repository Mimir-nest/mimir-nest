import React from 'react';
import { Clock, CheckCircle, Coffee, BarChart, Calendar } from 'lucide-react';
const PomodoroStats = ({ completedPomodoros, completedBreaks, totalFocusTime, todayPomodoros, longestStreak, }) => {
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0)
            return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    };
    const stats = [
        {
            label: "Total Focus Sessions",
            value: completedPomodoros,
            icon: CheckCircle,
        },
        {
            label: "Total Break Sessions",
            value: completedBreaks,
            icon: Coffee,
        },
        {
            label: "Total Focus Time",
            value: formatTime(totalFocusTime),
            icon: Clock,
        },
        {
            label: "Today's Sessions",
            value: todayPomodoros,
            icon: Calendar,
        },
        {
            label: "Longest Streak",
            value: longestStreak,
            icon: BarChart,
        },
    ];
    return (<div className="w-full space-y-3">
      {stats.map((stat, index) => (<div key={index} className="group flex items-center justify-between px-4 py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-surface-tint/10 group-hover:bg-surface-tint/15 transition-colors">
              <stat.icon className="h-4 w-4 text-surface-tint"/>
            </div>
            <span className="text-sm font-body-md text-on-surface-variant group-hover:text-mn-primary transition-colors">
              {stat.label}
            </span>
          </div>
          <span className="font-headline-md text-lg text-mn-primary tabular-nums">
            {stat.value}
          </span>
        </div>))}
    </div>);
};
export default PomodoroStats;
