import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
const PomodoroSettings = ({ open, onOpenChange, pomodoroTime, shortBreakTime, longBreakTime, onSave, }) => {
    const isMobile = useIsMobile();
    const [localPomodoroTime, setLocalPomodoroTime] = React.useState(pomodoroTime / 60);
    const [localShortBreakTime, setLocalShortBreakTime] = React.useState(shortBreakTime / 60);
    const [localLongBreakTime, setLocalLongBreakTime] = React.useState(longBreakTime / 60);
    const [errors, setErrors] = React.useState({
        pomodoro: '',
        shortBreak: '',
        longBreak: ''
    });
    React.useEffect(() => {
        setLocalPomodoroTime(pomodoroTime / 60);
        setLocalShortBreakTime(shortBreakTime / 60);
        setLocalLongBreakTime(longBreakTime / 60);
        // Reset errors when settings dialog is opened
        setErrors({ pomodoro: '', shortBreak: '', longBreak: '' });
    }, [pomodoroTime, shortBreakTime, longBreakTime, open]);
    const validateSettings = () => {
        const newErrors = {
            pomodoro: '',
            shortBreak: '',
            longBreak: ''
        };
        // Validate pomodoro time (1-120 minutes)
        if (localPomodoroTime < 1 || localPomodoroTime > 120) {
            newErrors.pomodoro = 'Focus duration must be between 1 and 120 minutes';
        }
        // Validate short break (1-30 minutes)
        if (localShortBreakTime < 1 || localShortBreakTime > 30) {
            newErrors.shortBreak = 'Short break must be between 1 and 30 minutes';
        }
        // Validate long break (5-45 minutes)
        if (localLongBreakTime < 5 || localLongBreakTime > 45) {
            newErrors.longBreak = 'Long break must be between 5 and 45 minutes';
        }
        // Validate relationships between times
        if (localShortBreakTime >= localPomodoroTime) {
            newErrors.shortBreak = 'Short break should be shorter than focus duration';
        }
        if (localLongBreakTime <= localShortBreakTime) {
            newErrors.longBreak = 'Long break should be longer than short break';
        }
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };
    const handleTimeChange = (value, setter, field) => {
        const numValue = parseInt(value) || 0;
        setter(numValue);
        // Clear error when user starts typing
        setErrors(prev => ({ ...prev, [field]: '' }));
    };
    const handleSave = () => {
        if (validateSettings()) {
            onSave(localPomodoroTime * 60, localShortBreakTime * 60, localLongBreakTime * 60);
            onOpenChange(false);
        }
    };
    const renderInputField = (label, value, onChange, error, min, max) => (<div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <Input type="number" min={min} max={max} value={value} onChange={onChange} className={`bg-dark-800 border-dark-700 ${error ? 'border-red-500' : ''}`}/>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>);
    // Mobile drawer version
    if (isMobile) {
        return (<Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-dark-900 text-white">
          <DrawerHeader>
            <DrawerTitle className="text-center text-lg font-semibold">Timer Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-6">
            {renderInputField('Focus Duration (minutes)', localPomodoroTime, (e) => handleTimeChange(e.target.value, setLocalPomodoroTime, 'pomodoro'), errors.pomodoro, 1, 120)}
            {renderInputField('Short Break (minutes)', localShortBreakTime, (e) => handleTimeChange(e.target.value, setLocalShortBreakTime, 'shortBreak'), errors.shortBreak, 1, 30)}
            {renderInputField('Long Break (minutes)', localLongBreakTime, (e) => handleTimeChange(e.target.value, setLocalLongBreakTime, 'longBreak'), errors.longBreak, 5, 45)}
          </div>
          <DrawerFooter className="border-t border-dark-800 pt-4">
            <Button onClick={handleSave} className="w-full">Save Settings</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>);
    }
    // Desktop slide-in sheet
    return (<Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-dark-900 text-white border-dark-800 w-[350px]">
        <SheetHeader className="pb-4 border-b border-dark-800">
          <SheetTitle className="text-white">Timer Settings</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          {renderInputField('Focus Duration (minutes)', localPomodoroTime, (e) => handleTimeChange(e.target.value, setLocalPomodoroTime, 'pomodoro'), errors.pomodoro, 1, 120)}
          {renderInputField('Short Break (minutes)', localShortBreakTime, (e) => handleTimeChange(e.target.value, setLocalShortBreakTime, 'shortBreak'), errors.shortBreak, 1, 30)}
          {renderInputField('Long Break (minutes)', localLongBreakTime, (e) => handleTimeChange(e.target.value, setLocalLongBreakTime, 'longBreak'), errors.longBreak, 5, 45)}
        </div>
        <SheetFooter className="border-t border-dark-800 pt-4">
          <Button onClick={handleSave} className="w-full">Save Settings</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>);
};
export default PomodoroSettings;
