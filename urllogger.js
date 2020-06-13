
 console.log("Invoked content script")
      
chrome.runtime.sendMessage({test: "URL Loaded"}, function(response){
   if(response.received == "This is background")
   {console.log("This is Background script")}
   else
   {console.log("This is Popup.js")}

});
  

