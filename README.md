# 🚀 Project Aether

> A roommate matching and rental platform focused on compatibility, affordability, and smarter shared living.

---

## 📌 Overview

**Project Aether** is a web platform that helps users find:

* 🤝 Compatible roommates (shared living)
* 🏠 Affordable solo rental spaces (rooms, condos, apartments)

It combines a **matching system (like Bumble)** with a **rental listing platform**, creating a better experience than traditional housing solutions.

---

## 🎯 Problem

Finding a place to live—or someone to live with—is still inefficient:

* Facebook groups are cluttered and unstructured
* Rental platforms focus only on properties, not people
* No system for lifestyle or compatibility matching
* Safety and trust are major concerns

---

## 💡 Solution

Project Aether introduces a **dual-mode system**:

### 🤝 Shared Living Mode (Core Feature)

* Swipe-based matching system
* Connects listers and seekers
* Matches based on:

  * Budget
  * Lifestyle
  * Preferences

---

### 🏠 Solo Living Mode

* Simple rental browsing experience
* Find rooms, condos, or apartments
* Filter and directly message listers

---

## 👥 Target Users

* Students
* Young professionals
* People relocating to urban areas

---

## 🔥 MVP Features

### 👤 User Profiles

* Name
* Age range
* Gender
* Budget range
* Lifestyle tags (smoking, pets, sleep, cleanliness)

---

### 🏘️ Listings

* Title, photos, price
* Location (general area)
* Type:

  * `shared`
  * `solo`
* Slots available (shared only)

---

### 💘 Matching System (Shared Mode)

* Swipe (like/pass)
* Match when criteria align

---

### 🔍 Discovery (Solo Mode)

* Browse listings
* Filter by price, location, type

---

### 💬 Chat System

* Real-time messaging
* Triggered after:

  * Match (shared)
  * Inquiry (solo)

---

### 🛡️ Safety (MVP)

* Report user
* Block user

---

## 🧭 User Flow

### Entry Point

User selects:

* Find a roommate
* Find a place

---

### Shared Living

1. Create profile
2. Swipe listings
3. Match
4. Chat

---

### Solo Living

1. Browse listings
2. View details
3. Send inquiry
4. Chat

---

## 🧱 Tech Stack

### Frontend

* React (SPA)

### Backend

* Laravel (REST API)

### Real-Time

* Laravel Reverb (WebSockets)

### Database

* PostgreSQL

### Auth

* Laravel Sanctum

### Storage

* AWS S3 (or equivalent)

---

## ⚙️ Getting Started

### 1. Clone the repository

```
git clone https://gitlab.com/innovation3662812/project-aether.git
cd project-aether
```

---

### 2. Backend Setup (Laravel)

```
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

---

### 3. Frontend Setup (React)

```
cd frontend
npm install
npm run dev
```

---

### 4. Run WebSocket Server (Reverb)

```
php artisan reverb:start
```

---

## ⚙️ Environment Requirements

* PHP 8.2+
* Node.js 18+
* PostgreSQL
* Composer
* npm / yarn

---

## 🚀 Roadmap

### Phase 1 (MVP)

* Profiles
* Listings
* Matching system
* Chat (basic)

### Phase 2

* Verified users
* Ratings & reviews
* Improved matching logic

### Phase 3

* AI-based recommendations
* Premium features
* Mobile app

---

## ⚠️ Known Challenges

* Cold start problem (low initial users)
* Trust & safety (verification needed)
* Matching accuracy

---

## 🤝 Contributing

We are currently a private team of 4 developers.

If contributing in the future:

* Create a feature branch
* Submit a merge request
* Follow coding standards

---

## 👨‍💻 Team

Project Aether is developed by a team of 4 developers focusing on:

* Backend (Laravel)
* Frontend (React)
* DevOps & Infrastructure

---

## 📄 License

This project is currently private and not licensed for public distribution.

---

## 📌 Project Status

🚧 In active development (MVP stage)

---

**Project Aether — Find your space. Find your people.**
