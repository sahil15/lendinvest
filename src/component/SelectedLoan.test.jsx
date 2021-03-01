import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectedLoan from './SelectedLoan';

const props = {
    selectedLoanForInvestment: [
        {
            "tranche": 1,
            "available": 123,
            "term_remaining": 13123213
        }
    ]
            
        
}
test('loads and displays Selected Loan', async () => {
    render(<SelectedLoan selectedLoanForInvestment={props.selectedLoanForInvestment} investedLoanAmount={()=> console.log("test")} />)
    expect(screen.getByText('Selected Loan'))
})

test('loads and displays Selected Loan abd the props', async () => {
    render(<SelectedLoan selectedLoanForInvestment={props.selectedLoanForInvestment} investedLoanAmount={()=> console.log("test")} />)
    expect(screen.getByText('Loan tranche : 1'))
    expect(screen.getByText('Amount Available : 123'))
    expect(screen.getByText('Invest'))
})