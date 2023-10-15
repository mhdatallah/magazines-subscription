import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Subscriptions } from '@/components/Subscriptions';

test('Subscriptions component renders correctly', async () => {
  const { container } = render(<Subscriptions userId={1} />);

  expect(container).toBeInTheDocument();
});

test('Subscriptions component handles cancel button click', async () => {
  const { getByText } = render(<Subscriptions userId={1} />);

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );

  const cancelButton = getByText('Cancel Subscription');
  fireEvent.click(cancelButton);

  expect(global.fetch).toHaveBeenCalled();

  global.fetch.mockClear();
  delete global.fetch;
});
