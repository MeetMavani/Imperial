"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
}

const AccordionContext = React.createContext<{
  activeId: string | null;
  setActiveId: (id: string | null) => void;
} | null>(null);

const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
  defaultValue,
  type,
  collapsible,
  ...props
}) => {
  const [activeId, setActiveId] = React.useState<string | null>(defaultValue || null);

  return (
    <AccordionContext.Provider value={{ activeId, setActiveId }}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItemContext = React.createContext<{
  value: string;
} | null>(null);

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          className={cn("border-b border-charcoal/10", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const accordionContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  const { activeId, setActiveId } = accordionContext;
  const { value } = itemContext;
  const isOpen = activeId === value;

  const handleClick = () => {
    setActiveId(isOpen ? null : value);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      aria-expanded={isOpen}
      className={cn(
        "flex flex-1 w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const accordionContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  const { activeId } = accordionContext;
  const { value } = itemContext;
  const isOpen = activeId === value;

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
