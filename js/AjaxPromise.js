let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime(){
    const date = new Date();
    return date.getHours() + " hrs "+ date.getMinutes()+ " mins "+ date.getSeconds()+ " secs";
}
function makePromiseCall(methodType, url, async=true, data=null){
    return new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            console.log("State Change Called. Ready State: "+ xhr.readyState + " Status : "+ xhr.status);
            if(xhr.readyState === 4){
                if(xhr.status === 200 || xhr.status === 201){
                    resolve(xhr.responseText);
                }else if(xhr.status >= 400){
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                     }); 
                    console.log("Handle 400 client error or 500 server error");
                }
            }
        }
        xhr.open(methodType, url, async);
        if(data){
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log("Request sent to server");
    });
}

//then executing promise
const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
               .then(responseText => {
                    console.log("user deleted : "+ responseText)
                })
               .catch(error => console.log("get error status : "+ JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
            .then(responseText => {
                console.log("user deleted : "+ responseText)
            })
            .catch(error => console.log("delete error status : "+ JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const empData = {"name":"Harry","salary":"5000"};
makePromiseCall("POST", postURL, true, empData)
               .then(responseText => {
                   console.log("user added : "+ responseText)
               })
            .catch(error => console.log("post error status : "+ JSON.stringify(error)));