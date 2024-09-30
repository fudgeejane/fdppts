document.addEventListener('DOMContentLoaded', () => {
    const joinProgressPopup = document.getElementById('join-progress-popup');
    const submitJoinBtn = document.getElementById('submit-join');
    const cancelJoinBtn = document.getElementById('cancel-join');
    const joinNowBtn = document.getElementById('join-now-btn');
    const notificationIcon = document.getElementById('notification-icon');
    const notificationPopup = document.getElementById('notification-popup');
    const sidebar = document.querySelector('.sidebar');
    const menuIcon = document.getElementById('menu-icon');

    // Toggle Join Progress Popup
    if (joinNowBtn) {
        joinNowBtn.addEventListener('click', () => {
            joinProgressPopup.style.display = joinProgressPopup.style.display === 'block' ? 'none' : 'block';
            notificationPopup.style.display = 'none'; // Close notification popup if opened
        });
    }

    submitJoinBtn.addEventListener('click', () => {
        joinProgressPopup.style.display = 'none';
    });

    cancelJoinBtn.addEventListener('click', () => {
        joinProgressPopup.style.display = 'none';
    });

    // Toggle Notification Popup
    notificationIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        notificationPopup.style.display = notificationPopup.style.display === 'block' ? 'none' : 'block';
        joinProgressPopup.style.display = 'none'; // Close join progress popup if opened
    });

    // Menu Icon Click Handler - Expanding/Collapsing Sidebar
    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
    });

    // Close popups when clicking outside
    document.addEventListener('click', (event) => {
        if (!notificationIcon.contains(event.target) && !notificationPopup.contains(event.target)) {
            notificationPopup.style.display = 'none';
        }
        if (!joinNowBtn || !joinNowBtn.contains(event.target) && !joinProgressPopup.contains(event.target)) {
            joinProgressPopup.style.display = 'none';
        }
        if (sidebar.classList.contains('expanded') && !sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove('expanded');
        }
    });
});
