"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

interface SelectContextType {
  selectedValue: string;
  onSelectValue: (val: string, label: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  displayedLabel: string;
  setDisplayedLabel: (label: string) => void;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

const Select: React.FC<SelectProps> = ({ value = "", onValueChange, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [displayedLabel, setDisplayedLabel] = React.useState("");

  const onSelectValue = (val: string, label: string) => {
    if (onValueChange) {
      onValueChange(val);
    }
    setDisplayedLabel(label);
    setIsOpen(false);
  };

  // Auto-close when clicking outside
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider
      value={{
        selectedValue: value,
        onSelectValue,
        isOpen,
        setIsOpen,
        displayedLabel,
        setDisplayedLabel,
      }}
    >
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectTrigger must be used within Select");

    const { isOpen, setIsOpen } = context;

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder, className, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectValue must be used within Select");

    const { displayedLabel, selectedValue } = context;

    return (
      <span
        ref={ref}
        className={cn("block truncate text-left", className)}
        {...props}
      >
        {selectedValue ? displayedLabel || selectedValue : placeholder}
      </span>
    );
  }
);
SelectValue.displayName = "SelectValue";

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent: React.FC<SelectContentProps> = ({ className, children, ...props }) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectContent must be used within Select");

  const { isOpen } = context;

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white p-1 text-charcoal shadow-md focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectItem must be used within Select");

    const { selectedValue, onSelectValue } = context;
    const isSelected = selectedValue === value;

    // Capture option's visible text for SelectValue display
    const textRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
      if (isSelected && textRef.current) {
        context.setDisplayedLabel(textRef.current.textContent || "");
      }
    }, [isSelected, context]);

    const handleSelect = () => {
      const label = textRef.current?.textContent || value;
      onSelectValue(value, label);
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        onClick={handleSelect}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-cream-dark/50 hover:bg-accent/10 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors",
          className
        )}
        {...props}
      >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4 text-teal" />}
        </span>
        <span ref={textRef} className="truncate block">
          {children}
        </span>
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
