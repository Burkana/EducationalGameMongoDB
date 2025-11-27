document.addEventListener('DOMContentLoaded', () => {
    

    const tabTriggerList = document.querySelectorAll('button[data-bs-toggle="pill"]');
    

    tabTriggerList.forEach(tabTriggerEl => {
        tabTriggerEl.addEventListener('shown.bs.tab', event => {
            localStorage.setItem('activeTab', event.target.getAttribute('data-bs-target'));
        });
    });


    const savedTabId = localStorage.getItem('activeTab');
    if (savedTabId) {

        const triggerEl = document.querySelector(`button[data-bs-target="${savedTabId}"]`);

        if (triggerEl) {
            const tab = new bootstrap.Tab(triggerEl);
            tab.show();
        }
    }


    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const logoText = document.querySelector('.logo-text');
    const logoMini = document.querySelector('.logo-mini');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        

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