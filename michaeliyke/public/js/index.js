
   jQuery((function(w, sapi){
       return function($){
        const a = alert;

        const ajaxRequest = new XMLHttpRequest();
        let endPoint = "/books"
        let form = null;
        let response = {};

        ajaxRequest.onreadystatechange = function(event) {
            if (ajaxRequest.status == 200) {
              const obj = JSON.parse(ajaxRequest.responseText);
              let blob = `<option selected>Choose...</option>`;
              for (let i = 0; i < obj.id; i++) {
                blob = blob.concat(`<option value="${i}">${i}</option>`);
              }
              $("select").each((index, select) =>{
                a(select)
                select.innerHTML = blob;
              });

              $("[disabled]", sapi.forms[1]).each(function(index, el) {
              if (el.classList.contains("id")) {
                // el.value = `Auto-generated: ${obj.id}`;
              } else if(el.classList.contains("ISBN")) {
                // el.value = `Auto-generated: ${obj.ISBN}`;
            }
          });
              console.log(obj);
            }
          };
          ajaxRequest.open("GET", "/generate");
          ajaxRequest.send();

          


         $(sapi.forms).change(function(event) {
           const target = event.target;
           form = target.form;

           switch(true) {
             case target.classList.contains("form-check-input"):
              $(this).find(".input-field").each(function() {
                this.disabled = !this.disabled;
              });
             break;
            case  ["PUT", "GET", "DELETE"].indexOf(target.form.dataset.method.toUpperCase()) != -1: 
              if (target.tagName.toUpperCase() == "SELECT") {
                endPoint = `/books/${target.dataset.field}/${target.options.selectedIndex}`;
              } else{
                endPoint = `/books/${target.dataset.field}/${target.value}`;
              }
           }

           console.log(endPoint);
          ajaxRequest.open("GET", endPoint);
          ajaxRequest.send();
            // const method = this.dataset.method.toUpperCase();
            
         });

         ajaxRequest.onreadystatechange = function(event) {
              console.log(ajaxRequest.responseText)
            if (ajaxRequest.status == 200) {
              response = JSON.parse(ajaxRequest.responseText);
              $(".input-field", form).each((index, node) =>{
                if (node.dataset.field in response) {
                  node.value = response[node.dataset.field];
                }
              });
              $(".show-room").text(ajaxRequest.responseText);
            }
          };




       function queryServer(method, fn, options) {
         ajaxRequest.addEventListener("error", (error) => {
           return a(error);
         });
         ajaxRequest.addEventListener("load", (event) => {
           fn.call(null, event.response);
         });
         ajaxRequest.open(method, options.url || "127.0.0.1:3000", false );
         ajaxRequest.send();
       }  
       }
    }(window, document)));