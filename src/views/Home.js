import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import Firebase from '../components/Firebase';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function Home(){

    const [data,setData] = useState([]);

    useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
          );
        Firebase.firestore().collection("todos").onSnapshot(querySnapshot=>{
            const newData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setData(newData);
            console.log(data)
        });
        
    },[]); 

    const classes = useStyles();

    const todolist = () =>{
        return data.map((key,index) =>
        <TableRow>
            <TableCell>{key.title}</TableCell>
            <TableCell>{key.duedate}</TableCell>
            <TableCell>{key.status ? <CheckCircleOutlineIcon style={{ color: green[500] }} />:<HighlightOffIcon color="secondary" />}</TableCell>
            <TableCell>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    to={"/show/"+key.id} 
                    component={Link}
                    endIcon={<AssignmentIcon/>}
                >
                    Show
                </Button>&nbsp;
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={()=>{Firebase.firestore().collection('todos').doc(key.id).delete().then(()=>{
                        alert("Delete Complete")
                    })}}
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>)
    }


    return (
        <div>
            
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                todolist()
            }
            </TableBody>
        </Table>
        </TableContainer>
        </div>
        
    )
}