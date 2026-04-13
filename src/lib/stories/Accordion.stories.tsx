import type { Meta, StoryObj } from '@storybook/react';
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

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: any) => (
  <Accordion value="item-1" disabled={args.disabled}>
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
export const Group: StoryObj = { name: 'Group', render: () => <GroupStory /> };
export const ExclusiveGroup: StoryObj = { name: 'Exclusive Group', render: () => <ExclusiveGroupStory /> };

export const Playground: StoryObj = {
  name: 'Playground',
  argTypes: {
    disabled: { control: 'boolean' },
    summary: { control: 'text' },
    details: { control: 'text' },
  },
  args: {
    disabled: false,
    summary: 'Custom Accordion',
    details: 'This is the content.',
  },
  render: (args: any) => <PlaygroundStory {...args} />,
};
