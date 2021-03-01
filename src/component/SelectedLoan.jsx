import React, {useRef, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import humanizeDuration from 'humanize-duration';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function SelectedLoan(props) {
    const [investedAmount,setInvestedAmount] = useState(0);


    const investMoney = () => {
       props.investedLoanAmount(investedAmount);
       setInvestedAmount(0);
    }
    return(
        <Card>
                    <CardHeader
                            title= "Selected Loan"
                        />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                                Loan tranche : {props.selectedLoanForInvestment[0].tranche}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                                Amount Available : {props.selectedLoanForInvestment[0].available}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                                Term Pending : {humanizeDuration(props.selectedLoanForInvestment[0].term_remaining)}
                        </Typography>
                                    <TextField
                                            id="outlined-number"
                                            label="Investment Amount"
                                            type="number"
                                            className="investmentAmount"
                                            variant="outlined"
                                            onChange= {(event) => setInvestedAmount(event.target.value)}
                                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained"  color="primary" onClick={investMoney}>
                              Invest
                        </Button>
                    </CardActions>
        </Card>
    )
}