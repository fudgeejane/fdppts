document.addEventListener('DOMContentLoaded', () => {
    const joinProgressPopup = document.getElementById('join-progress-popup');
    const submitJoinBtn = document.getElementById('submit-join');
    const cancelJoinBtn = document.getElementById('cancel-join');
    const joinNowBtn = document.getElementById('join-now-btn');
    const notificationIcon = document.getElementById('notification-icon');
    const notificationPopup = document.getElementById('notification-popup');
    const sidebar = document.querySelector('.sidebar');

    function toggleJoinProgressPopup() {
        if (joinProgressPopup.style.display === 'block') {
            joinProgressPopup.style.display = 'none';
        } else {
            joinProgressPopup.style.display = 'block';
            notificationPopup.style.display = 'none';
        }
    }

    joinNowBtn.addEventListener('click', toggleJoinProgressPopup);

    submitJoinBtn.addEventListener('click', () => {
        joinProgressPopup.style.display = 'none';
    });

    cancelJoinBtn.addEventListener('click', () => {
        joinProgressPopup.style.display = 'none';
    });

    notificationIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        notificationPopup.style.display = notificationPopup.style.display === 'block' ? 'none' : 'block';
        joinProgressPopup.style.display = 'none';
    });

    document.addEventListener('click', (event) => {
        if (!notificationIcon.contains(event.target) && !notificationPopup.contains(event.target)) {
            notificationPopup.style.display = 'none';
        }
        if (!joinNowBtn.contains(event.target) && !joinProgressPopup.contains(event.target)) {
            joinProgressPopup.style.display = 'none';
        }
    });

    document.getElementById('menu-icon').addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
    });

    document.addEventListener('click', () => {
        notificationPopup.style.display = 'none';
    });

    document.addEventListener('click', (event) => {
        if (sidebar.classList.contains('expanded') && !sidebar.contains(event.target) && !document.getElementById('menu-icon').contains(event.target)) {
            sidebar.classList.remove('expanded');
        }
    });
});

// Function to send a comment
function sendComment() {
    const commentInput = document.getElementById('com-in');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const commentElement = createCommentElement(commentText);
        document.getElementById('comments-list').appendChild(commentElement);
        commentInput.value = ''; // Clear the input after sending
    }
}

// Function to create a comment element
function createCommentElement(commentText) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    commentElement.innerHTML = `
        <div class="dis-user-pfp">
            <img src="../img/accw.png" alt="User Profile Picture" class="dis-pfp">
            <div class="dis-info">
                <div class="dis-undt">
                    <h4 id="user-name">Francine Jane Sto Domingo</h4>
                    <p id="date-time">${new Date().toLocaleString()}</p>
                    <div class="three-dots" onclick="toggleMenu(event)">&#8230;</div>
                    <div class="menu" style="display: none;">
                        <a href="#" onclick="editComment(this)">Edit</a>
                        <a href="#" onclick="deleteComment(this)">Delete</a>
                    </div>
                </div>
                <div class="dis-com">
                    <p class="comtext">${commentText}</p>
                </div>
                <div class="repcom">
                    <a href="#" class="reply-link" onclick="toggleReplyTextarea(this)">Reply</a>
                </div>
                <div class="replies"></div> <!-- Container for replies -->
            </div>
        </div>
    `;

    return commentElement;
}

// Function to toggle the visibility of the reply textarea
function toggleReplyTextarea(replyLink) {
    const existingReplyContainer = replyLink.parentNode.querySelector('.reply-container');
    if (existingReplyContainer) {
        existingReplyContainer.remove(); // Close if it exists
        return; // Exit the function
    }

    const replyContainer = document.createElement('div');
    replyContainer.classList.add('reply-container');

    replyContainer.innerHTML = `
        <div class="rep-text">
            <textarea class="reply-textarea" placeholder="Write a reply..."></textarea>
        </div>
        <div class="button-container">
            <img src="../img/send.png" alt="Send" class="reply-button" onclick="sendReply(this)">
        </div>
    `;

    replyLink.parentNode.appendChild(replyContainer); // Append below the comment

    // Add an event listener to the reply textarea for Enter key
    const replyTextarea = replyContainer.querySelector('.reply-textarea');
    replyTextarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent sending the reply
            sendReply(replyContainer.querySelector('.reply-button')); // Call sendReply
        }
    });
}

