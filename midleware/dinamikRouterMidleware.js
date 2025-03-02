// const express = require('express');
// const router = express.Router();

// const fs = require('fs');

// let routes = fs.readdirSync(__dirname);

// for(let route of routes){
//   if(route.includes(".js")){    
//     router.use("/"+route.replace(".js", ""), require(`./${route}`))
//   }
// }

// module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

let routes = fs.readdirSync(__dirname);

for (let route of routes) {
  if (route !== 'index.js' && route.endsWith('.js')) { 
    const routePath = path.join(__dirname, route);
    const routeModule = require(routePath);

      router.use('/' + route.replace('.js', ''), routeModule);
    
  }
}

module.exports = router;