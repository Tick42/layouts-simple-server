## Overview

Glue Desktop can store layouts locally or use a REST service as a store - this package contains a simple REST server that serves as a layouts store. 

This basic implementation stores the user layouts in files (same structure as the local files) and returns the same set of data for all users (does not take the user in account).New layouts are stored in files (using the name of the layout - there are no checks if the layouts name can be used as filename). Remove layout operation is not implemented and just logs on the console.

## Prerequisites

npm
Node 10 (probably can run with a lower one as well)

## Running

```cmd
npm i
npm run start
```

## Configuration

### Configuring the server

#### Port 

By default the server will listen on port 8004. The environment variable `SERVER_PORT` can be used to override that.

#### Layouts files

Add your layouts to the `layouts` folder (the folder can be changed by setting `LAYOUTS_FOLDER` variable).

### Configuring Glue Desktop

If your Glue Desktop copy is not configured to use Rest Service you need to Edit `config/system.json` file (located in GlueDesktop directory)

1.  Locate the *layouts* config property (top-level). Should look something like
```json
 "layouts": {
    "store": {
        "type": "file"
    }
  }
```

2. Update the layouts store to 
```json
 "layouts": {
    "store": {
        "type": "rest",
        "restURL": "http://localhost:8004/",
        "restFetchInterval": 20
      }
  } 
```

## REST

The rest service implements:

* GET layouts -> returns all layouts. In a real implementation this should consider the user that is passed in the request headers
* POST layouts -> creates/updates a layout. In this demo server 
* DELETE layouts -> removes a layout. Does nothing in this Demo server
