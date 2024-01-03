const toggleBtns = document.querySelectorAll('.faq-toggle');



toggleBtns.forEach((toggleBtn) => {
    toggleBtn.addEventListener('click', (e) => {
        e.currentTarget.parentNode.classList.toggle('active')
        // console.log(e.currentTarget.parentNode)
    })
})

