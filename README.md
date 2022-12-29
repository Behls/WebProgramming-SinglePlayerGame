# Asssignment One

## Section 1 - The Application

## Section 2 - Installation

To run the application you will need the following installed on a local / server machine: 
- PHP
- Apache

Installing Php: 

Installing Apache: 

## Section 2 - Running The Application Locally

Once php and apache have been installed, navigate to the project folder and run the following command in Terminal or CMD: 

```

php -S localhost:8000

```

This will create a light local server in the browser, the terminal will provide a link to the project being served. 

If there is no index file, then it may be required to specific the file if its named different for example: 

```

php -S localhost:8000/examplepage.php

```
## Section 3 - Router Explained

The index file for the whole application contains a simple router. This is done by getting URI of the current page, and then redirecting to the appropriate controller based on the current uri.

An example of this would be:

```

$uri = $_SERVER['REQUEST_URI'];
   if ($uri === '/'){
        require './controllers/Page.php';
   }

```

This makes the URLS cleaner - overall better practice using routers for responses, redirects etc.

## Section 4 - Controllers, Views & Partials