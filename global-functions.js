
// Debug function to toggle mobile controls
function toggleMobileControls() {
  const mobileControls = document.getElementById('mobileControls');
  if (mobileControls) {
    const isVisible = mobileControls.style.display !== 'none';
    mobileControls.style.display = isVisible ? 'none' : 'block';
    console.log('Mobile controls toggled:', isVisible ? 'hidden' : 'shown');
  }
}

// Global debug function to force show controls
window.showMobileControls = function() {
  const mobileControls = document.getElementById('mobileControls');
  if (mobileControls) {
    mobileControls.style.display = 'block';
    console.log('Mobile controls force shown');
  } else {
    console.error('mobileControls element not found in DOM!');
  }
};
