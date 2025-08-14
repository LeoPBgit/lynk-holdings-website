// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add scroll animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.brand-card, .stat-item, .value-item, .tech-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
    
    // Add visual section animation
    const visualSection = document.querySelector('.visual-section-2');
    if (visualSection) {
        observer.observe(visualSection);
    }
    
    // Add about section image animation
    const aboutImage = document.querySelector('.about-cover-image');
    if (aboutImage) {
        observer.observe(aboutImage);
    }
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.innerText;
        const isPlus = target.includes('+');
        const isSlash = target.includes('/');
        let finalNumber;
        
        if (isPlus) {
            finalNumber = parseInt(target.replace('+', ''));
        } else if (isSlash) {
            finalNumber = 24; // For 24/7
        } else {
            finalNumber = parseInt(target);
        }
        
        let current = 0;
        const increment = finalNumber / 120; // Slower animation (was 50, now 120)
        let frameCount = 0;
        
        const updateCounter = () => {
            frameCount++;
            // Update every 3rd frame to slow down the animation
            if (frameCount % 3 === 0 && current < finalNumber) {
                current += increment;
                if (isPlus) {
                    counter.innerText = Math.ceil(current) + '+';
                } else if (isSlash) {
                    counter.innerText = Math.ceil(current) + '/7';
                } else {
                    counter.innerText = Math.ceil(current);
                }
            }
            
            if (current < finalNumber) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Brand card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const brandCards = document.querySelectorAll('.brand-card');
    
    brandCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const brand = form.querySelector('select').value;
            const message = form.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !brand || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #05F2DB, #008BFC)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--accent-teal))';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
});


// Tech grid items interaction
document.addEventListener('DOMContentLoaded', () => {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add a pulse effect
            item.style.animation = 'pulse 0.6s ease-in-out';
            
            setTimeout(() => {
                item.style.animation = '';
            }, 600);
        });
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);


// Add loading animation (without typewriter effect)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content on load (but not typewriter)
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && heroVisual) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
        heroVisual.style.animation = 'fadeInUp 1s ease-out 0.3s both';
    }
});


// Brand card click handling for future navigation
document.addEventListener('DOMContentLoaded', () => {
    const brandLinks = document.querySelectorAll('.brand-link');
    
    brandLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get brand name from href
            const brandId = link.getAttribute('href').substring(1);
            
            // For now, just show an alert - in the future this would navigate to brand pages
            const brandName = link.closest('.brand-card').querySelector('.brand-name').textContent;
            
            // Create a subtle notification
            showNotification(`${brandName} page coming soon!`);
        });
    });
});

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-blue), var(--accent-teal));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 139, 252, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        font-family: var(--font-family);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some Easter eggs
let clickCount = 0;
document.querySelector('.nav-logo').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        showNotification('🚀 You found an Easter egg! Welcome to the future of AI!');
        clickCount = 0;
    }
});

// Portfolio tabs functionality
function toggleTab(header) {
    const tab = header.parentElement;
    const content = tab.querySelector('.tab-content');
    const arrow = header.querySelector('.tab-arrow');
    
    // Toggle current tab only (don't close other tabs)
    if (header.classList.contains('active')) {
        header.classList.remove('active');
        content.classList.remove('active');
        
        // Smoother text transition
        arrow.style.opacity = '0';
        setTimeout(() => {
            arrow.textContent = '+';
            arrow.style.opacity = '1';
        }, 200);
    } else {
        header.classList.add('active');
        content.classList.add('active');
        
        // Smoother text transition
        arrow.style.opacity = '0';
        setTimeout(() => {
            arrow.textContent = '−';
            arrow.style.opacity = '1';
        }, 200);
    }
}

// Hero "more" link functionality
function toggleMoreInfo(event) {
    event.preventDefault();
    
    const moreContent = document.getElementById('heroMoreContent');
    const originalMoreLink = document.querySelector('.hero-description .more-link');
    const lessLink = document.querySelector('.hero-less-link-container .more-link');
    
    if (moreContent.classList.contains('expanded')) {
        // Collapse
        moreContent.classList.remove('expanded');
        originalMoreLink.style.display = 'inline';
        originalMoreLink.textContent = 'more';
    } else {
        // Expand
        moreContent.classList.add('expanded');
        originalMoreLink.style.display = 'none';
    }
}

// Companies "more" link functionality
function toggleCompaniesMoreInfo(event) {
    event.preventDefault();
    
    const moreContent = document.getElementById('companiesMoreContent');
    const originalMoreLink = document.querySelector('.section-description .more-link');
    
    if (moreContent.classList.contains('expanded')) {
        // Collapse
        moreContent.classList.remove('expanded');
        originalMoreLink.style.display = 'inline';
        originalMoreLink.textContent = 'more';
    } else {
        // Expand
        moreContent.classList.add('expanded');
        originalMoreLink.style.display = 'none';
    }
}

