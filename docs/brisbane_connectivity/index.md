---
title: Mapping Connectivity Across Brisbane
nav_enabled: true
nav_order: 2
---

<h1 style="text-align:center;">
  Mapping Connectivity Across Brisbane: What GTFS Reveals
</h1>
{: .no_toc}

<p align="center">
<strong>Sanjeev Bhurtyal</strong><br>
January 2026
</p>

<details open markdown="block">
  <summary>
Table of Contents
</summary>
- TOC
{:toc}
</details>

## Executive Summary
This analysis examines direct transit connectivity to Brisbane City using General Transit Feed Specification (GTFS) data from TransLink for the week of January 12-18, 2026. By calculating scheduled travel times between all suburb pairs, we reveal how efficiently residents can reach the city center directly across different modes and time periods.

**Key Findings:**
- **244 suburbs have direct connections to Brisbane City**, with 53% served exclusively by bus and 26% exclusively by train
- **Ferry service provides the fastest median travel times** (23 minutes to reach 50% of connected suburbs), followed by train (37 minutes) and bus (40 minutes)
- Only **31% of connected suburbs** can reach the city within 30 minutes—just 28% of bus-served suburbs, 39% of train-served suburbs, and 77% of ferry-served suburbs meet this threshold
- **Weekend service drops significantly** for bus routes (24% fewer bus-only suburbs served) while train service remains relatively stable (9% fewer train-only suburbs served)
- **40% of suburbs enjoy both fast and frequent service**, while 37% suffer from slow and infrequent connections
- For suburbs served by both modes, **rail typically outperforms bus**, with median time differences of 15 minutes or less in half of shared corridors; northern suburbs show the greatest rail advantage (up to 30 minutes faster)

This analysis provides evidence-based insights for transport planning, highlighting service gaps and opportunities to improve regional equity and accessibility.

## 1. Introduction

### 1.1 Background
{: .no_toc}

While patronage data shows *how many* people travel, travel time analysis reveals *how efficiently* they can reach their destinations.

Understanding travel times is critical for:

- **Commuter planning**: Can workers reach employment centers in reasonable time?
- **Service equity**: Do all communities have comparable access to opportunities?
- **Network efficiency**: Which transport modes deliver the best performance?
- **Policy evaluation**: Are investments improving connectivity where it's needed most?


### 1.2 Methodology
{: .no_toc}

**Data Source:** TransLink GTFS feed <a href="https://www.data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-translink/resource/e43b6b9f-fc2b-4630-a7c9-86dd5483552b" target="_blank" rel="noopener noreferrer">Available Here</a>.

**Processing:**
- Extracted all valid trips scheduled for weekdays and weekends
- Calculated median travel time, number of routes, and number of trips per day for each origin-destination pair
- Mapped stops to suburbs using Queensland Government locality boundaries 
- Details on processing available on <a href="https://github.com/sanjeevbhurtyal/SEQ_Suburb_Transit_Metrics" target="_blank" rel="noopener noreferrer">GitHub</a>

**Key Metrics:**
- **Travel Time**: Median scheduled travel time for all routes connecting suburb pairs
- **Trip Frequency**: Number of unique trips serving each corridor daily
- **Weekday/Weekend Coverage**: Service availability by day type
- **Mode Type**: Bus, Train, Ferry, Tram services

**Scope and Limitations:** 
*This analysis examines GTFS data for the week of January 12-18, 2026, representing scheduled service during a single week. Results may not reflect longer-term patterns, seasonal variations, or service changes due to maintenance or special events. While data was processed for all suburb pairs, the following analysis focuses specifically on direct connectivity to Brisbane City as a measure of regional accessibility.*


## 2. Coverage by Mode

<iframe src="assets/figures/localities_with_direct_connections.html" width="100%" height="850" style="border:1px solid black;"></iframe>
*Figure: Localities with direct connections to Brisbane City*

244 suburbs maintain direct public transport connections to Brisbane City, with route availability varying dramatically—from single routes serving peripheral suburbs like Victory Heights and Redland Bay to 65 routes converging on Fortitude Valley.

<iframe src="assets/figures/direct_connections_by_mode.html" width="100%" height="400" style="border:1px solid black;"></iframe>
*Figure: Direct connections by mode*

The network's modal distribution shows bus serving 181 suburbs, train reaching 107, and ferry connecting 13 localities.

<iframe src="assets/figures/direct_connections_by_mode_combo.html" width="100%" height="400" style="border:1px solid black;"></iframe>
*Figure: Direct connections by Combination of Modes*

