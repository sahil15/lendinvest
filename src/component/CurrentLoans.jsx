import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { remSep } from "string-remove-thousand-separators";
import CommaNumber from 'comma-number';
import SelectedLoan from './SelectedLoan';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
}));


export default function CurrentLoans() {

    const classes = useStyles();
    const [loansList,setLoansList] = useState([]);
    const [currentLoansList,setCurrentLoansList] = useState([]);
    const [selectedLoanForInvestment,setSelectedLoanForInvestment] = useState([]);
    const [availableAmount,setAvailableAmount] = useState(0);
    const [visibleLoan,setVisibleLoan] = useState(false);

    useEffect(()=>{
        axios.get("/current-loans/current-loans.json")
            .then(function (response) {
                setCurrentLoansList(response.data.loans);
                renderList(response.data.loans);
                availableLoanAmount(response.data.loans);
            })
            .catch(function (error) {
                console.log(error);
                throw new Error("error",error);
            })
       
    },[currentLoansList]);

    const renderList = (loans) => {
        
        const listItems = loans.map((loan) =>
                <Grid item key={loan.id}>
                    <Card className={classes.root}>
                        <CardHeader
                            title= {loan.title}
                            action={
                                <Button size="medium" variant="contained" onClick={()=>{setSelectedLoan(loan.id)}} color="primary">
                                    Invest
                                </Button>
                              }
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Annual Return : {loan.annualised_return}%
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                LTV : {loan.ltv}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
        );
        setLoansList(listItems);
    }

    const setSelectedLoan = (loanid) => {
        console.log("loanid", loanid);
        const loanSelected = currentLoansList.filter(loan => loan.id == loanid);
        console.log("loanSelected", loanSelected);
        setSelectedLoanForInvestment(loanSelected);
        setVisibleLoan(true);
    }

    const availableLoanAmount = (loans) => {
        const amountAvailable = loans.reduce((sum,loan) =>  sum + parseInt(remSep(loan.available)),0);
        setAvailableAmount(amountAvailable);
    }

    const investedLoanAmount = (amountInvested) => {
        setAvailableAmount(availableAmount - parseInt(amountInvested));
        setVisibleLoan(false);
    }
  return(
      <Grid container direction="row" style={{paddingTop: "1%"}}>
          <Grid item xs={1}></Grid>
          <Grid item xs={4} >
                <Card>
                    <CardHeader
                            title= "Current Loans"
                        />
                    <CardContent>
                        <Grid container spacing={2} direction="column">
                            {loansList}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        Total Amount Available for Investements: ${CommaNumber(availableAmount)}
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={1}></Grid>
            {(visibleLoan && selectedLoanForInvestment.length > 0) &&
                <Grid item xs={5}>
                    <SelectedLoan investedLoanAmount={investedLoanAmount} selectedLoanForInvestment={selectedLoanForInvestment} />
                </Grid>
            }
      </Grid>
  )

}