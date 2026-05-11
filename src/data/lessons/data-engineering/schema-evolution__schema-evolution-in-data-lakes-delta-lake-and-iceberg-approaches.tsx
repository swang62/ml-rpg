import type { Component } from "solid-js";

const LessonSchemaEvolutionSchemaEvolutionInDataLakesDeltaLakeAndIcebergApproaches: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Schema Evolution in Data Lakes: Delta Lake and Iceberg Approaches
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Data Lake Challenge:
            </div>
            Data lakes store files, not live streams. You might have hourly
            Parquet files accumulated over two years, each potentially written
            with a different schema version. A query that reads the logical
            table must handle this heterogeneity transparently. Unlike a stream
            where each message carries a schema ID, files often lack embedded
            metadata about which schema version produced them. Table formats
            like Apache Iceberg and Delta Lake solve this by maintaining a
            schema history in table metadata, separate from the data files
            themselves. Each transaction that changes the schema records the new
            version along with which data files it applies to. Query engines
            consult this metadata, then adapt scans and projections per file.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              How Delta Lake Handles Evolution:
            </div>
            Delta Lake supports automatic schema evolution on write via a
            mergeSchema option. When you append data with new columns, Delta
            updates the table schema and writes metadata indicating which files
            contain which columns. Later queries that select a column added in
            version 5 will read it from files written after that version,
            returning null for older files. Databricks, which builds on Delta
            Lake, also implements schema enforcement. If new data violates the
            declared schema without an explicit evolution operation, the write
            fails. This combination prevents accidental drift while allowing
            controlled evolution. A typical pattern is to evolve the schema
            explicitly using ALTER TABLE ADD COLUMN, then append data. This
            makes schema changes visible in version control and audit logs, not
            just implicit in incoming data.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              How Iceberg Handles Evolution:
            </div>
            Iceberg takes a similar approach but with more granular tracking. It
            stores schema, partition spec, and sort order as separate metadata
            objects with unique identifiers. Each data file references the
            schema ID it was written with. Query planning fetches the current
            schema, compares it to each file's schema ID, and builds a
            projection that handles missing or extra columns. Iceberg also
            supports column renames safely by assigning each column a unique
            immutable ID separate from its name. Renaming a column updates the
            name to ID mapping in metadata but does not change the underlying
            Parquet column. This avoids the common pitfall where renaming is
            mistaken for a cosmetic change but actually breaks consumers.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> A table with 2 years of hourly
              files (17,520 files) might have schema versions 1 through 8. A
              query selecting all columns triggers schema resolution. The engine
              rewrites the scan to project missing columns as null for older
              files. This keeps ETL stable at 30 minutes for a 2 terabyte daily
              partition, even with weekly schema changes.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Performance Implications:
            </div>
            Schema evolution in data lakes is not free. Adding columns increases
            file width, which can degrade scan performance if queries select all
            columns. A table that starts at 50 columns and grows to 200 columns
            over two years will see slower full scans, even with columnar
            formats like Parquet, because more data must be read from storage.
            Changing partition columns late or adding high cardinality columns
            can break partition pruning strategies. A query that used to scan 10
            gigabytes by filtering on date might suddenly scan 500 gigabytes if
            a schema change alters how partitions are defined. Snowflake and
            Databricks users report cost spikes after schema changes that
            increase column cardinality or add many nullable fields to wide
            tables.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Table formats like Delta Lake and Iceberg maintain schema
                  history in metadata separate from data files, tracking which
                  schema version applies to which files
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta Lake supports automatic schema evolution with
                  mergeSchema option but also enforces schema validation to
                  prevent accidental drift from incompatible writes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iceberg assigns immutable unique IDs to each column, enabling
                  safe renames by updating name to ID mapping in metadata
                  without changing underlying Parquet columns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query engines rewrite scans to project missing columns as null
                  for older files, allowing tables with 17,520 files spanning 2
                  years to handle multiple schema versions transparently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adding columns to wide tables degrades scan performance over
                  time, and changing partition columns can break pruning
                  strategies, causing queries to scan 50x more data unexpectedly
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
                  Delta Lake evolution: Table starts with 50 columns. After 2
                  years and 8 schema versions, it has 200 columns. Query
                  selecting all columns scans slower (more data per file), but
                  query selecting original 50 columns maintains performance via
                  columnar format.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iceberg column rename: user_name column (ID: 42) renamed to
                  username. Metadata updates name mapping, but Parquet files
                  still reference column ID 42. Old queries using user_name and
                  new queries using username both work without data migration.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaEvolutionSchemaEvolutionInDataLakesDeltaLakeAndIcebergApproaches;
