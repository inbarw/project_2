# Web Performance & API Validation Automation Project

## Project Overview
Comprehensive QA automation project with two key components:
1. Website Performance Testing
2. API Data Validation

## Part 1: Website Performance Testing

### Prerequisites
- Node.js
- npm
- Playwright
- Lighthouse

### Installation
Navigate to task_1 folder
```bash
npm install @playwright/test playwright lighthouse chrome-launcher
npx playwright install
```

### Functionality
- Lighthouse performance audit
- Resource link validation
- Comprehensive reporting

### Execution
```bash
npx playwright test
```

### Validation Metrics
- Performance score
- SEO rating
- Accessibility score
- Best practices evaluation
- Broken resource detection

## Part 2: API Data Validation

### Prerequisites
- Python 3.8+
- pip
- requests library

### Installation
Navigate to task_2 folder
```bash
python3 -m venv venv
source venv/bin/activate
pip install requests
```

### Functionality
- Fetch posts from JSONPlaceholder API
- Validate post data
- Log validation results

### Execution
```bash
python3 api_validation.py
```

### Validation Criteria
- Non-empty title
- Non-empty body
- Numeric userId

### Logging 
Results are logged to api_validation_log.txt

