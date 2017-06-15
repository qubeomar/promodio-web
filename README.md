Run on the test/product server:

1. Open the terminal / CMD;
2. Go to the project folder;
3. Run command - npm run build:prod (this command will erase all inside the "dist" folder and create brand new build);
4. If project is behind the Apache/Nginx - use .htaccess file or routes to rewrite all requests to the frontend (except the file requests) to /dist/index.html file. If there is no web-server like Apache/Nginx you can use the build-in web-server by the command npm run server:prod ;

Building the project requires installed node.js.


change1
