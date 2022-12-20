import React = require("react");
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Copyright