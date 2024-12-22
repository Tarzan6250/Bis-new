# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Database Schema :(quizlevels)

{
  "levelName": "Level 1",
  "duration": 150,
  "questions": [
    {
      "questionText": "Which of these is a BIS standard for food products?",
      "options": [
        {"optionText": "IS 13690", "isCorrect": true},
        {"optionText": "IS 1282", "isCorrect": false},
        {"optionText": "IS 1543", "isCorrect": false},
        {"optionText": "IS 1000", "isCorrect": false}
      ],
      "answer": "IS 13690"
    },
    {
      "questionText": "What does BIS stand for?",
      "options": [
        {"optionText": "Bureau of Indian Standards", "isCorrect": true},
        {"optionText": "Banking Information System", "isCorrect": false},
        {"optionText": "Basic Industrial Safety", "isCorrect": false},
        {"optionText": "Business Intelligence System", "isCorrect": false}
      ],
      "answer": "Bureau of Indian Standards"
    },
    {
      "questionText": "Which of the following is not a part of the BIS hallmark for gold?",
      "options": [
        {"optionText": "Purity", "isCorrect": false},
        {"optionText": "Carat Value", "isCorrect": false},
        {"optionText": "BIS Logo", "isCorrect": false},
        {"optionText": "Currency Symbol", "isCorrect": true}
      ],
      "answer": "Currency Symbol"
    },
    {
      "questionText": "When was BIS established?",
      "options": [
        {"optionText": "1986", "isCorrect": true},
        {"optionText": "1947", "isCorrect": false},
        {"optionText": "1955", "isCorrect": false},
        {"optionText": "2000", "isCorrect": false}
      ],
      "answer": "1986"
    },
    {
      "questionText": "Which of the following is a BIS standard for cement?",
      "options": [
        {"optionText": "IS 8112", "isCorrect": true},
        {"optionText": "IS 456", "isCorrect": false},
        {"optionText": "IS 3043", "isCorrect": false},
        {"optionText": "IS 2502", "isCorrect": false}
      ],
      "answer": "IS 8112"
    }
  ]
},
{
  "levelName": "Level 2",
  "duration": 120,
  "questions": [
    {
      "questionText": "Which of these is a BIS standard for food products?",
      "options": [
        {"optionText": "IS 13690", "isCorrect": true},
        {"optionText": "IS 1282", "isCorrect": false},
        {"optionText": "IS 1543", "isCorrect": false},
        {"optionText": "IS 1000", "isCorrect": false}
      ],
      "answer": "IS 13690"
    },
    {
      "questionText": "What does BIS stand for?",
      "options": [
        {"optionText": "Bureau of Indian Standards", "isCorrect": true},
        {"optionText": "Banking Information System", "isCorrect": false},
        {"optionText": "Basic Industrial Safety", "isCorrect": false},
        {"optionText": "Business Intelligence System", "isCorrect": false}
      ],
      "answer": "Bureau of Indian Standards"
    },
    {
      "questionText": "You are in charge of product quality testing for a food company. Which of the following would you refer to for testing the quality of sugar?",
      "options": [
        {"optionText": "IS 5427", "isCorrect": true},
        {"optionText": "IS 13690", "isCorrect": false},
        {"optionText": "IS 1490", "isCorrect": false},
        {"optionText": "IS 5402", "isCorrect": false}
      ],
      "answer": "IS 5427"
    },
    {
      "questionText": "Which of the following is a BIS standard for cement?",
      "options": [
        {"optionText": "IS 8112", "isCorrect": true},
        {"optionText": "IS 456", "isCorrect": false},
        {"optionText": "IS 3043", "isCorrect": false},
        {"optionText": "IS 2502", "isCorrect": false}
      ],
      "answer": "IS 8112"
    },
    {
      "questionText": "Scenario: A customer complains that the purity of their 22-carat gold jewelry does not match the hallmark on the item. What would you recommend?",
      "options": [
        {"optionText": "Request a BIS certificate", "isCorrect": false},
        {"optionText": "Check for the BIS logo and purity mark", "isCorrect": true},
        {"optionText": "Return the item for a refund", "isCorrect": false},
        {"optionText": "Ignore the complaint as it is baseless", "isCorrect": false}
      ],
      "answer": "Check for the BIS logo and purity mark"
    }
  ]
},
{
  "levelName": "Level 3",
  "duration": 100,
  "questions": [
    {
      "questionText": "Which of the following is a BIS standard for electrical equipment safety?",
      "options": [
        {"optionText": "IS 1533", "isCorrect": true},
        {"optionText": "IS 2000", "isCorrect": false},
        {"optionText": "IS 1029", "isCorrect": false},
        {"optionText": "IS 3091", "isCorrect": false}
      ],
      "answer": "IS 1533"
    },
    {
      "questionText": "A manufacturing plant produces electrical appliances and needs to ensure its products meet quality standards. What should they apply for?",
      "options": [
        {"optionText": "ISO 9001", "isCorrect": false},
        {"optionText": "ISI mark", "isCorrect": true},
        {"optionText": "FSSAI license", "isCorrect": false},
        {"optionText": "GMP certification", "isCorrect": false}
      ],
      "answer": "ISI mark"
    },
    {
      "questionText": "You are working in a factory that produces steel products. To comply with industry standards, which certification should your products have?",
      "options": [
        {"optionText": "IS 2062", "isCorrect": true},
        {"optionText": "IS 3025", "isCorrect": false},
        {"optionText": "IS 1029", "isCorrect": false},
        {"optionText": "IS 447", "isCorrect": false}
      ],
      "answer": "IS 2062"
    },
    {
      "questionText": "Scenario: A building contractor is about to purchase cement for a construction project. What should he check to ensure the cement meets the required strength?",
      "options": [
        {"optionText": "IS 8112", "isCorrect": true},
        {"optionText": "IS 432", "isCorrect": false},
        {"optionText": "IS 3031", "isCorrect": false},
        {"optionText": "IS 3543", "isCorrect": false}
      ],
      "answer": "IS 8112"
    },
    {
      "questionText": "When designing a product, which of the following would ensure it meets Indian standards for safety and performance?",
      "options": [
        {"optionText": "ISO certification", "isCorrect": false},
        {"optionText": "BIS certification", "isCorrect": true},
        {"optionText": "CE mark", "isCorrect": false},
        {"optionText": "Patent application", "isCorrect": false}
      ],
      "answer": "BIS certification"
    }
  ]
}
