import type { Component } from "solid-js";

const LessonFilePartitioningWhatIsFileLevelPartitioning: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is File-Level Partitioning?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definition
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>File-level partitioning</strong> is the practice of
              organizing data files into directories based on one or more column
              values, enabling query engines to skip irrelevant files entirely
              when filtering data.
            </div>
          </div>
          <strong>The Core Problem:</strong> Imagine you store 500 TB of event
          data in a data lake as Parquet files. Without partitioning, a query
          filtering for yesterday's data must scan through files from every
          single day, which could mean reading hundreds of terabytes
          unnecessarily. At cloud query costs, this becomes prohibitively
          expensive and slow. Partitioning solves this by creating a directory
          structure that mirrors your filter criteria. Instead of one flat
          directory with millions of files, you organize data like{" "}
          <code>event_date=2024-12-25/region=US/file001.parquet</code>. The
          query engine examines this directory structure and metadata to
          determine which partitions match your filters before reading any data.
          <strong>How It Works:</strong> When data arrives, the ingestion system
          writes it to directories corresponding to partition key values. For a
          ride sharing app ingesting 5 million events per minute, events are
          written to paths like{" "}
          <code>dt=2024-12-25/city=SF/part-0001.parquet</code>. The partition
          keys (<code>dt</code> and <code>city</code>) become physical
          directories in object storage. When you query "average trip price in
          SF last 7 days", the planner looks at your WHERE clause, identifies
          that you need 7 specific dates and 1 city, then generates a list of
          exactly those directories. This is called partition pruning. Instead
          of scanning 365 days times 100 cities worth of data, you scan 7 times
          1, a 5,000x reduction in files examined.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Companies like Netflix partition
            viewing events by date and region, creating thousands of partitions
            but enabling queries to scan only relevant subsets. A query for "US
            viewing patterns last week" touches under 1% of total data.
          </div>
          This is horizontal partitioning at the file system level. Each
          partition contains the same schema, just different subsets of rows
          based on partition key values. Unlike database partitioning where the
          system manages physical layout, file-level partitioning requires you
          to design the directory structure and choose partition keys carefully.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">
                  Query: WHERE dt='2024-12-25'
                </strong>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Partition Pruning</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Check directory structure
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Scan Only:</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  dt=2024-12-25/*
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Skip all other dates
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Partitioning organizes files into directories by column values
                like date or region, enabling query engines to skip irrelevant
                files entirely
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Partition pruning examines directory structure and metadata to
                avoid reading up to 99% of data in large datasets, reducing both
                query time and cloud costs
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Common partition keys include time dimensions (date, hour),
                geographic dimensions (region, country), and categorical
                dimensions (tenant, source)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                This is horizontal partitioning where each partition has the
                same schema but different row subsets, physically separated into
                different directories
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
                A ride sharing company partitions 7.2 billion daily events as
                dt=2024-12-25/city=SF/part-0001.parquet, reducing a global query
                from scanning 365 days to just the needed 7 days
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix partitions viewing events by date and region, so a query
                for US viewers last month scans under 1% of the multi petabyte
                dataset instead of scanning everything
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonFilePartitioningWhatIsFileLevelPartitioning;
