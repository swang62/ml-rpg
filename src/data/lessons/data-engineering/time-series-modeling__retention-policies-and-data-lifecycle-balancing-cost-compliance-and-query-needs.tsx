import type { Component } from "solid-js";

const LessonTimeSeriesModelingRetentionPoliciesAndDataLifecycleBalancingCostComplianceAndQueryNeeds: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Retention Policies and Data Lifecycle: Balancing Cost, Compliance,
            and Query Needs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Why Retention Matters:
            </div>
            Time series data grows linearly with time and number of series. If
            you collect 1 billion points per day and keep them forever at 2
            bytes per compressed point, you accumulate 730 gigabytes per year,
            7.3 terabytes per decade. For a fleet of 10,000 servers with 1,000
            metrics each at 10 second resolution, you face 8.64 billion points
            per day, or 6.3 petabytes per decade even with 10 times compression.
            Unbounded retention is financially and operationally impractical.
            Retention policies define how long data lives at each resolution,
            balancing cost, regulatory requirements, and query needs.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Designing Retention Policies:
            </div>
            Retention should match access patterns. Recent data for dashboards,
            alerting, and troubleshooting needs high resolution and fast access.
            Older data for capacity planning, compliance, and trend analysis can
            tolerate lower resolution and slower queries. A common pattern is:
            raw 10 second data for 7 to 14 days, 1 minute rollups for 90 days,
            hourly rollups for 1 year, daily rollups for 3 to 7 years. These
            numbers align with typical use cases: debugging requires recent
            detailed data, capacity planning uses monthly trends, compliance
            audits need years of daily aggregates. Retention also interacts with
            storage cost. Keeping 14 days of raw data on SSD costs roughly 10
            times more per gigabyte than keeping 1 year of compressed rollups on
            object storage. If raw data is 100 gigabytes per day on SSD at $0.10
            per gigabyte per month, 14 days costs $140 per month. Downsampling
            to 1 minute reduces to 1.67 gigabytes per day; 90 days on cheaper
            storage at $0.02 per gigabyte per month costs $3 per month. The
            trade off is query granularity versus cost.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Netflix keeps 7 days of raw
              metrics for debugging, 90 days of 1 minute rollups for trend
              analysis, and several years of daily aggregates for capacity
              planning and cost attribution. This multi tier retention reduces
              storage cost by approximately 95 percent compared to keeping all
              data at raw resolution.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Compliance and Legal Requirements:
            </div>
            Regulatory frameworks like General Data Protection Regulation
            (GDPR), Health Insurance Portability and Accountability Act (HIPAA),
            or financial auditing standards often mandate minimum retention
            periods for certain data. Financial transaction metrics may need 7
            years of retention. Healthcare telemetry may require 10 years. Data
            modeling must accommodate these requirements while avoiding
            overretention, which increases storage cost and privacy risk. A best
            practice is to separate regulated metrics into dedicated retention
            tiers with automated deletion after the legal minimum, ensuring
            compliance without keeping unnecessary data.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Automated Lifecycle Management:
            </div>
            Manual deletion is error prone and operationally expensive.
            Production systems automate lifecycle management using time based
            partitioning. Once a partition's time window closes and its
            retention period expires, the system automatically deletes or
            archives it. For example, partitions for raw data older than 14 days
            are deleted, partitions for 1 minute rollups older than 90 days are
            deleted, and so on. This automation runs continuously, keeping
            storage usage stable as new data arrives and old data expires. Cloud
            storage services like Amazon S3 or Google Cloud Storage offer
            lifecycle policies that automatically transition data to cheaper
            cold storage tiers or delete it after a specified age. A time series
            system can write daily rollups to object storage with a lifecycle
            policy that moves data older than 1 year to Glacier (very cheap,
            retrieval takes hours) and deletes data older than 7 years. This
            offloads lifecycle management to the storage layer.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Trade Off:
            </div>
            Aggressive retention policies reduce cost but limit historical
            analysis. If you delete raw data after 7 days and later discover a
            bug that requires detailed investigation of an incident from 10 days
            ago, the data is gone. Conversely, keeping everything forever is
            expensive and complicates privacy compliance. The solution is to
            document retention policies clearly, ensure stakeholders understand
            the trade offs, and design systems to answer most questions with
            downsampled data while accepting that some deep dives into distant
            history are impossible.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unbounded retention at raw resolution for 10,000 servers with
                  1,000 metrics generates 8.64 billion points per day,
                  accumulating 6.3 petabytes over 10 years even with 10x
                  compression, making cost prohibitive.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical retention: raw 10 second data for 7 to 14 days
                  (debugging), 1 minute rollups for 90 days (trends), hourly for
                  1 year, daily for 3 to 7 years (capacity planning,
                  compliance).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage cost scales with resolution and tier: raw SSD at $0.10
                  per gigabyte per month (14 days, 100 gigabytes per day =
                  $140/month) versus 1 minute rollups on object storage at $0.02
                  per gigabyte per month (90 days, 1.67 gigabytes per day =
                  $3/month).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compliance frameworks (GDPR, HIPAA, financial auditing) may
                  mandate 7 to 10 years retention for specific metrics,
                  requiring dedicated tiers with automated deletion after legal
                  minimums.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated lifecycle using time partitioned storage deletes
                  expired partitions continuously; cloud lifecycle policies
                  transition data older than 1 year to cold storage (Glacier)
                  and delete after 7 years, offloading management.
                </span>
              </div>
            </div>
          </div>
          <div class="Learn_examplesSection p-4 mb-4">
            <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">1</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix retains 7 days raw, 90 days 1 minute rollups, years of
                  daily aggregates, reducing storage cost by approximately 95
                  percent versus raw retention while supporting debugging, trend
                  analysis, and capacity planning.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A financial services company keeps transaction metrics for 7
                  years per regulatory requirements, using daily rollups on
                  cheap object storage with automated lifecycle deletion after
                  2555 days to ensure compliance.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A system writes daily rollups to Amazon S3 with lifecycle
                  policy: transition to Glacier after 365 days (retrieval
                  latency increases from milliseconds to hours), delete after
                  2555 days (7 years).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeSeriesModelingRetentionPoliciesAndDataLifecycleBalancingCostComplianceAndQueryNeeds;
