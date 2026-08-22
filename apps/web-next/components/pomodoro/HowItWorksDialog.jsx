import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, Clock, Coffee, RotateCcw, Settings } from 'lucide-react';
const HowItWorksDialog = () => {
    const steps = [
        {
            number: 1,
            title: "Focus Time",
            description: "Work for 25 minutes on a single task.",
            icon: Clock,
            color: "bg-red-500"
        },
        {
            number: 2,
            title: "Short Break",
            description: "Take a 5-minute break to relax.",
            icon: Coffee,
            color: "bg-green-500"
        },
        {
            number: 3,
            title: "Long Break",
            description: "After 4 pomodoros, take a 15-minute break.",
            icon: RotateCcw,
            color: "bg-blue-500"
        },
        {
            number: 4,
            title: "Customize",
            description: "Adjust timer settings to fit your needs.",
            icon: Settings,
            color: "bg-purple-500"
        }
    ];
    return (<Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-zinc-600 bg-zinc-800/50 text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-zinc-700/80 transition-all duration-300">
          <HelpCircle className="h-4 w-4 mr-2"/>
          How it works
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            Pomodoro Technique
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {steps.map((step) => (<div key={step.number} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
              <div className={`${step.color} text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0`}>
                {step.number}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <step.icon className="h-4 w-4 text-zinc-400"/>
                  <h3 className="font-medium text-white text-sm">{step.title}</h3>
                </div>
                <p className="text-zinc-300 text-xs">{step.description}</p>
              </div>
            </div>))}
        </div>
      </DialogContent>
    </Dialog>);
};
export default HowItWorksDialog;
