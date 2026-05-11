import type { Component } from "solid-js";

const LessonCompressionAlgorithmsChoosingTheRightCodecTradeOffsAndDecisionFramework: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing the Right Codec: Trade offs and Decision Framework
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Three Way Trade:</strong> Every compression decision
            involves trading space, CPU, and latency. A fourth dimension emerges
            in distributed systems: splittability, which determines whether
            large files can be processed in parallel.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Speed First Codecs
                </div>
                <div style="font-size: 12px">
                  LZ4/Snappy: 2x ratio, 400 MB/s, 1 ms p99 latency
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Ratio First Codecs
                </div>
                <div style="font-size: 12px">
                  XZ/bzip2: 10x ratio, high CPU, seconds per GB
                </div>
              </div>
            </div>
            <strong>Speed First Codecs (LZ4, Snappy):</strong> These prioritize
            low CPU and low latency, achieving 1.5x to 2.5x ratios but
            compressing at hundreds of MB/s per core. Engineers pick these for
            online services, message queues, and intermediate shuffle data
            because any extra 5 to 10 milliseconds on the hot path can violate a
            p99 Service Level Agreement (SLA). However, you pay with higher
            storage and network costs. The decision point: If your service has a
            50 millisecond p99 SLA and currently sits at 40 milliseconds, adding
            even 10 milliseconds of compression overhead pushes you into
            violation territory under load spikes.
            <strong>Ratio First Codecs (XZ, bzip2):</strong> These reach 5x to
            10x on text or logs, ideal for cold backups and compliance archives
            read rarely. The cost is high CPU and compression latencies
            sometimes reaching seconds for gigabyte scale blobs. This is
            acceptable when data is written once and read infrequently, but not
            in interactive analytics where analysts expect sub second or single
            digit second response times.
            <strong>Balanced Codecs (zlib, Zstd):</strong> Classic zlib gives
            about 3x ratio with moderate CPU. Zstd operates across a wide
            spectrum of levels: at the same ratio as zlib, it runs 3 to 5 times
            faster; at the same speed, it shrinks data by an extra 10 to 15
            percent. Some teams prefer zlib for ecosystem maturity. Others adopt
            Zstd when CPU cost becomes a bottleneck or when they want dictionary
            based gains on small objects.
            <strong>The Splittability Problem:</strong> File level codecs like
            gzip are not splittable. A 1 GB gzip file must be processed by a
            single worker, which creates stragglers in distributed systems. If
            an analytics job scans 10 TB as large gzip files, a few workers
            spend minutes decompressing while others sit idle, dictating overall
            job completion time. Block aware formats that compress independent
            blocks solve this but incur slightly worse ratios and more metadata
            overhead. The trade is worth it for batch processing at scale.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Choose based on read/write ratio and latency budget. Systems
                that are write heavy with strict latency SLAs (over 80% writes,
                under 50 ms p99) need speed first codecs. Read heavy cold
                storage (written once, read rarely) justifies ratio first
                codecs."
              </div>
            </div>
            <strong>Decision Framework:</strong> For online services with p99
            latency SLAs under 100 milliseconds, use Snappy or LZ4. For
            intermediate data with balanced read and write patterns, use Zstd at
            low to mid levels. For cold archives accessed infrequently, use Zstd
            at high levels or XZ. For distributed batch processing, ensure your
            format uses independent compressed blocks to enable parallelism.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; font-weight: 700; margin-bottom: 12px; font-size: 14px">
                Codec Selection Decision Tree
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">p99 SLA under 50 ms?</strong>
                </div>
                <div style="display: flex; gap: 20px; width: 100%">
                  <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px">
                    <div style="font-size: 14px; font-weight: 700">YES ↓</div>
                    <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; width: 100%; text-align: center; font-size: 12px">
                      <strong>Use LZ4/Snappy</strong>
                      <div style="margin-top: 4px">Low CPU, fast, 2x ratio</div>
                    </div>
                  </div>
                  <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px">
                    <div style="font-size: 14px; font-weight: 700">NO ↓</div>
                    <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; width: 100%; text-align: center; font-size: 12px">
                      <strong>Read/write ratio?</strong>
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 12px; margin-top: 4px">
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; text-align: center; font-size: 11px">
                    <strong>Balanced</strong>
                    <div style="margin-top: 2px">Zstd mid level</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; text-align: center; font-size: 11px">
                    <strong>Read heavy</strong>
                    <div style="margin-top: 2px">Zstd high or XZ</div>
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
                  Speed first codecs (LZ4/Snappy) achieve 2x ratio at hundreds
                  of MB/s with under 1 ms p99 latency, critical for services
                  with tight SLAs but costing more in storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ratio first codecs (XZ/bzip2) reach 5x to 10x but take seconds
                  per gigabyte, suitable only for cold archives written once and
                  read rarely
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Splittability matters for distributed batch processing: gzip
                  forces single worker per file creating stragglers, while block
                  compressed formats enable parallel processing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Zstd operates across a wide spectrum: at zlib ratios it runs 3
                  to 5 times faster, or at same speed achieves 10 to 15 percent
                  better compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision framework: under 50 ms p99 SLA use Snappy, balanced
                  workloads use Zstd mid level, cold archives use Zstd high or
                  XZ, batch systems need splittable formats
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
                  Online service at 40 ms p99 with 50 ms SLA cannot afford 10 ms
                  compression overhead, must use Snappy or LZ4 to stay within
                  budget
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analytics job scanning 10 TB as large gzip files hits
                  stragglers when single workers spend minutes decompressing
                  while others idle, fixed by block compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Write heavy system (over 80% writes) with 5 indexes sees
                  throughput drop from 50,000 to 8,000 inserts per second,
                  favoring speed over aggressive compression
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCompressionAlgorithmsChoosingTheRightCodecTradeOffsAndDecisionFramework;
