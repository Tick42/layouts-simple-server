# DEPRECATED:

This example is deprecated in favor of a new [**Node.js Application and Layout Server Example**](https://github.com/Tick42/rest-config-example-node-js).

## Overview

Glue42 Desktop can store layouts locally or use a REST service as a store. This package contains a simple REST server that operates as a layouts store. 

This basic implementation stores the user layouts in files (they have the same structure as the local layouts files) and returns the same set of data for all users (does not take the user into account). New layouts are stored in files (using the name of the layout - there is no validation whether the layouts name can be used as a filename). The remove layout operation is not implemented and just logs to the console.

## Prerequisites

In order to run the layouts server, you need to install `npm` and `Node v.10` (probably can run with a lower one as well).

## Running the Layouts Server

Navigate to the server root directory and run from a command prompt:

```cmd
npm i
npm run start
```

The layouts server will start to listen on port 8004 and will load layouts from the `\layouts` folder. The environment variable `SERVER_PORT` can be used to override the default port and the default layouts folder can be changed by setting the `LAYOUTS_FOLDER` variable.

## Configuring Glue42 Desktop

If your Glue42 Desktop copy is not configured to load layouts from a REST service, you need to edit the `system.json` file located in the `%LocalAppData%\Tick42\GlueDesktop\config` folder.

1.  Locate the `layouts` top-level property:

```json
 "layouts": {
    "store": {
        "type": "file"
    }
  }
```

2. Update the layouts store to:

```json
 "layouts": {
    "store": {
        "type": "rest",
        "restURL": "http://localhost:8004/",
        "restFetchInterval": 20
      }
  } 
```

* `type` - can be `file` or `rest`, depending on the type of layouts store you want to setup;
* `restURL` - the URL address of the layouts REST service;
* `restFetchInterval` - interval (in seconds) for fetching layouts from the REST service;

## REST

The REST service implements:

* `GET` layouts - returns all layouts. In a real implementation this should consider the user that is passed in the request headers.
* `POST` layouts - creates/updates a layout in this demo server; 
* `DELETE` layouts - removes a layout. Does nothing in this demo server, only logs to the console;
