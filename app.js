/*1.	Read and parse the below xml and extract title, author and publication year

<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book>
    <title>Harry Potter and the Sorcerer's Stone</title>
    <author>J.K. Rowling</author>
    <publicationYear>1997</publicationYear>
  </book>
  <book>
    <title>The Hobbit</title>
    <author>J.R.R. Tolkien</author>
    <publicationYear>1937</publicationYear>
  </book>
</library>

Expected Output: title-> Harry Potter and the Sorcerer's Stone, The Hobbit
		     author-> J.K. Rowling, J.R.R. Tolkien
		     publication year-> 1997, 1937 
*/

const fs = require('fs');
const { XMLParser } = require("fast-xml-parser");

fs.readFile( './inputQ1.xml', function(err, XMLdata) {
    const parser = new XMLParser();
    let jObj = parser.parse(XMLdata);    
    // Extract and display the information
    const books = jObj.library.book;
    console.log(`title-> ${books.map(book => book.title).join(', ')}`);
    console.log(`author-> ${books.map(book => book.author).join(', ')}`);
    console.log(`publication year-> ${books.map(book => book.publicationYear).join(', ')}`);
 });

/*
 2.	Read and parse below JSON and extract the title, author, and publication year.

 {
   "library": [
     {
       "title": "Harry Potter and the Sorcerer's Stone",
       "author": "J.K. Rowling",
       "publicationYear": 1997
     },
     {
       "title": "The Hobbit",
       "author": "J.R.R. Tolkien",
       "publicationYear": 1937
     }
   ]
 }
 Expected Output : title-> Harry Potter and the Sorcerer's Stone, The Hobbit
              author-> J.K. Rowling, J.R.R. Tolkien
              publication year-> 1997, 1937
 
 */

const staticJson = {
    "library": [
        {
            "title": "Harry Potter and the Sorcerer's Stone",
            "author": "J.K. Rowling",
            "publicationYear": 1997
        },
        {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "publicationYear": 1937
        }
    ]
}

//output on console 
console.log(`title-> ${staticJson.library?.map(book => book.title).join(', ')}`);
console.log(`author-> ${staticJson.library?.map(book => book.author).join(', ')}`);
console.log(`publication year-> ${staticJson.library?.map(book => book.publicationYear).join(', ')}`);

/*
3.	Manipulate the above JSON data in Node.js. Add one more item to the library with title, author, and publicationYear.
*/ 

staticJson.library.push({
    "title": "Test",
    "author": "Test",
    "publicationYear": 'Test'
})

//output on console 
console.log(`title-> ${staticJson.library?.map(book => book.title).join(', ')}`);
console.log(`author-> ${staticJson.library?.map(book => book.author).join(', ')}`);
console.log(`publication year-> ${staticJson.library?.map(book => book.publicationYear).join(', ')}`);


/*
5.	Function to update the title to ‘Test’ in the above XML and update it by printing the updated XML.
*/ 
const { DOMParser, XMLSerializer } = require('xmldom');

// original XMLdata
const xmlData = `
<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book>
    <title>Harry Potter and the Sorcerer's Stone</title>
    <author>J.K. Rowling</author>
    <publicationYear>1997</publicationYear>
  </book>
  <book>
    <title>The Hobbit</title>
    <author>J.R.R. Tolkien</author>
    <publicationYear>1937</publicationYear>
  </book>
</library>
`;

// Function to update titles to "Test" and return updated XML
function updateTitleToTest(xmlData) {
    const parser = new DOMParser();
    const serializer = new XMLSerializer();                            
    // parse the XML
    const doc = parser.parseFromString(xmlData, 'text/xml');

    // get all 'title' elements and update the value 
    const titles = doc.getElementsByTagName('title');
    for (let i = 0; i < titles.length; i++) {
        titles[i].textContent = 'Test'; 
    }

    // back to xml string 
    const updatedXml = serializer.serializeToString(doc);

    return updatedXml;
}

//uses
const updatedXml = updateTitleToTest(xmlData);
console.log(updatedXml);


/*
6.	Function to Encrypt credentials Decrypt below credentials. 
Username = “test” Password = “test@1234”
Expected Output:  Username – abc9jhkju9977 (encrypted characters)
Password – adkdkjldfldio9897dsnn (encrypted characters)
*/

//Note: Since you not defind which algorithm to use be used for Encryption so just used simple md5 hash 
const crypto = require('crypto');
const username = 'test';
const password = 'test@1234';

var encryptUsername  = crypto.createHash('md5').update(username).digest('hex');
var encryptPassword  = crypto.createHash('md5').update(password).digest('hex');

