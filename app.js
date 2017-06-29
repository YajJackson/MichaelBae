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
            id: this.max + 1,
            name: f.flickName.value,
            favorite: false,
        }
        
        this.flicks.unshift(flick)

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)

        this.max ++
        f.reset()
    },

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.dataset.id = flick.id
        item.classList.remove('template')
        item
            .querySelector('.flick-name')
            .textContent = flick.name
        
        return item
    },

    addButtonGroup(id) {
        const group = document.createElement('span')
        group.className = 'button-group'
        group.appendChild(this.addButton('like', id))
        group.appendChild(this.addButton('remove', id))
        group.appendChild(this.addButton('up', id))
        group.appendChild(this.addButton('down', id))
        return group
    },

    addButton(buttonName, id) {
        const button = document.createElement('li')
        button.className = 'button'
        button.id = `${buttonName}Button${id}`
        button.type = `${buttonName}`
        button.arrayId = id
        button.textContent = `${buttonName}`
        button.addEventListener('click', this.handleClick)
        return button
    },

    handleClick() {
        // console.log(this.arrayId)
        buttonId = `${this.id}`
        listId = `#listItem${this.arrayId}`
        clickType = this.type
        switch(clickType) {
            case 'like':
                document.querySelector(`#${buttonId}`).style.backgroundColor = 'lightGreen'
                break
            case 'remove':
                document.querySelector(listId).remove()
                break
            case 'up':
                app.moveUp(listId, this.arrayId)
                break
            case 'down':
                app.moveDown(listId, this.arrayId)
                break
        }
    },

    moveUp(item, arrayId){
        const startingItem = document.querySelector(`${item}`)
        const newItem = document.querySelector(`#listItem${arrayId-1}`)
        console.log(document.querySelector('#flick-list').children[arrayId-1])
        document.querySelector('#flick-list').insertBefore(document.querySelector(`#listItem${arrayId-1}`), document.querySelector('#flick-list').children[arrayId-1])
        // console.log(startingItem, newItem, item, arrayId)
    },
    moveDown(item, arrayId){
        console.log(item, arrayId)
    },

}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template',
})