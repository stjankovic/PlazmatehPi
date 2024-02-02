// Get the SVG element
var openHiddenWindowButton = document.getElementById('openHiddenWindow');

// Get the hidden window
var hiddenWindow = document.getElementById('hiddenWindow');

// Add click event listener to the SVG
openHiddenWindowButton.addEventListener('click', function() {
  // Show the hidden window
  hiddenWindow.style.display = 'flex';
});

// Function to close the hidden window
function closeHiddenWindow() {
  // Hide the hidden window
  hiddenWindow.style.display = 'none';
}