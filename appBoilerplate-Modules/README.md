Backbone-Boilerplate
======
created By Henrique Barroso


What's this ?
------

This is a [BackboneJs](http://backbonejs.org/) AMD boilerplate. It's a great starting point if you want to write multi-pages web applications
using [BackboneJs](http://backbonejs.org/) with [RequireJs](http://requirejs.org/).

It relies on a very-well organized file structure, and it enables decoupled code, by using separated bundles that are dynamically loaded from the Backbone Router when a specified URL pattern is matched.

The build process is also very simple, and creates a merged file for each bundle, and a common merged file for the global
dependencies.


What's Included ?
------

In order to simplify, and help organize this tool, the following libraries are included:

* [RequireJs](http://requirejs.org/) - This boilerplate is built around AMD.
* [RequireJs-text](https://github.com/requirejs/text) - A cool addon to requireJS, that allows to load files as plain-text
* [Underscore](http://underscorejs.org/) - Require by BackboneJS
* [BackboneJs](http://backbonejs.org/) - An awesome library to separate content/logic in your applications.
    * [Backbone.localStorage](https://github.com/jeromegn/Backbone.localStorage) - To store content locally (not required)
* [Mustache](https://github.com/janl/mustache.js/) - A very elegant javascript template engine
* [jQuery](http://jquery.com/) - Do I really need to explain what this is ?
* [Qunit](http://qunitjs.com/) - Unit test suit (not required, but highly recommended)


Requirements
------

* **Bower** - In order to start using this tool make sure you have [Bower](https://github.com/twitter/bower) installed.
Bower is a very simple and light package manager that helps you manage Javascript dependencies. It's very easy to install, just follow the instruction in the Bower page.

* **r.js**  - This is a tool from RequireJs, that allows us to optimize/minify/uglify our code into one single or multiple files.
This is not required but it's highly recommended.

Installation
-------

**Step 1** - Clone this repository.

On your shell type:
```
git clone https://github.com/hbarroso/backbone-boilerplate.git
```

If you prefer you can also download it as a zip file and uncompress into your web folder.

**Step 2** - Install dependencies

```
cd backbone-boilerplate && bower install
```
This will create a new directory called **vendors** inside **src/scripts/**.
You can see what will be installed by opening the file **.bowerrc** in the root folder.


**Step 3** - Visit page

Make sure your root folder is accessible by your web server, eg:

```
http://localhost/backbone-boilerplate/src
```

If everything went well you should see a [Todos](https://github.com/jeromegn/backbone.localstorage) app that I've adapted.
The orignal one was created by Jerome Gravel-Niquet.

This **Todos** page is just a simple **bundle** demo that shows you how you can write your own bundles.


File Structure
--------

```
.
├── .bowerrc                                    --> bower default dependencies installation dir
├── build
│   ├── app.build.js                            --> requireJS optimization config file
│   └── build.sh                                --> shell script to run r.js and clean dist/ dir
├── component.json                              --> bower dependencies manager
├── README.md                                   --> this file
├── src                                         --> Where you must store your source code
│    ├── css/                                   --> folder for CSS files
│    ├── index.html                             --> sample index file
│    ├── scripts                                --> all javascript code must be under this dir
│    │   ├── app.js                             --> responsbile for loading the router and creating routes
│    │   ├── bundles/                           --> where all bundles must live in
│    │   ├── main.js                            --> requireJS starting point
│    │   ├── router.js                          --> Includes BackboneJS Router object
│    │   └── vendors/                           --> default dir for bower installation
│    └── tests.html                             --> runs Qunit test suit
└── build/                                      --> Output dir after building

```

Loading
--------

In your html file you just need to add this:
```html
<script data-main="scripts/main" data-root="/backbone-boilerplate/src/" src="scripts/vendors/requirejs/require.js"></script>
```

**data-main** - This is the main file that will be loaded from requireJs. This is relative to the script page.
So if you have your index file elsewhere, make sure to change this as well.

**data-root** - Only add this if your application is not under the default **/** path. This is relative to your web root url.

And yes, this is the only script tag you  will need. Cool right ? ;)


Creating a bundle
--------

Creating a bundle is very easy. You can look under **src/scripts/bundles/todos** to see an example of how a bundle is structured.

**Step1** - Creating bundle folder

Create a new directory under **src/scripts/bundles/** with the following structure
```
.
├── collections     --> Backbone Collections
├── models          --> Backbone Models
├── templates       --> Mustache Templates
├── tests           --> Qunit unit tests
├── views           --> Backbone Views
└── main.js         --> Main entry point for the bundle, all bundles must have this file.
```

**Step 2** - Create routing

Open up the file **src/scripts/router.js** and add the route to your bundle. Eg:
```js
// Add your modules routing here
router.route("/foo", "foo", function () {
    this.loadModule("bundles/foo/main");
});
```

What this will do is, as soon as Backbone detects the url is something like: *http://localhosts/foo* it will load the module
you created under the **src/scripts/bundles** named **foo*

**Step 3** - Add to build config file (not required)

In order to build your bundles as single merged files, you need to add them to the **build/app.build.js** file.
So open this file and add, inside the **modules[]** root. eg:
```js
modules: [
    {
        name: 'main',
        include: ['requireLib', 'main', 'app'],
    },
    //
    // Add your modules bellow
    //
    {
        name: 'bundles/foo/main',
        exclude: ['main']
    }
]
```

**Notice:** Make sure you don't remove the *main* entry, as that includes all the common dependencies like Backbone, jQuery and so on.


Unit testing
--------

**Step 1** - Create a unit test suite

Inside your bundle you should have a directory called *tests*.
Just add a new file eg: **fooTest.js** , look at the **bundles/todos/tests/main.js** as an example on how to structure your test.

**Step 2** - Add your unit test to test.html

Open **src/test.html** file and add the following to the **testModules* array:
```js
var testModules = [
    "bundles/foo/tests/fooTest",
];
```

**Step 3** - Run

Go to your browser and go the **tests.html** page, eg: **http://localhost/tests.html**.
You should see the Qunit in  action.


Optimization
--------
This will merge each bundle into a single file, and the dependencies into another single file as well.
This will, it will be a lot faster to use this in production code.

First, make sure you have **r.js** installed in your system.
Second, make sure your bundles were added to the **build/app.build.js** file, like stated in Step3 on the **Create a Bundle** step.

These settings are for the RequireJs build. More info [here](http://requirejs.org/docs/optimization.html).

**Step 1** - Build

If everything is correctly setup you just need to run the following command from the root path.
```
cd build && ./build.sh
```

After all files are processed, you should end up with a new directory called **dist/** in your root path.
In this folder your should see pretty much the same directory structure you have in **src/** , but most of the code
will be merged, minified and uglified.

**Step 2** - Configuration

Now you must load your main script like this:
```html
<script data-main="scripts/main" data-root="/backbone-boilerplate/dist/" src="scripts/main.js"></script>
```
Make sure you changed the **src** attribute to the **scripts/main.js** and **data-root** to your new folder

**Step 3** - Run

You can now try to access on your web browser this new build.
Eg: **http://localhost/dist**

Everything should work exactly as in the **src** version, except that you should only get two javascript files per page.
One being the main.js with all the dependencies(requirejs, backbonejs, jquery, etc..), the other one your bundle that's being
loaded by the router module.
