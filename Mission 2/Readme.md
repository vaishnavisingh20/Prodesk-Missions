# Budget Tracker Web App

A simple **Budget / Cash Flow Tracker** built using **HTML, CSS, and JavaScript**.  
This application allows users to track their salary, manage expenses, and view their remaining balance with automatic calculations and visual charts.

---

## Features

### Level 1 Requirements
- **Input Fields**
  - Total Salary (Number)
  - Expense Name (Text)
  - Expense Amount (Number)

- **Expense List**
  - Add expenses to a dynamic list
  - Display each expense with its amount

- **Automatic Calculation**
  - Remaining Balance = Total Salary - Total Expenses
  - Balance updates automatically when expenses are added

- **Validation**
  - Prevents adding expenses if fields are empty
  - Prevents negative expense amounts

---

### Level 2 Requirements

- **Data Persistence (LocalStorage)**
  - Salary and expenses are saved in the browser
  - Data remains even after refreshing the page

- **Delete Functionality**
  - Trash icon next to each expense
  - Clicking the icon removes the expense and updates the balance

- **Data Visualization**
  - Pie chart created using **Chart.js**
  - Shows comparison between:
    - Remaining Balance
    - Total Expenses

---

### Level 3 Requirements

- **PDF Export**
  - "Download Report" button
  - Generates a PDF file with salary, expenses list, and final balance using **jsPDF**

- **Currency Converter**
  - Dropdown to switch between currencies (Example: INR → USD)
  - Uses a free exchange rate API

- **Budget Alert**
  - If remaining balance falls below **10% of the salary**
  - Balance text turns **red**
  - Warning message appears

---

## Technologies Used

- **HTML5** – Application structure
- **CSS3** – Layout and styling
- **JavaScript (Vanilla JS)** – Application logic
- **LocalStorage** – Data persistence
- **Chart.js** – Data visualization
- **jsPDF** – PDF report generation
- **Exchange Rate API** – Currency conversion

---

## Project Structure
- budgettracker.html
- Readme.md
- Prompts.md

---

## 
---

## How to Run the Project

1. Clone the repository

```bash
git clone https://github.com/your-username/budget-tracker.git
```
2. Open the project folder

3. Open budgettracker.html in your browser

---

## Example Calculation

If:
Salary = ₹50,000
Total Expenses = ₹20,000
Then:
Remaining Balance = 50,000 - 20,000
Remaining Balance = 30,000
The chart will show:
- Expenses portion
- Remaining balance portion

---

## Screenshots
<img width="1887" height="862" alt="image" src="https://github.com/user-attachments/assets/18d39f99-477b-486d-ad15-44557a549774" />