console.log('Encrypted Username', encryptUsername);
console.log('Encrypted Password', encryptPassword);



/*
7.	You want to store large amounts of data (e.g. 1 million) securely in a file. Write a function to store it.
*/

const crypto2 = require('crypto');
const fs2 = require('fs');

function encryptData(data, password) {
    // createing a random salt
    const salt = crypto2.randomBytes(16);

    // derive a key from the password and salt
    const key = crypto2.scryptSync(password, salt, 32);

    // generate a random initialization vector
    const iv = crypto2.randomBytes(16);

    // create a cipher instance
    const cipher = crypto2.createCipheriv('aes-256-cfb', key, iv);

    // encrypt the data
    const encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

    // returning the salt, iv, and encrypted data, all concatenated together
    return Buffer.concat([salt, iv, encryptedData]);
}

function storeEncryptedData(filename, data, password) {
    // encrypting the data
    const encryptedData = encryptData(data, password);
    // write the encrypted data to a text file
    fs2.writeFileSync(filename, encryptedData);
}

// example usage 
const dataPassword = 'your_secure_password';

// its small data for demostrastion but could be used for million of data for same
const data = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. ....`;
const filename = 'secureDataFile.txt';

storeEncryptedData(filename, data, dataPassword);


//decrypt the same file with reverse direction
function decryptData(encryptedData, password) {
    // extract the salt, iv, and encrypted data from the input
    const salt = encryptedData.slice(0, 16);
    const iv = encryptedData.slice(16, 32);
    const data = encryptedData.slice(32);

    // derive the key using the same password and salt
    const key = crypto2.scryptSync(password, salt, 32);

    // dreate a decipher instance
    const decipher = crypto2.createDecipheriv('aes-256-cfb', key, iv);

    // decrypt the data
    let decryptedData = decipher.update(data, null, 'utf8');
    decryptedData += decipher.final('utf8');

    return decryptedData;
}

function readAndDecryptData(filename, password) {
    // read the encrypted data from the file
    const encryptedData = fs.readFileSync(filename);

    // decrypt the data
    return decryptData(encryptedData, password);
}
const decryptedData = readAndDecryptData(filename, dataPassword);
//console.log(decryptedData);


/*
8.	Function to use cluster module for multi-core processors and improve application performance? Provide an example of clustering.

*/

//Never used cluster module in my any real life life project so don't have much idea on this.  


/*
9.	Suppose you are getting validation errors, runtime errors, and custom errors in the Nodejs application. Write a function to resolve the above errors.
*/

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Custom Error Classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400; // Bad Request
  }
}

class RuntimeError extends Error {
  constructor(message) {
    super(message);
    this.name = "RuntimeError";
    this.statusCode = 500; // Internal Server Error
  }
}

// middleware for simulating different errors
app.get('/error', (req, res, next) => {
  const errorType = req.query.type;
  
  if (errorType === 'validation') {
    return next(new ValidationError('Invalid input!'));
  } else if (errorType === 'runtime') {
    return next(new RuntimeError('Oops, something went wrong!'));
  } else {
    // example of an unexpected error
    return next(new Error('Unexpected error occurred!'));
  }
});

// centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  if (err instanceof ValidationError || err instanceof RuntimeError) {
    // handle known errors
    return res.status(err.statusCode).json({ error: err.name, message: err.message });
  } else {
    // handle unexpected errors
    return res.status(500).json({ error: 'InternalServerError', message: 'An unexpected error occurred!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//validation error:  http://localhost:3000/error?type=validation
//runtime : http://localhost:3000/error?type=runtime
//custom : http://localhost:3000/error?type=custome

/*
10.	Suppose you want to print the above error in a log file. How will you achieve this in Nodejs?

*/


//Using the fs Module we can write the logs into the files and can be categorize based on error type also, above middlewere code can modified like below : 

const fs3 = require('fs');
const logFilePath = './error.log';

app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  if (err instanceof ValidationError || err instanceof RuntimeError) {
    // handle known errors
    
    // Log the error to a file
    const errorLog = `[${new Date().toISOString()}] ${err.name}: ${err.message}\n`;
    fs3.appendFile(logFilePath, errorLog, (writeError) => {
      if (writeError) {
        console.error('Error writing to log file:', writeError);
      }
    });


    return res.status(err.statusCode).json({ error: err.name, message: err.message });
  } else {
    // handle unexpected errors
    return res.status(500).json({ error: 'InternalServerError', message: 'An unexpected error occurred!' });
  }
});


//Note: there are no of modules which can use to better logging, formmating error etc. could be used 'winston'  