const form = document.getElementById("contact-form");
const donateForm = document.getElementById("donateForm");
const donateButton = document.getElementById("donateButton");


form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const message = form.elements.message.value;
    
    const payload = {
        name,
        email,
        message
    };

    console.log(payload, "pay");
    
    fetch(`mail.php`, {
        method: "post",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(payload)
      })
        .then(response => response)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
});



function payWithPaystack(email, amount){
    var handler = PaystackPop.setup({
      key: 'pk_live_376e6a4f8782621da421626abb3b108897ec5da4',
      email: email,
      amount: `${amount}00`,
      currency: "NGN",
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
         custom_fields: [
            {
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: "+2348012345678"
            }
         ]
      },
      callback: function(response){
          alert('success. transaction ref is ' + response.reference);
      },
      onClose: function(){
        //   alert('window closed');
      }
    });
    handler.openIframe();
  }

  donateButton.addEventListener("click", () =>{
    const email = donateForm.elements.email.value;
    const amount = donateForm.elements.amount.value;
    payWithPaystack(email, amount);
    console.log("sds");
    
  });