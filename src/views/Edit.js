import React,{useState,useEffect} from 'react';
import { useParams} from 'react-router';
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
import { green } from '@material-ui/core/colors';
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

export default function Edit(){
    let {id} = useParams();
    const [data,setData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        Firebase.firestore().collection('todos').doc(id)
        .get().then(doc => {
            const newData = ({id:doc.id,...doc.data()});
            setData(newData);
        })
    },[])

    const handleChange = (props) => (e) =>{
        if(props === 'status'){
            setData({...data,[props]: e.target.checked});
        }
        else if(props === 'duedate'){
            setData({...data,[props]: (e.getFullYear()+"-"+e.getMonth()+"-"+e.getDate()).toString()});
        }
        else{
            setData({...data,[props]: e.target.value});
        }
        console.log(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Firebase.firestore().collection('todos').doc(id)
        .update(data)
        .then(() => {
            window.location.assign("/show/"+id);
        })
    }

    return (
        <div>
            <h2>Edit Todo</h2>
            <br/>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">Title</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={data.title}
                        onChange={handleChange('title')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={data.description}
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
                    value={data.duedate}
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
                        checked={data.status? true:false}
                        onChange={handleChange('status')}
                        name="status"
                        color="Secondary"
                    />
                    }
                    label="Success ?"
                />
                <br/>
                <Button type="submit" variant="outlined" style={{ color: green[500] }}>
                    Edit
                </Button>
            </form>
        </div>
    )
}