document.addEventListener('DOMContentLoaded', () => {
    const joinProgressPopup = document.getElementById('join-progress-popup');
    const submitJoinBtn = document.getElementById('submit-join');
    const cancelJoinBtn = document.getElementById('cancel-join');
    const joinNowButton = document.querySelector('.join-btn'); // Select button by class
    const joinNowIcon = document.querySelector('.icon[id="join-now-btn"]'); // Select image by class and id
    const notificationIcon = document.getElementById('notification-icon');
    const notificationPopup = document.getElementById('notification-popup');
    const sidebar = document.querySelector('.sidebar');
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteList = document.getElementById('note-list');

    // Function to get and display the current date, day, and time
    function updateDateTime() {
        const currentDate = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDateFormatted = currentDate.toLocaleDateString('en-US', dateOptions);
        
        const dayOptions = { weekday: 'long' };
        const currentDayFormatted = currentDate.toLocaleDateString('en-US', dayOptions);
        
        const currentTimeFormatted = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        // Update the HTML content
        document.getElementById("current-date").textContent = currentDateFormatted;
        document.getElementById("current-day").textContent = currentDayFormatted;
        document.getElementById("current-time").textContent = currentTimeFormatted;
    }

    // Initial call to update the time immediately
    updateDateTime();
    // Update the time every second
    setInterval(updateDateTime, 1000);

    // Sidebar menu toggle functionality
    const menuIcon = document.getElementById('menu-icon');
    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
    });

    // Function to add a new note
    function addNote() {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const newNote = document.createElement('li');
            newNote.innerHTML = `
                <span>${noteText}</span>
                <button class="delete-note-btn">Delete</button>
            `;
            noteList.appendChild(newNote);
            noteInput.value = ''; // Clear the input field

            // Add delete functionality to the new note
            newNote.querySelector('.delete-note-btn').addEventListener('click', () => {
                const confirmDelete = confirm('Are you sure you want to delete this note?');
                if (confirmDelete) {
                    newNote.remove();
                }
            });
        }
    }

    // Event listener for adding a note when clicking the "Add" button
    addNoteBtn.addEventListener('click', addNote);

    // Event listener for adding a note when pressing the "Enter" key
    noteInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addNote();
            event.preventDefault(); // Prevents form submission (if in a form)
        }
    });

    // Function to toggle the Join Progress Popup
    function toggleJoinProgressPopup() {
        joinProgressPopup.style.display = joinProgressPopup.style.display === 'block' ? 'none' : 'block';
        notificationPopup.style.display = 'none'; // Ensure notification popup is closed
    }

    // Add event listener to the join now button to open the popup
    joinNowButton.addEventListener('click', toggleJoinProgressPopup);
    joinNowIcon.addEventListener('click', toggleJoinProgressPopup); // Add event listener to the icon

    // Add event listener for the submit button
    submitJoinBtn.addEventListener('click', () => {
        const progressCode = document.getElementById('progress-code-input').value.trim();
        if (progressCode) {
            console.log(`Joining progress space with code: ${progressCode}`);
            joinProgressPopup.style.display = 'none'; // Close the popup after submission
        } else {
            alert('Please enter a valid code.');
        }
    });

    // Add event listener for the cancel button
    cancelJoinBtn.addEventListener('click', () => {
        joinProgressPopup.style.display = 'none';
    });

    // Notification popup functionality
    notificationIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up to document
        notificationPopup.style.display = notificationPopup.style.display === 'block' ? 'none' : 'block';
        joinProgressPopup.style.display = 'none'; // Close join progress popup if notification is opened
    });

    // Close popups when clicking outside
    document.addEventListener('click', (event) => {
        if (!notificationIcon.contains(event.target) && !notificationPopup.contains(event.target)) {
            notificationPopup.style.display = 'none';
        }
        if (!joinNowButton.contains(event.target) && !joinProgressPopup.contains(event.target) && !joinNowIcon.contains(event.target)) {
            joinProgressPopup.style.display = 'none';
        }
    });

    
});
