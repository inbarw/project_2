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
#### Run Specific Test:
  - For Lighthouse analysis:
    ```bash
    npm run test:lighthouse
    ```
  - For resource validation:
    ```bash
    npm run test:resources
    ```
#### Run All Tests:
  ```bash
  npm run test:all
  ```

### Validation Metrics
- Performance score
- SEO rating
- Accessibility score
- Best practices evaluation
- Broken resource detection

### Improvment
- Create a report directory and store json report files there.

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

### Improvments
1. #### Logger in a Separate File
   - Move the logger configuration to a separate module (logger.py) for better modularity.
2. #### Logs Directory
   - Create a logs directory and store log files there.
3. #### Separate File for API Methods
   - Extract the API-related methods (fetch_posts) into a separate file (api_methods.py).
4. #### Run test Separately
   - Add test functionality using a testing framework like pytest to validate the API responses and post validation logic.

