document.addEventListener('DOMContentLoaded', () => {
    const joinProgressPopup = document.getElementById('join-progress-popup');
    const submitJoinBtn = document.getElementById('submit-join');
    const cancelJoinBtn = document.getElementById('cancel-join');
    const joinNowBtn = document.getElementById('join-now-btn');
    const notificationIcon = document.getElementById('notification-icon');
    const notificationPopup = document.getElementById('notification-popup');
    const sidebar = document.querySelector('.sidebar');
    const menuIcon = document.getElementById('menu-icon'); // Corrected ID

    function toggleJoinProgressPopup() {
        if (joinProgressPopup.style.display === 'block') {
            joinProgressPopup.style.display = 'none';
        } else {
            joinProgressPopup.style.display = 'block';
            notificationPopup.style.display = 'none'; // Close notification popup if opened
        }
    }

    if (joinNowBtn) {
        joinNowBtn.addEventListener('click', toggleJoinProgressPopup);
    }

    submitJoinBtn.addEventListener('click', () => {
        joinProgressPopup.style.display = 'none';
    });

    cancelJoinBtn.addEventListener('click', () => {
        joinProgressPopup.style.display = 'none';
    });

    notificationIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up to document
        notificationPopup.style.display = notificationPopup.style.display === 'block' ? 'none' : 'block';
        joinProgressPopup.style.display = 'none'; // Close join progress popup if notification is opened
    });

    document.addEventListener('click', (event) => {
        if (!notificationIcon.contains(event.target) && !notificationPopup.contains(event.target)) {
            notificationPopup.style.display = 'none';
        }
        if (!joinNowBtn.contains(event.target) && !joinProgressPopup.contains(event.target)) {
            joinProgressPopup.style.display = 'none';
        }
    });

    // Menu Icon Click Handler
    menuIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        sidebar.classList.toggle('expanded'); // Toggle the expanded class on the sidebar
    });

    // Prevent clicking outside from closing the sidebar immediately after clicking the menu icon
    document.addEventListener('click', (event) => {
        if (sidebar.classList.contains('expanded') && !sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove('expanded');
        }
    });
});
