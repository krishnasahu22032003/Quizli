"use client";
import React from "react";
import keyword_extractor from "keyword-extractor";
import { motion } from "framer-motion";

type Props = {
  answer: string;
  setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const blank = "_____";

const BlankAnswerInput = ({ answer, setBlankAnswer }: Props) => {
  const keywords = React.useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    const shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, [answer]);

  const answerWithBlanks = React.useMemo(() => {
    const result = keywords.reduce((acc, curr) => {
      return acc.replaceAll(curr, blank);
    }, answer);
    setBlankAnswer(result);
    return result;
  }, [answer, keywords, setBlankAnswer]);

  const parts = answerWithBlanks.split(blank);
  const blankCount = parts.length - 1;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: blankCount }).map((_, i) => (
            <span
              key={i}
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[rgba(139,115,85,0.1)] border border-[rgba(139,115,85,0.2)] text-[10px] font-semibold text-[rgba(139,115,85,0.8)]"
            >
              {i + 1}
            </span>
          ))}
        </div>
        <p className="text-xs font-medium text-[var(--foreground-muted)] tracking-wide">
          {blankCount === 1 ? "Fill in the missing word" : "Fill in the missing words"}
        </p>
      </div>

      <div className="leading-[2.2] text-[17px] font-medium text-[var(--foreground)] tracking-tight select-none">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span>{part}</span>
            {index < blankCount && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center mx-1 relative"
              >
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-[rgba(139,115,85,0.6)] tracking-widest uppercase">
                  {index + 1}
                </span>
                <input
                  id="user-blank-input"
                  className="
                    w-28
                    text-center
                    text-[17px]
                    font-semibold
                    text-[var(--foreground)]
                    bg-white/80
                    border-0
                    border-b-2
                    border-[rgba(139,115,85,0.35)]
                    rounded-none
                    outline-none
                    py-0.5
                    px-1
                    tracking-tight
                    transition-all
                    duration-200
                    placeholder:text-[rgba(139,115,85,0.3)]
                    focus:border-[rgba(139,115,85,0.8)]
                    focus:bg-[rgba(139,115,85,0.04)]
                    focus:shadow-[0_2px_0_0_rgba(139,115,85,0.5)]
                  "
                  type="text"
                  placeholder="· · ·"
                  autoComplete="off"
                  spellCheck={false}
                />
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-1">
        {Array.from({ length: blankCount }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(139,115,85,0.06)] border border-[rgba(139,115,85,0.12)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[rgba(139,115,85,0.35)]" />
            <span className="text-[11px] font-medium text-[var(--foreground-muted)] tracking-wide">
              Blank {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlankAnswerInput;
