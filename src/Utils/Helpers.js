// import React from 'react';

// export const helpers = {
//     checkValidUrl: url => (!regex.test(url) ? `http://${url}` : url)
// };

export const checkValidUrl = url => {
    let retVal = url;
    if (validURL(url)) {
        return retVal;
    }
    if (validURLWithoutHost(url)) {
        retVal = `https://${retVal}`;
    } else {
        retVal = `https://www.google.com/search?q=${url}`;
    } 
    
    return retVal;
}; 

// // TODO: Write proper check
validURL = url => {  
    const pattern = new RegExp(/^HTTP|HTTP|http(s)?:\/\/(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/);
    return pattern.test(url);
};

validURLWithoutHost = url => {
    const pattern = new RegExp(/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
    return pattern.test(url);
};
