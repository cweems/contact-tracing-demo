const fs = require('fs');
const https = require('https');

const accountSid = 'AC78beb53b17256431dcb4e75ad30b183d';
const authToken = '6e65bbaf4f917c451269ab54e4c636c3';
const client = require('twilio')(accountSid, authToken);

function start() {
  client.sync.services
    .create()
    .then((service) => {
      console.log(service.sid);
      writeEnvVars('CONTACT_SYNC_SERVICE', service.sid);
      createSyncMap(service.sid);
    })
    .catch((e) => {
      console.log(e);
    });
}

function createSyncMap(serviceSid) {
  client.sync
    .services(serviceSid)
    .syncMaps.create({ friendlyName: 'Flex Directory Contacts' })
    .then((syncMap) => {
      console.log(syncMap.sid);
      writeEnvVars('CONTACT_SYNC_MAP', syncMap.sid);
    })
    .catch((e) => {
      console.log(e);
    });
}

function writeEnvVars(key, value) {
  const envLine = `\n${key}=${value}`;

  fs.appendFile('.env', envLine, function (err) {
    if (err) {
      console.log(`Failed to write environment variable to .env file: ${err}`);
    } else {
      console.log(`Appended ${envLine} to .env file`);
    }
  });
}

function updateFlexConfig() {
    const options = {
        hostname: 'whatever.com',
        port: 443,
        path: '/todos',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    curl https://flex-api.twilio.com/v1/Configuration -X POST -u ACxx:auth_token \
    -H 'Content-Type: application/json' \
    -d '{
        "account_sid": "ACxx",
        "ui_attributes": {
            "logLevel": "debug"
        }
    }'
}

start();
