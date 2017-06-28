const app = {
    init: function(formSelector){
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.handleSubmit) //this refers to the object itself
    },
    
    handleSubmit(ev){
        ev.preventDefault()
        const flickName = ev.target.flickName.value
        console.log(flickName)
    },
}

app.init('form#flick-form')