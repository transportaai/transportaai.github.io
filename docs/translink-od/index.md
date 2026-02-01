---
title: Translink Origin Destination Analysis
nav_enabled: true
nav_order: 4
---



<h1 style="text-align:center;">
Decoding Translink Origin Destination Patronage Data
</h1>

{: .no_toc}

<p align="center">
<strong>Sanjeev Bhurtyal</strong><br>
December 2025
</p>

<details open markdown="block">
  <summary>
Table of Contents
</summary>
- TOC
{:toc}
</details>

## Executive Summary
This analysis examines **470 million trips** across TransLink's bus, train, and ferry networks from January 2022 to October 2025. Monthly patronage surged 65.8% from 7.8 million to 13.0 million trips, revealing a public transport system experiencing rapid transformation.

**Key Findings:**
- 🚌 **Bus dominates with 62% mode share**  in 2025 (64% growth since 2022), reflecting Brisbane's extensive bus network serving dispersed urban form.
- 🚆 **Train captures 34% share** (60% growth since 2022) in 2025, serving major commuter corridors with growing ridership.
- ⛴️ **Ferry** shows explosive 172% growth from small 4% base in 2025, revealing untapped water transport potential.
- 💳 **EMV adoption surged to 30%+ within six months** since April 2025, with ferries leading at >50%. Go card's dominance is ending as contactless payments reshape user behavior.
- 📍 **Brisbane CBD dominates all top origin-destination pairs**, confirming monocentric economy. However, corridors like St. Lucia and Woolloongabba rely almost entirely on buses, creating vulnerability during disruptions.
- **Growth is spatially uneven**: Springfield Central and Bowen Hills grew 35%+ while Donnan and Riverbend declined 80%, requiring targeted intervention.

## 1. Introduction
### 1.1 Background
{: .no_toc}
TransLink operates Southeast Queensland's integrated public transport network serving Brisbane, Gold Coast, Sunshine Coast, and surrounding regions across three modes:

- **Buses**: Transport for Brisbane, Surfside Buslines, Clarks Logan City Bus Service, and regional operators
- **Trains**: Queensland Rail suburban network and Gold Coast Light Rail
- **Ferries**: TfB Ferries and SeaLink connecting riverside communities

**Why Origin-Destination Analysis Matters**
Understanding patronage data is fundamental to transport planning. Origin-Destination (OD) analysis reveals:

- **Where people travel**: Which localities generate demand and where do trips end?
- **Mode preferences**: How is demand distributed across bus, train, and ferry?
- **Payment trends**: How are riders transitioning from go card to EMV contactless payments?
- **Spatial growth patterns**: Which areas are experiencing patronage growth or decline?

This analysis examines these patterns across three years of TransLink data to inform network planning and service optimization.


## 2. Patronage Trends
### 2.1 Monthly Patronage Evolution
{: .no_toc}
<iframe src="assets/figures/monthly_trends.html" width="100%" height="500" style="border:none;"></iframe>
*Figure 2.1: Monthly public transport patronage trends across the TransLink network*

The data reveals remarkable growth in TransLink's patronage over the analysis period. Between January 2022 and October 2025, the network carried **470 million passenger trips**, with average monthly patronage increasing from 7.8 million to 13.0 million, a substantial **65.8% growth** representing an additional 5.1 million trips per month.

This upward trajectory demonstrates consistent ridership expansion, punctuated only by predictable seasonal variations. Each year shows reduced patronage during December and January, reflecting holiday travel patterns when commuter demand naturally declines.

The sustained growth trajectory prompts an important question: how is this additional demand distributed across the network's three modes?

## 3. Mode Split
### 3.1 Mode Patronage Trends
{: .no_toc}
<iframe src="assets/figures/mode_trends.html" width="100%" height="500" style="border:none;"></iframe>
*Figure 3.1: Patronage by mode over time*

Bus services form the backbone of TransLink's network, commanding the largest share of passenger trips throughout the analysis period. However, examining growth rates reveals a more nuanced story. 

**Ferry services experienced explosive growth** with a 172% increase in average monthly patronage (adding 0.3 million trips), followed by bus at 64% (3.1 million additional trips) and train at 60% (1.6 million additional trips) between 2022 and 2025. While ferry's percentage growth is dramatic, it's important to note this reflects expansion from a smaller base—bus services absorbed the largest absolute increase in passenger demand.

### 3.2 Mode Share Over Time
{: .no_toc}
<iframe src="assets/figures/mode_share_grouped_bar.html" width="100%" height="500" style="border:none;"></iframe>
*Figure 3.2: Relative mode share proportions by year*

