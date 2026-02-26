"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";
import "./TextType.css";

/* -------------------- Types -------------------- */

type VariableSpeed =
  | false
  | {
      min: number;
      max: number;
    };

interface TextTypeProps extends React.HTMLAttributes<HTMLElement> {
  text: string | string[];
  as?: React.ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed: VariableSpeed;
  onSentenceComplete: (text: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

/* -------------------- Component -------------------- */

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(!startOnVisible);

  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const textArray = useMemo<string[]>(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );

  /* -------------------- Speed Helper -------------------- */

  const getRandomSpeed = useCallback((): number => {
    if (!variableSpeed) return typingSpeed;
    return Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = (): string | undefined => {
    if (textColors.length === 0) return undefined;
    return textColors[currentTextIndex % textColors.length];
  };

  /* -------------------- Visibility Observer -------------------- */

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  /* -------------------- Cursor Animation -------------------- */

  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    gsap.set(cursorRef.current, { opacity: 1 });
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, [showCursor, cursorBlinkDuration]);

  /* -------------------- Typing Logic -------------------- */

  useEffect(() => {
    if (!isVisible) return;

    let timeout: ReturnType<typeof setTimeout>;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const run = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);

          onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex);

          if (!loop && currentTextIndex === textArray.length - 1) return;

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        } else {
          timeout = setTimeout(
            () => setDisplayedText(prev => prev.slice(0, -1)),
            deletingSpeed
          );
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev + processedText[currentCharIndex]);
            setCurrentCharIndex(prev => prev + 1);
          }, variableSpeed ? getRandomSpeed() : typingSpeed);
        } else {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(run, initialDelay);
    } else {
      run();
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    currentCharIndex,
    isDeleting,
    currentTextIndex,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    loop,
    isVisible,
    reverseMode,
    variableSpeed,
    getRandomSpeed,
    onSentenceComplete,
    textArray,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  /* -------------------- Render -------------------- */

  return (
    <div ref={containerRef} className={`text-type ${className}`}>
      {createElement(
        Component,
        { ...props },
        <>
          <span
            className="text-type__content"
            style={{ color: getCurrentTextColor() || "inherit" }}
          >
            {displayedText}
          </span>

          {showCursor && (
            <span
              ref={cursorRef}
              className={`text-type__cursor ${cursorClassName} ${
                shouldHideCursor ? "text-type__cursor--hidden" : ""
              }`}
            >
              {cursorCharacter}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default TextType;
