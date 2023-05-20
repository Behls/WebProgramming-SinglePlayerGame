# Asssignment One

## Section 1 - The Application
The inspiration behind this project was space invaders, where the player can only move in a horizontal direction shooting and destroying the meteors and againing points. If the meteor hits the ground or the player it is then game over. The players score will be added to the scoreboard and they will be able to play again.

## Section 2 - Installation

To run the application you will need the following installed on a local / server machine: 
- PHP
- Apache

**Installing Php:**
PHP can be installed in various ways, depending on your systems operating software. (Mac, windows, linux) 
For an in depth guide, check out the [official documentation] (https://www.php.net/manual/en/install.php) and install php using a specific package based on your systems requirements.

**Installing Apache:**
Apache can be installed by either manually downloading the required packages, or on a MACOS system, it can be installed via homebrew.


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

**Partials**
Patials are a directory that contain modular sections of the application specifically for the frontend, modules including the login form, navigation menu and the footer. It's a directory to house any isolated features of the application.

**Views**
Views are mainly for the frontend, it is a directory containing the view code for the application, seperating some of the backend logic from the frontend. This is primarily where the HTML code would be stored in PHP file format.

**Controllers**
The controller directory will house any files with additional backend logic for their related view, as well as any additional server based or authentication code. 

## Game Controls
Game controls are:  
- W or right arrow key - moves the character to the right.
- a or left arrow key - moves the character to the left.
- spacebar or enter key - shoots a bullet from the ship's position.

## Resources - Links to sourced design files
- [Ship resources & spritesheets](https://craftpix.net/freebies/free-spaceship-pixel-art-sprite-sheets/)
- [Bullet / Charge blast resources & spritesheets](https://craftpix.net/freebies/free-spaceship-pixel-art-sprite-sheets/)
- [Meteor resources & spritesheets](https://craftpix.net/freebies/free-space-shooter-game-objects/)

