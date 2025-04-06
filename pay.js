
    function  checkT(){
          let check = JSON.parse(localStorage.getItem('check')) || [];
          if(check){
    
            document.querySelectorAll('.total-amount').forEach(function(element) {
                let el = element.querySelector('.total2').innerHTML = check.at(-1);
             console.log(el)
               });
             
          }
        }
        checkT()
        document.addEventListener('DOMContentLoaded',function(){
         
          checkT()
        })
        
        function hit(event) {
            event.preventDefault();  // Prevent form submission
        
            // Get the input values
            const email = document.getElementById('email').value;
            const cardNumber = document.getElementById('card-number').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;
        
            // Regular expression for email validation
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            
            // Check if the email is valid
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
        
            // Check if the card number is valid (a simple length check for this example)
            if (cardNumber.length !== 19) { // Example: 19 chars for the format xxxx xxxx xxxx xxxx
                alert('Please enter a valid credit card number');
                return;
            }
        
            // Check if the expiry date is valid (simple format mm/yy)
            const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expiryRegex.test(expiryDate)) {
                alert('Please enter a valid expiry date in MM/YY format');
                return;
            }
        
            // Check if the CVV is valid (3 digits)
            if (cvv.length !== 3 || isNaN(cvv)) {
                alert('Please enter a valid CVV');
                return;
            }
        
            // If all checks pass, show the success modal
            showSuccessModal();
        }
        
        function showSuccessModal() {
            // Show the success modal
            const modal = document.getElementById('successModal');
            modal.style.display = 'flex';
        }
        
        function closeModal() {
            // Close the modal when the button is clicked
            const modal = document.getElementById('successModal');
            modal.style.display = 'none';
            
            setTimeout(() => {
                window.history.back(); // Redirect to the previous page after 1 second
              },500);
            



        }
        































































