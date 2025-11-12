/**
 * Authentication utilities for credential management
 */

class AuthManager {
    constructor() {
        this.STORAGE_KEY = 'saved_credentials';
        this.SESSION_KEY = 'credential_prompt_shown';
    }

    /**
     * Validate user credentials against dummy data
     * @param {string} email 
     * @param {string} password 
     * @returns {boolean}
     */
    validateCredentials(email, password) {
        // For demo purposes, we'll use simple validation
        // In a real application, this would make an API call to the server
        const validCredentials = [
            { email: 'alice@example.com', password: 'password123' },
            { email: 'bob@example.com', password: 'password456' },
            { email: 'charlie@example.com', password: 'password789' },
            { email: 'admin@example.com', password: 'admin123' }
        ];

        return validCredentials.some(cred => 
            cred.email === email && cred.password === password
        );
    }

    /**
     * Save credentials securely to localStorage
     * @param {string} email 
     * @param {string} password 
     */
    saveCredentials(email, password) {
        try {
            // In a real application, you would encrypt the password
            // For demo purposes, we'll use base64 encoding (NOT secure for production)
            const credentials = {
                email: email,
                password: btoa(password), // Base64 encoding (demo only)
                savedAt: new Date().toISOString()
            };
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(credentials));
            console.log('Credentials saved successfully');
        } catch (error) {
            console.error('Error saving credentials:', error);
        }
    }

    /**
     * Retrieve saved credentials from localStorage
     * @returns {object|null}
     */
    getSavedCredentials() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                const credentials = JSON.parse(saved);
                return {
                    email: credentials.email,
                    password: atob(credentials.password), // Base64 decoding (demo only)
                    savedAt: credentials.savedAt
                };
            }
        } catch (error) {
            console.error('Error retrieving saved credentials:', error);
        }
        return null;
    }

    /**
     * Check if credentials are saved
     * @returns {boolean}
     */
    hasCredentialsSaved() {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }

    /**
     * Clear saved credentials
     */
    clearSavedCredentials() {
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('Saved credentials cleared');
    }

    /**
     * Check if credential prompt was shown in this session
     * @returns {boolean}
     */
    wasPromptShownThisSession() {
        return sessionStorage.getItem(this.SESSION_KEY) === 'true';
    }

    /**
     * Mark that credential prompt was shown in this session
     */
    markPromptShownThisSession() {
        sessionStorage.setItem(this.SESSION_KEY, 'true');
    }

    /**
     * Clear session data
     */
    clearSessionData() {
        sessionStorage.removeItem(this.SESSION_KEY);
    }

    /**
     * Auto-fill login form with saved credentials
     */
    autoFillCredentials() {
        const saved = this.getSavedCredentials();
        if (saved) {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            
            if (emailInput && passwordInput) {
                emailInput.value = saved.email;
                passwordInput.value = saved.password;
                
                // Add visual indication that credentials were auto-filled
                emailInput.style.backgroundColor = '#e8f5e8';
                passwordInput.style.backgroundColor = '#e8f5e8';
                
                console.log('Credentials auto-filled from saved data');
            }
        }
    }
}

// Create global instance
const authManager = new AuthManager();