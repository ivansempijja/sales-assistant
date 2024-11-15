
---

### **Sales Assistant Backend README**

# Sales Assistant Backend

This is the backend for the AI Sales Assistant platform, built with Laravel. It provides the necessary API to interact with the frontend, manage leads, and handle follow-ups.

### Features

- **Lead Management**: Create, update, and view leads.
- **Follow-up Scheduling**: Create, update, and view follow-up schedules.
- **Role-based Access Control**: Admin and user roles with different permissions.
- **Validation**: Input validation for API requests.
- **Events and Jobs**: Trigger events and jobs for processing follow-ups.

### Prerequisites

Before running the project locally, you need to have the following installed:

1. **PHP** (Version 8.1+)
2. **Composer** (For managing PHP dependencies)
3. **MySQLite** (or another supported database)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>

   composer install

   cp .env.example .env

   php artisan key:generate

   php artisan migrate

   php artisan db:seed

   php artisan serve

   php artisan queue:work to run MissedFollowUps scheduled job. it runs once daily
```

After running the seed, a user with 
```
username: test@example.com
password: 123456
role: Admin

username: test2@example.com
password: 123456
role: Sales Manager

username: test3@example.com
password: 123456
role: Sales Rep
```

will be created
go to /api/login to get bearer token.
use the bear token to authenticate other API routes