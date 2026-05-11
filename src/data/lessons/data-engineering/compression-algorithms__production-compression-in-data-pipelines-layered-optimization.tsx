import type { Component } from "solid-js";

const LessonCompressionAlgorithmsProductionCompressionInDataPipelinesLayeredOptimization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Compression in Data Pipelines: Layered Optimization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Multi Stage Reality:</strong> In production systems,
            compression isn't a single decision. It's applied at multiple stages
            of the data flow, each with different optimization goals.
            Understanding where to compress and with which codec at each layer
            is critical to achieving both performance and cost efficiency.
            Consider a large scale logging pipeline that processes 5 million
            events per second, about 5 GB/s raw. Data flows through four stages:
            producer, message bus, storage, and analytics query engine. Each
            stage compresses differently.
            <strong>Stage One: Producer to Message Bus:</strong> At this layer,
            primary concerns are throughput and p99 latency. If each producer
            instance can spare only 20 to 30 percent CPU for compression, you
            choose fast codecs like Snappy or LZ4. These compress at hundreds of
            MB/s per core with ratios around 2x, keeping per request latency
            under 1 millisecond at p99. This halves network traffic between
            producers and brokers, potentially reducing link requirements from
            40 Gbit to 20 Gbit.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Network Impact at Producer Layer
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">40 Gbit</div>
                  <div style="font-size: 10px; font-weight: 600">
                    WITHOUT COMPRESSION
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">20 Gbit</div>
                  <div style="font-size: 10px; font-weight: 600">
                    WITH SNAPPY
                  </div>
                </div>
              </div>
            </div>
            <strong>Stage Two: Long Term Storage:</strong> For object storage
            similar to S3, optimization shifts toward cost per terabyte and scan
            efficiency. A trillion events daily at 200 bytes each equals roughly
            200 TB raw. With zlib or Zstd at 3x to 4x ratio, you store only 50
            to 70 TB. When replicated three times and stored for a year, the
            cost delta compared to Snappy at 2x becomes massive.
            <strong>Stage Three: Analytics Query Layer:</strong> Engines like
            Presto or Spark SQL read compressed blocks from columnar formats,
            then decompress in memory. The key metric here is{" "}
            <strong>effective scan throughput</strong>: IO bandwidth divided by
            compression ratio, minus CPU cost. If storage reads at 10 GB/s and
            Zstd achieves 4x ratio, you effectively scan 40 GB/s of logical
            data, assuming decompression stays under 30 to 40 percent CPU.
            <strong>Edge and API Layer:</strong> User facing services compress
            JSON or HTML to reduce bandwidth and improve page load time. Static
            assets might use zlib level 6 (compressed once, decompressed
            millions of times), while API responses use Zstd at mid levels to
            keep server side latency below 5 milliseconds at p99.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Facebook's Zstd deployment uses
              higher compression levels for cold storage and lower levels where
              latency matters, gaining 10 to 15 percent smaller payloads at
              similar speed or 3 to 5 times faster compression at similar size
              versus zlib.
            </div>
            The pattern is clear: compress fast and light where latency is
            critical, compress aggressively where data is written once and read
            many times, and match codec characteristics to workload demands at
            each pipeline stage.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production pipelines compress at multiple stages with
                  different codecs: fast at producers (Snappy/LZ4), aggressive
                  at storage (Zstd/zlib), optimized for queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Producer layer uses Snappy with 2x ratio to halve network
                  traffic from 40 Gbit to 20 Gbit while keeping p99 latency
                  under 1 ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage layer uses Zstd at 3x to 4x ratio, turning 200 TB
                  daily raw into 50 to 70 TB, saving massive costs when
                  replicated and retained long term
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analytics queries achieve effective scan throughput by
                  dividing IO bandwidth by compression ratio: 10 GB/s storage
                  with 4x compression yields 40 GB/s logical throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Edge services compress static assets with high ratios (zlib
                  level 6) and API responses with fast codecs (Zstd mid level)
                  to keep server latency below 5 ms p99
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
                  A 5 GB/s event pipeline uses Snappy at producers (hundreds of
                  MB/s, 2x ratio), then recompresses to Zstd for storage (4x
                  ratio), cutting 200 TB daily to 50 TB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query engine scans 10 GB/s physical data compressed 4x with
                  Zstd, delivering 40 GB/s effective throughput if decompression
                  uses under 40% CPU
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Facebook deploys Zstd with variable levels: higher for cold
                  storage, lower for latency sensitive paths, gaining 10 to 15%
                  size reduction or 3 to 5x speed improvement over zlib
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCompressionAlgorithmsProductionCompressionInDataPipelinesLayeredOptimization;
