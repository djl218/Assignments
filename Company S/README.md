<h1>Interview Assignment: Company S</h1>

<h2>1. What's your proudest achievement? It can be a personal project or something you’ve worked on professionally. Just a short paragraph is fine, but I’d love to know why you’re proud of it.</h2>

My proudest achievement, without a doubt, is my learning journey over this past year.  In the Fall of 2019, my passion was sparked when I took a data mining course with Python.  Ever since then, my single focus has been on becoming a software engineer.

I remember back to when I didn't know what a for loop was.  I often felt overwhelmed, but I knew, even then, that a career in the technology industry was something that I was meant to pursue.

I don't have a CS degree and I made the decision that I was not going to attend a bootcamp.  Identifying the skills that I needed to acquire was not easy.  I knew that I couldn't do it on my own.

So, I started doing the 100 Days of Code challenge on [Twitter](https://twitter.com/DanielLeskosky) and started learning from other developers in the industry.  I learned so much from the people that I have met.  I also reached out to as many people as I could on LinkedIn, asking them just about any question you might imagine an aspiring software engineer might ask.

I was able to map out a plan of action and put together a timeline, so that I could reach my goal in the quickest amount of time possible.  After a year of hard work, I have almost made it.  I am almost a software engineer.  

Technically it is not an achievement until I reach my goal, but as you can imagine, I am pretty darn proud, nonetheless!

<h2>2. What's a personal project you're currently working on? This could be a coding side project, hobby, or otherwise real world project you're working on.</h2>

To be perfectly honest, I don't really have a personal project that I am currently working on.  I spend just about every hour of the day, learning and studying to become a software engineer.  I do sleep of course.  Sleep is important.

I do have quite a few ideas for projects that I would like to take on when I reach my goal though.  I haven't really decided which language I will use yet, though.  I like Java and JavaScript both.

I do have quite a few hobbies though, but I have taken a bit of a break from them.  Will definitely be glad to pick up these hobbies again when I get a software engineering role.

Some of these hobbies include:
    - Rock climbing (only gym yet)
    - Backpacking
    - Yoga

You could see me having fun with these hobbies of mine on [Instagram](https://www.instagram.com/danielleskosky/).

<h2>3. Tell us about a technical book or article you read recently, why you liked it, and why we should read it.</h2>

A book that I am currently reading is [Designing Data-Intensive Applications](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321).  I have been spending a good amount of time lately studying distributed systems and I gotta say this is a great book.  I have also been using [Grokking the System Design Interview](https://www.educative.io/courses/grokking-the-system-design-interview) as well.

What I like about "Designing Data-Intensive Applications" is that it goes over the history of databases and scalable systems.  It really gets into the nuts and bolts of how they work too.

Although I haven't been reading as much as I would like over this past year, I still do enjoy it very much.  Here is a [blog post](https://www.danielleskosky.com/the-best-programming-books/) I wrote that shows all of the programming books that I now own.  Please note that this post was written a year ago and my thoughts on some of these books may have changed.

<h2>4. Tell us about one of your favorite products (physical or software) and one specific aspect that makes it truly great.</h2>

Without a doubt, one of my favorite products (both physical and software) is the [Tension Board](https://www.tensionclimbing.com/product/tension-board-sets/)!  You use an app to sync up to LED lights that are placed on a slanted wall with wooden holds.  You can select different routes based on difficulty.  Users can rate climbs and make their own climbs that other users can then climb on at any other Tension Board location.  

Such a great idea, in my opinion!

I have been spending a lot of time LeetCode lately and I am very impressed with the quality of that web site.  So many problems, and so much information buried in the discussion boards.  The contests are really fun too!

<h2>Question 5</h2>

In this repo is a `data.json` file.  It contains an imaginary example set of data a customer might need to migrate from one system to another. It's a JSON encoded array of objects. The customer understands some of the data might be bad and wants to know which records are invalid so they can ensure the new system will only have valid data. Write a program that will read in the data and mark any records:\
        i. That are a duplicate of another record\
        ii. `name` field is null, missing, or blank\
        iii. `address` field is null, missing, or blank\
        iv. `zip` is null, missing, or an invalid U.S. zipcode\

    
Each record has an ID but that should only be used to identify a record, not for validity or duplication testing (eg, two records may be identical but have different IDs).

The output of the program should list the IDs of each invalid or duplicate record, one per line. In the case of duplicates, mark both.

Example:
```
123ba
439a2
99abc
bac34
```

<h2>General Notes about Question 5</h2>

This description corresponds to the JavaScript written in the [customerDataParse.js](https://github.com/djl218/Assignments/blob/main/Company%20S/customerDataParse.js) file.

To access the file in Node, I used the native module `fs`.  The `fs` module allows for the option of synchronous or asynchronous versions for many functions.

`fs.readFile` was used to load the data from the JSON file.  The JSON file was specified as `utf8`.

From there the JSON data was passed to the `parse()` function.
Here is a brief summary of the `parse()` algorithm:

* `invalidRecords` will store all IDs that are considered invalid because of the specifications that were detailed.

* `nameMap` is an object being used as a key-value map that will store each valid `name` field as key.  The value will be a list that contains IDs corresponding to each record that had this `name`.  But the size of this list will only contain one element at most. 

* Like `nameMap`, `addressMap` is an object being used as a key-value map that stores each valid `address`.  The value will be a list that contains IDs corresponding to each record that had this `address`.  But the size of this list will only contain one element at most.

* Each record of the data is iterated over.

* If `currName` field is invalid, but the `currAddress` field is still valid, then `currAddress` is added as key and `currId` is added to the value list for `addressMap` via the `addValue()` function.

* If `currAddress` field is invalid, but the `currName` field is still valid, then `currName` is added as key and `currId` is added to the value list for `nameMap` via the `addValue()` function.

* If either `nameMap` has `currName` or `addressMap` has `currAddress` then this is a duplicate record and `currId` is added to `invalidRecords`.  

* Additionally any ID corresponding to `currName` or `currAddress` that was added earlier needs to be retrieved and added to `invalidRecords`.  This is done by iterating through the value list that corresponds to that key.

* After the IDs are added to `invalidRecords`, the value list that was associated with `currName` or `currAddress` will no longer be needed as it is already added to `invalidRecords`.  The value list will be replaced with an empty list.  This reduces time and memory and will allow the algorithm to achieve linear time and space.

* No duplicate IDs will be added to `invalidRecords` because it is a hash set.

* If `currName` is valid, it is added to `nameSet`.  If `currAddress` is valid, it is added `addressSet`.

* If `currZip` is missing, null, blank, or a length other than 5, `currId` is added to `invalidRecords`.

* If `currZip` is of length 5 and every character is a digit between 0 and 9, then this is considered a valid zip code.  Otherwise `currId` is added to `invalidRecords`.

* It should be mentioned that zipCode+4 format was not taken into consideration, nor was it considered whether a valid 5 digit `currZip` was actually a real US zip code.  Future improvement of this algorithm could be to compare every `currZip` value to a hash set containing all valid US zip codes.

* The IDs for all invalid or duplicate records were then printed.  **9595 IDs were found.**

* Each of the specifications in the instructions was tested.  Here is what was tested:
    - Duplicate `name`
    - Duplicate `address`
    - Null, missing, or blank `name`
    - Null, missing, or blank `address`
    - Null, missing, blank, or invalid `zip`
    - [See JSON test data](https://github.com/djl218/Assignments/tree/main/Company%20S/TestData)

* Admittedly, these tests were done rather manually.  I have experience performing tests in a [web development context](https://github.com/djl218/notesApp-backend/blob/master/tests/note_api.test.js), but not so much for algorithm testing.

<h3>Time Complexity</h3>

Assume that `n` is the length of the JSON String array that is being passed as input.  It will take O(n) time to iterate over the length of the JSON String array.  There will never be more than one ID stored in the value list for `nameMap` or `addressMap` because it is deleted afer every time the IDs are added to `invalidRecords`.  The time for this does not need to be taken into consideration.  The overall time complexity is O(n).   

<h3>Space Complexity</h3>

Assume that `n` is the length of the JSON String array that is being passed as input.  O(n) space will be required for `invalidRecords`, O(n) space will be required for `nameMap`, and O(n) space will be required for `addressMap`.  This will sum to O(3n) which is asymptotically equivalent to O(n).

[<h3>Click here to see output from this algorithm</h3>](https://github.com/djl218/Assignments/blob/main/Company%20S/output.txt)