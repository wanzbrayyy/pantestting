
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

const QuizTimer = ({ 
  initialTime = 300, 
  onTimeUp, 
  isActive = true, 
  warningThreshold = 60 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        
        if (newTime <= warningThreshold && !isWarning) {
          setIsWarning(true);
        }
        
        if (newTime <= 0) {
          clearInterval(timer);
          onTimeUp && onTimeUp();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp, warningThreshold, isWarning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 30) return 'from-red-500 to-red-600';
    if (timeLeft <= warningThreshold) return 'from-orange-500 to-red-500';
    return 'from-blue-500 to-purple-600';
  };

  const getProgressPercentage = () => {
    return (timeLeft / initialTime) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`quiz-timer bg-gradient-to-r ${getTimerColor()} ${
        isWarning ? 'timer-pulse' : ''
      }`}
    >
      <div className="flex items-center justify-center space-x-2">
        {isWarning ? (
          <AlertTriangle className="w-5 h-5 animate-pulse" />
        ) : (
          <Clock className="w-5 h-5" />
        )}
        <span className="font-mono text-lg font-bold">
          {formatTime(timeLeft)}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="mt-2 w-full bg-white/20 rounded-full h-1">
        <motion.div
          className="bg-white rounded-full h-1 transition-all duration-1000"
          style={{ width: `${getProgressPercentage()}%` }}
          animate={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      
      {isWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs mt-1 text-center opacity-90"
        >
          Time running out!
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizTimer;
