<h1>Take-Home Assignment: Company CG</h1>

<h2>Overview</h2>

For this assignment I was given two REST endpoints to create:
* Create a new trainer
* Get details for a trainer

In addition to these specifications, I also created the functionality to:
* Get all trainers
* Delete a specific trainer

To do this I created a backend with Node.js and utilized the Express library.

<h2>Instructions to Setup</h2>

* Clone the Assignments repo.  Learn to clone a repo [here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository).

* Please make sure that you have [node installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on your machine.

* Once cloned, navigate to the Company_CG directory and run the `npm install` command in your terminal.

* Then run the `npm run dev` command.  This will run the Node.js sever in development mode.  The script for this is in the `package.json` file.

* To make sure that everything is working properly, go to `http://localhost:3001/` in your browser.  It should say "Company CG".

* Now navigate to `http://localhost:3001/api/trainers`.  It should list the trainers that are specified in the `index.js` file.

* You can also navigate to specific trainers. Navigate to `http://localhost:3001/api/trainers/trainer-id-000001`.  You should see the information for the trainer who has an id of `trainer-id-000001`.

<h2>Test the Endpoints</h2>

* To test the REST client requests for this backend, I used the VS Code REST client plugin.  If you wanted to use another tool like Postman for instance, feel free to.  Just take the information from the `requests` directory and use Postman instead.

* First let's execute a HTTP GET request that will get all of the trainers.  Open the `get_all_trainers.rest` file from the `requests` directory.  And click the `Send Request` text that is right above the first line.

* You should get a similar result as the image below.  The 200 status code means that the request was received properly.

![get_all_trainers](https://github.com/djl218/Assignments/blob/main/Company_CG/images/get_all_trainers.png)

* Now let's try to get a specific trainer.  Open the `get_trainer2.rest` file.  And click the `Send Request` text.  You should get a similar result as the image below.

![get_trainer2](https://github.com/djl218/Assignments/blob/main/Company_CG/images/get_trainer2.png)

* Now let's delete a trainer's records.  Open the `delete_trainer.rest` file and click the `Send Request` text.  You should get a similar result as the image below with a 204 status being returned.

![delete_trainer2](https://github.com/djl218/Assignments/blob/main/Company_CG/images/delete_trainer2.png)

* We can create a new trainer too.  Open the `create_trainer.rest` file and click the `Send Request` text.  Your result should look like the image below.

![create_trainer](https://github.com/djl218/Assignments/blob/main/Company_CG/images/create_trainer.png)

* Now run `get_all_trainers.rest` again.  Your result should look like the image below.

![new_get_all_trainers](https://github.com/djl218/Assignments/blob/main/Company_CG/images/new_get_all_trainers.png)

<h2>Considerations of Backend</h2>

I just want to briefly touch on some qualities that this backend takes into consideration.

* When performing GET requests for a specific trainer.  If that there is no trainer ID that matches the ID sent in the request, a 404 error will be returned.

* When creating a new trainer, if a value for email, phone, first name, or last name is missing, a 400 error will be returned along with a message describing what value was missing.

* Also for every new trainer that is created, a unique ID will be assigned to that trainer.  This ID value will be one value greater than the current maximum trainer ID that is stored on the backend.

* A time of creation value is also added for every new trainer that is created.

<h2>Future Considerations</h2>

Although this backend handles requests fairly well, there is still room for improvement:

* First, it should be made sure that an email that is submitted for a new trainer is in an appropriate format.  It should contain `@` and should be followed by something like `website.com`.

* An email should only be used once.  A trainer should not be able to create another account if their email is already stored (assuming that there is a database).

* Also there should be some considerations for phone numbers.  Should they be in a specific format?  Should they be a specific length?