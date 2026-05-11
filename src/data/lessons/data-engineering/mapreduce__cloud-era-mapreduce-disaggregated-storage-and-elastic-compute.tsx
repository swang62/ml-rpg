import type { Component } from "solid-js";

const LessonMapreduceCloudEraMapreduceDisaggregatedStorageAndElasticCompute: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cloud Era MapReduce: Disaggregated Storage and Elastic Compute
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Traditional MapReduce colocated compute and storage for data
            locality: mappers ran on the same machines that stored input blocks,
            minimizing network reads. Cloud deployments flip this model by
            separating durable object storage (Amazon S3, Google Cloud Storage)
            from ephemeral compute clusters. Workers spin up on demand, read
            from remote object stores, shuffle across instance networking, write
            results back to object storage, and terminate when done. This
            sacrifices some locality and adds per operation latency but unlocks
            major operational benefits. The economics are compelling: transient
            clusters with autoscaling allow you to size compute precisely to
            workload demand rather than maintaining always on infrastructure.
            Preemptible or spot instances cut compute costs by 60 to 90 percent
            compared to on demand pricing. MapReduce's deterministic retry
            semantics absorb spot instance loss gracefully: when a node
            disappears mid task, the framework simply reschedules the work
            elsewhere. Amazon EMR style deployments commonly run hundreds to
            thousands of ephemeral workers, scaling job waves independently and
            relying on object storage for durable input, output, and often
            intermediate stage persistence in multi job pipelines. The
            trade-offs are concrete: object store read latency is 5 to 50
            milliseconds per operation versus sub millisecond for local disk,
            requiring larger read ahead buffers and parallel multipart fetches
            to saturate bandwidth. Network costs can add up when shuffling
            terabytes across availability zones. But for workloads that tolerate
            batch latency and need to process sporadic or unpredictable data
            volumes, the ability to spin up a 1000 node cluster in minutes,
            process a petabyte scale backfill, and tear down immediately
            provides flexibility that colocated clusters cannot match. The
            pattern works best when job orchestration treats compute as
            stateless and transient while data lake storage provides the durable
            system of record.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="text-align: center; font-weight: bold; font-size: 13px; padding-bottom: 6px; border-bottom: 2px solid">
                  TRADITIONAL: Colocated Storage + Compute
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Node 1</strong>
                    <div style="font-size: 10px; margin-top: 6px">
                      Compute + Disk
                      <br />
                      Local reads
                      <br />
                      ~1ms latency
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Node 2</strong>
                    <div style="font-size: 10px; margin-top: 6px">
                      Compute + Disk
                      <br />
                      Local reads
                      <br />
                      ~1ms latency
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 11px; padding: 8px; border: 2px solid; border-radius: 6px">
                  ✓ Data locality
                  <br />✗ Always-on cost
                  <br />✗ Fixed capacity
                </div>
                <div style="height: 20px; border-top: 2px dashed; margin: 8px 0"></div>
                <div style="text-align: center; font-weight: bold; font-size: 13px; padding-bottom: 6px; border-bottom: 2px solid">
                  CLOUD: Disaggregated Storage + Compute
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Object Storage (S3/GCS)
                  </strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Durable, always available
                    <br />
                    5-50ms read latency
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↕
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">
                      Ephemeral
                      <br />
                      Worker 1
                    </strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Spot instance
                      <br />
                      60-90% discount
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">
                      Ephemeral
                      <br />
                      Worker N
                    </strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Autoscale
                      <br />
                      on demand
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 11px; padding: 8px; border: 2px solid; border-radius: 6px">
                  ✓ Elastic capacity
                  <br />✓ Cost optimized (spot)
                  <br />✗ Higher read latency
                  <br />✗ Network data transfer costs
                </div>
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Disaggregated architecture separates durable object storage
                  from stateless ephemeral compute, trading data locality for
                  elasticity and cost savings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spot or preemptible instances reduce compute costs by 60 to 90
                  percent; MapReduce retry semantics absorb instance loss
                  without manual intervention
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Object store read latency (5 to 50 milliseconds) is 5x to 50x
                  higher than local disk, requiring read ahead buffering and
                  parallel fetches to saturate bandwidth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Amazon EMR pattern: hundreds to thousands of transient workers
                  autoscale per job wave, with S3 as durable data lake for
                  inputs, outputs, and intermediate stages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Network transfer costs matter: shuffling 100 terabytes across
                  availability zones can add thousands of dollars, so compress
                  aggressively and consider zone placement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Best for sporadic or unpredictable workloads: spin up 1000
                  nodes for a petabyte backfill, run for hours, tear down
                  immediately rather than paying for idle capacity
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
                  Netflix video encoding: ephemeral Hadoop clusters on AWS
                  process petabytes of raw video, writing compressed outputs to
                  S3. Clusters scale from zero to thousands of nodes based on
                  upload queue depth.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retail demand forecasting: nightly jobs spin up EMR clusters
                  to join billions of transaction records from S3, train models,
                  write predictions back to S3, and terminate within a scheduled
                  window.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log aggregation pipeline: ingest streaming logs to S3 hourly,
                  trigger batch MapReduce job to compact and index, output to
                  serving data store, shut down cluster until next hour.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMapreduceCloudEraMapreduceDisaggregatedStorageAndElasticCompute;
