import React, { forwardRef } from 'react';
import type { AccordionSummaryProps } from '../models';
import { useInternalAccordionContext } from '../Accordion/Accordion';
import { AccordionSummaryRootStyled, AccordionSummaryContentStyled, AccordionSummaryExpandIconStyled } from '../Accordion/styled';

export const AccordionSummary = forwardRef<HTMLButtonElement, AccordionSummaryProps>(
  ({ children, expandIcon, onClick, id: idProp, 'aria-controls': ariaControls, ...rest }, ref) => {
    const context = useInternalAccordionContext();
    if (!context) {
      throw new Error('AccordionSummary must be used within an Accordion component');
    }
    
    const { expanded, disabled, toggle, id: accordionId } = context;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);
      toggle();
    };

    const headerId = idProp || `${accordionId}-header`;
    const contentId = ariaControls || `${accordionId}-content`;

    return (
      <AccordionSummaryRootStyled
        ref={ref}
        ownerExpanded={expanded}
        ownerDisabled={disabled}
        disabled={disabled}
        aria-expanded={expanded}
        aria-controls={contentId}
        id={headerId}
        onClick={handleClick}
        {...rest}
      >
        <AccordionSummaryContentStyled>
          {children}
        </AccordionSummaryContentStyled>
        {expandIcon && (
          <AccordionSummaryExpandIconStyled ownerExpanded={expanded} ownerDisabled={disabled}>
            {expandIcon}
          </AccordionSummaryExpandIconStyled>
        )}
      </AccordionSummaryRootStyled>
    );
  }
);

AccordionSummary.displayName = 'AccordionSummary';
