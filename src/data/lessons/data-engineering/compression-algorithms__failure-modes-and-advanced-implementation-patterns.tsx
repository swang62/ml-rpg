import type { Component } from "solid-js";

const LessonCompressionAlgorithmsFailureModesAndAdvancedImplementationPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Advanced Implementation Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>CPU Saturation Under Load:</strong> A common operational
            failure is CPU saturation causing latency spikes. A backend team
            might switch from Snappy to Zstd at a high compression level to save
            30 percent on storage. Under normal load, p99 latency remains under
            50 milliseconds. During a traffic spike or noisy neighbor scenario,
            the added CPU cost pushes cores to 90 to 100 percent utilization,
            queueing requests and driving p99 to hundreds of milliseconds.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Latency Under CPU Pressure
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    NORMAL LOAD
                  </div>
                  <div style="font-size: 16px; font-weight: 800">50 ms p99</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    TRAFFIC SPIKE
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    300+ ms p99
                  </div>
                </div>
              </div>
            </div>
            The correct design caps compression levels for latency sensitive
            paths and pushes aggressive compression to offline jobs. Some
            systems implement adaptive compression: if CPU is low and bandwidth
            constrained, increase compression level; under CPU pressure, fall
            back to faster codecs.
            <strong>Block Corruption and Durability:</strong> If you compress
            large blocks (for example 16 MB) and one block corrupts, you lose
            that entire range of records. Systems that care about durability use
            smaller blocks, independent checksums per block, and replication
            across machines or regions. They also need clear behavior when
            decompression fails, such as falling back to redundant copies or
            marking partial partitions as unavailable. Smaller blocks (64 KB to
            256 KB) enable finer recovery granularity but incur more per block
            overhead and slightly worse compression ratios. The trade balances
            data loss scope against compression efficiency.
            <strong>Dictionary Staleness for Small Objects:</strong> Dictionary
            based compression can improve small JSON objects from 3x to 6x
            ratio, significantly cutting mobile bandwidth. However, if data
            distribution drifts (for example a new JSON schema version), the
            dictionary becomes stale and effectiveness drops from 6x to 3x. You
            need monitoring on compression ratio over time and a process to
            retrain dictionaries from fresh samples, then roll out new
            dictionaries gradually without breaking compatibility with older
            readers. Clients and servers must negotiate which dictionary version
            to use and fall back cleanly when versions differ.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Compressing already compressed
              data (images, encrypted blobs, video segments) wastes CPU and may
              slightly increase size. Mature systems detect content types or
              sample entropy and selectively disable compression for such
              streams.
            </div>
            <strong>Splittability and Stragglers:</strong> Non splittable codecs
            create hidden scalability bottlenecks. If logs are stored as single
            large gzip files, one worker spends minutes streaming and
            decompressing a multi gigabyte file while others sit idle. Job
            completion time is dictated by these stragglers. Block aware formats
            avoid this by compressing independent blocks, but require careful
            writer configuration. Writers must balance block size (larger blocks
            compress better, smaller blocks enable finer parallelism) and ensure
            block boundaries align with record boundaries to avoid splitting
            logical units.
            <strong>Advanced Pattern: Content Aware Selection:</strong> Large
            systems classify data streams and apply different codecs. Logs with
            many repeating strings go to Zstd or gzip. Short keys or IDs might
            skip compression entirely. Columnar numeric data uses specialized
            encodings (like delta encoding or run length encoding) plus light
            general compression. This maximizes efficiency by matching codec
            strengths to data characteristics.
            <strong>Multi Threaded Compression:</strong> Modern implementations
            support parallel compression by partitioning large inputs into
            chunks, compressing each chunk independently on different threads,
            then concatenating compressed chunks. This scales compression
            throughput linearly with available cores, critical when ingesting
            many gigabytes per second. The trade is that chunks are compressed
            independently, so cross chunk patterns aren't exploited, slightly
            reducing ratio.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CPU saturation during traffic spikes turns reasonable 50 ms
                  p99 into 300+ ms when aggressive compression pushes cores to
                  90 to 100 percent utilization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Block corruption with large 16 MB blocks loses entire ranges;
                  smaller 64 KB to 256 KB blocks enable finer recovery but incur
                  overhead and worse ratios
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dictionary staleness causes compression to degrade from 6x to
                  3x when data distribution drifts, requiring monitoring,
                  retraining, versioning, and gradual rollout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Non splittable gzip files create stragglers in distributed
                  processing where single workers decompress for minutes while
                  others idle, fixed by block aware formats
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Content aware selection matches codecs to data: repeating
                  strings use Zstd, numeric columns use delta encoding, already
                  compressed data skips compression entirely
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
                  Backend switches to high level Zstd saving 30% storage but
                  under load spike CPU hits 100%, queueing requests and spiking
                  p99 from 50 ms to 300+ ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analytics job with 10 TB in large gzip files has stragglers
                  spending minutes on multi gigabyte files, completion dictated
                  by slowest worker
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dictionary trained on old JSON schema drops from 6x to 3x
                  compression when new schema version deploys, requiring
                  dictionary retraining and versioned negotiation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCompressionAlgorithmsFailureModesAndAdvancedImplementationPatterns;
