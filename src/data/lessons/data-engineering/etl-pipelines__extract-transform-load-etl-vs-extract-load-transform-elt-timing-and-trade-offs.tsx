import type { Component } from "solid-js";

const LessonEtlPipelinesExtractTransformLoadEtlVsExtractLoadTransformEltTimingAndTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Extract, Transform, Load (ETL) vs Extract, Load, Transform (ELT):
            Timing and Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            ETL and ELT describe different sequencing strategies for data
            pipelines. In ETL, you extract data from sources, transform it in
            flight with validation and business logic, then load the clean,
            curated result into the destination. In ELT, you extract and
            immediately load raw data into a destination, then run
            transformations downstream using the destination's compute power.
            ETL improves immediate queryability and enforces quality gates at
            ingress, making curated data available the moment it lands. However,
            it adds latency to the ingest path and tightly couples
            transformation logic to the pipeline itself. If you discover a bug
            or need a new field, you must reprocess from source or wait for new
            data. ELT minimizes ingest latency, preserves raw fidelity for
            reprocessing, and allows consumer teams to iterate on
            transformations without blocking ingestion. The downside is
            governance drift and the risk that every consumer duplicates
            transformation logic or queries raw, expensive data formats. In
            practice, both patterns coexist. Streaming pipelines feeding
            operational dashboards often use micro ETL to apply lightweight
            cleansing and enrichment, landing JSON or Avro within seconds to
            minutes. Meanwhile, batch jobs use ELT to land raw JSON cheaply to
            an object store, then curate into columnar Parquet with 5 to 10
            times compression, reducing scan costs by 80 to 90 percent. For
            example, scanning 10 terabytes of raw JSON per day at 5 dollars per
            terabyte equals 50 dollars per day, while the curated 1 to 2
            terabyte Parquet costs 5 to 10 dollars per day for the same
            analytics. Choose ETL when schema stability is high, quality
            enforcement is critical, and you can tolerate modest latency. Choose
            ELT when raw fidelity is paramount, schemas evolve rapidly, or you
            need to experiment with transformations without re-ingesting data.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; gap: 24px; justify-content: center">
                <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                    <strong style="font-size: 13px">Source DB</strong>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">↓</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                    <strong style="font-size: 13px">Transform</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      validate + clean
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">↓</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                    <strong style="font-size: 13px">Warehouse</strong>
                    <div style="font-size: 11px; margin-top: 4px">curated</div>
                  </div>
                  <div style="font-size: 12px; font-weight: bold; margin-top: 8px">
                    ETL
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                    <strong style="font-size: 13px">Source DB</strong>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">↓</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                    <strong style="font-size: 13px">Data Lake</strong>
                    <div style="font-size: 11px; margin-top: 4px">raw JSON</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">↓</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                    <strong style="font-size: 13px">Transform</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Parquet/query
                    </div>
                  </div>
                  <div style="font-size: 12px; font-weight: bold; margin-top: 8px">
                    ELT
                  </div>
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
                  ETL enforces quality and cleansing before load, reducing
                  downstream burden but adding ingest latency and coupling to
                  transformation logic.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ELT preserves raw fidelity and minimizes latency, with typical
                  JSON to Parquet compression yielding 5 to 10 times size
                  reduction and 80 to 90 percent lower query scan costs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming pipelines often use micro ETL for sub-minute
                  freshness, while batch systems use ELT to land raw data
                  cheaply and curate offline.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ETL is best for stable schemas and strict quality SLAs. ELT
                  suits fast-changing schemas, experimentation, and reprocessing
                  without re-ingesting from sources.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large organizations run both patterns in parallel: streams
                  feed operational metrics with ETL, batch jobs populate curated
                  lakes with ELT.
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
                  Amazon pattern: land raw clickstream JSON to object store via
                  ELT (preserving raw fidelity), then curate to Parquet with 8x
                  compression. For 10 TB raw per day, scan cost drops from 50
                  dollars (10 TB × 5 dollars per TB) to 5 to 10 dollars (1 to 2
                  TB Parquet).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEtlPipelinesExtractTransformLoadEtlVsExtractLoadTransformEltTimingAndTradeOffs;