// Function to send the reply
function sendReply(sendButton) {
    const replyContainer = sendButton.closest('.reply-container');
    const replyTextarea = replyContainer.querySelector('.reply-textarea');
    const replyText = replyTextarea.value.trim();

    if (replyText) {
        const replyElement = createReplyElement(replyText);
        const repliesContainer = replyContainer.closest('.comment').querySelector('.replies'); // Find the replies container
        repliesContainer.appendChild(replyElement); // Append reply below the original comment
        
        // Remove the reply textarea and buttons after sending
        replyContainer.remove();
    }
}

// Function to create a reply element
function createReplyElement(replyText) {
    const replyElement = document.createElement('div');
    replyElement.classList.add('reply'); // Use a different class for styling

    replyElement.innerHTML = `
        <div class="rep-user-pfp">
            <img src="../img/accw.png" alt="User Profile Picture" class="dis-pfp">
            <div class="rep-info">
                <div class="rep-undt">
                    <h4 id="user-name">You</h4>
                    <p id="date-time">${new Date().toLocaleString()}</p>
                    <div class="three-dots" onclick="toggleMenu(event)">&#8230;</div>
                    <div class="menu" style="display: none;">
                        <a href="#" onclick="editReply(this)">Edit</a>
                        <a href="#" onclick="deleteReply(this)">Delete</a>
                    </div>
                </div>
                <div class="rep-com">
                    <p class="comtext">${replyText}</p>
                </div>
                <div class="rep-com-dis">
                    <a href="#" class="reply-link" onclick="toggleReplyTextarea(this)">Reply</a>
                </div>
            </div>
        </div>
    `;

    return replyElement;
}

// Function to toggle the visibility of the edit/delete menu
function toggleMenu(event) {
    event.stopPropagation(); // Prevent event from bubbling up
    const menu = event.target.nextElementSibling; // Get the menu next to the three dots
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; // Toggle menu display
}

// Function to edit a comment or reply
function editComment(editLink) {
    const commentTextElement = editLink.closest('.dis-com').querySelector('.comtext');
    const originalText = commentTextElement.innerText;
    
    const textarea = document.createElement('textarea');
    textarea.value = originalText;
    textarea.className = 'edit-textarea';
    
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.onclick = function() {
        const newText = textarea.value.trim();
        if (newText) {
            commentTextElement.innerText = newText; // Update the comment text
        }
        textarea.remove();
        saveButton.remove();
        editLink.closest('.dis-com').querySelector('.three-dots').style.display = 'block'; // Show three dots again
    };
    
    editLink.closest('.dis-com').appendChild(textarea);
    editLink.closest('.dis-com').appendChild(saveButton);
    editLink.closest('.dis-com').querySelector('.three-dots').style.display = 'none'; // Hide three dots while editing
}

// Function to delete a comment or reply
function deleteComment(deleteLink) {
    const commentElement = deleteLink.closest('.comment') || deleteLink.closest('.replies');
    commentElement.remove(); // Remove the comment or reply
}

// Function to edit a reply
function editReply(editLink) {
    const replyTextElement = editLink.closest('.rep-com').querySelector('.comtext');
    const originalText = replyTextElement.innerText;
    
    const textarea = document.createElement('textarea');
    textarea.value = originalText;
    textarea.className = 'edit-textarea';
    
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.onclick = function() {
        const newText = textarea.value.trim();
        if (newText) {
            replyTextElement.innerText = newText; // Update the reply text
        }
        textarea.remove();
        saveButton.remove();
        editLink.closest('.rep-com').querySelector('.three-dots').style.display = 'block'; // Show three dots again
    };
    
    editLink.closest('.rep-com').appendChild(textarea);
    editLink.closest('.rep-com').appendChild(saveButton);
    editLink.closest('.rep-com').querySelector('.three-dots').style.display = 'none'; // Hide three dots while editing
}

// Function to delete a reply
function deleteReply(deleteLink) {
    const replyElement = deleteLink.closest('.reply');
    replyElement.remove(); // Remove the reply
}
