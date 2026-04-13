import { render } from '@testing-library/react';

import ThanhLibsAccordion from './accordion';

describe('ThanhLibsAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThanhLibsAccordion />);
    expect(baseElement).toBeTruthy();
  });
});
