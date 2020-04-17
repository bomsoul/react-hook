import React,{useState} from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns";
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Firebase from '../components/Firebase';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }));

export default function Home(){
    const classes = useStyles();
    const date = new Date();
    const [value,setValue] = useState({
        title: '',
        description: '',
        status: false,
        duedate: (date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()).toString()
        // duedate: new Date()Date.now().getFullYear()+"-"+Date.now().getMonth()+"-"+Date.now().getDate(),
    });

    const handleChange = (props) => (e) =>{
        if(props === 'status'){
            setValue({...value,[props]: e.target.checked});
        }
        else if(props === 'duedate'){
            setValue({...value,[props]: (e.getFullYear()+"-"+e.getMonth()+"-"+e.getDate()).toString()});
            
        }
        else{
            setValue({...value,[props]: e.target.value});
        }
        console.log(value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        Firebase.firestore().collection('/todos')
        .add(value)
        .then(() =>{
            alert("Add new Todo Complete");
            window.location.assign("/");
        })
    }

    return (
        <div>
            <h2>Create New Todo</h2>
            <br/>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">Title</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={value.title}
                        onChange={handleChange('title')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={value.description}
                        onChange={handleChange('description')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={90}
                        multiline
                        rows={2}
                        rowsMax={4}
                    />
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Due Date"
                    value={value.duedate}
                    onChange={handleChange('duedate')}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
                <br/>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={value.status}
                        onChange={handleChange('status')}
                        name="status"
                        color="Secondary"
                    />
                    }
                    label="Success ?"
                />
                <br/>
                <Button type="submit" variant="outlined" color="primary">
                    Create Todo
                </Button>
            </form>
        </div>
    )
}