document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HANDLE LOCAL STORAGE FOR TABS ---
    // Select all tab buttons
    const tabTriggerList = document.querySelectorAll('button[data-bs-toggle="pill"]');
    
    // Add click event to save selection
    tabTriggerList.forEach(tabTriggerEl => {
        tabTriggerEl.addEventListener('shown.bs.tab', event => {
            // Save the ID of the target tab (e.g., "#v-pills-play")
            localStorage.setItem('activeTab', event.target.getAttribute('data-bs-target'));
        });
    });

    // Restore selection on load
    const savedTabId = localStorage.getItem('activeTab');
    if (savedTabId) {
        // Find the button that targets the saved ID
        const triggerEl = document.querySelector(`button[data-bs-target="${savedTabId}"]`);
        // If found, click it via Bootstrap API
        if (triggerEl) {
            const tab = new bootstrap.Tab(triggerEl);
            tab.show();
        }
    }

    // --- 2. HANDLE SIDEBAR COLLAPSE ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const logoText = document.querySelector('.logo-text');
    const logoMini = document.querySelector('.logo-mini');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        
        // Logic to switch logo text
        if (window.innerWidth <= 768){
            logoText.style.display = 'none';
            logoMini.style.display = 'block';
        }
        if(sidebar.classList.contains('collapsed')) {
            logoText.style.display = 'none';
            logoMini.style.display = 'block';
        } else {
            logoText.style.display = 'block';
            logoMini.style.display = 'none';
        }
    });
});