const express = require('express');

const  app = express();
const port = 8000; //Port number where our project runs


// checking the server is up or not
app.listen(port, (err)=> {
    // if error occurs 
    if(err) {
        console.log('Server hosting error', err);
    }

    //if the server is successfully hosted 
    console.log(`server is successfully running on port: ${port}`);
});
