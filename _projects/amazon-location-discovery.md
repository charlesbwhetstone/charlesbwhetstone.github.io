---
title: "Amazon Archaeological Site Discovery"
excerpt: "Reproducible, end-to-end workflow for Amazon archaeological site discovery using open-access geospatial and literature data."
date: 2024-01-20
header:
  teaser: /assets/images/amazon-location-thumb.jpg
  overlay_image: /assets/images/amazon-archaeology-banner.jpg
  overlay_filter: 0.4
  actions:
    - label: "View on GitHub"
      url: "https://github.com/charlesbwhetstone/amazon-location-discovery"
    - label: "Open in Kaggle"
      url: "https://www.kaggle.com/code/charlesbwhetstone/amazon-location-discovery"
sidebar:
  - title: "Technologies"
    text: "Python, Geospatial Analysis, DBSCAN, Remote Sensing"
  - title: "Data Sources"
    text: "Landsat, SRTM, MODIS, HydroRIVERS"
  - title: "Type"
    text: "Archaeological Research, Data Science"
gallery:
  - url: /assets/images/amazon-discovery-1.jpg
    image_path: /assets/images/amazon-discovery-1-th.jpg
    alt: "NDVI anomaly detection"
  - url: /assets/images/amazon-discovery-2.jpg
    image_path: /assets/images/amazon-discovery-2-th.jpg
    alt: "Elevation and slope analysis"
  - url: /assets/images/amazon-discovery-3.jpg
    image_path: /assets/images/amazon-discovery-3-th.jpg
    alt: "Archaeological site clustering"
---

## Project Overview

A **comprehensive geospatial analysis workflow** that combines multiple open-access datasets to systematically identify potential archaeological sites in the Amazon rainforest. This project demonstrates how modern data science techniques can support archaeological research and cultural heritage preservation.

[![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/charlesbwhetstone/amazon-location-discovery)

## Scientific Approach

### **Multi-Source Data Integration**
- **Landsat imagery** for NDVI anomaly detection
- **SRTM elevation data** for topographical analysis
- **MODIS land cover** for vegetation classification
- **HydroRIVERS** for water proximity analysis

### 🔍 **Advanced Detection Methods**
- **NDVI anomaly detection** identifying vegetation irregularities
- **Topographical analysis** using elevation and slope data
- **DBSCAN clustering** for site aggregation and pattern recognition
- **Multi-parameter correlation** for enhanced accuracy

### **Reproducible Workflow**
- **End-to-end automation** from data acquisition to results
- **Open-access datasets** ensuring reproducibility
- **Documented methodology** for scientific validation
- **Scalable architecture** for different regions

## Key Features

### **Comprehensive Geospatial Analysis**
- **Vegetation anomaly detection** using normalized difference vegetation index
- **Terrain analysis** incorporating elevation, slope, and aspect
- **Land cover classification** for environmental context
- **Hydrological proximity** analysis for settlement patterns

### 🤖 **Machine Learning Integration**
- **DBSCAN clustering** for automated site identification
- **Feature correlation** analysis for pattern discovery
- **Statistical validation** of detected anomalies
- **Parameter optimization** for regional adaptation

### **Scientific Methodology**
- **Literature mining** integration for known site validation
- **Statistical significance** testing for all findings
- **Peer-reviewable methods** with complete documentation
- **Reproducible results** across different environments

## Technical Implementation

**Core Technologies:**
- **Python:** Primary programming language
- **Geospatial Libraries:** GDAL, Rasterio, Geopandas
- **Machine Learning:** Scikit-learn, NumPy, SciPy
- **Visualization:** Matplotlib, Folium, Plotly

**Data Processing Pipeline:**
1. **Data Acquisition** → Download and preprocess satellite imagery
2. **Feature Extraction** → Calculate NDVI, elevation, slope metrics
3. **Anomaly Detection** → Identify unusual patterns in vegetation/terrain
4. **Clustering Analysis** → Group related anomalies into potential sites
5. **Validation** → Cross-reference with existing archaeological literature

## Repository Structure

```
amazon-location-discovery/
├── amazon-location-discovery.ipynb  # Main analysis notebook
├── data/                            # Local data directory
├── scripts/                         # Helper utilities
│   ├── make_sample_data.py         # Generate test datasets
│   └── verify_paths.py              # Path validation
├── requirements.txt                 # Python dependencies
├── README.md                        # Documentation
└── LICENSE                          # Open source license
```

## Scientific Contributions

### **Methodological Innovation**
- **Open-access approach** democratizing archaeological research
- **Automated detection** reducing manual survey costs
- **Multi-parameter analysis** improving detection accuracy
- **Reproducible framework** enabling collaborative research

### 🌿 **Archaeological Impact**
- **Site preservation** through early identification
- **Cultural heritage** protection in threatened regions
- **Research acceleration** with systematic methodologies
- **Community engagement** through accessible tools

### **Data Science Advancement**
- **Geospatial ML** applications for cultural heritage
- **Remote sensing** techniques for archaeological purposes
- **Big data approaches** to historical landscape analysis
- **Open science** practices in archaeological research

## Getting Started

### **Quick Start (Kaggle)**
1. **Open in Kaggle** using the badge above
2. **Enable GPU acceleration** (optional, for faster processing)
3. **Run all cells** sequentially
4. **Explore results** with interactive visualizations
5. **Customize parameters** for different regions

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/charlesbwhetstone/amazon-location-discovery.git
cd amazon-location-discovery

# Set up environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create sample data for testing
python scripts/make_sample_data.py

# Launch notebook
jupyter notebook amazon-location-discovery.ipynb
```

<!-- Gallery functionality not available in current theme -->

## Research Applications

### **Archaeological Research**
- **Systematic surveys** of large geographical areas
- **Predictive modeling** for archaeological site locations
- **Cultural landscape** analysis and interpretation
- **Heritage site** monitoring and protection

### **Environmental Science**
- **Land use change** detection and analysis
- **Deforestation monitoring** in sensitive regions
- **Biodiversity assessment** using remote sensing
- **Climate impact** studies on archaeological sites

### **Educational Impact**
- **STEM education** through real-world applications
- **Research methodology** training for students
- **Interdisciplinary collaboration** between archaeology and data science
- **Open science** practices demonstration

## Future Development

### **Planned Enhancements**
- **Deep learning integration** for pattern recognition
- **Temporal analysis** using multi-year satellite data
- **Ground truth validation** with field survey integration
- **Real-time monitoring** systems for site protection

### **Collaboration Opportunities**
- **Archaeological institutions** for method validation
- **Conservation organizations** for site protection
- **Educational institutions** for research training
- **Open source community** for tool development

## Impact & Recognition

This project demonstrates how **data science can serve archaeology** and cultural heritage preservation, providing tools that are:
- **Accessible** to researchers regardless of technical background
- **Scalable** to different geographical regions and research questions
- **Reproducible** following open science best practices
- **Impactful** for real-world archaeological research and conservation

[ Explore in Kaggle](https://www.kaggle.com/code/charlesbwhetstone/amazon-location-discovery){: .btn .btn--primary}
[ View Repository](https://github.com/charlesbwhetstone/amazon-location-discovery){: .btn .btn--info}
[ Read Documentation](https://github.com/charlesbwhetstone/amazon-location-discovery/blob/main/README.md){: .btn .btn--success}