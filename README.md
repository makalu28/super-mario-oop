# 🎮 Super Mario Bros - OOP JavaScript Simulation

A web-based 2D platformer simulation based on the classic Super Mario Bros, developed as a core academic project for the **Object-Oriented Programming (OOP)** course. 

The primary objective of this project was to implement a browser-based application that rigorously demonstrates the practical application of the four fundamental pillars of OOP within a **JavaScript (ES6+)** environment, utilizing a university-provided structural template.

---

## 🧠 OOP Architecture & Implementation

Even though JavaScript is dynamically typed, the core mechanics of this game strictly enforce robust object-oriented design principles:

1. **Encapsulation (Enkapsulacija):** All game entity states (e.g., Mario's health parameters, dynamic velocities, and level progression flags) are strictly encapsulated within class modules. State adjustments are performed safely via internal class methods.
2. **Inheritance (Nasljeđivanje):** Implemented a structural hierarchy for layout elements and entities. Specialized classes extend a baseline entity system, allowing assets like `Hero` (Mario) and various map obstacles/enemies to share core physics features.
3. **Polymorphism (Polimorfizam):** Utilized method overriding for rendering loops and dynamic behaviors. Each active entity automatically executes its own custom `Update()` cycle and collision handler depending on its specific object sub-type.
4. **Abstraction (Abstrakcija):** Complex front-end systems—such as keyboard event listeners, real-time Canvas rendering, and multi-level layout transitions (`level2`, `maps`)—are fully hidden behind streamlined game manager methods.

---

## 🛠️ Tech Stack & Structure
- **Language:** JavaScript (ES6+)
- **Frontend Layer:** HTML5 Canvas, CSS3 Custom Styling
- **Architecture:** Object-Oriented Component Architecture
- **Project Assets Included:** Multi-stage layout maps (`maps/`, `level2`), dynamic physics engine logic (`script.js`), and game assets.

---

## 👩‍💻 Author
- **Katarina Pilić** - *univ. bacc. inf. et techn. Katarina Pilić*
