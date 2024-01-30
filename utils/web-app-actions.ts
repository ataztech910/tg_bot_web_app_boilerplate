import { WebApp as WebAppTypes } from "@twa-dev/types";

function sendTextMessage(app: WebAppTypes) {
    const botUrl = `/sendToUserFromWebApp?query_id=${app.initDataUnsafe.query_id}`;
    const options = {
        method: 'GET',
    };
      
    fetch(botUrl, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        console.log('POST request successful:', responseData);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
      
};

export { sendTextMessage };
