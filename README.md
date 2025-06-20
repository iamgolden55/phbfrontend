# PHB Hospital System - Frontend

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-4+-green.svg)](https://vitejs.dev)

## ⚖️ **IMPORTANT: NON-COMMERCIAL LICENSE**

**This software is licensed under CC BY-NC-SA 4.0 - Commercial use is strictly prohibited.**

- ✅ **Educational and personal use allowed**
- ✅ **Must provide attribution to Golden/PHB**
- ✅ **Must share improvements under same license**
- ❌ **NO commercial use without explicit written permission**
- ⚖️ **Violations subject to legal action and damages**

For commercial licensing inquiries, contact the copyright holder.

## 🏥 About PHB Hospital System Frontend

Advanced hospital management frontend built with React and TypeScript, featuring comprehensive patient care interfaces, medical records management, appointment scheduling, and payment integration.

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
*   **State Management:** React Context API
*   **Linting:** ESLint
*   **Package Management:** npm/bun

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

## 📄 License

Copyright (c) 2025 Golden (Public Health Bureau)

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details.

**Commercial use is strictly prohibited.** Contact the copyright holder for commercial licensing.