Despite significant absolute growth across all modes, **relative mode share remained remarkably stable** throughout the period. Bus maintains approximately 62% of trips, train holds steady at 34%, and ferry serves around 4% of passengers. This stability suggests that network expansion has been proportional across modes, with each absorbing growth consistent with its existing capacity and service coverage.


### 3.3 Weekday vs. Weekend Patterns
{: .no_toc}
<iframe src="assets/figures/mode_day_type_pie.html" width="100%" height="500" style="border:none;"></iframe>
*Figure 3.3:Mode share distribution by day type*

Travel patterns shift noticeably between weekdays and weekends, revealing different usage motivations:

- **Ferry mode share increases on weekends**, suggesting strong recreational and tourism demand for waterborne transport along Brisbane's river corridors
- **Train usage declines proportionally on weekends** relative to bus, likely reflecting reduced commuter demand for longer-distance travel to employment centers
- **Bus maintains dominant share across both periods**, underscoring its role as the network's most flexible and accessible mode

These patterns highlight how the network serves dual purposes: weekday commuter transport and weekend recreational mobility. Understanding this distinction is crucial for service planning and resource allocation.

Having examined which modes carry passengers, we now turn to how passengers pay for their journeys.

## 4. Payment Method
### 4.1 Payment Method Trends
{: .no_toc}
<iframe src="assets/figures/ticket_type_trends.html" width="100%" height="500" style="border:none;"></iframe>
*Figure 4.1: Evolution of payment methods over time*

The TransLink network is undergoing a fundamental shift in how passengers pay for travel. For the first three years of the analysis period, **go card dominated with approximately 99% of all transactions**, representing the standard for Brisbane public transport since its 2008 introduction.

This landscape transformed dramatically in April 2025 with the introduction of EMV contactless payment technology. Within just six months, **EMV adoption surged to over 30% of all trips**, representing one of the fastest payment technology transitions in Australian public transport history. If current adoption rates continue, EMV payments are projected to overtake go card as the dominant payment method by 2026.

*Data Note: Historical data from January 2022 to March 2025 captures only go card and paper ticket transactions. EMV transaction data became available from April 2025 onwards. Queensland's Open Data Portal indicates that historical datasets will be retroactively updated to include EMV transactions, which may reveal earlier adoption patterns currently not visible in this analysis.*


### 4.2 Payment Method Distribution by Mode
{: .no_toc}
<iframe src="assets/figures/ticket_by_mode_pie.html" width="100%" height="400" style="border:none;"></iframe>
*Figure 4.2: Payment method preferences across transport modes*

EMV adoption varies significantly across transport modes, revealing distinct user segments:

**Ferry services lead the EMV revolution** with over 50% of trips now using contactless bank cards. This disproportionate adoption likely reflects ferry's strong tourist and recreational user base—passengers who prefer the convenience of tap-and-go without needing to purchase or maintain a dedicated go card for occasional trips.

**Bus and train services show slower but accelerating EMV uptake**, remaining go card dominant in the current data. However, the rapid adoption trajectory suggests these modes will also transition to EMV majority by 2026. The difference in adoption rates highlights how payment preferences correlate with trip purpose: regular commuters maintain go card familiarity while casual users embrace contactless convenience.

This payment transformation has profound implications for fare collection infrastructure, customer service requirements, and network accessibility for visitors and occasional riders.

With an understanding of network-wide patterns in mode choice and payment behavior, we now examine the geographic dimension: where are people actually traveling?

## 5. Origin-Destination Analysis
### 5.1 Top Origin and Destination Localities
{: .no_toc}

<iframe src="assets/figures/top_n_locality_by_mode.html" width="100%" height="600" style="border:none;"></iframe>
*Figure 5.1: Highest patronage localities by mode*

Geographic analysis reveals Southeast Queensland's dominant travel destinations and the modes serving them. **Brisbane CBD emerges as the overwhelming attractor**, commanding the highest patronage for both trip origins and destinations. This is followed by **South Brisbane** and **Fortitude Valley**, confirming the inner-city core's magnetic pull for employment, education, and entertainment.

However, examining modal composition reveals a critical vulnerability. Localities such as **St. Lucia, Woolloongabba, and Upper Mount Gravatt** generate substantial patronage but rely almost exclusively on bus services. This single-mode dependency creates significant risk—any disruption to bus operations (industrial action, road construction, or accidents) can effectively strand these communities with no viable alternative. Unlike areas served by multiple modes, these localities lack the network redundancy that builds resilience.

This pattern suggests a need for strategic diversification in high-patronage, bus-dependent corridors to ensure reliable access during disruptions.


