import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import { Accordion, AccordionSummary, AccordionDetails, AccordionGroup } from '../src';

expect.extend(toHaveNoViolations);

describe('Accordion', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <Accordion value="1" defaultExpanded>
          <AccordionSummary data-testid="summary">Summary</AccordionSummary>
          <AccordionDetails data-testid="details">Content</AccordionDetails>
        </Accordion>
      </ThemeProvider>
    );
    expect(screen.getByTestId('summary')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('details')).toBeVisible();
  });

  it('toggles expansion on click', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <Accordion value="1">
          <AccordionSummary data-testid="summary">Summary</AccordionSummary>
          <AccordionDetails data-testid="details">Content</AccordionDetails>
        </Accordion>
      </ThemeProvider>
    );

    const summary = screen.getByTestId('summary');
    const details = screen.getByTestId('details');
    
    expect(summary).toHaveAttribute('aria-expanded', 'false');
    expect(details).not.toBeVisible();

    await user.click(summary);
    expect(summary).toHaveAttribute('aria-expanded', 'true');
    expect(details).toBeVisible();

    await user.click(summary);
    expect(summary).toHaveAttribute('aria-expanded', 'false');
    expect(details).not.toBeVisible();
  });

  it('handles exclusive group correctly', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <AccordionGroup exclusive>
          <Accordion value="1">
            <AccordionSummary data-testid="sum-1">1</AccordionSummary>
            <AccordionDetails data-testid="det-1">1</AccordionDetails>
          </Accordion>
          <Accordion value="2">
            <AccordionSummary data-testid="sum-2">2</AccordionSummary>
            <AccordionDetails data-testid="det-2">2</AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </ThemeProvider>
    );

    const sum1 = screen.getByTestId('sum-1');
    const sum2 = screen.getByTestId('sum-2');
    const det1 = screen.getByTestId('det-1');
    const det2 = screen.getByTestId('det-2');

    expect(det1).not.toBeVisible();
    expect(det2).not.toBeVisible();

    await user.click(sum1);
    expect(det1).toBeVisible();
    expect(det2).not.toBeVisible();

    await user.click(sum2);
    expect(det1).not.toBeVisible();
    expect(det2).toBeVisible();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Accordion value="1">
          <AccordionSummary>Settings</AccordionSummary>
          <AccordionDetails>Account settings go here.</AccordionDetails>
        </Accordion>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
