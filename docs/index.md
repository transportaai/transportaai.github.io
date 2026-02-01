---
layout: home
title: Home
nav_order: 1
---

<h1 style="text-align:center;">
<strong>Transport Analytics & Insights</strong>
</h1>


### 🤖 <a href="transitmate_chatbot/" style="color: inherit; text-decoration: none;">TransitMate - AI-Powered TransLink Service Update Chatbot</a>
{: .mb-1}

TransLink \| Service Disruptions \| LLM \| RAG \| Conversational AI \| Real-Time Updates
{: .text-grey-dk-000 .fs-3 .mb-2}

<details markdown="block">
  <summary>Click to expand summary</summary>

>An intelligent conversational AI system that delivers **real-time, context-aware responses** to natural language queries about TransLink service disruptions, track closures, and stop impacts using Retrieval-Augmented Generation (RAG).
>{: .text-grey-dk-300 .fs-3 }
>**Key Features:** 
>{: .text-black-dk-300 .fs-3 }
>- 🔍 **Rapid Information Retrieval**: Query current service impacts instantly without manual web navigation
>- 🧠 **Intelligent Context Understanding**: Comprehends relationships between routes, locations, and time-sensitive events
>- 📊 **Automated Extraction**: Parses unstructured transit notices into actionable summaries automatically
>- 🎯 **Hybrid Search Strategy**: Combines semantic embeddings with keyword matching for high-precision route and stop identification
>- ⚡ **Real-Time Monitoring**: Continuously ingests official TransLink RSS feeds and enriches data with structured metadata
{: .text-grey-dk-300 .fs-3 }

</details>

> [View Project Details →](transitmate_chatbot/){: .btn .btn-blue}
> [View Code Repository →](https://github.com/sanjeevbhurtyal/Translink_Service_Update_RAG_Chatbot){: .btn .btn-outline target="_blank"}

---

### 🚇 <a href="brisbane_connectivity/" style="color: inherit; text-decoration: none;">Mapping Connectivity Across Brisbane: What GTFS Reveals</a>
{: .mb-1}

GTFS \| Geospatial Analysis \| Public Transport Analytics \| Brisbane City \| Accessibility Analysis
{: .text-grey-dk-000 .fs-3 .mb-2}

<details markdown="block">
  <summary>Click to expand summary</summary>

>Analyzing **244 direct suburb connections** to Brisbane City using GTFS data (January 12-18, 2026) to reveal how efficiently residents can reach the city center across different modes and time periods.
>{: .text-grey-dk-300 .fs-3 }
>**Key Findings:** 
>{: .text-black-dk-300 .fs-3 }
>- 🚌 **Modal redundancy is limited**: 53% of suburbs rely exclusively on bus and 26% solely on train—only 16% have both modes
>- ⛴️ **Ferry delivers fastest median times** (23 minutes) but serves only 13 waterfront suburbs
>- ⏱️ **Only 31% of suburbs meet the "30-minute city" threshold**—just 28% for bus, 39% for train, and 77% for ferry serving suburbs
>- 📉 **Weekend service drops disproportionately**: 24% fewer bus-only suburbs served vs. 9% for train-only suburbs
>- 🎯 **Network quality is polarized**: 40% enjoy fast and frequent service while 37% face slow and infrequent connections
>- 🚄 **Rail outperforms bus where both exist**: median advantage of 15 minutes or less, with northern suburbs showing up to 30 minutes faster rail travel
{: .text-grey-dk-300 .fs-3 }

</details>

> [Read Full Analysis →](brisbane_connectivity/){: .btn .btn-blue}
> [View Dashboard →](https://public.tableau.com/app/profile/sanjeev.bhurtyal2011/viz/SEQSuburbTransitMetrics/Dashboard){: .btn .btn-outline target="_blank"}
> [View Code Repository →](https://github.com/sanjeevbhurtyal/SEQ_Suburb_Transit_Metrics){: .btn .btn-outline target="_blank"}

---

### 🚆 <a href="translink-od/" style="color: inherit; text-decoration: none;">Translink Origin-Destination Analysis</a>
{: .mb-1}

Translink \| Patronage \| Public Transport \| Data Visualization \| Python
{: .text-grey-dk-000 .fs-3 .mb-2}

<details markdown="block">
  <summary>Click to expand summary</summary>

>Analyzing **470 million trips** across TransLink's network (2022-2025) to uncover travel patterns, mode preferences, and payment trends.
>{: .text-grey-dk-300 .fs-3 }
>**Key Findings:** 
>{: .text-black-dk-300 .fs-3 }
>- 🚌 **Bus dominates with 62% mode share** in 2025 (64% growth since 2022)
>- ⛴️ **Ferry** shows explosive 172% growth from small 4% base in 2025
>- 💳 **EMV adoption surged to 30%+ within six months** since April 2025, with ferries leading at >50%.
>- 📍 **Brisbane CBD dominates all top origin-destination pairs**, confirming monocentric economy. 
>- 📍 **Corridors like St. Lucia and Woolloongabba** rely almost entirely on buses, creating vulnerability during disruptions.
>- **Growth is spatially uneven**: Springfield Central and Bowen Hills grew 35%+ while Donnan and Riverbend declined 80%, requiring targeted intervention.
{: .text-grey-dk-300 .fs-3 }

</details>

> [Read Full Analysis →](translink-od/){: .btn .btn-blue }
> [View Dashboard →](https://public.tableau.com/app/profile/sanjeev.bhurtyal2011/viz/TranslinkPatronageAnlaysis/SuburbProfile){: .btn .btn-outline target="_blank"}
> [View Code Repository →](https://github.com/sanjeevbhurtyal/Translink_OD_Trip_Analysis){: .btn .btn-outline target="_blank"}

---

### 🤖 <a href="feature_engineering_impact_analysis/" style="color: inherit; text-decoration: none;">Feature Engineering Impact Analysis</a>
{: .mb-1}

Machine Learning \| Time Series Forecasting \| Feature Engineering \| Python
{: .text-grey-dk-000 .fs-3 .mb-2}

<details markdown="block">
  <summary>Click to expand summary</summary>
  
>This analysis demonstrates the critical importance of feature engineering in machine learning through a controlled experiment using London bike sharing demand forecasting.
>{: .text-grey-dk-300 .fs-3 }
>
>**Key Findings:**
>{: .text-grey-dk-300 .fs-3 }
>- 🎯 Well-engineered features improved all four models (SARIMAX, XGBoost, LSTM, Prophet) by 5-22% across metrics
>- 📈 LSTM showed highest sensitivity (22% improvement); complex models benefit most from rich features
>- ⚠️ Naive daily aggregation destroyed temporal patterns; time-of-day segmentation preserved critical information
>- 🏆 Prophet achieved best performance, but universal improvement proves feature engineering is foundational
{: .text-grey-dk-300 .fs-3 }

</details>

> [Read Full Analysis →](feature_engineering_impact_analysis/){: .btn .btn-blue }
> [View Code Repository →](https://github.com/sanjeevbhurtyal/London-Bike-Sharing-Forecaset-Python-ML){: .btn .btn-outline target="_blank"}

---

{% include about_me.md %}
{% include get-in-touch.html %}