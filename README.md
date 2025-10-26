# Shiksha Saarthi: One-Stop Personalised Career & Education Advisor

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Build Status](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/YOUR_REPO/main.yml?branch=main)
![Repo Size](https://img.shields.io/github/repo-size/YOUR_USERNAME/YOUR_REPO)

**Live Website:** [**Shiksha Saarthi**](https://sih-2025-22r8.onrender.com/)

---

## 🚀 About This Project

**Shiksha Saarthi** is a software solution developed for the **Smart India Hackathon 2025** under the "Smart Education" theme. This project, created by **Team Revivers**, directly addresses the problem statement **"One-Stop Personalized Career & Education Advisor" (ID: 25094)**.

The primary goal is to tackle the high student dropout rate in regions like Jammu & Kashmir by providing a centralized, accessible, and free platform for career counseling and educational guidance. It bridges the awareness gap by offering personalized recommendations based on a student's aptitude and interests, rather than peer or parental pressure.

## ✨ Key Features

* **Personalized Guidance:** Recommends suitable streams (Science, Arts, Commerce) and diploma/degree programs based on student marks and preferences.
* **Localized College Directory:** Provides detailed information on nearby government colleges, including courses, admission requirements, exam schedules, and fee structures.
* **Comprehensive Information Hub:** Acts as a single source for:
    * Post-10th/12th career pathways.
    * Scholarship and financial aid schemes.
    * Competitive exam updates.
* **Accessible Learning:**
    * **Offline Mode:** Allows students in low-connectivity areas to download modules and lectures.
    * **Multi-Language Support:** Ensures the platform is usable by students from diverse linguistic backgrounds.
* **Engaging & Supportive:** Features interactive quizzes, rewards, study resources, and mentorship sessions to build student trust and engagement.
* **Always Up-to-Date:** Uses web scraping to keep information on courses, scholarships, and admissions regularly refreshed.

## 🛠️ Tech Stack & Architecture

This solution is built using a modern, scalable, and cost-effective tech stack.

### Core Technologies

| Category | Technology |
| :--- | :--- |
| **Web Frontend** | `React.js`, `Vite`, `TailwindCSS` |
| **Mobile Frontend** | `Flutter`, `Dart` |
| **Backend & APIs** | `Node.js`, `Express.js`, `Python`, `FastAPI` |
| **Database** | `Firebase` |
| **ML/AI** | `Scikit-learn`, `SciPy`, `Python` |
| **DevOps & Cloud**| `AWS`, `Docker`, `Kubernetes`, `GitHub Actions` (CI/CD) |
| **Integrations** | `Socket.io`, `JWT`, `OAuth2`, `SendGrid` |
| **Web Scraping** | `BeautifulSoup4` |
| **Security** | `Cloudflare`, `SSL/TLS` |

### System Architecture

The application follows a modular architecture:

1.  **User Interface (Frontend):** Users interact with the system via a `React.js` web application or a `Flutter` mobile app.
2.  **API Routing:** A central API layer using `FastAPI` handles requests, routing them to the appropriate microservice.
3.  **Machine Learning:** An `Scikit-learn` model provides personalized predictions and recommendations.
4.  **Backend Services:** `Node.js` and `Firebase` manage core logic, user authentication (using `JWT`/`OAuth2`), and real-time data.
5.  **Data Handling:**
    * **Database:** `Firebase` stores user data and application state.
    * **Data Scraping:** A `Python` scraper with `BeautifulSoup4` continuously fetches and updates college and scholarship data.
6.  **Deployment:** The entire application is containerized using `Docker` and hosted on `AWS` for scalability, with a CI/CD pipeline managed by `GitHub Actions`.

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18.x or later)
* Python (v3.10.x or later)
* Flutter SDK
* Firebase Account

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/DipayanSadhukhan/SIH-2025.git
    cd SIH-2025
    ```

2.  **Install Web Frontend (React) dependencies**
    ```sh
    cd Frontend
    npm install
    ```

3.  **Install Backend (Node/Python) dependencies**
    ```sh
    # For Node.js server
    cd..
    npm install
    ```

4.  **Configure Environment Variables**
    * Create a `.env` file in each server directory.
    * Add your Firebase API keys, JWT secret, SendGrid keys, and database connection strings.

5.  **Run the application**
    * **Run Frontend:** `npm run dev` (from `client-web`)
    * **Run Backend:** `npm start` (from `server-node`) and `uvicorn main:app --reload` (from `server-python`)
    * **Run Mobile App:** `flutter run` (from `client-mobile`)

## 📄 License

This project is distributed under the MIT License. See `LICENSE.txt` for more information.

## 🏆 SIH 2025 Context

This project is our team's submission for the **Smart India Hackathon 2025**.

* **Team Name:** Team Revivers
* **Problem ID:** 25094
* **Problem Title:** One-Stop Personalized Career & Education Advisor
* **Theme:** Smart Education
