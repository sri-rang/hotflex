Hot reload / Build on save for Adobe Flex.

Dependencies
=======

* Node.js
* NPM
* http://srirangan.net/2011-09-setup-node-js-and-npm-on-ubuntu

Install
=======

    $ git clone git://github.com/Srirangan/hotflex.git
    $ cd hotflex
    $ sudo npm install -g

Run
=======

    $ cd example
    $ ./hotflex

Configure
=======

    { "source": "./src/main/flex/main.mxml"
    , "sourceFolder": "./src"
    , "target": "./bin/main.swf"
    , "lib": "./lib" // Optional
    }

