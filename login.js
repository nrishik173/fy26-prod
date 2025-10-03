/**
 * Login functionality with credential save prompt
 */

class LoginManager {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.credentialPrompt = document.getElementById('credentialPrompt');
        this.successPage = document.getElementById('successPage');
        this.errorMessage = document.getElementById('errorMessage');
        
        this.currentCredentials = null;
        
        this.initializeEventListeners();
        this.initializePage();
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Login form submission
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Credential prompt buttons
        document.getElementById('saveCredentials').addEventListener('click', () => this.handleSaveCredentials());
        document.getElementById('notNow').addEventListener('click', () => this.handleNotNow());
        
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
        
        // Close modal when clicking outside
        this.credentialPrompt.addEventListener('click', (e) => {
            if (e.target === this.credentialPrompt) {
                this.handleNotNow();
            }
        });
    }

    /**
     * Initialize page state
     */
    initializePage() {
        // Auto-fill credentials if available
        authManager.autoFillCredentials();
        
        // Focus on email field
        document.getElementById('email').focus();
    }

    /**
     * Handle login form submission
     * @param {Event} e 
     */
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Clear any previous error messages
        this.hideError();
        
        // Validate input
        if (!email || !password) {
            this.showError('Please enter both email and password.');
            return;
        }
        
        // Show loading state
        this.setLoginButtonState(true);
        
        try {
            // Simulate API call delay
            await this.delay(1000);
            
            // Validate credentials
            if (authManager.validateCredentials(email, password)) {
                this.currentCredentials = { email, password };
                this.handleSuccessfulLogin();
            } else {
                this.showError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            this.showError('An error occurred during login. Please try again.');
            console.error('Login error:', error);
        } finally {
            this.setLoginButtonState(false);
        }
    }

    /**
     * Handle successful login
     */
    handleSuccessfulLogin() {
        console.log('Login successful');
        
        // Hide login form
        this.loginForm.parentElement.style.display = 'none';
        
        // Show success page
        this.successPage.style.display = 'block';
        
        // Check if we should show the credential save prompt
        this.checkAndShowCredentialPrompt();
    }

    /**
     * Check if credential save prompt should be shown
     */
    checkAndShowCredentialPrompt() {
        // Don't show prompt if:
        // 1. Credentials are already saved
        // 2. Prompt was already shown in this session
        if (authManager.hasCredentialsSaved() || authManager.wasPromptShownThisSession()) {
            console.log('Credential prompt not shown - already saved or shown this session');
            return;
        }
        
        // Show prompt after a short delay for better UX
        setTimeout(() => {
            this.showCredentialPrompt();
        }, 1500);
    }

    /**
     * Show credential save prompt
     */
    showCredentialPrompt() {
        this.credentialPrompt.style.display = 'flex';
        
        // Focus on the Save button for better accessibility
        document.getElementById('saveCredentials').focus();
        
        console.log('Credential save prompt shown');
    }

    /**
     * Hide credential save prompt
     */
    hideCredentialPrompt() {
        this.credentialPrompt.style.display = 'none';
    }

    /**
     * Handle save credentials button click
     */
    handleSaveCredentials() {
        if (this.currentCredentials) {
            authManager.saveCredentials(
                this.currentCredentials.email, 
                this.currentCredentials.password
            );
            
            // Mark prompt as shown for this session
            authManager.markPromptShownThisSession();
            
            // Hide prompt
            this.hideCredentialPrompt();
            
            // Show success message
            this.showSuccessMessage('Credentials saved successfully!');
            
            console.log('User chose to save credentials');
        }
    }

    /**
     * Handle not now button click
     */
    handleNotNow() {
        // Mark prompt as shown for this session so it doesn't appear again
        authManager.markPromptShownThisSession();
        
        // Hide prompt
        this.hideCredentialPrompt();
        
        console.log('User chose not to save credentials');
    }

    /**
     * Handle logout
     */
    handleLogout() {
        // Clear session data
        authManager.clearSessionData();
        
        // Reset form
        this.loginForm.reset();
        
        // Clear auto-filled styling
        document.getElementById('email').style.backgroundColor = '';
        document.getElementById('password').style.backgroundColor = '';
        
        // Show login form
        this.loginForm.parentElement.style.display = 'block';
        
        // Hide success page
        this.successPage.style.display = 'none';
        
        // Hide any prompts
        this.hideCredentialPrompt();
        
        // Clear current credentials
        this.currentCredentials = null;
        
        // Focus on email field
        document.getElementById('email').focus();
        
        console.log('User logged out');
    }

    /**
     * Show error message
     * @param {string} message 
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }

    /**
     * Hide error message
     */
    hideError() {
        this.errorMessage.style.display = 'none';
    }

    /**
     * Show success message
     * @param {string} message 
     */
    showSuccessMessage(message) {
        // Create temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    /**
     * Set login button loading state
     * @param {boolean} loading 
     */
    setLoginButtonState(loading) {
        const button = this.loginForm.querySelector('.login-btn');
        if (loading) {
            button.disabled = true;
            button.textContent = 'Logging in...';
        } else {
            button.disabled = false;
            button.textContent = 'Login';
        }
    }

    /**
     * Utility function to create delay
     * @param {number} ms 
     * @returns {Promise}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize login manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});

// Add CSS animation for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);