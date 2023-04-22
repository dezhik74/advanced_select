function removeAllModalListeners() {
  $('#modalOkButton').off('click', okModal)
}

$('#myModal').on('hidden.bs.modal', function (e) {
  okModal()
})

function okModal() {
  // получение списка отмеченных
  const certList = $('#modal').find(':checkbox').map(function () {
    return {
      value: this.value,
      text: $(this).siblings('label').html().trim(),
      checked: this.checked
    }
  }).get()

  // перенос списка отмеченных в пикер
  $(`#${$('#modal').data().current_card}`).find('.cert-picker').find('.row').empty()
  certList.filter((el) => el.checked).forEach((el)=> {
    console.log(el)
    $(`#${$('#modal').data().current_card}`).find('.cert-picker').find('.row').append(`
      <span class="badge badge-pill badge-light">${el.text}</span>
      `)
  })
  // перенос списка отмеченных в select
  $(`#${$('#modal').data().current_card}`).find('option').each(function (idx) {
    this.selected = certList[idx].checked
  })
  removeAllModalListeners()
  $('#modal').modal('hide')
  
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
    // сохраняем id карты, которую мы меняем
    $('#modal').data('current_card', $(e.target).closest(".cert-card").attr('id'))
    // навешивание кнопок 
    $('#modalOkButton').on('click', okModal)

    //открытие окна
    $('#modal').modal()
  })
})
