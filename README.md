# @thanh-libs/accordion

A flexible accordion component that supports both independent panels and exclusive groups.

## Installation

```sh
npm install @thanh-libs/accordion
# or
yarn add @thanh-libs/accordion
```

## Features
- Standard `Accordion`, `AccordionSummary`, and `AccordionDetails` structure.
- Fully accessible out of the box (keyboard navigation, ARIA states).
- `AccordionGroup` for controlled/uncontrolled group states.
- Exclusive mode (only one panel open at a time).

## API Reference

### AccordionGroup
| Prop | Type | Default | Description |
|---|---|---|---|
| `exclusive` | `boolean` | `false` | Only one accordion can be expanded at a time |
| `defaultValue` | `string \| string[]` | - | Default expanded panels |
| `value` | `string \| string[]` | - | Controlled expanded panels |
| `onChange` | `(value: string \| string[]) => void` | - | Callback fired on expansion change |

### Accordion
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | - | Unique identifying value |
| `defaultExpanded` | `boolean` | `false` | If true, initially expanded |
| `expanded` | `boolean` | - | Controlled state of panel |
| `disabled` | `boolean` | `false` | If true, overrides summary actions |
| `onChange` | `(expanded: boolean) => void` | - | Change callback |

### AccordionSummary
| Prop | Type | Default | Description |
|---|---|---|---|
| `expandIcon` | `ReactNode` | - | Icon to display at edge |

### AccordionDetails
Renders standard block content. No custom props required.

## Usage

```tsx
import { AccordionGroup, Accordion, AccordionSummary, AccordionDetails } from '@thanh-libs/accordion';

export const Example = () => (
  <AccordionGroup exclusive>
    <Accordion value="item-1">
      <AccordionSummary expandIcon={<span>⬇</span>}>Item 1</AccordionSummary>
      <AccordionDetails>Content 1</AccordionDetails>
    </Accordion>
    <Accordion value="item-2">
      <AccordionSummary expandIcon={<span>⬇</span>}>Item 2</AccordionSummary>
      <AccordionDetails>Content 2</AccordionDetails>
    </Accordion>
  </AccordionGroup>
);
```
