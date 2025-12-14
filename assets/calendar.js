window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
    }
};

document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    const modal = document.getElementById('calendar-modal');
    const form = document.getElementById('event-form');

    const idInput = document.getElementById('event_id');
    const titleInput = document.getElementById('event_title');
    const startInput = document.getElementById('event_start');
    const endInput = document.getElementById('event_end');
    const roleInput = document.getElementById('event_role');
    const typeInput = document.getElementById('event_type');
    const instructorInput = document.getElementById('event_instructor');
    const locationInput = document.getElementById('event_location');
    const descriptionInput = document.getElementById('event_description');
    const classFields = document.getElementById('class-fields');

    const saveBtn = document.getElementById('save-event-btn');
    const cancelBtn = document.getElementById('cancel-edit-btn');
    const modalEditBtn = document.getElementById('modal-edit-btn');
    const modalDeleteBtn = document.getElementById('modal-delete-btn');
    const modalTitle = document.getElementById('modal-event-title');
    const modalInfo = document.getElementById('modal-event-info');

    // Toggle class fields based on type selection
    if (typeInput) {
        typeInput.addEventListener('change', function() {
            if (this.value === 'class') {
                classFields.style.display = 'block';
            } else {
                classFields.style.display = 'none';
            }
        });
    }

    const toLocalISOString = (date) => {
        if (!date) return '';
        const pad = (n) => n < 10 ? '0' + n : n;
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes());
    };

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',

        events: '/api/events',

        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
        },

        eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
        },

        eventClick: function (info) {
            info.jsEvent.preventDefault();

            modalTitle.innerText = info.event.title;
            const timeText = info.event.start ? info.event.start.toLocaleDateString() + ' ' + info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'All Day';
            let infoText = `Time: ${timeText}`;

            if (info.event.extendedProps && info.event.extendedProps.type === 'class') {
                if (info.event.extendedProps.instructor) {
                    infoText += `\nInstructor: ${info.event.extendedProps.instructor}`;
                }
                if (info.event.extendedProps.location) {
                    infoText += `\nLocation: ${info.event.extendedProps.location}`;
                }
                if (info.event.extendedProps.description) {
                    infoText += `\nDescription: ${info.event.extendedProps.description}`;
                }
            }

            modalInfo.innerText = infoText;

            modal.classList.add('active');

            modalDeleteBtn.onclick = function () {
                if (confirm(`Are you sure you want to delete "${info.event.title}"?`)) {
                    fetch(`/api/events/${info.event.id}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                info.event.remove();
                                closeModal('calendar-modal');
                                alert('Event deleted successfully.');
                            } else {
                                alert('Failed to delete: ' + data.message);
                            }
                        })
                        .catch(err => alert('Error connecting to server.'));
                }
            };

            modalEditBtn.onclick = function () {
                idInput.value = info.event.id;
                titleInput.value = info.event.title;
                startInput.value = toLocalISOString(info.event.start);
                endInput.value = toLocalISOString(info.event.end);

                if (info.event.extendedProps && info.event.extendedProps.role) {
                    roleInput.value = info.event.extendedProps.role;
                }

                if (info.event.extendedProps && info.event.extendedProps.type) {
                    typeInput.value = info.event.extendedProps.type;
                    if (info.event.extendedProps.type === 'class') {
                        classFields.style.display = 'block';
                        instructorInput.value = info.event.extendedProps.instructor || '';
                        locationInput.value = info.event.extendedProps.location || '';
                        descriptionInput.value = info.event.extendedProps.description || '';
                    } else {
                        classFields.style.display = 'none';
                    }
                } else {
                    typeInput.value = 'event';
                    classFields.style.display = 'none';
                }

                saveBtn.innerText = "Update Event";
                cancelBtn.style.display = "inline-block";

                form.scrollIntoView({ behavior: 'smooth' });
                closeModal('calendar-modal');
            };
        },

        dateClick: function (info) {
            // Reset the form for new event
            form.reset();
            idInput.value = '';

            // Set the start date to the clicked date at 00:00
            startInput.value = info.dateStr + 'T00:00';

            // Hide class fields by default
            classFields.style.display = 'none';

            // Scroll to the form
            form.scrollIntoView({ behavior: 'smooth' });

            // Focus on the title input
            titleInput.focus();

            // Ensure buttons are in add mode
            saveBtn.innerText = "Add Event";
            cancelBtn.style.display = "none";
        },

        eventDidMount: function (info) {
            // Optional: visual cue
            info.el.style.cursor = 'pointer';
        }
    });

    calendar.render();
    window.calendar = calendar;

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            form.reset();
            idInput.value = '';
            classFields.style.display = 'none';
            saveBtn.innerText = "Add Event";
            cancelBtn.style.display = "none";
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const eventId = data.event_id;
            const isEdit = !!eventId;
            const url = isEdit ? `/api/events/${eventId}` : '/api/events';
            const method = isEdit ? 'PUT' : 'POST';

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert(isEdit ? 'Event updated successfully!' : 'Event added successfully!');
                        form.reset();

                        if (isEdit) {
                            idInput.value = '';
                            saveBtn.innerText = "Add Event";
                            cancelBtn.style.display = "none";
                        }

                        window.calendar.refetchEvents();
                    } else {
                        alert('Error: ' + result.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Something went wrong contacting the server.');
                });
        });
    }
});