Yet this coverage masks significant modal specialization: 128 suburbs (53%) rely exclusively on bus service, 63 (26%) depend solely on rail, and only 40 suburbs (16%) enjoy both bus and train options. This lack of modal redundancy creates vulnerability—when a suburb's primary mode experiences disruptions, residents often have no alternative direct route to the city.

## 3. Travel Time Analysis
### 3.1 Travel Time to Brisbane City
{: .no_toc}

<iframe src="assets/figures/travel_time_distribution.html" width="100%" height="500" style="border:1px solid black;"></iframe>
*Figure: Travel time distribution to Brisbane City*

Ferry service demonstrates the strongest performance, with Brisbane City reachable within 41 minutes from all connected suburbs and a median travel time of just 23 minutes for 50% of ferry-served locations. Bus and train services show comparable median performance (40 and 37 minutes respectively to reach 50% of suburbs), but maximum travel times diverge significantly—86 minutes for bus versus 175 minutes for train.

The extended rail travel times reflect the network's reach into more distant communities, including outer suburbs in the Sunshine Coast and in the Gold Coast Region (*Note: Direct service to areas like Helensvale in the Gold Coast region was replaced by Bus services during the week of January 12-18, 2026 and hence is not reflected here*).

### 3.2 Bus-Rail Travel Time Comparison
{: .no_toc}

<iframe src="assets/figures/shared_mode_comparison_Weekday.html" width="100%" height="500" style="border:1px solid black;"></iframe>
*Figure: Bus-Rail Travel Time Comparison*

For suburbs served by both modes, rail typically offers faster service. In 50% of dual-mode suburbs (22 localities), the travel time difference is less than 15 minutes, indicating relatively comparable performance. However, the maximum difference reaches 33 minutes, suggesting that in some corridors, mode choice significantly impacts commute duration.

<iframe src="assets/figures/shared_mode_dumbell_Weekday.html" width="100%" height="860" style="border:1px solid black;"></iframe>
*Figure: Bus-Rail Travel Time Comparison by Suburbs*

Nudgee shows the largest rail advantage (33 minutes faster), followed by Wynnum and Carseldine. Conversely, Woolloongabba is the only suburb where bus outperforms rail, albeit by a minimal 2 minutes—likely reflecting the proximity advantage of bus routes through the central business district. South Brisbane shows negligible difference between modes, consistent with its central location and multiple high-frequency connections.

<iframe src="assets/figures/shared_mode_map.html" width="100%" height="600" style="border:1px solid black;"></iframe>
*Figure: Bus-Rail Travel Time Comparison Map*

Geographically, northern suburbs exhibit relatively higher time differentials favoring rail compared to southeastern and southwestern suburbs with rail outperforming bus by up to 30 minutes.

## 4. The 30-Minute City Reality

### 4.1 Accessibility Within 30 Minutes
{: .no_toc}

<iframe src="assets/figures/localities_within_minutes.html" width="100%" height="500" style="border:1px solid black;"></iframe>
*Figure: Suburbs within 30 minutes of Brisbane City*

Only 75 of 244 suburbs (31%) achieve direct accessibility to Brisbane City within 30 minutes. Performance varies significantly by mode: 28% of bus-served suburbs (51 localities), 39% of train-served suburbs (41 localities), and 77% of ferry-served suburbs (10 of 13) meet this threshold. Rail demonstrates a modest advantage over bus in 30-minute accessibility despite serving fewer total suburbs, suggesting greater efficiency along established corridors. Ferry excels dramatically, though its applicability is constrained to waterfront communities—a geographic limitation that prevents broader network application.

Ferry's superior performance reflects its geographic niche—serving exclusively inner-city waterfront locations where proximity naturally yields short travel times. While bus and rail show comparable 30-minute reach percentages, they serve fundamentally different roles: rail efficiently transports high volumes across medium to long distances along fixed corridors, whereas bus provides more extensive spatial coverage with greater route flexibility.

<iframe src="assets/figures/localities_within_30_minutes_Bus_map.html" width="100%" height="400" style="border:1px solid black;"></iframe>
*Figure: Suburbs within 30 minutes of Brisbane City (Bus)*

Bus service achieves impressive reach through dedicated infrastructure, with Brisbane City accessible within 30 minutes from suburbs as distant as Rochedale and Eight Mile Plains. This performance is largely attributable to the Southeast Busway, demonstrating the impact of grade-separated transit infrastructure on travel times.

