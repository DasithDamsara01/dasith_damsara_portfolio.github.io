document.addEventListener('DOMContentLoaded', () => {
    const switcherToggle = document.getElementById('switcherToggle');
    const colorPalette = document.getElementById('colorPalette');
    const colorBalls = document.querySelectorAll('.color-ball');
    const themeModeToggle = document.getElementById('themeModeToggle');
    const body = document.body;

    let currentColorName = 'cyan';

    function updateAccentColor() {
        body.style.setProperty('--accent-color', `var(--${currentColorName}-color)`);
    }

    // 1. Color Switcher Logic
    switcherToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        colorPalette.classList.toggle('active');
    });

    colorBalls.forEach(ball => {
        ball.addEventListener('click', (e) => {
            currentColorName = ball.getAttribute('data-color');
            updateAccentColor();
            colorPalette.classList.remove('active');
        });
    });

    // 2. Light / Dark Mode Toggle Logic
    themeModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        updateAccentColor();
    });

    document.addEventListener('click', (e) => {
        if (!switcherToggle.contains(e.target) && !colorPalette.contains(e.target)) {
            colorPalette.classList.remove('active');
        }
    });

    // --- MAGNET CURSOR ANIMATION ---
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    let dotX = 0, dotY = 0;       
    let outlineX = 0, outlineY = 0; 
    const delay = 0.15;            

    window.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    });

    function animateMagnetCursor() {
        outlineX += (dotX - outlineX) * delay;
        outlineY += (dotY - outlineY) * delay;

        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateMagnetCursor);
    }
    animateMagnetCursor();

    // 3. TYPING EFFECT
    const words = ["Graphic Designer.", "Illustrator.", "Thinker.", "Visual Artist", " Designer"];
    let i = 0;
    let timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typing-effect').innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return false;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typing-effect').innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                setTimeout(typingEffect, 500);
                return false;
            }
            timer = setTimeout(loopDeleting, 60);
        };
        loopDeleting();
    }

    // 4. DYNAMIC HERO ICONS
    const designIcons = [
        "fas fa-vector-square", "fas fa-pen-nib", "fas fa-palette", 
        "fas fa-bezier-curve", "fas fa-crop-alt", "fas fa-paint-brush", 
        "fas fa-layer-group", "fas fa-pencil-alt"
    ];
    
    const iconElement = document.getElementById('dynamic-hero-icon');
    const iconContainer = iconElement.parentElement;
    let currentIconIndex = 0;

    function changeHeroIcon() {
        iconContainer.classList.add('icon-swap');
        setTimeout(() => {
            currentIconIndex = (currentIconIndex + 1) % designIcons.length;
            iconElement.className = designIcons[currentIconIndex];
            iconContainer.classList.remove('icon-swap');
        }, 500);
    }
    setInterval(changeHeroIcon, 3500);


    // ==========================================
    // 💡 5. DYNAMIC PROJECT DATA (AUTO-ADD SYSTEM)
    // ==========================================
    const myProjectsData = {
        'illustrator': [
            { 
                title: 'Visiting card', 
                desc: 'Detailed vector portrait created in Adobe Illustrator.', 
                img: 'images/apex-motors-vcard.jpg' // 👈 මම මේක ඔයා හැදූ විදිහට නිවැරදි කළා
            },
            { 
                title: 'Modern Brand Logo', 
                desc: 'Minimalist corporate identity logo design.', 
                img: 'images/logo-design.png' 
            }
        ],
        'photoshop': [
            { 
                title: 'Surreal Photo Manipulation', 
                desc: 'Advanced image blending, lighting and grading.', 
                img: 'images/manipulation.png' 
            }
        ],
        'indesign': [],  
        'coreldraw': [],
        
        // 🌐 WEBSITES AND PORTFOLIO SECTION
        'websites': [
            { 
                title: 'My Other Creative Portfolio Website', 
                desc: 'This is a live preview of my responsive front-end design project. Scroll inside to explore.', 
                img: 'images/portfolio-site.png', 
                link: 'https://dasithdamsara.github.io/my-other-project/' // 👈 දසිත්, ඔයා පෙන්වන්න ඕනේ වෙබ් අඩවියේ ඇත්තම ලින්ක් එක මෙතනට දාන්න!
            }
        ]
    };

    const projectTriggers = document.querySelectorAll('.project-trigger');
    const projectViewer = document.getElementById('projectViewer');
    const closeViewerBtn = document.getElementById('closeViewerBtn');
    const nextProjectBtn = document.getElementById('nextProjectBtn');
    const viewerProjectTitle = document.getElementById('viewerProjectTitle');
    const viewerDynamicArea = document.getElementById('viewerDynamicArea'); 

    const projectOrder = ['illustrator', 'photoshop', 'indesign', 'coreldraw', 'websites'];
    const projectTitles = {
        'illustrator': 'Adobe Illustrator',
        'photoshop': 'Adobe Photoshop',
        'indesign': 'Adobe InDesign',
        'coreldraw': 'CorelDraw',
        'websites': 'Web Site & Portfolio'
    };
    
    let currentProject = '';

    // Automatically render project grids or iframes using JS
    function openProject(projectId) {
        currentProject = projectId;
        viewerProjectTitle.innerText = projectTitles[projectId];
        
        viewerDynamicArea.innerHTML = ''; // Reset content
        
        const projects = myProjectsData[projectId];

        if (projects && projects.length > 0) {
            const gridContainer = document.createElement('div');
            gridContainer.className = 'project-gallery-grid';

            projects.forEach(proj => {
                // ⚡ වෙබ් අඩවි සඳහා iframe එකක් ජෙනරේට් කිරීම (සයිට් එක ඇතුළෙන්ම බලාගන්න)
                if (proj.link) {
                    gridContainer.innerHTML += `
                        <div class="project-item-card" style="grid-column: 1 / -1; max-width: 100%; border-color: var(--accent-color);">
                            <div class="project-card-details">
                                <h4>${proj.title}</h4>
                                <p style="margin-bottom: 15px;">${proj.desc}</p>
                            </div>
                            <div class="web-frame-wrapper" style="width: 100%; height: 550px; border-radius: 12px; overflow: hidden; background: #111827; border: 1px solid rgba(128, 128, 128, 0.2);">
                                <iframe src="${proj.link}" style="width: 100%; height: 100%; border: none;" title="${proj.title}"></iframe>
                            </div>
                        </div>
                    `;
                } else {
                    // 📷 සාමාන්‍ය Graphic Design පින්තූර පෙන්වීම
                    gridContainer.innerHTML += `
                        <div class="project-item-card">
                            <div class="project-img-wrapper">
                                <img src="${proj.img}" alt="${proj.title}" onerror="this.src='https://placehold.co/600x400/111827/ffffff?text=Image+Not+Found'">
                            </div>
                            <div class="project-card-details">
                                <h4>${proj.title}</h4>
                                <p>${proj.desc}</p>
                            </div>
                        </div>
                    `;
                }
            });
            viewerDynamicArea.appendChild(gridContainer);
        } else {
            // Render beautiful "No Projects Yet" box
            viewerDynamicArea.innerHTML = `
                <div class="no-projects-box">
                    <i class="fas fa-folder-open"></i>
                    <h2>NO PROJECTS YET</h2>
                    <p>Stay tuned! Creative works for this category will be uploaded soon.</p>
                </div>
            `;
        }

        projectViewer.classList.add('active');
        projectViewer.scrollTo({ top: 0, behavior: 'smooth' });
    }

    projectTriggers.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProject(projectId);
        });
    });

    closeViewerBtn.addEventListener('click', () => {
        projectViewer.classList.remove('active');
    });

    nextProjectBtn.addEventListener('click', () => {
        let currentIndex = projectOrder.indexOf(currentProject);
        let nextIndex = (currentIndex + 1) % projectOrder.length;
        openProject(projectOrder[nextIndex]);
    });

    updateAccentColor();
    typingEffect();
});
