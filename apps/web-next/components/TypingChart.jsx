"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTypingStore } from '@/store/typingStore';
export default function TypingChart() {
    const { stats } = useTypingStore();
    // Create chart data from WPM samples with time intervals
    const chartData = stats.wpm.map((wpm, index) => ({
        time: index + 1,
        wpm: wpm,
        raw: stats.raw[index] || 0,
        errors: stats.errors[index] || 0
    }));
    return (<div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">Performance Graph</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} label={{ value: 'time (s)', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}/>
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} label={{ value: 'value', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}/>
            <Tooltip contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB'
        }}/>
            <Line type="monotone" dataKey="wpm" stroke="#60A5FA" strokeWidth={2} dot={false} name="WPM"/>
            <Line type="monotone" dataKey="raw" stroke="#A78BFA" strokeWidth={2} dot={false} name="Raw"/>
            <Line type="monotone" dataKey="errors" stroke="#F87171" strokeWidth={2} dot={false} name="Errors"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-blue-400"></div>
          <span className="text-sm text-gray-400">WPM</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-purple-400"></div>
          <span className="text-sm text-gray-400">Raw</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-red-400"></div>
          <span className="text-sm text-gray-400">Errors</span>
        </div>
      </div>
    </div>);
}
