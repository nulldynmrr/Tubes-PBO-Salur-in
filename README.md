# Tubes-PBO-Salur-in
## Pemrograman Berbasis Objek IF-47-06

## Aplikasi Web Crowdfunding Salurin
Aplikasi pendanaan atau crowdfunding berbasis web yang menggunakan Next.js (frontend) dan Spring Boot (backend), dengan menerapkan Pemrograman Berbasis Objek (PBO) atau Object Oriented Programming (OOP) Java.

### Alat & Media
- GitHub - SOURCE CONTROL
- Spring Boot - BACKEND
- Next.js - FRONTEND
- MySql - DATABASE

### Role
- CampaignOwner as OWNER or ROLE_OWNER
- Admin as ADMIN OR ROLE_ADMIN
  
### Implementasi CRUD
(tidak sama dengan atribut dan method dalam aplikasi)
- C Register CampaignOwner
- C CreateCampaignProposal by CampaignOwner
- C CreateDonation by Donor (guest class)
- R LoginOwner CampaignOwner
- R LoginAdmin Admin
- R DisplayInfoFromDatabase
- U ApproveCampaign by Admin
- U RejectCampaign by Admin
- U Campaign Status = ONGOING -> COMPLETED if accumulated >= target
- D RemoveCampaign by Admin
- D RemoveCampaignOwner by Admin
