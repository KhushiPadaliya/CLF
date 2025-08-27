# CampusFind - Data Dictionary

**Project:** CampusFind - Lost & Found Platform for Campus Communities  
**Course:** Software Engineering  
**Students:** Khushi Padaliya (Founder & CEO), Apexa Patel (Co-Founder & CTO)  
**Database:** PostgreSQL  
**ORM:** Prisma  
**Date:** August 27, 2025

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Database Design Principles](#database-design-principles)
3. [Entity Relationship Overview](#entity-relationship-overview)
4. [Table Specifications](#table-specifications)
5. [Data Types and Constraints](#data-types-and-constraints)
6. [Relationships and Foreign Keys](#relationships-and-foreign-keys)
7. [Indexes and Performance](#indexes-and-performance)
8. [Security Considerations](#security-considerations)
9. [Business Rules](#business-rules)
10. [Sample Data](#sample-data)

---

## Project Overview

CampusFind is a web-based lost and found platform designed specifically for campus communities. The system allows students to report lost items, register found items, and communicate with each other to facilitate the return of lost belongings.

### Key Features

- User authentication and profile management
- Lost item reporting and tracking
- Found item registration and management
- Messaging system between users
- Search and filtering capabilities
- Campus-specific item categorization

---

## Database Design Principles

The database follows these software engineering principles:

1. **Normalization**: Designed in 3NF to eliminate data redundancy
2. **ACID Compliance**: Ensures data integrity and consistency
3. **Scalability**: Designed to handle growing user base and data volume
4. **Security**: Implements proper authentication and authorization
5. **Performance**: Optimized with appropriate indexes and relationships
6. **Maintainability**: Clear structure with meaningful names and documentation

---

## Entity Relationship Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    User     │         │  LostItem   │         │ FoundItem   │
│             │────────▶│             │         │             │
│ id (PK)     │  1:N    │ id (PK)     │         │ id (PK)     │
│ email       │         │ userId (FK) │         │ userId (FK) │
│ fullName    │         │ title       │         │ title       │
│ studentId   │         │ description │         │ description │
│ phone       │         │ category    │         │ category    │
│ password    │         │ location    │         │ location    │
│ isActive    │         │ dateLost    │         │ dateFound   │
│ createdAt   │         │ imageUrl    │         │ imageUrl    │
│ updatedAt   │         │ isResolved  │         │ isReturned  │
└─────────────┘         │ createdAt   │         │ createdAt   │
       │                │ updatedAt   │         │ updatedAt   │
       │                └─────────────┘         └─────────────┘
       │                       │                       │
       │                       │ 1:N                   │ 1:N
       │                       ▼                       ▼
       │                ┌─────────────┐◀───────────────┘
       └───────────────▶│   Message   │
                 1:N    │             │
                        │ id (PK)     │
                        │ userId (FK) │
                        │ content     │
                        │ itemType    │
                        │ lostItemId  │
                        │ foundItemId │
                        │ createdAt   │
                        └─────────────┘
```

---

## Table Specifications

### 1. **users** Table

**Purpose:** Stores user authentication data and profile information for students and staff members.

| Column Name | Data Type     | Length | Constraints           | Default | Description                              |
| ----------- | ------------- | ------ | --------------------- | ------- | ---------------------------------------- |
| id          | String (CUID) | 25     | PRIMARY KEY, NOT NULL | cuid()  | Unique identifier for each user          |
| email       | String        | 255    | UNIQUE, NOT NULL      | -       | User's email address (login credential)  |
| fullName    | String        | 100    | NOT NULL              | -       | User's complete name                     |
| studentId   | String        | 20     | UNIQUE, NULL          | NULL    | University student identification number |
| phone       | String        | 15     | NULL                  | NULL    | User's contact phone number              |
| password    | String        | 255    | NOT NULL              | -       | Hashed password using bcrypt             |
| isActive    | Boolean       | 1      | NOT NULL              | true    | Account status (active/inactive)         |
| createdAt   | DateTime      | -      | NOT NULL              | now()   | Timestamp when account was created       |
| updatedAt   | DateTime      | -      | NOT NULL              | now()   | Timestamp when account was last updated  |

**Business Rules:**

- Email must be unique across the system
- Student ID must be unique if provided (optional for staff)
- Password must be hashed before storage
- Default status is active for new accounts
- Email format validation required at application level

---

### 2. **lost_items** Table

**Purpose:** Stores information about items that users have lost and want to recover.

| Column Name | Data Type     | Length | Constraints           | Default | Description                                        |
| ----------- | ------------- | ------ | --------------------- | ------- | -------------------------------------------------- |
| id          | String (CUID) | 25     | PRIMARY KEY, NOT NULL | cuid()  | Unique identifier for each lost item               |
| title       | String        | 100    | NOT NULL              | -       | Brief title/name of the lost item                  |
| description | String        | 1000   | NOT NULL              | -       | Detailed description of the item                   |
| category    | String        | 50     | NOT NULL              | -       | Item category (electronics, books, clothing, etc.) |
| location    | String        | 200    | NOT NULL              | -       | Location where item was last seen/lost             |
| dateLost    | DateTime      | -      | NOT NULL              | -       | Date and time when item was lost                   |
| imageUrl    | String        | 500    | NULL                  | NULL    | URL to image of the lost item                      |
| isResolved  | Boolean       | 1      | NOT NULL              | false   | Whether the item has been found/returned           |
| userId      | String (CUID) | 25     | FOREIGN KEY, NOT NULL | -       | References users.id (who lost the item)            |
| createdAt   | DateTime      | -      | NOT NULL              | now()   | Timestamp when record was created                  |
| updatedAt   | DateTime      | -      | NOT NULL              | now()   | Timestamp when record was last updated             |

**Business Rules:**

- Each lost item must be associated with a user
- Date lost cannot be in the future
- Categories should be standardized (controlled vocabulary)
- Image URL should be validated for proper format
- Resolved items remain in database for history

---

### 3. **found_items** Table

**Purpose:** Stores information about items that users have found and want to return to owners.

| Column Name | Data Type     | Length | Constraints           | Default | Description                                        |
| ----------- | ------------- | ------ | --------------------- | ------- | -------------------------------------------------- |
| id          | String (CUID) | 25     | PRIMARY KEY, NOT NULL | cuid()  | Unique identifier for each found item              |
| title       | String        | 100    | NOT NULL              | -       | Brief title/name of the found item                 |
| description | String        | 1000   | NOT NULL              | -       | Detailed description of the item                   |
| category    | String        | 50     | NOT NULL              | -       | Item category (electronics, books, clothing, etc.) |
| location    | String        | 200    | NOT NULL              | -       | Location where item was found                      |
| dateFound   | DateTime      | -      | NOT NULL              | -       | Date and time when item was found                  |
| imageUrl    | String        | 500    | NULL                  | NULL    | URL to image of the found item                     |
| isReturned  | Boolean       | 1      | NOT NULL              | false   | Whether the item has been returned to owner        |
| userId      | String (CUID) | 25     | FOREIGN KEY, NOT NULL | -       | References users.id (who found the item)           |
| createdAt   | DateTime      | -      | NOT NULL              | now()   | Timestamp when record was created                  |
| updatedAt   | DateTime      | -      | NOT NULL              | now()   | Timestamp when record was last updated             |

**Business Rules:**

- Each found item must be associated with a user
- Date found cannot be in the future
- Categories should match lost_items categories for consistency
- Returned items remain in database for history tracking
- Image URL validation required

---

### 4. **messages** Table

**Purpose:** Stores communication messages between users regarding lost or found items.

| Column Name | Data Type     | Length | Constraints           | Default | Description                                   |
| ----------- | ------------- | ------ | --------------------- | ------- | --------------------------------------------- |
| id          | String (CUID) | 25     | PRIMARY KEY, NOT NULL | cuid()  | Unique identifier for each message            |
| content     | String        | 2000   | NOT NULL              | -       | Message content/text                          |
| userId      | String (CUID) | 25     | FOREIGN KEY, NOT NULL | -       | References users.id (message sender)          |
| itemType    | String        | 10     | NOT NULL              | -       | Type of item: "lost" or "found"               |
| lostItemId  | String (CUID) | 25     | FOREIGN KEY, NULL     | NULL    | References lost_items.id if about lost item   |
| foundItemId | String (CUID) | 25     | FOREIGN KEY, NULL     | NULL    | References found_items.id if about found item |
| createdAt   | DateTime      | -      | NOT NULL              | now()   | Timestamp when message was sent               |

**Business Rules:**

- Each message must be associated with a user (sender)
- Either lostItemId OR foundItemId must be provided (not both)
- itemType must match the type of item referenced
- Messages cannot be edited once sent (audit trail)
- Content must not be empty

---

## Data Types and Constraints

### String (CUID)

- **Purpose:** Collision-resistant unique identifier
- **Format:** 25-character string (e.g., "ckm1h1j2k0000qzqz0q1q2q3q")
- **Advantages:** URL-safe, sortable, globally unique

### String (VARCHAR)

- **Usage:** Text fields with variable length
- **Encoding:** UTF-8 to support international characters
- **Indexing:** Appropriate fields indexed for search performance

### DateTime

- **Format:** ISO 8601 timestamp with timezone
- **Storage:** UTC in database, converted to local time in application
- **Precision:** Millisecond precision

### Boolean

- **Storage:** Single bit (true/false)
- **Default Values:** Specified for business logic requirements

---

## Relationships and Foreign Keys

### 1. User to LostItem (One-to-Many)

```sql
CONSTRAINT fk_lost_items_user
FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
```

### 2. User to FoundItem (One-to-Many)

```sql
CONSTRAINT fk_found_items_user
FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
```

### 3. User to Message (One-to-Many)

```sql
CONSTRAINT fk_messages_user
FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
```

### 4. LostItem to Message (One-to-Many)

```sql
CONSTRAINT fk_messages_lost_item
FOREIGN KEY (lostItemId) REFERENCES lost_items(id) ON DELETE CASCADE
```

### 5. FoundItem to Message (One-to-Many)

```sql
CONSTRAINT fk_messages_found_item
FOREIGN KEY (foundItemId) REFERENCES found_items(id) ON DELETE CASCADE
```

**Cascade Rules:**

- **ON DELETE CASCADE:** When a user is deleted, all related items and messages are deleted
- **ON UPDATE CASCADE:** Primary key updates cascade to foreign keys

---

## Indexes and Performance

### Primary Indexes (Automatic)

- `users.id`
- `lost_items.id`
- `found_items.id`
- `messages.id`

### Unique Indexes

- `users.email` - For login performance
- `users.studentId` - For student lookup

### Recommended Additional Indexes

```sql
-- Search and filtering performance
CREATE INDEX idx_lost_items_category ON lost_items(category);
CREATE INDEX idx_lost_items_location ON lost_items(location);
CREATE INDEX idx_lost_items_date_lost ON lost_items(dateLost);
CREATE INDEX idx_lost_items_resolved ON lost_items(isResolved);

CREATE INDEX idx_found_items_category ON found_items(category);
CREATE INDEX idx_found_items_location ON found_items(location);
CREATE INDEX idx_found_items_date_found ON found_items(dateFound);
CREATE INDEX idx_found_items_returned ON found_items(isReturned);

-- Message retrieval performance
CREATE INDEX idx_messages_item_type ON messages(itemType);
CREATE INDEX idx_messages_created_at ON messages(createdAt);

-- Composite indexes for common queries
CREATE INDEX idx_lost_items_user_resolved ON lost_items(userId, isResolved);
CREATE INDEX idx_found_items_user_returned ON found_items(userId, isReturned);
```

---

## Security Considerations

### 1. **Password Security**

- Passwords hashed using bcrypt with salt rounds ≥ 12
- No plain text passwords stored
- Password strength validation at application level

### 2. **Data Access Control**

- Users can only access their own items and messages
- Admin roles for system management
- API authentication using JWT tokens

### 3. **Data Validation**

- Input sanitization to prevent SQL injection
- XSS protection for user-generated content
- File upload validation for images

### 4. **Privacy Protection**

- Email addresses not exposed in public APIs
- Phone numbers optional and private
- User consent for data processing

---

## Business Rules

### User Management

1. Email addresses must be unique across the system
2. Student IDs must be unique if provided
3. Users can update their profile information
4. Inactive users cannot post new items or messages
5. Account deletion removes all associated data

### Item Management

1. Users can only edit their own lost/found items
2. Items cannot be deleted once messages exist
3. Resolved/returned items remain visible for history
4. Items older than 60 days may be archived
5. Maximum 10 active items per user

### Messaging System

1. Users can message about items they didn't post
2. Messages cannot be edited or deleted
3. Spam detection and reporting mechanism
4. Message thread organization by item
5. Automatic notifications for new messages

### Data Retention

1. User accounts: Retained until user deletion
2. Items: Archived after 60 days of inactivity
3. Messages: Retained for audit trail
4. Images: Cleaned up when items are archived
5. Logs: Retained for 12 months

---

## Sample Data

### Users Table

```sql
INSERT INTO users (id, email, fullName, studentId, phone, password, isActive) VALUES
('ckm1h1j2k0000qzqz0q1q2q3q', 'khushi@university.edu', 'Khushi Padaliya', 'STU2021001', '+1234567890', '$2b$12$...', true),
('ckm1h1j2k0001qzqz0q1q2q3r', 'apexa@university.edu', 'Apexa Patel', 'STU2021002', '+1234567891', '$2b$12$...', true),
('ckm1h1j2k0002qzqz0q1q2q3s', 'john@university.edu', 'John Doe', 'STU2021003', NULL, '$2b$12$...', true);
```

### Lost Items Table

```sql
INSERT INTO lost_items (id, title, description, category, location, dateLost, userId, isResolved) VALUES
('ckm1h1j2k0003qzqz0q1q2q3t', 'iPhone 13 Pro Max', 'Blue iPhone 13 Pro Max with clear case', 'Electronics', 'Library 2nd Floor', '2025-08-26 14:30:00', 'ckm1h1j2k0000qzqz0q1q2q3q', false),
('ckm1h1j2k0004qzqz0q1q2q3u', 'Black Backpack', 'Nike black backpack with laptop compartment', 'Bags', 'Student Center', '2025-08-25 16:45:00', 'ckm1h1j2k0001qzqz0q1q2q3r', false);
```

### Found Items Table

```sql
INSERT INTO found_items (id, title, description, category, location, dateFound, userId, isReturned) VALUES
('ckm1h1j2k0005qzqz0q1q2q3v', 'Car Keys', 'Toyota keys with red keychain', 'Keys', 'Parking Lot B', '2025-08-27 09:15:00', 'ckm1h1j2k0002qzqz0q1q2q3s', false),
('ckm1h1j2k0006qzqz0q1q2q3w', 'Physics Textbook', 'University Physics 15th Edition', 'Books', 'Room 204', '2025-08-26 11:20:00', 'ckm1h1j2k0000qzqz0q1q2q3q', false);
```

### Messages Table

```sql
INSERT INTO messages (id, content, userId, itemType, lostItemId, foundItemId) VALUES
('ckm1h1j2k0007qzqz0q1q2q3x', 'Hi! I think I found your iPhone. Can you describe the case?', 'ckm1h1j2k0002qzqz0q1q2q3s', 'lost', 'ckm1h1j2k0003qzqz0q1q2q3t', NULL),
('ckm1h1j2k0008qzqz0q1q2q3y', 'The case is clear with a small crack on the bottom corner.', 'ckm1h1j2k0000qzqz0q1q2q3q', 'lost', 'ckm1h1j2k0003qzqz0q1q2q3t', NULL);
```

---

## Version History

| Version | Date       | Changes                                   | Author                       |
| ------- | ---------- | ----------------------------------------- | ---------------------------- |
| 1.0     | 2025-08-27 | Initial database design and documentation | Khushi Padaliya, Apexa Patel |

---

**Document Status:** Active  
**Review Cycle:** Quarterly  
**Last Updated:** August 27, 2025

---

_This data dictionary serves as the authoritative source for database structure and business rules for the CampusFind project. All development and maintenance activities should reference this document for consistency and compliance._
