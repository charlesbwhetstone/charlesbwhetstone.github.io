---
title: "Employee Attrition Prediction - Electric Crust Pizza"
excerpt: "End-to-end machine learning workflow using CRISP-DM methodology to predict employee attrition for a farm-to-table pizza company."
date: 2024-01-15
header:
  teaser: /assets/images/employee-attrition-thumb.jpg
  overlay_image: /assets/images/employee-attrition-banner.jpg
  overlay_filter: 0.3
  actions:
    - label: "View on GitHub"
      url: "https://github.com/charlesbwhetstone/Employee-Attrition"
    - label: "Live Report"
      url: "https://charlesbwhetstone.github.io/Employee-Attrition/report.html"
    - label: "Open in Kaggle"
      url: "https://www.kaggle.com/code/charlesbwhetstone/electric-crust-case-study-employee-attrition/edit/run/189223159"
sidebar:
  - title: "Technologies"
    text: "R, Machine Learning, CRISP-DM, Statistical Analysis"
  - title: "Industry"
    text: "Human Resources, Predictive Analytics"
  - title: "Status"
    text: "Production Ready"
gallery:
  - url: /assets/images/employee-attrition-1.jpg
    image_path: /assets/images/employee-attrition-1-th.jpg
    alt: "Data exploration dashboard"
  - url: /assets/images/employee-attrition-2.jpg
    image_path: /assets/images/employee-attrition-2-th.jpg
    alt: "Model performance metrics"
---

## Project Overview

**Electric Crust** is a vertically integrated, farm-to-table pizza company that has been pioneering the pizza industry since 1984. This project implements a comprehensive machine learning solution to predict employee attrition using the **CRISP-DM methodology**, helping HR identify at-risk employees and implement targeted retention strategies.

[![R CI](https://github.com/charlesbwhetstone/Employee-Attrition/actions/workflows/r-ci.yml/badge.svg)](https://github.com/charlesbwhetstone/Employee-Attrition/actions/workflows/r-ci.yml)
[![Build report](https://github.com/charlesbwhetstone/Employee-Attrition/actions/workflows/report-build.yml/badge.svg)](https://github.com/charlesbwhetstone/Employee-Attrition/actions/workflows/report-build.yml)

## The Business Challenge

Electric Crust faced significant challenges with employee retention, experiencing higher-than-average attrition rates that were impacting:
- **Knowledge retention** across departments
- **Productivity** and operational efficiency  
- **Costs** associated with recruitment and training

The goal was to build a predictive model that could identify employees at risk of leaving and provide actionable insights for HR teams.

## Key Features

### **CRISP-DM Methodology**
- Structured approach from business understanding through deployment
- Reproducible workflow with clear documentation
- Business-focused insights and recommendations

### **Comprehensive Analysis**
- Exploratory data analysis revealing key attrition drivers
- Feature engineering and selection
- Statistical modeling with multiple algorithms

### **Production-Ready Deployment**
- Automated CI/CD pipeline with GitHub Actions
- Live report generation and hosting
- Reproducible R environment with renv

### **Business Impact**
- Identification of high-risk employee segments
- Actionable retention strategies
- Cost reduction through proactive intervention

## Technical Implementation

**Languages & Tools:** R, renv, GitHub Actions, Kaggle  
**Key Libraries:** tidyverse, caret, randomForest, glmnet  
**Methodology:** CRISP-DM framework  
**Deployment:** Automated report generation with continuous integration

## Repository Structure

```
Employee-Attrition/
├── R/              # Reusable functions and modeling scripts
├── scripts/        # Command-line utilities and data processing
├── notebooks/      # Kaggle notebook exports
├── configs/        # Configuration files and parameters  
├── docs/           # Documentation and visualizations
└── reports/        # Generated analysis reports
```

## Results & Impact

The project successfully delivered:
- **Predictive accuracy** enabling proactive retention efforts
- **Risk segmentation** identifying employees most likely to leave
- **Feature importance** revealing key drivers of attrition
- **Cost savings** through reduced turnover and recruitment costs

{% include gallery caption="Project visualization gallery showing data exploration and model results." %}

## Learn More

This project demonstrates the inspiration behind the **Electric Crust Pizza Delivery Game**, showcasing how data science insights can inform creative business solutions.

[ View Live Report](https://charlesbwhetstone.github.io/Employee-Attrition/report.html){: .btn .btn--primary}
[GitHub Repository](https://github.com/charlesbwhetstone/Employee-Attrition){: .btn .btn--info}
[ Open in Kaggle](https://www.kaggle.com/code/charlesbwhetstone/electric-crust-case-study-employee-attrition/edit/run/189223159){: .btn .btn--success}