// Portfolio tabs scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const portfolioTabs = document.querySelectorAll('.portfolio-tab');
    
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    portfolioTabs.forEach(tab => {
        portfolioObserver.observe(tab);
    });
});

// Company section header animation (same as hero)
document.addEventListener('DOMContentLoaded', () => {
    const companyHeader = document.querySelector('.portfolio .section-header');
    
    if (companyHeader) {
        const companyTitle = companyHeader.querySelector('.section-title');
        const companyDescription = companyHeader.querySelector('.section-description');
        
        const companyHeaderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animate class to trigger CSS transitions
                    if (companyTitle) {
                        companyTitle.classList.add('animate');
                    }
                    
                    if (companyDescription) {
                        companyDescription.classList.add('animate');
                    }
                    
                    companyHeaderObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        companyHeaderObserver.observe(companyHeader);
    }
});

// About section header animation
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    
    if (aboutSection) {
        const aboutTitle = aboutSection.querySelector('.section-title');
        const aboutDescriptions = aboutSection.querySelectorAll('.about-description');
        
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animate class to trigger CSS transitions
                    if (aboutTitle) {
                        aboutTitle.classList.add('animate');
                    }
                    
                    aboutDescriptions.forEach(desc => {
                        desc.classList.add('animate');
                    });
                    
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        aboutObserver.observe(aboutSection);
    }
});

// Contact section header animation
document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.querySelector('.contact');
    
    if (contactSection) {
        const contactTitle = contactSection.querySelector('.section-title');
        const contactDescription = contactSection.querySelector('.contact-description');
        const contactMethods = contactSection.querySelectorAll('.contact-method');
        const contactForm = contactSection.querySelector('.form');
        
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animate class to trigger CSS transitions
                    if (contactTitle) {
                        contactTitle.classList.add('animate');
                    }
                    
                    if (contactDescription) {
                        contactDescription.classList.add('animate');
                    }
                    
                    contactMethods.forEach(method => {
                        method.classList.add('animate');
                    });
                    
                    if (contactForm) {
                        contactForm.classList.add('animate');
                    }
                    
                    contactObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        contactObserver.observe(contactSection);
    }
});

// Signature section animation with scroll-position-based typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    const signatureSection = document.querySelector('.signature-section');
    
    if (signatureSection) {
        const signatureImage = signatureSection.querySelector('.signature-floating-image');
        const signatureText = signatureSection.querySelector('.signature-text');
        const originalText = signatureText.textContent;
        let isInViewport = false;
        
        // Clear text initially for typewriter effect
        signatureText.textContent = '';
        
        // Intersection Observer to detect when section is in viewport
        const signatureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isInViewport = true;
                    // Animate image
                    if (signatureImage) {
                        signatureImage.classList.add('animate');
                    }
                    signatureText.classList.add('animate');
                } else {
                    isInViewport = false;
                    // Hide image
                    if (signatureImage) {
                        signatureImage.classList.remove('animate');
                    }
                    signatureText.classList.remove('animate');
                    signatureText.textContent = '';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        signatureObserver.observe(signatureSection);
        
        // Scroll event listener for typewriter effect
        let lastScrollY = window.scrollY;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (!isInViewport) return;
            
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = currentScrollY;
            
            // Get section position
            const sectionRect = signatureSection.getBoundingClientRect();
            const sectionTop = sectionRect.top + window.scrollY;
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScrollY = documentHeight - windowHeight;
            
            // Calculate scroll progress - start when section comes into view, complete at bottom of page
            const scrollStart = sectionTop - windowHeight;
            const scrollEnd = maxScrollY; // End at the very bottom of the page
            const scrollRange = scrollEnd - scrollStart;
            const scrollProgress = Math.max(0, Math.min(1, (currentScrollY - scrollStart) / scrollRange));
            
            // Calculate how many characters to show based on scroll progress
            const targetLength = Math.floor(scrollProgress * originalText.length);
            const currentLength = signatureText.textContent.length;
            
            // Update text based on scroll position
            if (targetLength !== currentLength) {
                if (targetLength > currentLength) {
                    // Type more characters
                    signatureText.textContent = originalText.substring(0, targetLength);
                } else {
                    // Untype characters
                    signatureText.textContent = originalText.substring(0, targetLength);
                }
            }
            
            // Clear any existing timeout
            clearTimeout(scrollTimeout);
            
            // Set timeout to detect when scrolling stops
            scrollTimeout = setTimeout(() => {
                // Scrolling has stopped - no additional action needed
                // Text remains at current position
            }, 150);
        });
    }
});
