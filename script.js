function jumpTo(id) {
    let message = document.getElementById(id)
    if(message) {
        location.href = `#${id}`
        for(let i = 0; i < 2; i++) {
            message.style.backgroundColor = `rgb(255, 255, 255, 0.${i + 1})`
        }

        setTimeout(() => {
            for(let i = 2; i > 0; i = i - 1) {
                message.style.backgroundColor = `rgb(255, 255, 255, 0.${i - 1})`
            }
        }, 0500)
    }
}