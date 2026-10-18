// ==========================================================================
// PORTFOLIO - SERIGNE MODOU LO
// Navbar & Interactions Exact Format AliouDev221
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scrolled state (Floating Pill effect)
    const header = document.querySelector('.aliou-header');
    
    function checkHeaderScroll() {
        if (window.scrollY > 25) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll();

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('bx-menu');
                    icon.classList.add('bx-x');
                } else {
                    icon.classList.remove('bx-x');
                    icon.classList.add('bx-menu');
                }
            }
        });

        // Fermer le menu lors du clic sur un lien mobile
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('bx-x');
                    icon.classList.add('bx-menu');
                }
            });
        });

        // Fermer au clic extérieur
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('bx-x');
                    icon.classList.add('bx-menu');
                }
            }
        });
    }

    // 3. ScrollSpy : Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-pill-link');
    const mobileLinks = document.querySelectorAll('.mobile-item');

    function onScrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 110;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}` || link.getAttribute('href') === `./index.html#${sectionId}`) {
                        link.classList.add('active');
                    }
                });

                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}` || link.getAttribute('href') === `./index.html#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Bouton retour en haut (Back to top)
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', onScrollSpy);

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Filtrage des Projets (Tous / Web / Logiciel / Académique)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // 5. Formulaire de contact fonctionnel avec FormSubmit.co & validation complète
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm && formFeedback) {
        const formLoadTime = Date.now();
        let isSubmitting = false;
        let lastSubmitSuccessTime = 0;

        const lastNameInput = document.getElementById('lastName');
        const firstNameInput = document.getElementById('firstName');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn') || contactForm.querySelector('button[type="submit"]');

        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '<i class="bx bx-send"></i> <span>Envoyer le message</span>';

        // Helper : afficher une erreur sur un champ spécifique
        function setFieldError(input, errorElementId, message) {
            if (input) {
                input.classList.add('is-invalid');
                input.setAttribute('aria-invalid', 'true');
            }
            const errSpan = document.getElementById(errorElementId);
            if (errSpan) {
                errSpan.textContent = message;
            }
        }

        // Helper : effacer l'erreur d'un champ spécifique
        function clearFieldError(input, errorElementId) {
            if (input) {
                input.classList.remove('is-invalid');
                input.removeAttribute('aria-invalid');
            }
            const errSpan = document.getElementById(errorElementId);
            if (errSpan) {
                errSpan.textContent = '';
            }
        }

        // Nettoyage en direct lors de la saisie par l'utilisateur
        const fieldMappings = [
            { input: lastNameInput, errorId: 'lastNameError' },
            { input: firstNameInput, errorId: 'firstNameError' },
            { input: emailInput, errorId: 'emailError' },
            { input: phoneInput, errorId: 'phoneError' },
            { input: subjectInput, errorId: 'subjectError' },
            { input: messageInput, errorId: 'messageError' }
        ];

        fieldMappings.forEach(({ input, errorId }) => {
            if (input) {
                input.addEventListener('input', () => {
                    clearFieldError(input, errorId);
                    if (formFeedback.classList.contains('error')) {
                        formFeedback.style.display = 'none';
                    }
                });
            }
        });

        // Validation rigoureuse de tous les champs
        function validateForm() {
            let isValid = true;
            let firstInvalidInput = null;

            // Réinitialiser les erreurs précédentes
            fieldMappings.forEach(({ input, errorId }) => clearFieldError(input, errorId));

            // 1. Nom (obligatoire, min 2 caractères)
            const lastNameVal = lastNameInput ? lastNameInput.value.trim() : '';
            if (!lastNameVal) {
                setFieldError(lastNameInput, 'lastNameError', 'Le nom est obligatoire.');
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = lastNameInput;
            } else if (lastNameVal.length < 2) {
                setFieldError(lastNameInput, 'lastNameError', 'Le nom doit contenir au moins 2 caractères.');
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = lastNameInput;
            }

            // 2. Prénom (obligatoire, min 2 caractères)
            const firstNameVal = firstNameInput ? firstNameInput.value.trim() : '';
            if (!firstNameVal) {
                setFieldError(firstNameInput, 'firstNameError', 'Le prénom est obligatoire.');
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = firstNameInput;
            } else if (firstNameVal.length < 2) {
                setFieldError(firstNameInput, 'firstNameError', 'Le prénom doit contenir au moins 2 caractères.');
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = firstNameInput;
            }

            // 3. Email (obligatoire, format RFC valide)
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
            if (!emailVal) {
                setFieldError(emailInput, 'emailError', "L'adresse email est obligatoire.");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = emailInput;
            } else if (!emailRegex.test(emailVal)) {
                setFieldError(emailInput, 'emailError', 'Format d\'adresse email invalide (ex: exemple@domaine.com).');
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = emailInput;
            }

            // 4. Téléphone (optionnel, mais si renseigné au moins 6 chiffres)
            const phoneVal = phoneInput ? phoneInput.value.trim() : '';
            if (phoneVal) {
                const digits = phoneVal.replace(/\D/g, '');
                if (digits.length < 6) {
                    setFieldError(phoneInput, 'phoneError', 'Numéro de téléphone invalide (au moins 6 chiffres).');
                    isValid = false;
                    if (!firstInvalidInput) firstInvalidInput = phoneInput;
                }
            }

            // 5. Objet / Sujet (obligatoire, min 3 caractères)
            const subjectVal = subjectInput ? subjectInput.value.trim() : '';
            if (!subjectVal) {
                setFieldError(subjectInput, 'subjectError', "L'objet du message est obligatoire.");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = subjectInput;
            } else if (subjectVal.length < 3) {
                setFieldError(subjectInput, 'subjectError', "L'objet doit contenir au moins 3 caractères.");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = subjectInput;
            }

            // 6. Message (obligatoire, min 10 caractères)
            const messageVal = messageInput ? messageInput.value.trim() : '';
            if (!messageVal) {
                setFieldError(messageInput, 'messageError', 'Le contenu du message est obligatoire.');
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = messageInput;
            } else if (messageVal.length < 10) {
                setFieldError(messageInput, 'messageError', 'Votre message est trop court (au moins 10 caractères requis).');
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = messageInput;
            }

            // Auto-focus sur le premier champ invalide pour ergonomie optimale
            if (firstInvalidInput) {
                firstInvalidInput.focus();
            }

            return isValid;
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Bloquer soumission multiple concurrente
            if (isSubmitting) return;

            // Anti-Spam Cooldown : bloquer envoi répété trop rapide (< 30s)
            const now = Date.now();
            if (lastSubmitSuccessTime && (now - lastSubmitSuccessTime < 30000)) {
                const remainingSec = Math.ceil((30000 - (now - lastSubmitSuccessTime)) / 1000);
                formFeedback.className = 'form-feedback error';
                formFeedback.innerHTML = `<i class='bx bx-time'></i> Veuillez patienter encore ${remainingSec} secondes avant d'envoyer un nouveau message.`;
                formFeedback.style.display = 'block';
                return;
            }

            // Anti-Spam Layer 1 : Honeypot check
            const honeyInput = contactForm.querySelector('input[name="_honey"]');
            if (honeyInput && honeyInput.value.trim() !== '') {
                console.warn('Spam bot honeypot triggered.');
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = "<i class='bx bx-check-circle'></i> Merci pour votre message.";
                formFeedback.style.display = 'block';
                contactForm.reset();
                return;
            }

            // Anti-Spam Layer 2 : Time-to-submit check (bot rapide < 1.5s)
            if (now - formLoadTime < 1500) {
                console.warn('Submission too fast, likely bot.');
                return;
            }

            // Validation des champs
            if (!validateForm()) {
                formFeedback.className = 'form-feedback error';
                formFeedback.innerHTML = "<i class='bx bx-error-circle'></i> Veuillez renseigner correctement les champs surlignés en rouge.";
                formFeedback.style.display = 'block';
                return;
            }

            // Préparation du payload
            const formData = {
                nom: lastNameInput ? lastNameInput.value.trim() : '',
                prenom: firstNameInput ? firstNameInput.value.trim() : '',
                email: emailInput ? emailInput.value.trim() : '',
                telephone: phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'Non renseigné',
                _subject: subjectInput ? `[Portfolio Contact] ${subjectInput.value.trim()}` : '[Portfolio Contact] Nouveau message',
                message: messageInput ? messageInput.value.trim() : '',
                _template: 'table',
                _captcha: 'false'
            };

            // Liens de secours directs (Mailto & WhatsApp) pré-remplis
            const safeSubject = encodeURIComponent(formData._subject);
            const safeMailBody = encodeURIComponent(`Nom : ${formData.nom} ${formData.prenom}\nEmail : ${formData.email}\nTéléphone : ${formData.telephone}\n\nMessage :\n${formData.message}`);
            const mailtoUrl = `mailto:lo065657@gmail.com?subject=${safeSubject}&body=${safeMailBody}`;
            const whatsappText = encodeURIComponent(`Bonjour Serigne Modou Lo,\n\nJe vous contacte depuis votre portfolio :\n• Nom : ${formData.nom} ${formData.prenom}\n• Email : ${formData.email}\n• Objet : ${formData._subject}\n\nMessage :\n${formData.message}`);
            const whatsappUrl = `https://wa.me/221763287964?text=${whatsappText}`;

            // Détection du protocole local file:///
            const isLocalFile = window.location.protocol === 'file:';

            if (isLocalFile) {
                // FormSubmit et les APIs tierces bloquent par sécurité les requêtes AJAX provenant de file:///
                formFeedback.className = 'form-feedback error';
                formFeedback.innerHTML = `
                    <i class='bx bx-info-circle'></i> <strong>Page ouverte en fichier local (<code>file:///</code>) :</strong><br>
                    Le service d'envoi FormSubmit requiert que la page soit exécutée sur un serveur web (<code>http://</code> ou <code>https://</code>).<br>
                    • <strong>En ligne (sur GitHub Pages) :</strong> le formulaire envoie directement vos e-mails à <strong>lo065657@gmail.com</strong>.<br>
                    • <strong>En test local :</strong> lancez un serveur local (ex: extension VS Code <em>Live Server</em> ou double-cliquez sur <code>start-server.bat</code>).<br><br>
                    <strong>Pour envoyer immédiatement ce message sans serveur :</strong>
                    <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
                        <a href="${mailtoUrl}" class="cert-btn" style="width: auto; padding: 0.55rem 1rem;"><i class='bx bx-envelope'></i> Ouvrir dans ma messagerie</a>
                        <a href="${whatsappUrl}" target="_blank" rel="noopener" class="cert-btn cert-btn-secondary" style="width: auto; padding: 0.55rem 1rem;"><i class='bx bxl-whatsapp'></i> Envoyer via WhatsApp</a>
                    </div>
                `;
                formFeedback.style.display = 'block';
                return;
            }

            // État de chargement et verrouillage du bouton
            isSubmitting = true;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Envoi en cours...";
            }

            formFeedback.className = 'form-feedback loading';
            formFeedback.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Envoi de votre message en cours vers lo065657@gmail.com...";
            formFeedback.style.display = 'block';

            try {
                const response = await fetch('https://formsubmit.co/ajax/lo065657@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`Statut réseau HTTP: ${response.status}`);
                }

                // Lecture résiliente du résultat (compatible JSON & texte FormSubmit)
                let result = {};
                try {
                    const text = await response.text();
                    try {
                        result = JSON.parse(text);
                    } catch (e) {
                        if (response.ok || (typeof text === 'string' && text.toLowerCase().includes('success'))) {
                            result = { success: 'true', message: 'The form was submitted successfully.' };
                        } else {
                            result = { success: 'false', message: text };
                        }
                    }
                } catch (e) {
                    if (response.ok) {
                        result = { success: 'true', message: 'The form was submitted successfully.' };
                    }
                }

                // Cas 1 : FormSubmit demande l'activation du formulaire (première utilisation)
                if (result && result.message && result.message.toLowerCase().includes('activate')) {
                    formFeedback.className = 'form-feedback loading';
                    formFeedback.innerHTML = `
                        <i class='bx bx-mail-send'></i> <strong>Activation requise pour la première utilisation !</strong><br>
                        Un e-mail de confirmation vient d'être envoyé à <strong>lo065657@gmail.com</strong>.<br>
                        👉 Veuillez ouvrir votre boîte Gmail et cliquer sur le bouton <strong>« Activate Form »</strong>.<br>
                        <em>Cette étape n'est requise qu'une seule fois. Une fois activé, tous les prochains messages arriveront directement dans votre boîte mail !</em>
                    `;
                    formFeedback.style.display = 'block';
                    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                }

                // Cas 2 : Message relatif au fichier HTML local
                if (result && result.message && result.message.toLowerCase().includes('html files')) {
                    throw new Error("FormSubmit requiert une exécution via serveur web (http/https). En production sur GitHub Pages, l'envoi est automatique.");
                }

                // Cas 3 : Envoi réussi confirmé
                const isSuccess = response.ok && (
                    result.success === 'true' || 
                    result.success === true || 
                    result.message === 'The form was submitted successfully.' ||
                    (typeof result.message === 'string' && result.message.toLowerCase().includes('success'))
                );

                if (isSuccess) {
                    lastSubmitSuccessTime = Date.now();
                    const safeFirstName = (formData.prenom || '').replace(/[<>]/g, '');

                    formFeedback.className = 'form-feedback success';
                    formFeedback.innerHTML = `<i class='bx bx-check-circle'></i> <strong>Message envoyé avec succès !</strong><br>Merci ${safeFirstName ? safeFirstName + ' ' : ''}! Votre message a bien été transmis à <strong>Serigne Modou Lo</strong> (lo065657@gmail.com). Vous recevrez une réponse dans les plus brefs délais.`;
                    formFeedback.style.display = 'block';
                    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Confirmation visuelle verte sur le bouton d'envoi
                    if (submitBtn) {
                        submitBtn.classList.add('btn-success-sent');
                        submitBtn.innerHTML = "<i class='bx bx-check-double'></i> <span>Message Envoyé avec Succès !</span>";
                    }

                    contactForm.reset();
                    fieldMappings.forEach(({ input, errorId }) => clearFieldError(input, errorId));

                    // Rétablir le bouton après 5 secondes
                    setTimeout(() => {
                        if (submitBtn) {
                            submitBtn.classList.remove('btn-success-sent');
                            submitBtn.innerHTML = originalBtnHTML;
                        }
                    }, 5000);

                    // Masquer le bandeau de succès après 10s avec transition douce
                    setTimeout(() => {
                        if (formFeedback.classList.contains('success')) {
                            formFeedback.style.opacity = '0';
                            setTimeout(() => {
                                formFeedback.style.display = 'none';
                                formFeedback.style.opacity = '1';
                            }, 500);
                        }
                    }, 10000);
                } else {
                    throw new Error(result?.message || 'Réponse inattendue du serveur');
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi du formulaire:', error);

                // Message d'erreur clair avec alternatives directes fonctionnelles
                formFeedback.className = 'form-feedback error';
                formFeedback.innerHTML = `
                    <i class='bx bx-error-circle'></i> <strong>Échec de la transmission.</strong><br>
                    ${error.message || "Une erreur est survenue lors de l'envoi."}<br>
                    Vous pouvez transmettre votre message directement via :
                    <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
                        <a href="${mailtoUrl}" class="cert-btn" style="width: auto; padding: 0.55rem 1rem;"><i class='bx bx-envelope'></i> Ouvrir dans ma messagerie</a>
                        <a href="${whatsappUrl}" target="_blank" rel="noopener" class="cert-btn cert-btn-secondary" style="width: auto; padding: 0.55rem 1rem;"><i class='bx bxl-whatsapp'></i> Envoyer via WhatsApp</a>
                    </div>
                    <small style="display:block; margin-top:8px; color:#64748b;">Vos informations saisies sont conservées ci-dessous.</small>
                `;
                formFeedback.style.display = 'block';
                formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } finally {
                isSubmitting = false;
                if (submitBtn && !submitBtn.classList.contains('btn-success-sent')) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                }
            }
        });
    }

    // 6. Animation douce des barres de compétences
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    if (progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const percent = bar.getAttribute('data-percent');
                    if (percent) {
                        bar.style.width = percent + '%';
                    }
                }
            });
        }, { threshold: 0.15 });

        progressBars.forEach(bar => observer.observe(bar));
    }

    // 7. Modale Interactive Projet CrousSpace (Galerie & Détails)
    const projectCard = document.getElementById('projectCrousspaceCard');
    const modal = document.getElementById('crousspaceModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalDismissBtn = document.getElementById('modalDismissBtn');
    const modalContactActionBtn = document.getElementById('modalContactActionBtn');
    const openModalBtns = document.querySelectorAll('.open-crousspace-modal');

    function openCrousspaceModal() {
        if (!modal) return;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCrousspaceModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (projectCard) {
        projectCard.addEventListener('click', (e) => {
            openCrousspaceModal();
        });
        projectCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCrousspaceModal();
            }
        });
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCrousspaceModal();
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCrousspaceModal);
    if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeCrousspaceModal);

    // Fermeture lors d'un clic en dehors de la boîte de dialogue
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCrousspaceModal();
            }
        });
    }

    // Fermeture par touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeCrousspaceModal();
        }
    });

    // Fermeture au clic sur le bouton de contact pour naviguer fluidement
    if (modalContactActionBtn) {
        modalContactActionBtn.addEventListener('click', () => {
            closeCrousspaceModal();
        });
    }

    // Sélecteur de la galerie d'images avec transition fluide
    const modalViewerImg = document.getElementById('modalViewerImg');
    const modalViewerCaption = document.getElementById('modalViewerCaption');
    const thumbBtns = document.querySelectorAll('#modalGalleryThumbs .modal-thumb-btn');

    thumbBtns.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('data-img');
            const caption = thumb.getAttribute('data-caption');

            if (modalViewerImg && imgSrc) {
                modalViewerImg.style.opacity = '0.35';
                setTimeout(() => {
                    modalViewerImg.src = imgSrc;
                    modalViewerImg.style.opacity = '1';
                }, 140);
            }

            if (modalViewerCaption && caption) {
                modalViewerCaption.innerHTML = `<i class='bx bx-image'></i> <span>${caption}</span>`;
            }

            thumbBtns.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // 8. Modale Interactive Projet Portfolio Web & CV en Ligne
    const portfolioCvCard = document.getElementById('projectPortfolioCvCard');
    const portfolioCvModal = document.getElementById('portfolioCvModal');
    const modalPortfolioCvCloseBtn = document.getElementById('modalPortfolioCvCloseBtn');
    const modalPortfolioCvDismissBtn = document.getElementById('modalPortfolioCvDismissBtn');
    const openPortfolioCvBtns = document.querySelectorAll('.open-portfolio-cv-modal');

    function openPortfolioCvModal() {
        if (!portfolioCvModal) return;
        portfolioCvModal.classList.add('active');
        portfolioCvModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closePortfolioCvModal() {
        if (!portfolioCvModal) return;
        portfolioCvModal.classList.remove('active');
        portfolioCvModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (portfolioCvCard) {
        portfolioCvCard.addEventListener('click', () => {
            openPortfolioCvModal();
        });
        portfolioCvCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPortfolioCvModal();
            }
        });
    }

    openPortfolioCvBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openPortfolioCvModal();
        });
    });

    if (modalPortfolioCvCloseBtn) modalPortfolioCvCloseBtn.addEventListener('click', closePortfolioCvModal);
    if (modalPortfolioCvDismissBtn) modalPortfolioCvDismissBtn.addEventListener('click', closePortfolioCvModal);

    // Fermeture par clic sur le backdrop
    if (portfolioCvModal) {
        portfolioCvModal.addEventListener('click', (e) => {
            if (e.target === portfolioCvModal) {
                closePortfolioCvModal();
            }
        });
    }

    // Fermeture par touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && portfolioCvModal && portfolioCvModal.classList.contains('active')) {
            closePortfolioCvModal();
        }
    });

    // Sélecteur de galerie d'images pour le portfolio & CV
    const modalPortfolioCvViewerImg = document.getElementById('modalPortfolioCvViewerImg');
    const modalPortfolioCvViewerCaption = document.getElementById('modalPortfolioCvViewerCaption');
    const portfolioCvThumbBtns = document.querySelectorAll('#modalPortfolioCvThumbs .modal-thumb-btn');

    portfolioCvThumbBtns.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('data-img');
            const caption = thumb.getAttribute('data-caption');

            if (modalPortfolioCvViewerImg && imgSrc) {
                modalPortfolioCvViewerImg.style.opacity = '0.35';
                setTimeout(() => {
                    modalPortfolioCvViewerImg.src = imgSrc;
                    modalPortfolioCvViewerImg.style.opacity = '1';
                }, 140);
            }

            if (modalPortfolioCvViewerCaption && caption) {
                modalPortfolioCvViewerCaption.innerHTML = `<i class='bx bx-image'></i> <span>${caption}</span>`;
            }

            portfolioCvThumbBtns.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // 9. Modale Interactive Projet TEWNA — Écoles au Sénégal
    const tewnaCard = document.getElementById('projectTewnaCard');
    const tewnaModal = document.getElementById('tewnaModal');
    const modalTewnaCloseBtn = document.getElementById('modalTewnaCloseBtn');
    const modalTewnaDismissBtn = document.getElementById('modalTewnaDismissBtn');
    const modalTewnaContactActionBtn = document.getElementById('modalTewnaContactActionBtn');
    const openTewnaBtns = document.querySelectorAll('.open-tewna-modal');

    function openTewnaModal() {
        if (!tewnaModal) return;
        tewnaModal.classList.add('active');
        tewnaModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeTewnaModal() {
        if (!tewnaModal) return;
        tewnaModal.classList.remove('active');
        tewnaModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (tewnaCard) {
        tewnaCard.addEventListener('click', () => {
            openTewnaModal();
        });
        tewnaCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openTewnaModal();
            }
        });
    }

    openTewnaBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openTewnaModal();
        });
    });

    if (modalTewnaCloseBtn) modalTewnaCloseBtn.addEventListener('click', closeTewnaModal);
    if (modalTewnaDismissBtn) modalTewnaDismissBtn.addEventListener('click', closeTewnaModal);
    if (modalTewnaContactActionBtn) {
        modalTewnaContactActionBtn.addEventListener('click', () => {
            closeTewnaModal();
        });
    }

    // Fermeture par clic sur le backdrop
    if (tewnaModal) {
        tewnaModal.addEventListener('click', (e) => {
            if (e.target === tewnaModal) {
                closeTewnaModal();
            }
        });
    }

    // Fermeture par touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && tewnaModal && tewnaModal.classList.contains('active')) {
            closeTewnaModal();
        }
    });

    // Sélecteur de galerie d'images pour le projet TEWNA
    const modalTewnaViewerImg = document.getElementById('modalTewnaViewerImg');
    const modalTewnaViewerCaption = document.getElementById('modalTewnaViewerCaption');
    const tewnaThumbBtns = document.querySelectorAll('#modalTewnaThumbs .modal-thumb-btn');

    tewnaThumbBtns.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('data-img');
            const caption = thumb.getAttribute('data-caption');

            if (modalTewnaViewerImg && imgSrc) {
                modalTewnaViewerImg.style.opacity = '0.35';
                setTimeout(() => {
                    modalTewnaViewerImg.src = imgSrc;
                    modalTewnaViewerImg.style.opacity = '1';
                }, 140);
            }

            if (modalTewnaViewerCaption && caption) {
                modalTewnaViewerCaption.innerHTML = `<i class='bx bx-image'></i> <span>${caption}</span>`;
            }

            tewnaThumbBtns.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // 10. Modale Interactive Projet KAAY JANG — Écoles au Sénégal
    const kaayjangCard = document.getElementById('projectKaayjangCard');
    const kaayjangModal = document.getElementById('kaayjangModal');
    const modalKaayjangCloseBtn = document.getElementById('modalKaayjangCloseBtn');
    const modalKaayjangDismissBtn = document.getElementById('modalKaayjangDismissBtn');
    const modalKaayjangContactActionBtn = document.getElementById('modalKaayjangContactActionBtn');
    const openKaayjangBtns = document.querySelectorAll('.open-kaayjang-modal');

    function openKaayjangModal() {
        if (!kaayjangModal) return;
        kaayjangModal.classList.add('active');
        kaayjangModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeKaayjangModal() {
        if (!kaayjangModal) return;
        kaayjangModal.classList.remove('active');
        kaayjangModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (kaayjangCard) {
        kaayjangCard.addEventListener('click', () => {
            openKaayjangModal();
        });
        kaayjangCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openKaayjangModal();
            }
        });
    }

    openKaayjangBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openKaayjangModal();
        });
    });

    if (modalKaayjangCloseBtn) modalKaayjangCloseBtn.addEventListener('click', closeKaayjangModal);
    if (modalKaayjangDismissBtn) modalKaayjangDismissBtn.addEventListener('click', closeKaayjangModal);
    if (modalKaayjangContactActionBtn) {
        modalKaayjangContactActionBtn.addEventListener('click', () => {
            closeKaayjangModal();
        });
    }

    // Fermeture par clic sur le backdrop
    if (kaayjangModal) {
        kaayjangModal.addEventListener('click', (e) => {
            if (e.target === kaayjangModal) {
                closeKaayjangModal();
            }
        });
    }

    // Fermeture par touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && kaayjangModal && kaayjangModal.classList.contains('active')) {
            closeKaayjangModal();
        }
    });

    // Sélecteur de galerie d'images pour le projet KAAY JANG
    const modalKaayjangViewerImg = document.getElementById('modalKaayjangViewerImg');
    const modalKaayjangViewerCaption = document.getElementById('modalKaayjangViewerCaption');
    const kaayjangThumbBtns = document.querySelectorAll('#modalKaayjangThumbs .modal-thumb-btn');

    kaayjangThumbBtns.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('data-img');
            const caption = thumb.getAttribute('data-caption');

            if (modalKaayjangViewerImg && imgSrc) {
                modalKaayjangViewerImg.style.opacity = '0.35';
                setTimeout(() => {
                    modalKaayjangViewerImg.src = imgSrc;
                    modalKaayjangViewerImg.style.opacity = '1';
                }, 140);
            }

            if (modalKaayjangViewerCaption && caption) {
                modalKaayjangViewerCaption.innerHTML = `<i class='bx bx-image'></i> <span>${caption}</span>`;
            }

            kaayjangThumbBtns.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // 11. Modale Interactive Projet UNIV-SCHEDULER (Gestion des Salles & Emplois du Temps)
    const univSchedulerCard = document.getElementById('projectUnivSchedulerCard');
    const univSchedulerModal = document.getElementById('univSchedulerModal');
    const modalUnivSchedulerCloseBtn = document.getElementById('modalUnivSchedulerCloseBtn');
    const modalUnivSchedulerDismissBtn = document.getElementById('modalUnivSchedulerDismissBtn');
    const modalUnivSchedulerContactActionBtn = document.getElementById('modalUnivSchedulerContactActionBtn');
    const openUnivSchedulerBtns = document.querySelectorAll('.open-univscheduler-modal');

    function openUnivSchedulerModal() {
        if (!univSchedulerModal) return;
        univSchedulerModal.classList.add('active');
        univSchedulerModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeUnivSchedulerModal() {
        if (!univSchedulerModal) return;
        univSchedulerModal.classList.remove('active');
        univSchedulerModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (univSchedulerCard) {
        univSchedulerCard.addEventListener('click', () => {
            openUnivSchedulerModal();
        });
        univSchedulerCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openUnivSchedulerModal();
            }
        });
    }

    openUnivSchedulerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openUnivSchedulerModal();
        });
    });

    if (modalUnivSchedulerCloseBtn) modalUnivSchedulerCloseBtn.addEventListener('click', closeUnivSchedulerModal);
    if (modalUnivSchedulerDismissBtn) modalUnivSchedulerDismissBtn.addEventListener('click', closeUnivSchedulerModal);
    if (modalUnivSchedulerContactActionBtn) {
        modalUnivSchedulerContactActionBtn.addEventListener('click', () => {
            closeUnivSchedulerModal();
        });
    }

    // Fermeture par clic sur le backdrop
    if (univSchedulerModal) {
        univSchedulerModal.addEventListener('click', (e) => {
            if (e.target === univSchedulerModal) {
                closeUnivSchedulerModal();
            }
        });
    }

    // Fermeture par touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && univSchedulerModal && univSchedulerModal.classList.contains('active')) {
            closeUnivSchedulerModal();
        }
    });

    // Sélecteur de galerie d'images pour le projet UNIV-SCHEDULER
    const modalUnivSchedulerViewerImg = document.getElementById('modalUnivSchedulerViewerImg');
    const modalUnivSchedulerViewerCaption = document.getElementById('modalUnivSchedulerViewerCaption');
    const univSchedulerThumbBtns = document.querySelectorAll('#modalUnivSchedulerThumbs .modal-thumb-btn');

    univSchedulerThumbBtns.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('data-img');
            const caption = thumb.getAttribute('data-caption');

            if (modalUnivSchedulerViewerImg && imgSrc) {
                modalUnivSchedulerViewerImg.style.opacity = '0.35';
                setTimeout(() => {
                    modalUnivSchedulerViewerImg.src = imgSrc;
                    modalUnivSchedulerViewerImg.style.opacity = '1';
                }, 140);
            }

            if (modalUnivSchedulerViewerCaption && caption) {
                modalUnivSchedulerViewerCaption.innerHTML = `<i class='bx bx-image'></i> <span>${caption}</span>`;
            }

            univSchedulerThumbBtns.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // 12. Modale Interactive Projet Gestion de Prêts en Bibliothèque
    const bibliothequeCard = document.getElementById('projectBibliothequeCard');
    const bibliothequeModal = document.getElementById('bibliothequeModal');
    const modalBibliothequeCloseBtn = document.getElementById('modalBibliothequeCloseBtn');
    const modalBibliothequeDismissBtn = document.getElementById('modalBibliothequeDismissBtn');
    const modalBibliothequeContactActionBtn = document.getElementById('modalBibliothequeContactActionBtn');
    const openBibliothequeBtns = document.querySelectorAll('.open-bibliotheque-modal');

    function openBibliothequeModal() {
        if (!bibliothequeModal) return;
        bibliothequeModal.classList.add('active');
        bibliothequeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeBibliothequeModal() {
        if (!bibliothequeModal) return;
        bibliothequeModal.classList.remove('active');
        bibliothequeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (bibliothequeCard) {
        bibliothequeCard.addEventListener('click', () => {
            openBibliothequeModal();
        });
        bibliothequeCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openBibliothequeModal();
            }
        });
    }

    openBibliothequeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openBibliothequeModal();
        });
    });

    if (modalBibliothequeCloseBtn) modalBibliothequeCloseBtn.addEventListener('click', closeBibliothequeModal);
    if (modalBibliothequeDismissBtn) modalBibliothequeDismissBtn.addEventListener('click', closeBibliothequeModal);
    if (modalBibliothequeContactActionBtn) {
        modalBibliothequeContactActionBtn.addEventListener('click', () => {
            closeBibliothequeModal();
        });
    }

    // Fermeture par clic sur le backdrop
    if (bibliothequeModal) {
        bibliothequeModal.addEventListener('click', (e) => {
            if (e.target === bibliothequeModal) {
                closeBibliothequeModal();
            }
        });
    }

    // Fermeture par touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bibliothequeModal && bibliothequeModal.classList.contains('active')) {
            closeBibliothequeModal();
        }
    });

    // Sélecteur de galerie d'images pour le projet Bibliothèque (4 miniatures)
    const modalBibliothequeViewerImg = document.getElementById('modalBibliothequeViewerImg');
    const modalBibliothequeViewerCaption = document.getElementById('modalBibliothequeViewerCaption');
    const bibliothequeThumbBtns = document.querySelectorAll('#modalBibliothequeThumbs .modal-thumb-btn');

    bibliothequeThumbBtns.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('data-img');
            const caption = thumb.getAttribute('data-caption');

            if (modalBibliothequeViewerImg && imgSrc) {
                modalBibliothequeViewerImg.style.opacity = '0.35';
                setTimeout(() => {
                    modalBibliothequeViewerImg.src = imgSrc;
                    modalBibliothequeViewerImg.style.opacity = '1';
                }, 140);
            }

            if (modalBibliothequeViewerCaption && caption) {
                modalBibliothequeViewerCaption.innerHTML = `<i class='bx bx-image'></i> <span>${caption}</span>`;
            }

            bibliothequeThumbBtns.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
});


