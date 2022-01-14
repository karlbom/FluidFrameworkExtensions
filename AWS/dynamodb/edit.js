const fs = require("fs");


fs.readFile(process.env.JSONPATH, 'utf8', (e, data) => {
  const obj = JSON.parse(data);
  obj["db"] = { "default": "DynamoDb" };
  obj["extensions"] = {
    "db": [
      {
        "path": process.env.BUNDLEPATH,
        "config": {
          "table": "routerlicious",
          "region": "us-west-2",
          "endpoint": "https://dynamodb.us-west-2.amazonaws.com"
        },
        "name": "DynamoDb",
        "factory": "DynamoDbFactory"
      }
    ]
  }


  /*
     "db": {
        "default": "DynamoDb"
    },
    "extensions": {
        "db": [
            {
                "path": "/usr/src/server/packages/services/dist/dynamodb.js",
                "config": {
                    "table": "routerlicious",
                    "region": "us-west-2",
                    "endpoint": "https://dynamodb.us-west-2.amazonaws.com"
                },
                "name": "DynamoDb",
                "factory": "DynamoDbFactory"
            }
        ]
    },
  */

  fs.writeFile('out.json', JSON.stringify(obj, null, 2), (err) => {
    console.log(err || 'complete');
  });
});