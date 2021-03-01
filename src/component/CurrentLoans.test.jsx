import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import CurrentLoans from './CurrentLoans';

test('loads and displays loans', async () => {
    const { getByText } = render(<CurrentLoans />)
    expect(getByText('Current Loans')).toBeInTheDocument()
});


test('click on invest button', () => {
    const { container, getByText } = render(<CurrentLoans />)
    fireEvent(
        getByText(container, 'Invest'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
});
