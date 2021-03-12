# Node Deep Dive
Here we will dive into the different website design frameworks and utilitly libraries available and used in the industry.


## Meta
### Definitions
* **Node** or **NodeJS**<br/>the engine (aka *runtime*) upon which javascript code is run/executed
    * **Node** is *generally* used to run code that generates/builds in *realtime* the website or webpage that will be sent to the user (aka *client*).
    * Corporate users of **Node** software include GoDaddy, Groupon, IBM, LinkedIn, Microsoft, Netflix, PayPal, Rakuten, SAP, Voxer, Walmart, Yahoo!, and Amazon Web Services.
    * It is lightweight and efficient which is why it is so widely used in the industry. Also, by being widely used in the industry, it has a lot of documentation, support and packages (aka *libraries*) built around it.
* **package**<br/>Also known as a *library*, a package is simply a collection of code that can be imported into a project and used.
    * Typically, package installation, version control, updates and removal are all handled by a *package manager* such as **`npm`** or **`yarn`**.
* **framework**: a scaffolding of code and libraries upon which other things can be more easily built
* **Express** or **ExpressJS**: a minimal and flexible **Node** web application framework/*package* 
    * This is the code that 'listens' for incoming page requests and 'serves up' the webpages of a website.
* **client** or **user**: the person who ultimately uses the website/webpage and their computer
* **user interface** (**UI**): what the user/client interacts with on a webpage
* **React** or **ReactJS**: a **Node** framework/library/package that defines the UI of a webpage
    * Importantly, it allows for 'dynamic' content, aka content that *changes* depending on any number of variables (user input, what user is 'logged in', time of day, etc. ...)
    * The pages built by the **React** code are 'served up' by the **Express** code.
    * **React** is developed and maintained by **Facebook** though it is considered free and open source software as it is licensed with the [MIT license](https://en.wikipedia.org/wiki/MIT_License), as is **Node**
* **back-end**: the code that is run (in our case, by the **Node** *runtime* engine) on the web-server 
* **front-end**: the code (HTML, javascript, etc.) that is downloaded by and run on the user/client's computer's web-browser to display the resulting UI to the user
    * Typically code that is written to *generate* the front-end code (ex. **React** code) is sometimes also referred to as the 'front-end' of a website though it is *actually run* on the 'back-end' and produces the code that will be run on the *actual* front-end, aka the client's computer.
* **application programming interface** (**API**): a dictionary of interactions or a defined 'protocol' that is used by two parts of a program or system to interact safely with eachother
    * for the scope of this document, the two program parts would be the **front-end** and the **back-end** of our website.
        * For security, it is important that only certain code and/or information is loaded and run on the client's computer (**front-end**).


## Design Frameworks
A **design framework** is a system of design standards, templates, UI patterns and components that are used throughout a product and serve as its *design language* and provide design clarity and consistency.


### Bootstrap
The [existing draft-website](em-web-deployed.herokuapp.com) is built using the [`react-bootstrap` package](https://www.npmjs.com/package/react-bootstrap) which provides an easy way to use **Bootstrap** within a **React** website's code.

Basic but powerful.
>At a high level, here’s what guides our approach:
>* Components should be responsive and mobile-first
>* Components should be built with a base class and extended via modifier classes
>* Component states should obey a common z-index scale
>* Whenever possible, prefer a HTML and CSS implementation over JavaScript
>* Whenever possible, use utilities over custom styles
>* Whenever possible, avoid enforcing strict HTML requirements (children selectors)

#### Licensing
Bootstrap is developed and maintained by **Twitter** and it is licensed with the [MIT license](https://en.wikipedia.org/wiki/MIT_License).

#### Examples
* https://getbootstrap.com/docs/4.0/examples/
* https://www.awwwards.com/websites/bootstrap/


### Material Design
>Material Design is inspired by the physical world and its textures, including how they reflect light and cast shadows. Material surfaces reimagine the mediums of paper and ink.

#### Licensing
[Material Design](https://material.io/design) is developed and maintained by **Google** and licensed under the [Apache License](https://en.wikipedia.org/wiki/Apache_License) which is similar to the [MIT license](https://en.wikipedia.org/wiki/MIT_License) but provides protections for patents. It also requires that you state if you have changed their codebase at all.

#### Examples
* [Dropbox](https://www.dropbox.com/business/)
* [Google's Design website (and pretty much all of Google's products)](https://design.google/)


### Ant Design


## Utility Packages
Packages used to provide added features such as UI Components or input processing


### Markdown
The nice thing about Markdown is that it allows the user to create a document with speed and ease, without having to worry about how it will be formatted. It is consistent in it's formatting and provides simple, basic features to produce a, subjectively speaking, beautiful and clean document.

While it typically requires the user to know the syntax, there are 'visual editors' that can be implemented and used to provide a Graphical User Interface (GUI) to build the document with the correct syntax. [ProseMirror has an example](https://prosemirror.net/) that was implemented using the node package [rich-markdown-editor](https://www.npmjs.com/package/rich-markdown-editor).

This file is written using a variant of the **Markdown** language.
Markdown files are written in a specific syntax and then run through a Markdown compiler (ex. [`markdown-it`](https://www.npmjs.com/package/markdown-it) which is used in the draft-site to display the outline on the [meta page](https://em-web-deployed.herokuapp.com/meta) which is displayed in HTML but is consistent with the site's overal styling) which converts the markdown file (`*.md`) to, usually, HTML code that can be used inside a web-page.

There are other markdown compilers out there for displaying markdown files in other ways but they are beyond the scope of this document.

> **It is worth noting**: There are many Markdown variants such as GitHub Flavored Markdown (GFM) that have slightly different syntax and features (ability to display images, video, 2 spaces for indentation vs 4 spaces, etc.) though the most commonly used features and syntax remain the same.
>
> Eagle Medical could even have our own version of Markdown and a Visual GUI editor made for it (similar to [Wikipedia's mark*up* 'visual editor'](https://en.wikipedia.org/wiki/Wikipedia:VisualEditor)) that allows us to easily create procedure documents, online forms, and anything else our hearts desire. This is easier to do than it may sound, though it would require some time to fully implement.


### Charts
