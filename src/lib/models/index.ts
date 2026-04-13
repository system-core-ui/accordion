import type { HTMLAttributes, ReactNode } from 'react';

export interface AccordionGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** If true, only one accordion can be expanded at a time */
  exclusive?: boolean;
  /** List of values that are expanded by default. Default string for exclusive, array for non-exclusive. */
  defaultValue?: string | string[];
  /** Controlled values */
  value?: string | string[];
  /** Callback fired when an accordion is toggled */
  onChange?: (value: string | string[]) => void;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The unique value for this Accordion, required for AccordionGroup */
  value: string;
  /** Expanded by default if not controlled by group */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Callback fired when this specific accordion is toggled */
  onChange?: (expanded: boolean) => void;
  /** Disables the accordion */
  disabled?: boolean;
}

export interface AccordionSummaryProps extends HTMLAttributes<HTMLButtonElement> {
  expandIcon?: ReactNode;
}

export interface AccordionDetailsProps extends HTMLAttributes<HTMLDivElement> {}
