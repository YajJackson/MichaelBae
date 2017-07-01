// this is bound to the target of the object
const app = {
    init: function(selectors){
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this)) //rebinds 'this' to the function that is called
    },
    
    handleSubmit(ev){
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max,
            name: f.flickName.value,
            favorite: false,
        }
        
        this.flicks.unshift(flick)
        this.flicks.reverse() //flixed some sorting isue

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)

        this.max ++
        f.reset()
    },

    favFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        flick.fav = !flick.fav //toggles true or false for favorite

        if(flick.fav){
            listItem.classList.add('fav')
        } else (
            listItem.classList.remove('fav')
        )
    },

    removeFlick(flick, ev){
        const listItem = ev.target.closest('.flick')
        listItem.remove()

        // remove flick from the array
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i, 1)
    },

    moveFlickUp(flick, ev){
        const listItem = ev.target.closest('.flick')
        const previousItem = listItem.previousElementSibling
        
        if(previousItem){
            // const reversedArray = this.flicks.reverse()
            const n = this.flicks.indexOf(flick)
            const j = this.flicks[n-1]
            const z = this.flicks.indexOf(j)
            
            const currentId = parseInt(listItem.dataset.id) + 1
            const previousId = parseInt(previousItem.dataset.id) -1
            debugger

            listItem.dataset.id = currentId
            previousItem.dataset.id = previousId

            listItem.parentElement.insertBefore(listItem, previousItem)
        }
    },

    moveFlickDown(flick, ev){
        const listItem = ev.target.closest('.flick')
        const nextItem = listItem.nextElementSibling //seems redundant
        debugger
        if(nextItem.nextElementSibling){
            listItem.parentElement.insertBefore(listItem, nextItem.nextElementSibling)
        }
    },

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.dataset.id = flick.id
        item.classList.remove('template')
        item
            .querySelector('.flick-name')
            .textContent = flick.name
        
        item
        .querySelector('button.remove')
        .addEventListener(
                'click', 
                this.removeFlick.bind(this, flick)
            )

        item
            .querySelector('button.like')
            .addEventListener(
                'click', 
                this.favFlick.bind(this, flick)
            )
        
        item
            .querySelector('button.up')
            .addEventListener(
                'click', 
                this.moveFlickUp.bind(this, flick)
            )

        item
            .querySelector('button.down')
            .addEventListener(
                'click', 
                this.moveFlickDown.bind(this, flick)
            )
 
        return item
    },

}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template',
})