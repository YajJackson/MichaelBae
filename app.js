// this is bound to the target of the object
const app = {
    init: function(formSelector){
        this.max = 0
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this)) //rebinds 'this' to the function that is called
    },
    
    handleSubmit(ev){
        ev.preventDefault()
        const f = ev.target
        
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
        }

        this.max ++
        console.log(flick.name, this.max)
    },
}

app.init('form#flick-form')