# 🚀 Smart Bookmark App

A full-stack real-time bookmark manager built using Next.js (App Router), Supabase, and Tailwind CSS.

Deployed on Vercel with Google OAuth authentication and real-time database updates.

---

## 📌 Project Overview

The Smart Bookmark App allows users to:

- Sign up and log in using Google OAuth
- Add bookmarks (URL + title)
- View only their own private bookmarks
- See real-time updates across multiple tabs
- Delete their own bookmarks
- Access the live deployed version on Vercel

This project demonstrates authentication, database design, real-time subscriptions, secure access control, and cloud deployment.

---

## 🎯 Task Requirements Covered

✅ Google OAuth login (No email/password)  
✅ Add bookmark (URL + title)  
✅ Private bookmarks per user  
✅ Real-time updates (multi-tab sync)  
✅ Delete own bookmarks  
✅ Deployed on Vercel  

---

## 🧠 Architecture

User (Browser)
⬇
Next.js Frontend (App Router)
⬇
Supabase Auth (Google OAuth)
⬇
Supabase PostgreSQL Database
⬇
Supabase Realtime Subscriptions

---

## ⚙️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend & Auth
- Supabase Auth (Google OAuth)
- Supabase Database (PostgreSQL)
- Supabase Realtime

### Deployment
- Vercel

---

## 🗂 Database Design

Table: `bookmarks`

| Column      | Type        |
|------------|------------|
| id         | uuid (PK)  |
| user_id    | uuid (FK)  |
| title      | text       |
| url        | text       |
| created_at | timestamp  |

Row Level Security (RLS) enabled.

Policies ensure:

- Users can only read their own bookmarks
- Users can only insert their own bookmarks
- Users can only delete their own bookmarks

---

## 🔥 Challenges Faced & Solutions

### 1️⃣ Google OAuth Configuration

**Problem:**  
Setting up Google OAuth with Supabase and Vercel required correct redirect URLs and environment configuration.

**Solution:**  
- Configured Google Cloud OAuth credentials
- Added Supabase Auth callback URLs
- Set Vercel production URLs properly
- Verified redirect URI consistency

---

### 2️⃣ Private Bookmarks Per User

**Problem:**  
Ensuring User A cannot access User B’s bookmarks.

**Solution:**  
- Enabled Row Level Security (RLS)
- Created policies using `auth.uid() = user_id`
- Filtered queries using session user ID

---

### 3️⃣ Real-Time Updates Across Tabs

**Problem:**  
Bookmark list needed to update automatically without page refresh.

**Solution:**  
- Used Supabase Realtime subscriptions
- Subscribed to INSERT and DELETE events
- Updated UI state dynamically when events triggered

---

### 4️⃣ Secure Access Control

**Problem:**  
Preventing unauthorized access to protected pages.

**Solution:**  
- Checked Supabase session on load
- Redirected unauthenticated users to login
- Used middleware protection where required

---

### 5️⃣ Environment Variable Handling in Production

**Problem:**  
App worked locally but failed after deployment.

**Solution:**  
- Added environment variables in Vercel dashboard
- Used `.env.local` for development
- Verified Supabase keys were properly set

---

## 📦 Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd smart-bookmark-app
2️⃣ Install Dependencies
npm install

3️⃣ Add Environment Variables

Create .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

4️⃣ Run Development Server
npm run dev


Open:

http://localhost:3000