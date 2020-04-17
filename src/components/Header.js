import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';



export default function Header() {
return (
    <div>
    <AppBar position="static">
        <Toolbar>
        <Button color="inherit" to="/" component={Link}>Home</Button>
        <Button color="inherit" to="/create" component={Link}>Create New Todo</Button>
        </Toolbar>
    </AppBar>
    </div>
);
}