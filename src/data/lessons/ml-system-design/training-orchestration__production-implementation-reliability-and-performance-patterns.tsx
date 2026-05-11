import type { Component } from "solid-js";

const LessonTrainingOrchestrationProductionImplementationReliabilityAndPerformancePatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Reliability and Performance Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Designing for Safe Retries
            </p>
            <p style="margin-top: 0">
              Pipeline reliability starts with designing step boundaries for
              safe retries. Each step must consume immutable inputs like
              versioned data partitions or model checkpoint URIs and produce
              versioned outputs to durable storage like S3 or GCS. Steps are
              keyed by logical partition identifiers such as date or user
              segment, making them idempotent: rerunning for the same partition
              produces identical output and safely overwrites. Pass artifact
              references between steps rather than large payloads to avoid
              memory bottlenecks, enabling parallel execution across hundreds of
              partitions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Retry and Timeout Calibration
            </p>
            <p style="margin-top: 0">
              Retries and timeouts need calibration per step type. Feature
              computation might retry 3 times with exponential backoff for
              transient database connection failures but fail fast on schema
              validation errors. Training jobs running over 30 to 60 minutes
              require periodic checkpointing to object storage so preemptions or
              out of memory failures can resume from the last checkpoint rather
              than restarting completely. Without this, teams see 4 hour
              distributed training jobs repeatedly fail at the 3.5 hour mark due
              to spot instance preemption, wasting compute until they add hourly
              checkpoints and resume logic.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Eliminating Iteration Friction
            </p>
            <p style="margin-top: 0">
              Performance optimization focuses on eliminating iteration
              friction. Container image build times directly impact developer
              productivity. Using slim base images, layer caching, and pre-built
              model dependency images cuts build times from 10 minutes to under
              2 minutes. Autoscaling must align with job concurrency patterns:
              bursty fan out of 50 parallel feature jobs outpaces node
              provisioning, causing queue delays despite autoscaling being
              enabled. Solutions include bounded concurrency, warm node pools,
              or batching small jobs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Observability and SLOs
            </p>
            <p style="margin-top: 0">
              Observability requires tracking SLOs for schedule to start
              latency, end to end pipeline duration, success ratio, and cost per
              run. Alert when daily training schedule to start exceeds 60
              seconds indicating resource contention, or when success ratio
              drops below 99 percent for 3 consecutive days signaling upstream
              data quality issues. Data quality gates enforce freshness, volume,
              and schema checks before training: fail closed and notify rather
              than silently training on suspect data.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Idempotent step design with partition keys like date or
                  segment enables safe retries and backfills: rerun produces
                  identical output and overwrites atomically without corrupting
                  concurrent runs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checkpoint training jobs running over 30 to 60 minutes to
                  object storage every hour so preemptions can resume rather
                  than restart, avoiding one company's repeated 3.5 hour
                  failures that wasted compute until fixed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slim base images with layer caching reduce container build
                  time from approximately 10 minutes to under 2 minutes,
                  directly improving developer iteration speed reported as major
                  friction point at Exness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bounded concurrency prevents autoscaling overload: fan out of
                  50 parallel jobs outpaces node provisioning causing queue
                  delays, limit to 10 concurrent with longer total time but
                  lower latency per job
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Track SLOs for schedule to start latency target under 60
                  seconds for daily jobs, success ratio above 99%, and cost per
                  successful run, alerting on violations indicating resource
                  contention or data quality issues
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
                  Netflix recommendation training: Enforces data freshness check
                  requiring complete previous 24 hours of interaction data
                  before DAG proceeds, schema validation catches upstream
                  breaking changes early, checkpoints model every 30 minutes to
                  S3 with exponential backoff retries on transient failures,
                  tracks p99 schedule to start latency target of 45 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber demand forecasting: Partitions training by metropolitan
                  area with city plus date composite key for idempotency, uses
                  pre built Docker image with XGBoost and feature store client
                  reducing build time from 12 minutes to 90 seconds, limits
                  concurrent city training to 20 jobs matching autoscaler warm
                  pool size, alerts when any city model success ratio drops
                  below 98% over 7 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingOrchestrationProductionImplementationReliabilityAndPerformancePatterns;
