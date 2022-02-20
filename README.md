# Gamecache

[Gamecache][0] is a website that helps you keep track of your video game
collection. It keeps track of the games you are currently playing, plan on
playing, and have completed. In the future it will also serve as a game review
site and community.

## Working with the frontend

You should first set up an installation of the [backend API][1], which is
written in JavaScript using Node.js and Express.

Once that is done, you can set up the frontend by following these steps:

Install the required dependencies...

    cd gamecache-frontend
    npm install

Start the dev server...

    npm run dev

The dev server assumes you are running the backend on `http://localhost:3000`.
If you need to change this you can edit `rollup.config.js` at the `dev`
section of the js file.

[0]:https://gamecache.net
[1]:https://github.com/colinmurphy1/gamecache-backend]
