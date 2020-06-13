
chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
       
        if(request.test == "URL Loaded")
        {
        var original_url = sender.url;
        modified_url = sender.url.split("/");
        console.log(modified_url);
        var xml_url = modified_url[0] + "//" + modified_url[2] + "/helpdesk/" + modified_url[4] + "/" +modified_url[5] + ".xml";
        console.log(xml_url)
        var obj = {"url": sender.url}
        //console.log(obj);
        // console.log(typeof(obj))
        // console.log(sender.url)
      
        chrome.cookies.getAll(obj , function (cookies){
          let perfect_promise = new Promise((resolve) => {
              resolve(cookies)
          })
          perfect_promise.then(function (response){
           console.log(response)
           console.log(cookies.length)
           var cookie = "";
           for(i=0 ; i < cookies.length ; i++){
            cookie = cookie+ " " + cookies[i].name + "=" + cookies[i].value + ";"
            
        }   
        console.log(cookie)
        var api_call = new XMLHttpRequest();

    api_call.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            // console.log(api_call.responseXML)
            // console.log(typeof(api_call.responseXML)) // The return type here is an object. We need to serialize it to a string to have it parsed by the XML parser
            //Serialize the xml response
            var xml_serialiser = new XMLSerializer();
            var serialzed_xml = xml_serialiser.serializeToString(api_call.responseXML)
            //console.log(serialized_xml)
            var xml_parser = new DOMParser();
       var xml_response = api_call.responseXML
       var parsed_value = xml_parser.parseFromString(serialzed_xml,"text/xml");
             id = parsed_value.getElementsByTagName("id")[0].childNodes[0].nodeValue
             console.log(id)
        }

    };
    api_call.open("GET",xml_url)
    api_call.setRequestHeader('cookie',cookie)

    api_call.send()
        });
        
        })
       
      sendResponse({received: "This is background"});
        }
        else{
            if(id == undefined){
                console.log(modified_url[5])
                sendResponse({received: "Please load the ticket page and then try"})
                console.log("Message to Popup  script -  ID = "+id)
            }
            else{
                console.log("Sending data to Popup")
                console.log(modified_url[5])
                sendResponse({received: id, display_id: modified_url[5]})
            }
           
            //console.log("Message Test")
        }
    }
);




