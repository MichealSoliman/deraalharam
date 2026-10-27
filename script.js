// Mobile Menu Toggle
function toggleMobileMenu(e) {
    if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation();
    }
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;

    const isHidden = menu.classList.contains('hidden');

    if (isHidden) {
        menu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        menu.setAttribute('aria-hidden', 'false');
    } else {
        menu.classList.add('hidden');
        document.body.style.overflow = '';
        menu.setAttribute('aria-hidden', 'true');
    }
}

// Mobile Submenu Toggle
function toggleMobileSubmenu(e) {
    if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation();
    }
    const submenu = document.getElementById('mobileSubmenu');
    const arrow = document.getElementById('submenuArrow');

    if (!submenu) return;
    if (submenu.classList.contains('hidden')) {
        submenu.classList.remove('hidden');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    } else {
        submenu.classList.add('hidden');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
}

// FAQ Toggle
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
        content.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
        button.querySelector('svg').style.transform = 'rotate(0deg)';
    } else {
        // Close all other FAQ items
        document.querySelectorAll('.faq-item button').forEach(btn => {
            if (btn !== button) {
                btn.setAttribute('aria-expanded', 'false');
                btn.nextElementSibling.classList.add('hidden');
                btn.querySelector('svg').style.transform = 'rotate(0deg)';
            }
        });

        content.classList.remove('hidden');
        button.setAttribute('aria-expanded', 'true');
        button.querySelector('svg').style.transform = 'rotate(180deg)';
    }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu on outside click
document.addEventListener('click', function (e) {
    const menu = document.getElementById('mobileMenu');
    if (!menu || menu.classList.contains('hidden')) return;

    const menuContent = menu.querySelector('.bg-white');
    const isToggleBtn = e.target.closest('#mobileMenuBtn') || e.target.closest('[onclick*="toggleMobileMenu"]');

    if (menuContent && !menuContent.contains(e.target) && !isToggleBtn) {
        menu.classList.add('hidden');
        document.body.style.overflow = '';
        menu.setAttribute('aria-hidden', 'true');
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const menu = document.getElementById('mobileMenu');
        if (!menu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', function () {
    // Check for Intersection Observer support
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Performance: Defer non-critical scripts
window.addEventListener('load', function () {
    // Load any non-critical scripts here
});

// Form validation (if needed)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });

    return isValid;
}

// Track active navigation link
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('text-[#c49b3f]');
        } else {
            link.classList.remove('text-[#c49b3f]');
        }
    });
}

// =========================================================================
// القائمة المركزية لخدمات الموقع (Central Services Registry)
// التعديل أو الإضافة هنا يظهر تلقائياً في Dropdown جميع صفحات الموقع!
// =========================================================================
window.SITE_SERVICES = [
    {
        title: "دليل خدمات نقل العفش",
        path: "services/",
        icon: `<svg class="w-5 h-5 text-[#c49b3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`
    },
    {
        title: "دينا نقل عفش بالدمام",
        path: "furniture-moving-truck-in-dammam/",
        icon: `<svg class="w-5 h-5 text-[#c49b3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>`
    },
    {
        title: "فك وتركيب الأثاث بالدمام",
        path: "furniture-disassembly-and-assembly-in-dammam/",
        icon: `<svg class="w-5 h-5 text-[#c49b3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
    },
    {
        title: "تغليف العفش بالدمام",
        path: "furniture-packing-in-dammam/",
        icon: `<svg class="w-5 h-5 text-[#c49b3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>`
    },
    {
        title: "تخزين الأثاث بالدمام",
        path: "furniture-storage-in-dammam/",
        icon: `<svg class="w-5 h-5 text-[#c49b3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`
    },
    {
        title: "نقل عفش المنازل بالدمام",
        path: "home-furniture-moving-dammam/",
        icon: `<svg class="w-5 h-5 text-[#c49b3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`
    },
    {
        title: "نقل عفش داخل الدمام",
        path: "furniture-moving-inside-dammam/",
        icon: `<svg class="w-5 h-5 text-[#c49b3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
    },
    {
        title: "نقل عفش خارج الدمام",
        path: "furniture-moving-outside-dammam/",
        icon: `<svg class="w-5 h-5 text-[#c49b3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    },
    {
        title: "أسعار نقل العفش بالدمام",
        path: "furniture-moving-prices-in-dammam/",
        icon: `<svg class="w-5 h-5 text-[#c49b3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    }
];

// دالة تحديد البادئة النسبية للمسارات تلقائياً
function getRelativePrefix() {
    let scriptSrc = '';
    const scripts = document.getElementsByTagName('script');
    for (let s of scripts) {
        const src = s.getAttribute('src') || '';
        if (src.includes('script.js')) {
            scriptSrc = src;
            break;
        }
    }
    if (scriptSrc.startsWith('../../')) return '../../';
    if (scriptSrc.startsWith('../')) return '../';
    if (scriptSrc.startsWith('/')) return '/';
    return './';
}

// دالة رندر قائمة الخدمات المركزية للـ Desktop والـ Mobile
function renderCentralServicesMenu() {
    const desktopDropdowns = document.querySelectorAll('.nav-services-dropdown, [data-services-dropdown]');
    const mobileSubmenus = document.querySelectorAll('#mobileSubmenu, [data-mobile-services]');
    const prefix = getRelativePrefix();

    if (!window.SITE_SERVICES || !Array.isArray(window.SITE_SERVICES)) return;

    const desktopHTML = window.SITE_SERVICES.map(item => `
        <li>
            <a href="${prefix}${item.path}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group/item">
                ${item.icon}
                <span class="group-hover/item:text-[#c49b3f] transition-colors text-sm font-semibold text-[#1a2332]">${item.title}</span>
            </a>
        </li>
    `).join('');

    desktopDropdowns.forEach(dropdown => {
        dropdown.innerHTML = desktopHTML;
    });

    const mobileHTML = window.SITE_SERVICES.map(item => `
        <a href="${prefix}${item.path}" class="flex items-center gap-2 py-2.5 px-3 text-sm text-gray-700 hover:text-[#c49b3f] hover:bg-gray-50 rounded-lg transition-colors font-medium">
            ${item.icon}
            <span>${item.title}</span>
        </a>
    `).join('');

    mobileSubmenus.forEach(menu => {
        menu.innerHTML = mobileHTML;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    renderCentralServicesMenu();
    updateActiveNavLink();

    // Add aria-expanded to FAQ buttons
    document.querySelectorAll('.faq-item button').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
    });
});

// Export functions for global use
window.toggleMobileMenu = toggleMobileMenu;
window.toggleMobileSubmenu = toggleMobileSubmenu;
window.toggleFAQ = toggleFAQ;
window.validateForm = validateForm;
window.renderCentralServicesMenu = renderCentralServicesMenu;