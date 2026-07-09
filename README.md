# 🛠️ Technical Specification: Super Mario Bros - OOP JavaScript Simulation

This document outlines the internal technical architecture, object-oriented principles, and algorithm implementations of the Super Mario Bros desktop simulation.

---

## 1. Object-Oriented Framework & Core Pillars

The game engine is built on top of the `Otter` game framework base library. The core logic enforces a strict Object-Oriented Programming (OOP) hierarchy pattern to manage assets, entities, and environment rules.

### 🔒 1.1 Encapsulation (Enkapsulacija)
Private class properties are managed via ES6 `#` syntax to prevent unsafe external state mutation.
- **Example:** The `#zivoti` property inside the `Mario` and `Zmaj` classes is strictly encapsulated. Access and logic boundaries are validated through custom getters and setters.
- **State Logic:** If a character's life pool drops below zero, properties automatically clamp to `0` to safely handle game-over flags and state evaluations.

### 🌿 1.2 Inheritance (Nasljeđivanje)
Dynamic entities derive structural parameters and base kinematics by inheritance trees.
- `Mario extends Sprite` -> Inherits bounding boxes, dynamic frame sets for walking/jumping directions, and base physical velocity properties.
- `Zmaj extends Sprite` -> Reuses full frame-set structures and physics update cycles.
- `Neprijatelj extends Item` -> Inherits static layer properties and maps coordinates to coordinate grids.

### 🎭 1.3 Polymorphism & Overloading (Polimorfizam i Preopterećenje)
- **Method Overriding (Nadjačavanje metoda):** The `updatePosition()` method is overridden in subclass entities. It calls `super.updatePosition()` to process engine friction and gravity variables, followed by custom behavioral logic (e.g., checking block impacts or spawning item entities).
- **Method Overloading Simulation (Preopterećenje):** Because JavaScript lacks native signature overloading, type and argument parsing are simulated inside the `jump()` method via the `arguments` metadata array:
  - `jump(number)`: Adjusts vertical velocity scaling dynamically.
  - `jump(string)`: Processes interaction types (e.g., preventing movement when interacting with `"podloga"`).

---

## 2. Game Mechanics & State Machine Architecture

### 🛡️ 2.1 Dynamic Collisions & Event Triggers
Entity bounding boxes evaluate relative vertical velocity axes during execution loops:
- **Block Shattering & Items:** Inside `Mario.updatePosition()`, the engine detects when Mario hits a breakable block from below (`this.velocity_y < 0 && this.touching(block)`). This triggers a block-shatter event and spawns dynamic power-ups (`Gljiva`) or point entities (`Coin`).
- **State Changes (`PromjenaStanja`):** Mario possesses a dual-state design pattern (`veliki` vs `mali`). Taking damage triggers a soft layout scale modification (`width`/`height` reduction), rather than an immediate loss of health.

### 🤖 2.2 Proximity AI Algorithms
Non-playable hostile characters (`Zmaj`, `Neprijatelj`) manage automated movement loops using absolute distance delta checks:
- **Proximity Detection (`blizina`):** Computes distance via delta absolute formulas: $\Delta x = |x_{enemy} - x_{player}|$.
- **Aggro Mechanics (`napadni`):** If a player enters specified bounds ($dx < 180$, $dy < 60$), the AI overrides its passive patrol array to track the player's vector orientation.
- **Dynamic Projectiles:** Hostile entities detect player orientation to cast dynamic projectiles (`pucajlijevo()` / `pucajdesno()`) safely matching the target axis.

---

## 👩‍💻 Author
- **Katarina Pilić** - *B.Sc. in Computer Science and Technology*
