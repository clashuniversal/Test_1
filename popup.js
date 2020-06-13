
document.addEventListener('DOMContentLoaded', function(){
    // document.getElementById("test").innerHTML = "Changed"
    // var element_1 = document.getElementById("test")

    // element_1.addEventListener('click', function(){
    //     document.getElementById("test").innerHTML = "Clicked"
    // })
    var element_1 = document.getElementById("id")
    var element_2 = document.getElementById("current_display_id")

    
        
        chrome.runtime.sendMessage({test: "From popup script"},function(response){
            element_1.innerHTML = response.received;
            element_2.innerHTML = response.display_id
            navigator.clipboard.writeText(element_1.innerText)
            .then(() => {
                console.log("Success")
            })

            // if(document.getElementById("Copy") == undefined)
            // {
            // var btn = document.createElement("BUTTON");
            // btn.innerHTML = "Copy to Clipboard";
            // btn.setAttribute("id","Copy")
            // document.body.appendChild(btn)
           
            // }
    

    })


    // chrome.tabs.query({url: "https://*.freshdesk.com/a/*", active: true, currentWindow: true} , function (tabs){
//     document.getElementById("test").innerHTML = "Text is changed"
//     })
})


