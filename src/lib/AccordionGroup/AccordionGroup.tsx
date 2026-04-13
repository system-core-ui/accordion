import React, { createContext, useContext, useState, forwardRef, useCallback } from 'react';
import type { AccordionGroupProps } from '../models';

interface AccordionContextType {
  exclusive?: boolean;
  activeValues: string[];
  toggleValue: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const useAccordionContext = () => useContext(AccordionContext);

export const AccordionGroup = forwardRef<HTMLDivElement, AccordionGroupProps>(
  ({ children, exclusive = false, defaultValue, value: valueProp, onChange, ...rest }, ref) => {
    const isControlled = valueProp !== undefined;
    
    const [internalValue, setInternalValue] = useState<string[]>(() => {
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      if (valueProp !== undefined) {
        return Array.isArray(valueProp) ? valueProp : [valueProp];
      }
      return [];
    });

    const activeValues = isControlled 
      ? (Array.isArray(valueProp) ? valueProp : (valueProp !== undefined ? [valueProp] : []))
      : internalValue;

    const toggleValue = useCallback((val: string) => {
      let newValues: string[];
      
      if (exclusive) {
        newValues = activeValues.includes(val) ? [] : [val];
      } else {
        newValues = activeValues.includes(val)
          ? activeValues.filter((v) => v !== val)
          : [...activeValues, val];
      }

      if (!isControlled) {
        setInternalValue(newValues);
      }

      if (onChange) {
        onChange(exclusive ? (newValues[0] || '') : newValues);
      }
    }, [exclusive, activeValues, isControlled, onChange]);

    return (
      <AccordionContext.Provider value={{ exclusive, activeValues, toggleValue }}>
        <div ref={ref} {...rest}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

AccordionGroup.displayName = 'AccordionGroup';
