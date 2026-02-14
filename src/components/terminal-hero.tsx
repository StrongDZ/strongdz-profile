'use client';

import { useEffect, useState, useRef } from 'react';

const lines = [
  { text: '> initializing system...', delay: 0 },
  { text: '> loading profile: Hoang Khai Manh', delay: 1200 },
  { text: '> stack detected: Java, Next.js, Kafka, Docker', delay: 2800 },
  { text: '> status: Ready to deploy.', delay: 4200 },
];

export function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[lineIndex].text;

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentTyping(currentLine.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 30 + Math.random() * 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, currentLine]);
        setCurrentTyping('');
        setCharIndex(0);
        setLineIndex(lineIndex + 1);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex]);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      <div className="rounded-lg border border-border/50 overflow-hidden neon-border">
        {/* Terminal Title Bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-card/80 border-b border-border/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">
            kmanh@portfolio:~
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-5 bg-card/40 font-mono text-sm leading-relaxed min-h-[180px]">
          {visibleLines.map((line, i) => (
            <div key={i} className={`mb-1.5 ${
              line.includes('status:') 
                ? 'text-green-400' 
                : line.includes('stack detected')
                  ? 'text-neon-yellow dark:text-neon-yellow text-yellow-600'
                  : line.includes('loading profile')
                    ? 'text-neon-cyan dark:text-neon-cyan text-cyan-600'
                    : 'text-muted-foreground'
            }`}>
              {line}
            </div>
          ))}
          {!isComplete && (
            <div className={`mb-1.5 ${
              currentTyping.includes('status:')
                ? 'text-green-400'
                : currentTyping.includes('stack detected')
                  ? 'text-neon-yellow dark:text-neon-yellow text-yellow-600'
                  : currentTyping.includes('loading profile')
                    ? 'text-neon-cyan dark:text-neon-cyan text-cyan-600'
                    : 'text-muted-foreground'
            }`}>
              {currentTyping}
              <span className="cursor-blink text-primary">█</span>
            </div>
          )}
          {isComplete && (
            <div className="text-muted-foreground mt-2">
              <span className="text-primary">$</span> <span className="cursor-blink">█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