### 5.2 Dominant Travel Corridors
{: .no_toc}
<iframe src="assets/figures/top_n_OD_pairs.html" width="100%" height="700" style="border:none;"></iframe>
*Figure 5.2: Top origin-destination pairs by trip volume*

Examining specific origin-destination pairs reveals the network's most critical travel corridors:

**Brisbane CBD dominates both ends of the region's busiest routes.** The highest-volume corridors connect Brisbane City with South Brisbane, Fortitude Valley, and Herston—reflecting dense employment, medical (Royal Brisbane Hospital), and educational concentrations. This radial pattern confirms Southeast Queensland's monocentric economic structure, where the CBD remains the primary destination for regional travel.


## 6. Growth Analysis
### 6.1 Spatial Winners and Losers
{: .no_toc}
<iframe src="assets\figures\top_n_highest_lowest_change.html" width="100%" height="800" style="border:none;"></iframe>
*Figure 6.1: Localities experiencing the most impactful patronage changes*

*Methodology Note: Impact is calculated by weighting year-over-year percentage change against the logarithm of prior-year patronage. This approach captures not just the magnitude of change, but its significance relative to the locality's baseline ridership—a 50% increase in a large suburb has greater network impact than a 100% increase in a small one.*

Patronage growth across Southeast Queensland has been dramatically uneven, creating distinct spatial winners and losers:

<u><b>High-Growth Localities</b></u>

**Springfield Central, Bowen Hills, and Surfers Paradise lead the region** with patronage increases exceeding 35%. These gains reflect deliberate urban intensification strategies:
- **Springfield Central** benefits from master-planned Transit-Oriented Development and improved rail connectivity
- **Bowen Hills** is experiencing significant residential and commercial redevelopment near the inner-city rail station
- **Surfers Paradise** continues to attract tourism and residential growth along the Gold Coast corridor


<u><b>Declining Localities</b></u>

At the opposite extreme, **Donnan, Riverbend, and North Arm experienced patronage collapses of up to 80%.** These dramatic declines warrant urgent investigation—potential causes include service frequency reductions, demographic shifts, deteriorating service quality, or economic decline. Each locality requires targeted analysis to determine whether the decline stems from fixable service issues or structural demographic changes.

*Construction Impacts*

*Salisbury's patronage decline illustrates temporary disruption effects from major infrastructure projects. The Cross River Rail construction necessitated track closures and service modifications, suppressing ridership in affected corridors.*

## 7. Key Insights and Limitations
### 7.1 Summary of Findings
{: .no_toc}
- **Strong Growth**: The network has experienced remarkable recovery with patronage increasing 65.8% from 2022 to 2025.The consistent upward trajectory indicates sustained confidence in public transport as a viable mobility option.
- **Bus-Dominant Network**: The persistent dominance of bus (62%) over rail (34%) and ferry (4%) reveals Brisbane's polycentric urban structure. However, ferry's 172% growth rate, while from a small base, signals untapped potential for water-based transport in this river city.
- **Digital Payment Transformation**: EMV adoption exceeded 30% within six months of launch, with ferries leading at >50%. This signals strong preference for tap-and-go payments, especially among casual users and tourists.
- **CBD-Centric with Single-Mode Vulnerabilities**: Brisbane CBD dominates OD pairs, while localities like St. Lucia and Woolloongabba rely almost entirely on buses. This creates fragility during service disruptions.
- **Uneven Spatial Growth**: Springfield Central, Bowen Hills, and Surfers Paradise show 35%+ growth, while Donnan and Riverbend declined up to 80%, requiring targeted intervention.

### 7.2 Limitations:
{: .no_toc}

- Data doesn't capture trip purpose or demographics
- EMV data is only available from April 2025 onwards, limiting historical payment trend analysis.
- No capture of failed trips (people who wanted to use PT but couldn't)

## Notes and References

- Data is obtained from Queensland Government <a href="https://www.data.qld.gov.au/dataset/translink-origin-destination-trips-2022-onwards" target="_blank" rel="noopener noreferrer">Open Data Portal</a> Website.
- All results are reproducible using the scripts and notebooks provided in <a href="https://github.com/sanjeevbhurtyal/Translink_OD_Trip_Analysis" target="_blank" rel="noopener noreferrer">GitHub repository</a> .
- Granual analysis at suburb and operator level is available at <a href="https://public.tableau.com/views/TranslinkPatronageAnlaysis/SuburbProfile?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link" target="_blank" rel="noopener noreferrer">Tableau dashboard</a>.

{% include get-in-touch.html %}
{% include head_custom.html %}

