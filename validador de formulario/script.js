let validation = {
    handlesubmit:(event) => {
        event.preventDefault()

        let send = true
        
        let inputs = form.querySelectorAll('input')

        validation.clearerror()

        for(let i = 0;i < inputs.length;i++) {
            let input = inputs[i]
           let check = validation.checkinput(input)
           if(check !== true) {
            send = false
           validation.showerror(input,check)
           }
        }

        

        if(send) {
            form.submit()
        }
    },
    checkinput: (input) => {
     let rules = input.getAttribute('data-rules')
     if(rules !== null) {
        rules = rules.split('/')
        for(let k in rules){
            let rdetails = rules[k].split('=')
            switch(rdetails[0]) {
                case 'required':
                 
                if(input.value == "")
                return "Campo não pode ser vazio"

                break;
                case 'min':
                    if(input.value.length < rdetails[1]){
                    return "Csmpo tem que ter pelo menos"+rdetails[1]+" caracteres"
                    }
                    break;
                    case 'email':
                        if(input.value != "") {
                            let regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
                            if(regex.test(input.value.toLowerCase())) {
                                return "Email invalido"
                            }
                        }



                break
            }
        }
     }
     return true
    },
    showerror: (input, error) => {
         input.style.borderColor = "#FF0000"

         let errorelement = document.createElement('div')
         errorelement.classList.add('error')
         errorelement.innerHTML = error
         input.parentElement.insertBefore(errorelement,input.ElementSicling)
        },
        clearerror: ()=> {
            let inputs = form.querySelectorAll('input')
            for(let i=0;i<inputs.length;i++){
               inputs[i].style = ""

            }

            let errorelement = document.querySelectorAll('.error')
            for(let i=0;i<errorelement.length;i++){
                errorelement[i].remove()
            }
        }

}

const form = document.querySelector('.validation')
form.addEventListener('submit',validation.handlesubmit)
