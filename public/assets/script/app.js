const MDCDialog = mdc.dialog.MDCDialog;
const MDCFooFoundation = mdc.dialog.MDCDialogFoundation;
const MDCTextField = mdc.textField.MDCTextField;
const api_search_btn = document.getElementById('yelp_search');
let currentList = {};

window.mdc.autoInit();
const dialog = [].map.call(document.querySelectorAll('.mdc-dialog'), function(el) {
    return new MDCDialog(el);
  });
const textField = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
    return new MDCTextField(el);
  });
console.log(mdc)

document.addEventListener('DOMContentLoaded', function() {
    
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid' ]
    });
    calendar.render();

    calendar.addEvent({
        title: 'some event',
        start: '2019-05-02',
        allDay: true
      });

      calendar.addEvent({
        classNames: ['class_02'],
        title: 'some event222',
        start: '2019-05-03',
        allDay: true
      });
      const openModal = document.querySelectorAll('.fc-event-container .class_02 .fc-content')[0]
      openModal.addEventListener('click', event => {
        dialog[0].open()
      });
      api_search_btn.addEventListener('click', function(){
        const location = document.getElementById('yep_search_location').value;
        const term = document.getElementById('yep_search_term').value;
        const target = document.getElementById('yelp_results');
        fetch('/api/restaurant/location='+ location +'&term='+ term)
        .then(function(response) {
            console.log(response)
            return response.json();
          })
        .then(function(restaurants) {
          var cards = '';
            for (var restaurant of restaurants.businesses) {
              console.log(restaurant)
              currentList[restaurant.id] = restaurant;
              cards += `<div class="mdc-card demo-card"> <div class="mdc-card__primary-action demo-card__primary-action" tabindex="0" data-id="${restaurant.id}"> <div class="mdc-card__media mdc-card__media--16-9 demo-card__media" style="background-image: url(&quot;${restaurant.image_url}&quot;);"></div> <div class="demo-card__primary"> <h2 class="mdc-typography mdc-typography--headline6">${restaurant.name}</h2> </div> <div class="demo-card__secondary mdc-typography mdc-typography--body2">${restaurant.location.display_address}</div> </div> <div class="mdc-card__actions"> <div class="mdc-card__action-buttons"> <button id="schedule_btn" class="mdc-button mdc-card__action mdc-card__action--button">Schedule</button> <a href="${restaurant.url}" target="_blank" class="mdc-button mdc-card__action mdc-card__action--button">Yelp</a> </div> <div class="mdc-card__action-icons"> <button id="like_btn" class="mdc-icon-button mdc-card__action" aria-pressed="false" aria-label="Add to favorites" title="Add to favorites"> <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i> </button> </div> </div> </div>`
            }
            console.log(currentList, "current List")
            $('#yelp_results').append(cards);

        }).catch(function(err){
          console.log(err)
        });
      })
  });