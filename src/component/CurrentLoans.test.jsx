import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import CurrentLoans from './CurrentLoans';

test('loads and displays loans', async () => {
    const { container, getByText } = render(<CurrentLoans />)
    expect(getByText('Current Loans')).toBeInTheDocument()
});