<iframe src="assets/figures/localities_within_30_minutes_Rail_map.html" width="100%" height="400" style="border:1px solid black;"></iframe>
*Figure: Suburbs within 30 minutes of Brisbane City (Train)*

Rail's 30-minute catchment extends to Darra in the southwest, Carseldine in the north, and Keperra in the northwest, covering key residential corridors along the established rail lines. This reach reflects the efficiency of dedicated rail infrastructure in moving commuters across medium distances. However, the linear nature of rail corridors creates notable service gaps—communities located between rail lines must rely on bus connections or face significantly longer travel times, highlighting the trade-off between rail's speed advantage and its limited spatial coverage.


## 5. Weekday vs Weekend Connectivity

### 5.1 Service Drop on Weekends
{: .no_toc}

<iframe src="assets/figures/direct_connections_by_mode_and_day.html" width="100%" height="300" style="border:1px solid black;"></iframe>
*Figure: Number of localities with direct connections to Brisbane City by mode and day*

Weekend service reductions disproportionately affect bus routes, with 18% fewer suburbs maintaining direct connections to Brisbane City compared to weekdays. Train service proves more resilient, dropping by only 3%, while ferry service maintains complete weekend coverage.

<iframe src="assets/figures/pct_change_localities_by_mode_combo.html" width="100%" height="400" style="border:1px solid black;"></iframe>
*Figure: Percentage change in number of localities with direct connections to Brisbane City by mode*

Bus-only suburbs experience significantly greater weekend service reductions than their rail-only counterparts—24% lose direct Brisbane City connections on weekends versus 9% for train-served areas. This modal inequity particularly disadvantages residents without alternative transport options, limiting their weekend access to city-based opportunities and services.

<iframe src="assets/figures/weekday_weekend_service_drop.html" width="100%" height="600" style="border:1px solid black;"></iframe>
*Figure: Percentage change in number of trips per day between weekdays and weekends*

Geographic patterns in weekend service reductions are striking. Southwestern suburbs (Rosewood, Walloon), southern areas (Park Ridge, Crestmead), and southeastern communities (Victoria Point, Redland Bay) lose all direct weekend service. For bus, the affected suburbs cluster in southern and southeastern Brisbane, while train service gaps concentrate in the southwest.

*Note: Please use dropdown menu for mode specific map.*

**Important Context**: 
This analysis reflects GTFS data for January 12-18, 2026. Some service reductions may result from planned track work, maintenance activities, or other temporary factors rather than permanent scheduling patterns.

## 6. Accessibility Classification

**Methodology:**

To assess overall connectivity quality, suburbs are classified based on two dimensions: travel time to Brisbane City and service frequency (trips per day). This creates four accessibility categories:

- **Fast and Frequent**: Low travel time, high trip frequency—premium connectivity
- **Fast but Infrequent**: Low travel time, low trip frequency—good speed but limited departure options
- **Slow but Frequent**: High travel time, high trip frequency—many services but long journeys
- **Slow and Infrequent**: High travel time, low trip frequency—limited connectivity

Classification thresholds are determined by median values for both travel time and daily trip frequency across all directly connected suburbs.

<iframe src="assets/figures/locality_quadrants_pie.html" width="100%" height="500" style="border:1px solid black;"></iframe>
*Figure: Accessibility Classification*

The distribution reveals a polarized network: 40% of suburbs enjoy fast and frequent service—the gold standard of public transit—while 37% suffer from slow and infrequent connections. The remaining suburbs split between fast but infrequent (12%) and slow but frequent (10%) service.

This concentration at the extremes suggests that connectivity improvements may require different strategies for different areas—outer suburbs need both speed and frequency improvements, while some well-positioned suburbs might benefit from frequency enhancements alone.

<iframe src="assets/figures/locality_quadrants_map.html" width="100%" height="600" style="border:1px solid black;"></iframe>
*Figure: Accessibility Classification Map*

Geography drives accessibility patterns, as expected. Fast and frequent suburbs cluster around Brisbane City, forming a connectivity core that gradually transitions to slow and infrequent service in outer areas. This concentric pattern reflects the fundamental challenge of providing high-quality service across an expanding metropolitan region with fixed infrastructure investment.

<iframe src="assets/figures/locality_quadrants_scatter.html" width="100%" height="500" style="border:1px solid black;"></iframe>
*Figure: Accessibility Classification*

