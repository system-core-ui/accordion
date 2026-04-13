import React, { createContext, useContext, useState, forwardRef, useCallback, useRef, useEffect } from 'react';
import type { AccordionProps } from '../models';
import { useAccordionContext } from '../AccordionGroup/AccordionGroup';
import { AccordionRootStyled } from './styled';

interface InternalAccordionContextType {
  expanded: boolean;
  disabled: boolean;
  toggle: () => void;
  id: string;
}

const InternalAccordionContext = createContext<InternalAccordionContextType | undefined>(undefined);

export const useInternalAccordionContext = () => useContext(InternalAccordionContext);

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, value, defaultExpanded = false, expanded: expandedProp, onChange, disabled = false, id: idProp, ...rest }, ref) => {
    const groupContext = useAccordionContext();
    const fallbackId = useRef(idProp || `accordion-${Math.random().toString(36).slice(2, 9)}`).current;
    
    // Controlled by group?
    const isGroupControlled = groupContext !== undefined;
    const isSelfControlled = expandedProp !== undefined;

    let isExpanded = false;

    if (isGroupControlled) {
      isExpanded = groupContext.activeValues.includes(value);
    } else if (isSelfControlled) {
      isExpanded = expandedProp as boolean;
    }

    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

    if (!isGroupControlled && !isSelfControlled) {
      isExpanded = internalExpanded;
    }

    const toggle = useCallback(() => {
      if (disabled) return;
      
      const newExpanded = !isExpanded;

      if (isGroupControlled) {
        groupContext.toggleValue(value);
      } else {
        if (!isSelfControlled) {
          setInternalExpanded(newExpanded);
        }
        onChange?.(newExpanded);
      }
    }, [disabled, isExpanded, isGroupControlled, isSelfControlled, onChange, groupContext, value]);

    return (
      <InternalAccordionContext.Provider value={{ expanded: isExpanded, disabled, toggle, id: fallbackId }}>
        <AccordionRootStyled ref={ref} ownerExpanded={isExpanded} ownerDisabled={disabled} {...rest}>
          {children}
        </AccordionRootStyled>
      </InternalAccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';
