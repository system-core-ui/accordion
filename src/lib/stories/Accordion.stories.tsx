import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion } from '../Accordion/Accordion';
import { AccordionSummary } from '../AccordionSummary/AccordionSummary';
import { AccordionDetails } from '../AccordionDetails/AccordionDetails';
import { AccordionGroup } from '../AccordionGroup/AccordionGroup';
import { ThemeProvider } from '@thanh-libs/theme';

// ─── Helpers ──────────────────────────────────────────

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => (
  <Accordion value="item-1">
    <AccordionSummary expandIcon={<ArrowIcon />}>
      Accordion Item 1
    </AccordionSummary>
    <AccordionDetails>
      This is the details content. It can contain anything like text, forms, or other components.
    </AccordionDetails>
  </Accordion>
);

// ─── Default Expanded ────────────────────────────────────

const DefaultExpandedStory = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Accordion value="collapsed">
      <AccordionSummary expandIcon={<ArrowIcon />}>Collapsed by default</AccordionSummary>
      <AccordionDetails>This panel starts collapsed.</AccordionDetails>
    </Accordion>
    <Accordion value="expanded" defaultExpanded>
      <AccordionSummary expandIcon={<ArrowIcon />}>Expanded by default</AccordionSummary>
      <AccordionDetails>This panel starts expanded via defaultExpanded prop.</AccordionDetails>
    </Accordion>
  </div>
);

// ─── Controlled ──────────────────────────────────────────

const ControlledStory = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', background: '#f5f5f5' }}
        >
          Toggle externally
        </button>
        <span style={{ fontSize: 13, color: '#888' }}>expanded = {String(expanded)}</span>
      </div>
      <Accordion value="ctrl" expanded={expanded} onChange={setExpanded}>
        <AccordionSummary expandIcon={<ArrowIcon />}>Controlled Accordion</AccordionSummary>
        <AccordionDetails>
          This accordion is controlled externally. The button above toggles it, and clicking the summary also works through onChange.
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

// ─── Group ───────────────────────────────────────────────

const GroupStory = () => (
  <AccordionGroup>
    <Accordion value="panel1">
      <AccordionSummary expandIcon={<ArrowIcon />}>Panel 1</AccordionSummary>
      <AccordionDetails>Panel 1 content details here.</AccordionDetails>
    </Accordion>
    <Accordion value="panel2">
      <AccordionSummary expandIcon={<ArrowIcon />}>Panel 2</AccordionSummary>
      <AccordionDetails>Panel 2 content details here.</AccordionDetails>
    </Accordion>
    <Accordion value="panel3" disabled>
      <AccordionSummary expandIcon={<ArrowIcon />}>Disabled Panel 3</AccordionSummary>
      <AccordionDetails>This won't be seen.</AccordionDetails>
    </Accordion>
  </AccordionGroup>
);

// ─── Exclusive Group ─────────────────────────────────────

const ExclusiveGroupStory = () => (
  <AccordionGroup exclusive defaultValue="panel2">
    <Accordion value="panel1">
      <AccordionSummary expandIcon={<ArrowIcon />}>Panel 1</AccordionSummary>
      <AccordionDetails>Opening this will close Panel 2.</AccordionDetails>
    </Accordion>
    <Accordion value="panel2">
      <AccordionSummary expandIcon={<ArrowIcon />}>Panel 2</AccordionSummary>
      <AccordionDetails>This panel is open by default.</AccordionDetails>
    </Accordion>
    <Accordion value="panel3">
      <AccordionSummary expandIcon={<ArrowIcon />}>Panel 3</AccordionSummary>
      <AccordionDetails>Panel 3 details.</AccordionDetails>
    </Accordion>
  </AccordionGroup>
);

// ─── Nested Content ──────────────────────────────────────

const NestedContentStory = () => (
  <AccordionGroup>
    <Accordion value="faq1">
      <AccordionSummary expandIcon={<ArrowIcon />}>What is your return policy?</AccordionSummary>
      <AccordionDetails>
        <p style={{ margin: '0 0 12px 0' }}>
          We accept returns within 30 days of purchase. Items must be in their original condition with tags attached.
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li>Full refund for unused items</li>
          <li>50% refund for opened but undamaged items</li>
          <li>Free return shipping on defective products</li>
        </ul>
      </AccordionDetails>
    </Accordion>
    <Accordion value="faq2">
      <AccordionSummary expandIcon={<ArrowIcon />}>How long does shipping take?</AccordionSummary>
      <AccordionDetails>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <th style={{ textAlign: 'left', padding: 8 }}>Method</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Time</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>Standard</td>
              <td style={{ padding: 8 }}>5-7 days</td>
              <td style={{ padding: 8 }}>Free</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>Express</td>
              <td style={{ padding: 8 }}>2-3 days</td>
              <td style={{ padding: 8 }}>$9.99</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>Overnight</td>
              <td style={{ padding: 8 }}>Next day</td>
              <td style={{ padding: 8 }}>$24.99</td>
            </tr>
          </tbody>
        </table>
      </AccordionDetails>
    </Accordion>
    <Accordion value="faq3">
      <AccordionSummary expandIcon={<ArrowIcon />}>Contact support</AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input placeholder="Your email" style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14 }} />
          <textarea placeholder="Describe your issue..." rows={3} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14, resize: 'vertical' }} />
          <button style={{ padding: '8px 20px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', alignSelf: 'flex-start' }}>
            Send
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  </AccordionGroup>
);

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: any) => (
  <Accordion value="item-1" disabled={args.disabled} defaultExpanded={args.defaultExpanded}>
    <AccordionSummary expandIcon={<ArrowIcon />}>
      {args.summary}
    </AccordionSummary>
    <AccordionDetails>
      {args.details}
    </AccordionDetails>
  </Accordion>
);

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Accordion/Accordion',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ maxWidth: 600, padding: 40 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const Basic: StoryObj = { name: 'Basic', render: () => <BasicStory /> };
export const DefaultExpanded: StoryObj = { name: 'Default Expanded', render: () => <DefaultExpandedStory /> };
export const Controlled: StoryObj = { name: 'Controlled', render: () => <ControlledStory /> };
export const Group: StoryObj = { name: 'Group', render: () => <GroupStory /> };
export const ExclusiveGroup: StoryObj = { name: 'Exclusive Group', render: () => <ExclusiveGroupStory /> };
export const NestedContent: StoryObj = { name: 'Nested Content', render: () => <NestedContentStory /> };

export const Playground: StoryObj = {
  name: 'Playground',
  argTypes: {
    disabled: { control: 'boolean' },
    defaultExpanded: { control: 'boolean' },
    summary: { control: 'text' },
    details: { control: 'text' },
  },
  args: {
    disabled: false,
    defaultExpanded: false,
    summary: 'Custom Accordion',
    details: 'This is the content.',
  },
  render: (args: any) => <PlaygroundStory {...args} />,
};
