# OCR-Based CRVS Form Digitization Frontend

A React-based frontend application designed to streamline the digitization of Civil Registration and Vital Statistics (CRVS) forms. This application provides a user-friendly interface for uploading scanned forms, reviewing OCR-extracted data, validating information, and managing workflows within organized workspaces. Built with modern web technologies, it integrates seamlessly with a backend OCR service to convert paper-based records into structured digital data.

## Features

- **Secure Authentication**: Log in securely with JWT-based authentication.
- **Workspace Management**: Create, edit, and organize workspaces to group forms (e.g., by class, section, or year).
- **Form Upload**: Upload scanned CRVS forms (PDFs) to specific workspaces for processing.
- **Data Validation**: Review and correct OCR-extracted data side-by-side with the original form image.
- **Workflow Tracking**: Manage forms through states: Awaiting Validation, Draft, and Fully Validated.
- **Data Viewing**: View lists of validated forms within workspaces.
- **Responsive Design**: Built with Bootstrap for a consistent experience across devices.

## Tech Stack

- **Framework**: React v18
- **Routing**: react-router-dom v6
- **State Management**: React Context API (AuthContext) for global state, useState and useReducer for local state
- **API Communication**: Fetch API with JWT Bearer tokens
- **Styling**: CSS Modules, global CSS, and Bootstrap v5
- **UI Components**: Reusable components (Button, Card, Input) in src/components/UI/

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Backend API**: A compatible OCR backend service (e.g., deployed at https://crvs.onrender.com) with endpoints for authentication, workspace management, file upload, and form validation.

## Installation

### Clone the Repository:
```bash
git clone https://github.com/your-username/crvs-form-digitization-frontend.git
cd crvs-form-digitization-frontend
```

### Install Dependencies:
```bash
npm install
```

### Configure Environment:
1. Create a `.env` file in the root directory.
2. Add the backend API base URL:
```
REACT_APP_API_BASE_URL=https://crvs.onrender.com
```
3. (Optional) Adjust other environment variables as needed for your deployment.

### Run the Application:
```bash
npm start
```
The app will launch at http://localhost:3000 in development mode.

## Usage

1. **Login**: Access the app at the root URL (/) and log in with your credentials.
2. **Manage Workspaces**: Navigate to `/home/workspace` to create or view workspaces.
3. **Upload Forms**: Go to a workspace's details page (`/home/workspace/:workspace_id`) and upload a PDF via the "Upload Single File" option.
4. **Validate Data**: Review forms in the "Validate" queue, correct OCR data, and submit validated forms.
5. **Track Progress**: Monitor form statuses (Awaiting Validation, Draft, Validated) within each workspace.

## Project Structure

```
src/
├── components/         # Reusable UI components and feature-specific modules
│   ├── Home/          # Landing page components
│   ├── Login/         # Authentication components
│   ├── Workspace/     # Workspace management components
│   ├── Forms/         # CRVS form validation components
│   └── UI/            # Generic UI elements (Button, Card, etc.)
├── pages/             # Top-level page components (layouts and routes)
├── store/             # Global state management (AuthContext)
├── index.js           # App entry point
└── index.css          # Global styles
```

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the existing style and includes appropriate tests.

## Potential Enhancements

- **Bulk Upload**: Support uploading multiple forms at once.
- **Advanced PDF Features**: Add zooming or highlighting in the PDF viewer.
- **Search & Filter**: Improve form list navigation with search and filters.
- **User Roles**: Implement role-based access (e.g., Admin, Validator).
- **Reporting**: Generate data reports from validated forms.

