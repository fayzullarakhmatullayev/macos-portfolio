# macOS Portfolio

A sleek, interactive, and modern portfolio website designed to mimic the macOS desktop experience. Built with React 19, Vite, and Tailwind CSS, this project features a fully functional desktop environment with draggable windows, a dynamic dock, and a simulated file system.

## 🚀 Features

-   **macOS Desktop Experience:** A familiar desktop interface with a top navbar, desktop icons, and a dynamic dock.
-   **Interactive Dock:** A smooth, GSAP-powered dock with hover effects and application launching capabilities.
-   **Window Management:** Draggable and stackable windows for various applications like Finder, Safari, Terminal, and Photos.
-   **Finder Emulation:** A functional file explorer to navigate through projects, about me sections, and a resume.
-   **Terminal Simulation:** A terminal window showcasing skills and technical expertise.
-   **Responsive Design:** Styled with Tailwind CSS for a clean and modern look across different screen sizes.
-   **State Management:** Powered by Zustand for seamless window and application state handling.
-   **Smooth Animations:** Leverages GSAP for fluid transitions and interactive elements.

## 🛠️ Tech Stack

-   **Frontend:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
-   **Animations:** [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
-   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Date Handling:** [Day.js](https://day.js.org/)

## 📂 Project Structure

```text
src/
├── components/     # UI components (Dock, Navbar, WindowControls, etc.)
├── constants/      # Configuration and static data (nav links, dock apps, projects)
├── hoc/            # Higher-Order Components (WindowWrapper for draggable windows)
├── store/          # Zustand store for global state (window and location management)
├── windows/        # Individual application window components (Safari, Terminal, Finder, etc.)
├── App.jsx         # Main application entry point
└── index.css       # Global styles and Tailwind imports
```

## 🏁 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (Latest LTS version recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/macos_portfolio.git
    cd macos_portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
