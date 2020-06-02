
 console.log("Invoked content script")
      
chrome.runtime.sendMessage({test: "Testing"}, function(response){
    console.log(response.received)
});
  