Individual suburb performance reveals notable outliers. South Brisbane, Fortitude Valley, and Woolloongabba demonstrate exceptional accessibility—benefiting from their proximity to the city center and convergence of multiple high-frequency routes. At the opposite end, Victoria Heights, Traveston, and Cooran represent connectivity deserts among suburbs with direct service, combining long travel times with limited departure options.

<iframe src="assets/figures/locality_quadrants_mode.html" width="100%" height="400" style="border:1px solid black;"></iframe>
*Figure: Accessibility Classification by Mode*

Mode-specific analysis reveals fundamental performance differences. Bus-only suburbs are split between fast/frequent and slow/infrequent categories, reflecting the highly variable nature of bus service depending on infrastructure (busways vs. mixed traffic) and route design. Rail-only suburbs skew heavily toward slow and infrequent service—a function of rail's role in connecting distant communities with lower service frequencies.

Suburbs with both bus and rail access predominantly achieve fast and frequent classification, demonstrating the value of modal redundancy and choice. This finding supports the case for prioritizing dual-mode service expansion in currently single-mode suburbs.

## 7. Key Insights & Limitations

### 7.1 Summary of Findings
{: .no_toc}

- **Network Coverage**: 244 suburbs connect directly to Brisbane City, but 53% rely solely on bus and 26% solely on train—only 40 suburbs have both modes, limiting redundancy during disruptions.
- **Travel Time Performance**: Ferry achieves the fastest median times (23 minutes) but serves only 13 suburbs. Bus and rail perform similarly (40-37 minute medians), though rail reaches more distant areas. Where both modes exist, rail typically outperforms bus by 15 minutes or less.
- **Accessibility Gaps**: Only 31% of connected suburbs reach the city within 30 minutes, falling short of the "30-minute city" ideal. Service quality is polarized: 40% have fast and frequent connections while 37% face slow and infrequent service.
- **Weekend Service**: Bus routes drop 18% in suburb coverage on weekends, while rail maintains steadier service (3% reduction). Several outer suburbs lose all weekend service, creating equity concerns.
- **Infrastructure Matters**: Dedicated busways consistently deliver better travel times than mixed-traffic bus routes, demonstrating the value of grade-separated infrastructure.

### 7.2 Limitations
{: .no_toc}

- **Temporal**: Analysis covers one week (January 12-18, 2026) and may not reflect seasonal patterns, long-term trends, or temporary service changes due to maintenance.
- **Methodology**: GTFS data shows scheduled—not actual—performance. The analysis excludes transfer journeys, walking/waiting times, and peak-hour congestion effects. Travel times represent in-vehicle duration only.
- **Demand**: Analysis does not consider population density, actual patronage levels, or ridership demand, which are critical factors in evaluating service adequacy and efficiency.
- **Geographic**: Focus on Brisbane City connectivity doesn't capture suburb-to-suburb travel or access to other major centers.
- **Interpretation**: Accessibility classifications use median-based thresholds. Weekend reductions may reflect temporary maintenance rather than standard patterns.

Despite these constraints, the analysis offers valuable insights into network performance and identifies opportunities for evidence-based transit planning improvements.

## Notes and References

- GTFS data obtained from <a href="https://www.data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-translink/resource/e43b6b9f-fc2b-4630-a7c9-86dd5483552b" target="_blank" rel="noopener noreferrer">Queensland Open Data Portal</a>
- Locality boundaries from <a href="https://qldspatial.information.qld.gov.au/catalogue/custom/detail.page?fid={8F24D271-EE3B-491C-915C-E7DD617F95DC}" target="_blank" rel="noopener noreferrer">Queensland Spatial Catalogue</a>
- Analysis code available on <a href="https://github.com/sanjeevbhurtyal/SEQ_Suburb_Transit_Metrics" target="_blank" rel="noopener noreferrer">GitHub</a>
- Dashboard available on <a href="https://public.tableau.com/app/profile/sanjeev.bhurtyal2011/viz/SEQSuburbTransitMetrics/Dashboard" target="_blank" rel="noopener noreferrer">Tableau</a>
- All results reproducible using provided scripts

---

## Related Analysis:
{: .no_toc}
This connectivity analysis complements the <a href="../translink-od/" target="_blank" rel="noopener noreferrer">Origin-Destination Patronage Analysis</a> to provide a comprehensive view of Southeast Queensland's public transport performance, combining where people travel with how efficiently they can reach their destinations.

---

{% include get-in-touch.html %}

---

<small>Analysis current as of January 2026. Transit schedules and service patterns are subject to change. Readers should verify current service information with TransLink before making travel decisions.</small>

{% include head_custom.html %}