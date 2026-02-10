# 🎨 Artist Portfolio & Commission Management System

A full-stack web application built to serve as both:

1. A professional portfolio for showcasing artwork
2. A commission management system for handling custom orders

The system is actively deployed and structured to scale with additional features such as payments and revenue tracking.

---

## 🌍 Live Application

🔗 https://hiltonstudio.vercel.app

    https://hilton-the-artist.vercel.app

---

## 🛠️ Technology Stack

Frontend:
- Next.js (App Router, TypeScript)
- Tailwind CSS

Backend:
- Next.js Server Actions & API routes

Database & Authentication:
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Storage (image uploads)

Deployment:
- Vercel

---

## ✨ Core Features

### Public Features
- Responsive artwork gallery
- Artwork detail pages
- Commission request submission
- Order tracking system

### Admin Features
- Secure authentication
- Artwork CRUD management
- Order management dashboard
- Status tracking
- Image upload handling

---

## 🔐 Security Implementation

- Supabase Row Level Security (RLS) enabled
- Public read-only access for artwork listings
- Authenticated access required for admin operations
- Protected dashboard routes
- Environment variables secured in deployment

---

## 🗄️ Database Design

Relational PostgreSQL schema designed for scalability.

### artworks
Stores all published artwork.

### orders
Stores commission requests and lifecycle status.

Schema designed to allow future integration of:
- Payments
- Revenue tracking
- Role-based access control

---

## 📂 Architecture Overview

The application follows a modular full-stack structure:

- UI Components separated from business logic
- Supabase client isolated in `/lib`
- Server-side rendering for protected routes
- Extendable API layer for future integrations

---

## 🚀 Future Enhancements

- Payment integration
- Earnings analytics dashboard
- Email notifications
- Role-based admin system
- Artist blog module
- Limited edition print management

---

## 🎯 Purpose

This project demonstrates:

- Production-ready full-stack development
- Secure authentication & authorization
- Database design & RLS implementation
- Cloud deployment workflow
- Real-world system architecture

It serves as both a live production tool and a portfolio-grade engineering project.
