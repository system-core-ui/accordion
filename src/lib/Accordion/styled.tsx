import type { CSSObject } from '@emotion/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ThemeSchema } from '@thanh-libs/theme';

export interface AccordionOwnerState {
  ownerExpanded?: boolean;
  ownerDisabled?: boolean;
}

export const AccordionRootStyled = styled.div<AccordionOwnerState>(
  ({ ownerExpanded, ownerDisabled }): CSSObject => {
    const { palette, shape }: ThemeSchema = useTheme();

    return {
      position: 'relative',
      transition: 'margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      overflowAnchor: 'none',
      borderRadius: shape?.borderRadius || '4px',
      backgroundColor: palette?.background?.paper || '#fff',
      border: `1px solid ${palette?.divider || 'rgba(0, 0, 0, 0.12)'}`,
      margin: ownerExpanded ? '16px 0' : '0',
      '&:first-of-type': {
        marginTop: 0,
        borderTopLeftRadius: shape?.borderRadius || '4px',
        borderTopRightRadius: shape?.borderRadius || '4px',
      },
      '&:last-of-type': {
        marginBottom: 0,
        borderBottomLeftRadius: shape?.borderRadius || '4px',
        borderBottomRightRadius: shape?.borderRadius || '4px',
      },
      // Remove double borders between adjacent accordions
      '&:not(:first-of-type)': {
        borderTop: ownerExpanded ? undefined : 'none',
      },
      opacity: ownerDisabled ? 0.38 : 1,
    };
  },
);

export const AccordionSummaryRootStyled = styled.button<AccordionOwnerState>(
  ({ ownerExpanded, ownerDisabled }): CSSObject => {
    const { palette, typography }: ThemeSchema = useTheme();

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 0,
      width: '100%',
      minHeight: ownerExpanded ? '64px' : '48px',
      padding: '0 16px',
      transition:
        'min-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      cursor: ownerDisabled ? 'not-allowed' : 'pointer',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: palette?.text?.primary || '#000',
      fontFamily: typography?.fontFamily,
      fontSize: typography?.body?.fontSize || '1rem',
      fontWeight: ownerExpanded
        ? 500
        : (typography?.fontWeight || 400),
      '&:hover': {
        backgroundColor: ownerDisabled
          ? 'transparent'
          : palette?.action?.hover || 'rgba(0, 0, 0, 0.04)',
      },
      '&:focus-visible': {
        backgroundColor: palette?.action?.focus || 'rgba(0, 0, 0, 0.12)',
      },
    };
  },
);

export const AccordionSummaryContentStyled = styled.div(
  (): CSSObject => ({
    display: 'flex',
    flexGrow: 1,
    margin: '12px 0',
  }),
);

export const AccordionSummaryExpandIconStyled = styled.div<AccordionOwnerState>(
  ({ ownerExpanded }): CSSObject => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: ownerExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  }),
);

export const AccordionDetailsRootStyled = styled.div<AccordionOwnerState>(
  ({ ownerExpanded }): CSSObject => {
    const { palette, typography }: ThemeSchema = useTheme();

    return {
      display: ownerExpanded ? 'block' : 'none',
      padding: '8px 16px 16px',
      color: palette?.text?.secondary || 'rgba(0, 0, 0, 0.6)',
      fontFamily: typography?.fontFamily,
      fontSize: typography?.body?.fontSize || '0.875rem',
      borderTop: `1px solid ${palette?.divider || 'rgba(0, 0, 0, 0.12)'}`,
    };
  },
);
