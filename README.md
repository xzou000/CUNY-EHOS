# EHOS Assist
Steven Barrios,  Emmmanuella D. I. Kogda, Xiaohang Zou, Boris Kalmatsky
![Website Link](https://fathomless-mountain-49508.herokuapp.com/)
User account: sample@gmail.com password: Sample123
Manager User Account: Manager@gmail.com Password: Manager123

This project is to provide a portal designed to facilitate a variety of safety-related services at CCNY laboratories.
This includes but is not limited to:
* Collection of hazardous waste
* Laboratory inspections
* Safety training
* Distribution of safety supplies

~~The finished product will be deployed using the Angular framework, with the .NET platform serving as our backend, however this repository **will** be using different backend technologies.~~ The reason for this is comfortability with JavaScript and other front end frameworks, and for reasons explained later.
> Note that at this time, the backend server has been shutdown, and there are no further plans to continue with the above plans.
## Technologies
This rough draft is using what is known as a MEAN stack, which uses the following technologies:
+ MongoDB
  * A NOSQL Database that uses JSON formatting to represent data  
+ ExpressJS
  * An HTTP server framework that facilitates REST API functions and routing
+ Angular 2
  * Front end framework designed and maintained by Google Inc.
+ NodeJS
  * A JavaScript run-time environment for executing server-side scripts using native JavaScript, it is commonly used for web development purposes  

The process flow of the the MEAN stack is shown in the photo below:
![alt text](https://excellentwebworld.com/wp-content/uploads/2017/09/images-3.jpg "MEAN Process - Anchal Malik")

## Prerequisites
As we can see from the diagram above, knowledge of **JavaScript** and **Angular** is essential in order to follow this.
You don't necessarily need the backend Node files in order to use the client source code; everything you need to make the front end side of things work is inside the `../client` folder.

As just mentioned, the client code is stored inside the */client/lab-platform/src* folder. For front end development purposes, Angular provdides a development server for you to test out your components and what not, but here I included my NodeJS script that would deploy and serve the front end.
>The script is super basic and **only is there for my own devices**. I will continuously update this repository, and whatever is done on the backend with the .NET platform, I will be mimicking with Node for my own enhancement and development in my node skills. That is to say that the front end can be worked on without ever disturbing the backend. So, if you want the server.js file to work, you need to download [NodeJS](https://nodejs.org/en/). *Technically*, Node.js and the NPM utility (which comes with Node) are not needed to make Angular2 work. However, it can help you be more productive/efficient, from the developing stage, all the way to the deployment stage. Okay thats enough of an advertisement!


> UPDATE: The latest commit is the final commit for this repository, unless noted otherwise. 

##  Front End Development
 1. Download Angular 5, the most efficient way to do this is through the command land interface located [here](https://cli.angular.io/). This interface makes it super easy to create components, directives, services, (i.e. an Angular project). I mean, you can create component, services, etc. manually, but honestly thats a waste of time if you have something that will do it for you.
 2. Clone this repository, then navigate to it through your terminal/console. You should be somewhere that looks like: ` ~/../CCNY-EHOS/`. Navigate to the actual Angular project: `cd client`. Then we can start our development server provided by Angular:
   `ng serve`.

This will load the client code on your default browser. Now when you alter the content, the changes will reflect on the page, as it normally would in any Angular project. And that should be it!
