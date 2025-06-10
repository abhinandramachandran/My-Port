document.addEventListener('DOMContentLoaded', () => {
    // Get all 'Play Level' buttons
    const playButtons = document.querySelectorAll('.animated-button');

    // Add a click event listener to each button
    playButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent default button behavior (e.g., form submission if it were a form)
            event.preventDefault();

            // Find the parent .image-rectangle for the clicked button
            const imageRectangle = button.closest('.image-rectangle');
            // Find the description content paragraph within this specific rectangle
            const descriptionContent = imageRectangle.querySelector('.description-content');
            
            // Get the new description text from the button's data attribute
            const newDescription = button.dataset.clickedDescription;
            // Get the original description text from the paragraph's data attribute
            const originalDescription = descriptionContent.dataset.originalDescription;

            // Deactivate all other image-rectangles
            document.querySelectorAll('.image-rectangle').forEach(rect => {
                if (rect !== imageRectangle) { // Only process other rectangles
                    // Remove 'is-active' class
                    rect.classList.remove('is-active');
                    // Reset their descriptions to original if they are not already
                    const otherDescriptionContent = rect.querySelector('.description-content');
                    if (otherDescriptionContent && otherDescriptionContent.textContent !== otherDescriptionContent.dataset.originalDescription) {
                        otherDescriptionContent.textContent = otherDescriptionContent.dataset.originalDescription;
                    }
                }
            });

            // Toggle logic for the clicked image-rectangle
            // If the current rectangle is active AND showing the new description, revert to original
            if (imageRectangle.classList.contains('is-active') && descriptionContent.textContent === newDescription) {
                descriptionContent.textContent = originalDescription;
                imageRectangle.classList.remove('is-active'); // Remove active class to allow hover effects back
            } else {
                // Otherwise (if not active, or active but showing original description), activate and show new description
                descriptionContent.textContent = newDescription;
                imageRectangle.classList.add('is-active'); // Add active class to keep description visible and button hidden
            }
        });
    });

    // Function to get and display the current day's name
    function displayCurrentDay() {
        const date = new Date();
        const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        let dayName;

        switch (dayOfWeek) {
            case 0:
                dayName = "Sunday";
                break;
            case 1:
                dayName = "Monday";
                break;
            case 2:
                dayName = "Tuesday";
                break;
            case 3:
                dayName = "Wednesday";
                break;
            case 4:
                dayName = "Thursday";
                break;
            case 5:
                dayName = "Friday";
                break;
            case 6:
                dayName = "Saturday";
                break;
            default:
                dayName = "Unknown Day";
        }

        const dayDisplayElement = document.getElementById('current-day-display');
        if (dayDisplayElement) {
            // Update to include bold tags for the day name
            dayDisplayElement.innerHTML = `Today is <strong>${dayName}</strong>`;
        }
    }

    // Call the function to display the current day when the page loads
    displayCurrentDay();

    // Optional: Add a mechanism to reset the active state if the user clicks anywhere else on the document
    // This could be useful if you want descriptions to disappear when the user clicks outside.
    // document.addEventListener('click', (event) => {
    //     // Check if the click was outside of any .image-item and not on a button itself
    //     if (!event.target.closest('.image-item') && !event.target.classList.contains('animated-button')) {
    //         document.querySelectorAll('.image-rectangle.is-active').forEach(rect => {
    //             rect.classList.remove('is-active');
    //             // Reset description to original for deactivated ones
    //             const descriptionContent = rect.querySelector('.description-content');
    //             if (descriptionContent && descriptionContent.dataset.originalDescription) {
    //                 descriptionContent.textContent = descriptionContent.dataset.originalDescription;
    //             }
    //         });
    //     }
    // });
});