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
            color: "bg-primary text-primary-foreground"
        },
        {
            number: 2,
            title: "Short Break",
            description: "Take a 5-minute break to relax.",
            icon: Coffee,
            color: "bg-[#D6D2C9] text-black"
        },
        {
            number: 3,
            title: "Long Break",
            description: "After 4 pomodoros, take a 15-minute break.",
            icon: RotateCcw,
            color: "bg-[#9B9992] text-black"
        },
        {
            number: 4,
            title: "Customize",
            description: "Adjust timer settings to fit your needs.",
            icon: Settings,
            color: "bg-[#5D5B56] text-white"
        }
    ];
    return (<Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-border bg-surface-container-low text-muted-foreground hover:text-foreground hover:border-surface-tint/40 hover:bg-surface-container transition-all duration-300">
          <HelpCircle className="h-4 w-4 mr-2"/>
          How it works
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-surface-container border-border text-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4 text-foreground">
            Pomodoro Technique
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {steps.map((step) => (<div key={step.number} className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low border border-border/40">
              <div className={`${step.color} w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0`}>
                {step.number}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <step.icon className="h-4 w-4 text-muted-foreground"/>
                  <h3 className="font-medium text-foreground text-sm">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-xs">{step.description}</p>
              </div>
            </div>))}
        </div>
      </DialogContent>
    </Dialog>);
};
export default HowItWorksDialog;
