window.addEventListener("load", () => {
  const target = document.getElementById('no-copy')

  target.addEventListener("contextmenu", (e) => {
    e.preventDefault()
  }, false)

  target.addEventListener('copy', (e) => {
    e.clipboardData.setData('text/plain', 'No copy is allowed')
    e.preventDefault()
  }, false)
})
