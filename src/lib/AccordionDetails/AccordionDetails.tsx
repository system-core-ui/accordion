import React, { forwardRef } from 'react';
import type { AccordionDetailsProps } from '../models';
import { useInternalAccordionContext } from '../Accordion/Accordion';
import { AccordionDetailsRootStyled } from '../Accordion/styled';

export const AccordionDetails = forwardRef<HTMLDivElement, AccordionDetailsProps>(
  ({ children, id: idProp, 'aria-labelledby': ariaLabelledby, ...rest }, ref) => {
    const context = useInternalAccordionContext();
    if (!context) {
      throw new Error('AccordionDetails must be used within an Accordion component');
    }
    
    const { expanded, disabled, id: accordionId } = context;

    const contentId = idProp || `${accordionId}-content`;
    const headerId = ariaLabelledby || `${accordionId}-header`;

    return (
      <AccordionDetailsRootStyled
        ref={ref}
        ownerExpanded={expanded}
        ownerDisabled={disabled}
        id={contentId}
        aria-labelledby={headerId}
        role="region"
        {...rest}
      >
        {children}
      </AccordionDetailsRootStyled>
    );
  }
);

AccordionDetails.displayName = 'AccordionDetails';
