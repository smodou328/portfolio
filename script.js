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

                const result = await response.json();

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
                    return;
                }

                // Cas 2 : Message relatif au fichier HTML local
                if (result && result.message && result.message.toLowerCase().includes('html files')) {
                    throw new Error("FormSubmit requiert une exécution via serveur web (http/https). En production sur GitHub Pages, l'envoi est automatique.");
                }

                // Cas 3 : Envoi réussi confirmé
                const isSuccess = result && (
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

                    contactForm.reset();
                    fieldMappings.forEach(({ input, errorId }) => clearFieldError(input, errorId));

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
            } finally {
                isSubmitting = false;
                if (submitBtn) {
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
});
