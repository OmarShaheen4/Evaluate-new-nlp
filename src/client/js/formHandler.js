// This function to get API_Key from .env file by passing it from server to client
const apiii = async () => {
    const request = await fetch('/appi');
    try {
        const dataa = await request.text();
        console.log("The API_Key: ", dataa) // For Testing
        return dataa;
    } catch (error) {
        console.log('error', error);

    }

}
// This function is made to handle the situation after pressing submit botton
const handleSubmit = async () => {

    // Get the value that the user entered in the input field
    let formText = document.getElementById('myUrl').value
    // Pass the input to checkForRightURL function
    const urlCheckerResult = MyClient.checkForRightURL(formText)

    // Check if the user entered a valid URL or not
    if (urlCheckerResult) {
        console.log("This is a URL")
        prepareArticleData()

    } else {
        alert("This is not a URL")
    }

}

async function prepareArticleData() {
    // Get the value that the user entered in the input field
    const inputUserURL = document.getElementById('myUrl').value
    const meaningCloudUrl = 'https://api.meaningcloud.com/sentiment-2.1'

    // The return value(The API_Key value) from apiii() function will be passed to dataa 
    apiii().then(dataa => {

        console.log("APIPortionToSend", dataa)  //For Testing

        // chaining promises here 3 functions call
        const urlToSend = "&url=" + inputUserURL
        console.log("meaningCloudUrl", meaningCloudUrl) //for tes
        console.log("urlToSend", urlToSend)  //for test

        // calling getArticleData function
        getArticleData(meaningCloudUrl, urlToSend, dataa)
            .then(function (data) {
                // add data to Post request
                postData('/addData', {

                    model: data.model,
                    score_tag: data.score_tag,
                    agreement: data.agreement,
                    subjectivity: data.subjectivity,
                    confidence: data.confidence,
                    irony: data.irony,
                    text: data.sentence_list[0].text

                });

            })
            .then(() => updateMyUI())

    })

}

/* Function to gET article data by generating url and path what the user 
    enter to get the data from the API*/
const getArticleData = async (mCUrl, iUURL, api) => {

    // res equals to the output of fetch function
    const res = await fetch(`${mCUrl}?key=${api}${iUURL}+ '&lan=en' `);

    try {

        // data equals to res but in json format
        const data = await res.json();

        console.log("Get Article Data", data);  // for test

        return data;

    } catch (error) {
        console.log("error in getArticleData", error);

    }
}

/* Function to POST data */
const postData = async (url, data = {}) => {
    console.log("the url is:", url)
    try {
        const response = await fetch(url, {
            "method": 'POST',
            "credentials": 'same-origin',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });

        return;
    } catch (error) {
        console.log("Post error", error);
    }

}

const updateMyUI = async () => {
    const myRequest = await fetch('/all')
    try {
        const myReturnedData = await myRequest.json();

        // Write updated data to DOM elements
        document.getElementById('model').innerHTML = 'Model: ' + myReturnedData.model;
        document.getElementById('score_tag').innerHTML = 'Score Tag: ' + myReturnedData.score_tag;
        document.getElementById('agreement').innerHTML = 'Agreement: ' + myReturnedData.agreement;

        document.getElementById('subjectivity').innerHTML = 'Subjectivity: ' + myReturnedData.subjectivity;
        document.getElementById('confidence').innerHTML = 'Confidence: ' + myReturnedData.confidence;
        document.getElementById('irony').innerHTML = 'Irony: ' + myReturnedData.irony;
        document.getElementById('text').innerHTML = 'Text from the Article: ' + myReturnedData.text;
    }


    catch (err) {
        console.log('Error in updateMyUI ', err);
    }
}

export { handleSubmit }
