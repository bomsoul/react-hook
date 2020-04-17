import React,{useState,useEffect} from 'react';
import { useParams} from 'react-router';
import {Link} from 'react-router-dom';
import Firebase from '../components/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  

export default function Show(){
    let {id} =  useParams();
    const [data,setData] = useState({
    });
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    useEffect(() => {
        Firebase.firestore().collection('/todos').doc(id).get().then(doc =>{
            const newData = ({id: doc.id,...doc.data()})
            setData(newData)
        })
    },[])

    return(
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Due Date :{data.duedate}
                    </Typography>
                    <Typography variant="h5" component="h2">
                    {data.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    {data.status ? 'Done': 'Doing'}
                    </Typography>
                    <Typography variant="body2" component="p">
                    {data.description}
                    <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" to={"/edit/"+id} component={Link}>Edit</Button>
                </CardActions>
            </Card>
        </div>
    )
}