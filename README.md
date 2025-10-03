# FY26 Prod - Login with Credential Save Feature

A sample web application demonstrating a credential save prompt functionality after user login.

## Features

### Credential Save Prompt
- **Automatic Prompt**: After successful login, users are prompted to save their credentials
- **User Choice**: Users can choose to "Save" or select "Not now"
- **Session Management**: If "Not now" is selected, the prompt won't appear again during that session
- **Secure Storage**: Credentials are stored securely in browser's localStorage (demo implementation)
- **Auto-fill**: Saved credentials are automatically filled on subsequent visits

## Getting Started

### Prerequisites
- A modern web browser
- Python (for local server) or Node.js with http-server

### Running the Application

1. Clone or download the repository
2. Navigate to the project directory
3. Start a local server:

```bash
# Using npm (if you have Node.js)
npm start

# Or manually with Python
python -m http.server 8000
# or
python3 -m http.server 8000
```

4. Open your browser and navigate to `http://localhost:8000`

### Demo Credentials

For testing purposes, you can use any of these credentials:

- **Email**: alice@example.com, **Password**: password123
- **Email**: bob@example.com, **Password**: password456  
- **Email**: charlie@example.com, **Password**: password789
- **Email**: admin@example.com, **Password**: admin123

## How It Works

### User Flow

1. **Login**: User enters their credentials and submits the login form
2. **Authentication**: Credentials are validated against the demo user database
3. **Success**: Upon successful login, user sees a welcome page
4. **Prompt**: After 1.5 seconds, a modal appears asking to save credentials
5. **Choice**: User can choose to save or decline
6. **Storage**: If saved, credentials are stored in localStorage for future use

### Technical Implementation

#### Files Structure
- `index.html` - Main login page with modal for credential prompt
- `login.js` - Login logic and credential save prompt management
- `auth.js` - Authentication utilities and credential storage
- `styles.css` - Styling for the login form and modal

#### Key Components

**AuthManager Class** (`auth.js`):
- Handles credential validation
- Manages secure storage and retrieval
- Tracks session state for prompt display

**LoginManager Class** (`login.js`):
- Manages login form interactions
- Controls credential save prompt display
- Handles user choices and session management

### Security Considerations

⚠️ **Note**: This is a demo implementation. In production:
- Use HTTPS for all communications
- Implement proper password encryption
- Use secure authentication tokens
- Consider using browser's Credential Management API
- Implement proper CSRF protection

## Acceptance Criteria Compliance

✅ **Prompt after successful login**: Implemented with 1.5-second delay for better UX
✅ **Save/Not now options**: Modal with clearly labeled buttons
✅ **Secure credential storage**: Using localStorage with base64 encoding (demo level)
✅ **Session-based prompt control**: Prompt doesn't reappear if "Not now" is selected

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Testing the Feature

1. Open the application in your browser
2. Log in with demo credentials
3. Observe the credential save prompt after successful login
4. Test both "Save" and "Not now" options
5. Refresh the page to see auto-fill functionality (if saved)
6. Test session behavior by selecting "Not now" and logging in again

### Customization

The credential save prompt can be customized by modifying:
- Prompt timing in `login.js` (currently 1.5 seconds)
- Modal styling in `styles.css`
- Storage mechanism in `auth.js`
- Validation logic in `auth.js`

## Future Enhancements

- Integration with backend authentication API
- Support for biometric authentication
- Remember me checkbox option
- Multiple account management
- Enhanced security with encryption
