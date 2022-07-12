const express = require('express')
const https = require('https')

const app = new express()
app.use(express.json())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/supervisors', async (req, res) => {

    let supervisorsArray = [];

     https.get('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers', (resp) => {
      var body = '';

      resp.on('data', (d) => {
        body += d;
      })

      resp.on('end', function() {

            body = JSON.parse(body);

            body = body.filter(function (item) {
              return isNaN(item.jurisdiction);
            });

            body.sort((a,b) => {
              return a.jurisdiction.localeCompare(b.jurisdiction) || a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName);
            });

            body = body.map(function(element) {
                return {"jurisdiction": element.jurisdiction, "lastName": element.lastName, "firstName": element.firstName};
            });

            // supervisorsArray = body;

            for (const i of body){
              let supervisor = { "supervisor" :  i.jurisdiction + " - " + i.lastName + ", " + i.firstName };
              supervisorsArray.push(supervisor);
            }

            res.send(supervisorsArray);
        });

    }).on('error', (e) => {
      console.error(e)
    })


})

app.post('/api/submit', async (req, res) => {

    try {

        if(!Object.keys(req.body.fname).length || !Object.keys(req.body.lname).length || !Object.keys(req.body.supervisor).length){
          throw new Error('First Name, Last Name, and Supervisor are required');
        }

        res.json({
            'body': req.body,
        });
        console.log(req.body.fname);
        console.log(req.body.lname);
        if(Object.keys(req.body.email).length){
          console.log(req.body.email);
        }
        if(Object.keys(req.body.phone).length){
          console.log(req.body.phone);
        }
        console.log(req.body.supervisor);
    }
    catch(e) {
        res.json({
            'error': e.message
        });
        console.log(e.message);
    }
})

app.listen(8080, () => {
    console.log('Listening on 8080. Ctrl+c to stop this server.')
})
