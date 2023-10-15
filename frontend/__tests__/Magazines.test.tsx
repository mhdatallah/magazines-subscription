import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Magazines } from '@/components/Magazines';

test('Magazines component renders correctly', async () => {
  render(<Magazines userId={1} />);
  const container = screen.getByTestId('magazines-container');
  expect(container).toBeInTheDocument();
});

test('Magazines component handles subscription button click', async () => {
  render(<Magazines userId={1} />);
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );

  const subscribeButton = screen.getByText('Subscribe');
  fireEvent.click(subscribeButton);

  expect(global.fetch).toHaveBeenCalledTimes(1);

  global.fetch.mockClear();
  delete global.fetch;
});
