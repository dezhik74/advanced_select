const sertPickerList = document.querySelectorAll(".cert-card")
const okButtonEl = document.querySelector('#okButton')
const cancelButtonEl = document.querySelector('#cancelButton')
const crossButtonEl = document.querySelector('#crossButton')
const modalEl =document.querySelector('#modal')
const modalDialogEl = document.querySelector("#modal-dialog")
const modalBody = document.querySelector("#modal-body")

function removeAllModalListeners() {
  // $('#modalCancelButton').off('click', cancelModal)
  // $('#modalCrossButton').off('click', cancelModal)
  $('#modalOkButton').off('click', okModal)
}

function cancelModal() {
  console.log('modal cancel')
  removeAllModalListeners()
}

function okModal() {
  console.log('modal ok')
  removeAllModalListeners()
  
}
// console.log($('.cert-card'))
$('.cert-card').each( function() {
  console.log('picker')
  $(this).on("click", (e) => {
    // заполнение модального окна
    const certList = $(e.target).closest(".cert-card").find('option').map( function () {
        return {
          value: this.value,
          text: this.text,
          selected: this.selected,
        }
      }
    ).get()
    $("#modal-body").html("")
    certList.forEach((cert) => {
      $("#modal-body").append(
        `
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${cert.value}" id="check-${cert.value}" ${cert.selected ? 'checked' : ''}>
            <label class="form-check-label" for="defaultCheck1">
              ${cert.text}
            </label>
          </div>
        `
      )
    })

    // навешивание кнопок 
    // $('#modalCancelButton').on('click', cancelModal)
    // $('#modalCrossButton').on('click', cancelModal)
    $('#modalOkButton').on('click', okModal)

    //открытие окна
    $('#modal').modal()
  })
})
