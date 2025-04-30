# PHB Website Frontend (phb-website)

This repository contains the frontend code for the Public Health Bureau (PHB) website, a comprehensive platform designed to provide health information, services, and tools for the public and healthcare professionals.

## Overview

The PHB website aims to be a central hub for accessing reliable health information, managing personal health records, utilizing health-related tools, and connecting with healthcare services. It caters to various user needs, including general health inquiries, pregnancy support, and professional resources for clinicians.

## Key Features

*   **User Authentication:** Secure login and registration for public users and healthcare professionals. Includes OTP verification and onboarding flows.
*   **Health Information:**
    *   A-Z directory of health conditions (`Health A-Z`).
    *   A-Z directory of medicines (`Medicines A-Z`).
    *   Sections on living well (exercise, diet, sleep, mental wellbeing).
    *   Specialized sections for Mental Health, Contraception, Vaccinations, Women's Health, and Pregnancy.
*   **Personal Health Management (Account Required):**
    *   View and manage appointments.
    *   Access medical records (GP Health Record, Test Results).
    *   Manage prescriptions and nominated pharmacies.
    *   Set health goals and manage contact preferences.
*   **Health Tools & Calculators:**
    *   BMI Calculator
    *   Symptom Checker
    *   Pregnancy Tools: Due Date Calculator, Weight Gain Calculator, Calendar, Kick Counter, Contraction Timer, Baby Names Directory, Birth Plan Creator, etc.
*   **Search Functionality:**
    *   Basic and advanced search capabilities.
    *   Body map interface for symptom searching.
    *   "Did You Mean" suggestions for typos.
    *   Medical term highlighting and tooltips.
*   **Professional Portal (Separate Login):**
    *   Dashboard for healthcare professionals.
    *   Patient management features (list, details, communication, scheduling).
    *   Access to clinical guidelines and resources.
    *   Clinical calculators.
    *   Research data access and visualization tools.
*   **Other Features:**
    *   Site Map, About Pages, Help Section.
    *   Feedback mechanism.

## Tech Stack

*   **Framework:** React 18
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **State Management:** React Context API (implied)
*   **Linting:** ESLint
*   **Package Management:** Likely `npm` (due to `package-lock.json`) or `bun` (used in `predeploy` script)

## Getting Started

### Prerequisites

*   Node.js (which includes npm) or Bun installed.
*   Git

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/iamgolden55/phbfrontend.git
    cd phbfrontend
    ```

2.  **Install dependencies:**
    *   Using npm:
        ```bash
        npm install
        ```
    *   Or using Bun:
        ```bash
        bun install
        ```

### Running the Development Server

1.  Start the Vite development server:
    *   Using npm:
        ```bash
        npm run dev
        ```
    *   Or using Bun:
        ```bash
        bun run dev
        ```
2.  Open your browser and navigate to `http://localhost:5173` (or the address provided by Vite, which might be different if the port is occupied). The `--host 0.0.0.0` flag makes it accessible on your local network.

## Available Scripts

*   `dev`: Starts the development server with Hot Module Replacement (HMR).
*   `build`: Compiles the TypeScript code and bundles the application for production using Vite.
*   `lint`: Lints the code in the `src` directory using ESLint and attempts to fix issues.
*   `preview`: Serves the production build locally for testing.
*   `typecheck`: Runs the TypeScript compiler to check for type errors without emitting files.
*   `predeploy`: Runs the `build` script before deployment (used by the `deploy` script).
*   `deploy`: Deploys the production build to Netlify (requires Netlify CLI and authentication).

## Deployment

This project is configured for deployment on Netlify. The `netlify.toml` file likely contains build settings, and the `deploy` script uses the Netlify CLI. Pushing to the configured branch on GitHub might also trigger automatic deployments if Netlify integration is set up.

## Contributing

*(Optional: Add guidelines for contributing if this is an open project)*
